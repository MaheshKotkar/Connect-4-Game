'use client';

import { useState, useEffect, useCallback } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Navbar from '../src/components/Navbar';
import Footer from '../src/components/Footer';
import { Suspense } from 'react';
import { useTheme } from '../src/context/ThemeContext';

// Constants
const ROWS = 6;
const COLS = 7;
const PLAYER = 1; // Yellow
const AI = 2;     // Red

// --- AI LOGIC TOOLS ---

const checkWinStatic = (board: number[][]) => {
    // Horizontal
    for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS - 3; c++) {
            if (board[r][c] !== 0 && board[r][c] === board[r][c + 1] && board[r][c] === board[r][c + 2] && board[r][c] === board[r][c + 3]) return board[r][c];
        }
    }
    // Vertical
    for (let r = 0; r < ROWS - 3; r++) {
        for (let c = 0; c < COLS; c++) {
            if (board[r][c] !== 0 && board[r][c] === board[r + 1][c] && board[r][c] === board[r + 2][c] && board[r][c] === board[r + 3][c]) return board[r][c];
        }
    }
    // Diagonal /
    for (let r = 3; r < ROWS; r++) {
        for (let c = 0; c < COLS - 3; c++) {
            if (board[r][c] !== 0 && board[r][c] === board[r - 1][c + 1] && board[r][c] === board[r - 2][c + 2] && board[r][c] === board[r - 3][c + 3]) return board[r][c];
        }
    }
    // Diagonal \
    for (let r = 0; r < ROWS - 3; r++) {
        for (let c = 0; c < COLS - 3; c++) {
            if (board[r][c] !== 0 && board[r][c] === board[r + 1][c + 1] && board[r][c] === board[r + 2][c + 2] && board[r][c] === board[r + 3][c + 3]) return board[r][c];
        }
    }
    return null;
};

const getScore = (window: number[], piece: number) => {
    let score = 0;
    const oppPiece = piece === PLAYER ? AI : PLAYER;

    const count = window.filter(i => i === piece).length;
    const empty = window.filter(i => i === 0).length;
    const oppCount = window.filter(i => i === oppPiece).length;

    if (count === 4) score += 10000;
    else if (count === 3 && empty === 1) score += 100;
    else if (count === 2 && empty === 2) score += 10;

    if (oppCount === 3 && empty === 1) score -= 80;

    return score;
};

const scoreBoard = (board: number[][], piece: number) => {
    let score = 0;

    // Center preference
    const centerCol = Math.floor(COLS / 2);
    const centerArray = board.map(row => row[centerCol]);
    score += centerArray.filter(i => i === piece).length * 6;

    // Horizontal
    for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS - 3; c++) {
            const window = [board[r][c], board[r][c + 1], board[r][c + 2], board[r][c + 3]];
            score += getScore(window, piece);
        }
    }
    // Vertical
    for (let c = 0; c < COLS; c++) {
        for (let r = 0; r < ROWS - 3; r++) {
            const window = [board[r][c], board[r + 1][c], board[r + 2][c], board[r + 3][c]];
            score += getScore(window, piece);
        }
    }
    // Diagonals
    for (let r = 0; r < ROWS - 3; r++) {
        for (let c = 0; c < COLS - 3; c++) {
            const window = [board[r][c], board[r + 1][c + 1], board[r + 2][c + 2], board[r + 3][c + 3]];
            score += getScore(window, piece);
        }
    }
    for (let r = 0; r < ROWS - 3; r++) {
        for (let c = 0; c < COLS - 3; c++) {
            const window = [board[r + 3][c], board[r + 2][c + 1], board[r + 1][c + 2], board[r][c + 3]];
            score += getScore(window, piece);
        }
    }

    return score;
};

const minimax = (board: number[][], depth: number, alpha: number, beta: number, maximizingPlayer: boolean): [number | null, number] => {
    const validMoves = board[0].map((_, i) => i).filter(c => board[0][c] === 0);
    const result = checkWinStatic(board);

    if (depth === 0 || result || validMoves.length === 0) {
        if (result === AI) return [null, 1000000];
        if (result === PLAYER) return [null, -1000000];
        if (validMoves.length === 0) return [null, 0];
        return [null, scoreBoard(board, AI)];
    }

    if (maximizingPlayer) {
        let value = -Infinity;
        let column = validMoves[Math.floor(Math.random() * validMoves.length)];
        for (const col of validMoves) {
            const testBoard = board.map(r => [...r]);
            for (let r = ROWS - 1; r >= 0; r--) {
                if (testBoard[r][col] === 0) {
                    testBoard[r][col] = AI;
                    break;
                }
            }
            const newScore = minimax(testBoard, depth - 1, alpha, beta, false)[1];
            if (newScore > value) {
                value = newScore;
                column = col;
            }
            alpha = Math.max(alpha, value);
            if (alpha >= beta) break;
        }
        return [column, value];
    } else {
        let value = Infinity;
        let column = validMoves[Math.floor(Math.random() * validMoves.length)];
        for (const col of validMoves) {
            const testBoard = board.map(r => [...r]);
            for (let r = ROWS - 1; r >= 0; r--) {
                if (testBoard[r][col] === 0) {
                    testBoard[r][col] = PLAYER;
                    break;
                }
            }
            const newScore = minimax(testBoard, depth - 1, alpha, beta, true)[1];
            if (newScore < value) {
                value = newScore;
                column = col;
            }
            beta = Math.min(beta, value);
            if (alpha >= beta) break;
        }
        return [column, value];
    }
};

// --- MODAL COMPONENT ---

function GameOverModal({ winner, onRestart, onHome }: { winner: number | 'draw', onRestart: () => void, onHome: () => void }) {
    const isPlayer = winner === PLAYER;
    const isAI = winner === AI;
    const isDraw = winner === 'draw';

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
            <div className="relative bg-white/10 backdrop-blur-2xl border border-white/20 rounded-[2rem] md:rounded-[3rem] p-8 md:p-12 max-w-md w-full shadow-[0_0_100px_rgba(0,0,0,0.5)] transform animate-bounce-in text-center space-y-6 md:space-y-8 overflow-hidden">
                {/* Background decorative glow */}
                <div className={`absolute -top-24 -left-24 w-64 h-64 rounded-full blur-[80px] opacity-30 ${isPlayer ? 'bg-yellow-400' : isAI ? 'bg-red-500' : 'bg-blue-400'}`}></div>
                <div className={`absolute -bottom-24 -right-24 w-64 h-64 rounded-full blur-[80px] opacity-30 ${isPlayer ? 'bg-orange-500' : isAI ? 'bg-purple-600' : 'bg-indigo-400'}`}></div>

                {/* Trophy/Icon Section */}
                <div className="relative">
                    <div className={`w-24 h-24 md:w-32 md:h-32 mx-auto rounded-full flex items-center justify-center text-5xl md:text-6xl shadow-2xl transform hover:scale-110 transition-transform cursor-default
                        ${isPlayer ? 'bg-gradient-to-br from-yellow-300 to-yellow-600 border-4 border-yellow-200/50' :
                            isAI ? 'bg-gradient-to-br from-red-400 to-red-700 border-4 border-red-300/50' :
                                'bg-gradient-to-br from-blue-400 to-blue-700 border-4 border-blue-300/50'}`}>
                        {isPlayer ? "🏆" : isAI ? "🤖" : "🤝"}
                    </div>
                    {isPlayer && <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-32 md:w-40 md:h-40 border-4 border-yellow-400/30 rounded-full animate-ping pointer-events-none"></div>}
                </div>

                {/* Text Content */}
                <div className="space-y-1 md:space-y-2">
                    <h2 className={`text-4xl md:text-5xl font-black italic tracking-tighter uppercase drop-shadow-lg
                        ${isPlayer ? 'text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500' :
                            isAI ? 'text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-red-700' :
                                'text-white'}`}>
                        {isPlayer ? "Victory!" : isAI ? "Defeat!" : "It's a Tie!"}
                    </h2>
                    <p className="text-base md:text-xl text-blue-100 font-bold opacity-80 uppercase tracking-widest">
                        {isPlayer ? "You outsmarted the AI" : isAI ? "The AI won this round" : "A perfectly matched duel"}
                    </p>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col gap-3 md:gap-4 pt-2 md:pt-4">
                    <button
                        onClick={onRestart}
                        className="w-full py-4 md:py-5 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-xl md:rounded-2xl text-lg md:text-xl font-black text-white shadow-xl hover:scale-105 active:scale-95 transition-all uppercase tracking-widest ring-4 ring-yellow-400/20"
                    >
                        Play Again
                    </button>
                    <button
                        onClick={onHome}
                        className="w-full py-4 md:py-5 bg-white/5 border border-white/20 rounded-xl md:rounded-2xl text-lg md:text-xl font-black text-white/60 hover:text-white hover:bg-white/10 transition-all uppercase tracking-widest"
                    >
                        Back to Menu
                    </button>
                </div>
            </div>
        </div>
    );
}

// --- GAME COMPONENT ---

function GameContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const paramDifficulty = searchParams.get('difficulty');
    const difficultyIdx = paramDifficulty !== null ? Number(paramDifficulty) : 1;
    const difficulties = ['Easy', 'Medium', 'Hard'];
    const { styles } = useTheme();

    const [board, setBoard] = useState(Array(ROWS).fill(null).map(() => Array(COLS).fill(0)));
    const [currentPlayer, setCurrentPlayer] = useState(PLAYER);
    const [winner, setWinner] = useState<number | 'draw' | null>(null);
    const [winningCells, setWinningCells] = useState<[number, number][]>([]);
    const [history, setHistory] = useState<number[][][]>([]);
    const [hintsUsed, setHintsUsed] = useState(0);
    const [hintColumn, setHintColumn] = useState<number | null>(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [hasUndone, setHasUndone] = useState(false);

    const checkWin = useCallback((currentBoard: number[][]) => {
        // Horizontal
        for (let r = 0; r < ROWS; r++) {
            for (let c = 0; c < COLS - 3; c++) {
                if (currentBoard[r][c] !== 0 && currentBoard[r][c] === currentBoard[r][c + 1] && currentBoard[r][c] === currentBoard[r][c + 2] && currentBoard[r][c] === currentBoard[r][c + 3]) {
                    return { winner: currentBoard[r][c], cells: [[r, c], [r, c + 1], [r, c + 2], [r, c + 3]] };
                }
            }
        }
        // Vertical
        for (let r = 0; r < ROWS - 3; r++) {
            for (let c = 0; c < COLS; c++) {
                if (currentBoard[r][c] !== 0 && currentBoard[r][c] === currentBoard[r + 1][c] && currentBoard[r][c] === currentBoard[r + 2][c] && currentBoard[r][c] === currentBoard[r + 3][c]) {
                    return { winner: currentBoard[r][c], cells: [[r, c], [r + 1, c], [r + 2, c], [r + 3, c]] };
                }
            }
        }
        // Diagonals...
        for (let r = 3; r < ROWS; r++) {
            for (let c = 0; c < COLS - 3; c++) {
                if (currentBoard[r][c] !== 0 && currentBoard[r][c] === currentBoard[r - 1][c + 1] && currentBoard[r][c] === currentBoard[r - 2][c + 2] && currentBoard[r][c] === currentBoard[r - 3][c + 3]) {
                    return { winner: currentBoard[r][c], cells: [[r, c], [r - 1, c + 1], [r - 2, c + 2], [r - 3, c + 3]] };
                }
            }
        }
        for (let r = 0; r < ROWS - 3; r++) {
            for (let c = 0; c < COLS - 3; c++) {
                if (currentBoard[r][c] !== 0 && currentBoard[r][c] === currentBoard[r + 1][c + 1] && currentBoard[r][c] === currentBoard[r + 2][c + 2] && currentBoard[r][c] === currentBoard[r + 3][c + 3]) {
                    return { winner: currentBoard[r][c], cells: [[r, c], [r + 1, c + 1], [r + 2, c + 2], [r + 3, c + 3]] };
                }
            }
        }
        if (currentBoard[0].every(cell => cell !== 0)) return { winner: 'draw', cells: [] };
        return null;
    }, []);

    const dropPiece = (currentBoard: number[][], col: number, player: number) => {
        const newBoard = currentBoard.map(row => [...row]);
        for (let r = ROWS - 1; r >= 0; r--) {
            if (newBoard[r][col] === 0) {
                newBoard[r][col] = player;
                return newBoard;
            }
        }
        return null;
    };

    const handleCellClick = (col: number) => {
        if (winner || isProcessing || currentPlayer !== PLAYER) return;
        const nextBoard = dropPiece(board, col, PLAYER);
        if (!nextBoard) return;

        setHistory([...history, board.map(row => [...row])]);
        setBoard(nextBoard);
        setHintColumn(null);

        const winResult = checkWin(nextBoard);
        if (winResult) {
            setWinner(winResult.winner as any);
            setWinningCells(winResult.cells as any);
        } else {
            setCurrentPlayer(AI);
            setIsProcessing(true);
        }
    };

    useEffect(() => {
        if (currentPlayer === AI && !winner && isProcessing) {
            const timer = setTimeout(() => {
                const depth = difficultyIdx === 0 ? 1 : difficultyIdx === 1 ? 3 : 5;
                const [bestCol] = minimax(board, depth, -Infinity, Infinity, true);

                const nextBoard = dropPiece(board, bestCol!, AI);
                if (nextBoard) {
                    setBoard(nextBoard);
                    const winResult = checkWin(nextBoard);
                    if (winResult) {
                        setWinner(winResult.winner as any);
                        setWinningCells(winResult.cells as any);
                    } else {
                        setCurrentPlayer(PLAYER);
                    }
                }
                setIsProcessing(false);
            }, 600);
            return () => clearTimeout(timer);
        }
    }, [currentPlayer, board, winner, isProcessing, difficultyIdx, checkWin]);

    const handleUndo = () => {
        if (history.length === 0 || isProcessing || hasUndone || winner !== null) return;
        const lastState = history[history.length - 1];
        setBoard(lastState);
        setHistory([]);
        setHasUndone(true);
        setWinner(null);
        setWinningCells([]);
        setCurrentPlayer(PLAYER);
        setHintColumn(null);
    };

    const handleHint = () => {
        if (hintsUsed >= 2 || winner || isProcessing || currentPlayer !== PLAYER) return;

        // Perfect move calculation (Minimax but for player)
        // We negate the minimax for the player to find their optimal move at depth 5
        const [bestCol] = minimax(board, 5, -Infinity, Infinity, false);

        setHintColumn(bestCol);
        setHintsUsed(hintsUsed + 1);
    };

    const resetGame = () => {
        setBoard(Array(ROWS).fill(null).map(() => Array(COLS).fill(0)));
        setCurrentPlayer(PLAYER);
        setWinner(null);
        setWinningCells([]);
        setHistory([]);
        setHintsUsed(0);
        setHintColumn(null);
        setHasUndone(false);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden flex flex-col pt-20">
            <div className="absolute top-20 left-10 w-72 h-72 bg-yellow-400 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob"></div>
            <div className="absolute top-40 right-10 w-72 h-72 bg-red-400 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob animation-delay-2000"></div>

            <Navbar />

            <main className="container mx-auto px-4 py-8 flex-grow flex flex-col items-center">
                {/* Top Info Bar */}
                <div className="w-full max-w-4xl flex flex-col md:flex-row justify-between items-center gap-4 mb-6 md:mb-8 bg-white/10 backdrop-blur-md p-4 md:p-6 rounded-2xl md:rounded-3xl border border-white/20 shadow-xl mx-2">
                    <div className="flex items-center gap-4 w-full md:w-auto">
                        <button onClick={() => router.push('/')} className="p-2 hover:bg-white/10 rounded-full transition-colors text-white">
                            <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                        </button>
                        <div className="text-white">
                            <p className="text-[10px] md:text-sm opacity-60 uppercase tracking-widest font-bold">Difficulty</p>
                            <p className="text-lg md:text-xl font-black text-yellow-400">{difficulties[difficultyIdx]}</p>
                        </div>
                    </div>

                    <div className="text-center order-first md:order-none">
                        <p className="text-[10px] md:text-sm opacity-60 uppercase tracking-widest font-bold text-white">Current Turn</p>
                        <div className="flex items-center gap-3 justify-center">
                            <div className={`w-3 h-3 md:w-4 md:h-4 rounded-full ${currentPlayer === PLAYER ? styles.playerIndicator + ' animate-pulse' : styles.aiIndicator + ' animate-pulse'}`}></div>
                            <p className="text-xl md:text-2xl font-black text-white">{currentPlayer === PLAYER ? "YOUR TURN" : "AI THINKING..."}</p>
                        </div>
                    </div>

                    <div className="hidden md:flex flex-col items-end gap-1">
                        <p className="text-sm opacity-60 uppercase tracking-widest font-bold text-white">Connect 4</p>
                        <p className="text-xl font-black text-white">Classic Mode</p>
                    </div>
                </div>

                {/* The Game Board */}
                <div className={`relative group p-2 md:p-4 rounded-[1.5rem] md:rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.5)] border-[6px] md:border-[12px] backdrop-blur-sm mx-2 transition-all duration-500 ${styles.board}`}>
                    <div className={`grid grid-cols-7 gap-1 md:gap-4 p-1 md:p-4 rounded-[1rem] md:rounded-3xl border-2 md:border-4 shadow-inner transition-all duration-500 ${styles.boardInner}`}>
                        {board.map((row, rIdx) => (
                            row.map((cell, cIdx) => {
                                const isWinningCell = winningCells.some(([wr, wc]) => wr === rIdx && wc === cIdx);
                                const isHintCell = hintColumn === cIdx && cell === 0 && (rIdx === ROWS - 1 || board[rIdx + 1][cIdx] !== 0);

                                return (
                                    <div
                                        key={`${rIdx}-${cIdx}`}
                                        onClick={() => handleCellClick(cIdx)}
                                        className={`relative w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16 rounded-full bg-blue-900/50 shadow-[inset_0_4px_8px_rgba(0,0,0,0.4)] flex items-center justify-center overflow-hidden cursor-pointer hover:bg-white/10 transition-all ${isHintCell ? 'ring-2 md:ring-4 ring-yellow-400/50 animate-pulse bg-yellow-400/20' : ''}`}
                                    >
                                        <div className={`w-[85%] h-[85%] rounded-full transition-all duration-500 shadow-md transform ${cell === PLAYER ? styles.player : cell === AI ? styles.ai : 'bg-white/10 shadow-[inset_0_2px_4px_rgba(0,0,0,0.1)]'} ${isWinningCell ? 'scale-110 ring-2 md:ring-4 ring-white shadow-2xl z-10' : ''}`}>
                                            {cell !== 0 && <div className="absolute top-[15%] left-[15%] w-[30%] h-[30%] bg-white/40 rounded-full filter blur-[1px]"></div>}
                                        </div>
                                    </div>
                                );
                            })
                        ))}
                    </div>
                </div>

                {/* Action Controls */}
                <div className="mt-8 md:mt-12 w-full max-w-2xl grid grid-cols-2 gap-4 md:gap-6 px-4">
                    <button onClick={handleHint} disabled={hintsUsed >= 2 || !!winner || currentPlayer !== PLAYER || isProcessing} className={`flex flex-col items-center justify-center p-4 md:p-6 rounded-2xl md:rounded-3xl border-2 transition-all duration-300 shadow-xl ${hintsUsed < 2 && !winner && !isProcessing && currentPlayer === PLAYER ? 'bg-white/10 border-white/20 hover:bg-white/20 hover:border-yellow-400/50 group active:scale-95' : 'bg-black/20 border-white/5 opacity-50 cursor-not-allowed'}`}>
                        <div className="flex items-center gap-2 md:gap-3 mb-1 md:mb-2 text-center flex-col sm:flex-row"><span className="text-xl md:text-3xl group-hover:rotate-12 transition-transform">💡</span><span className="text-sm md:text-xl font-bold text-white uppercase tracking-wider">Hint</span></div>
                        <div className="flex gap-1 md:gap-2">{[1, 2].map(i => <div key={i} className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-colors duration-500 ${i > hintsUsed ? 'bg-yellow-400' : 'bg-white/10'}`}></div>)}</div>
                    </button>

                    <button onClick={handleUndo} disabled={history.length === 0 || isProcessing || !!winner || hasUndone} className={`flex flex-col items-center justify-center p-4 md:p-6 rounded-2xl md:rounded-3xl border-2 transition-all duration-300 shadow-xl ${history.length > 0 && !isProcessing && !winner && !hasUndone ? 'bg-white/10 border-white/20 hover:bg-white/20 hover:border-blue-400/50 group active:scale-95' : 'bg-black/20 border-white/5 opacity-50 cursor-not-allowed'}`}>
                        <div className="flex items-center gap-2 md:gap-3 mb-1 md:mb-2 text-center flex-col sm:flex-row"><span className="text-xl md:text-3xl group-hover:-rotate-45 transition-transform">↩️</span><span className="text-sm md:text-xl font-bold text-white uppercase tracking-wider">Undo</span></div>
                        <p className="text-[10px] text-blue-200/50 font-bold tracking-widest uppercase hidden sm:block">History</p>
                    </button>
                </div>
            </main>
            <Footer />

            {/* Game Over Modal Overlay */}
            {winner && (
                <GameOverModal
                    winner={winner}
                    onRestart={resetGame}
                    onHome={() => router.push('/')}
                />
            )}
        </div>
    );
}

export default function GamePage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-purple-900 flex items-center justify-center text-white">Loading Game...</div>}>
            <GameContent />
        </Suspense>
    );
}

