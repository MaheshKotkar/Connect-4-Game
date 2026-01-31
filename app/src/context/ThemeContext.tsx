'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

export type ThemeType = 'classic' | 'cyberpunk' | 'royal';

interface ThemeStyles {
    board: string;
    boardInner: string;
    player: string;
    ai: string;
    playerIndicator: string;
    aiIndicator: string;
}

const themes: Record<ThemeType, ThemeStyles> = {
    classic: {
        board: 'bg-blue-700/80 border-blue-600/50',
        boardInner: 'bg-blue-600 border-blue-800',
        player: 'bg-gradient-to-br from-yellow-300 to-yellow-600',
        ai: 'bg-gradient-to-br from-red-400 to-red-700',
        playerIndicator: 'bg-yellow-400',
        aiIndicator: 'bg-red-500'
    },
    cyberpunk: {
        board: 'bg-slate-900/90 border-pink-500/30 shadow-[0_0_20px_rgba(236,72,153,0.3)]',
        boardInner: 'bg-slate-800 border-pink-500/50',
        player: 'bg-gradient-to-br from-pink-400 to-fuchsia-600 shadow-[0_0_15px_rgba(236,72,153,0.6)]',
        ai: 'bg-gradient-to-br from-cyan-400 to-blue-600 shadow-[0_0_15px_rgba(6,182,212,0.6)]',
        playerIndicator: 'bg-pink-500',
        aiIndicator: 'bg-cyan-500'
    },
    royal: {
        board: 'bg-indigo-950/90 border-yellow-600/30 shadow-[0_0_20px_rgba(202,138,4,0.2)]',
        boardInner: 'bg-indigo-900 border-yellow-700/50',
        player: 'bg-gradient-to-br from-yellow-200 via-yellow-400 to-yellow-700 shadow-[0_2px_10px_rgba(202,138,4,0.4)]',
        ai: 'bg-gradient-to-br from-slate-100 via-slate-300 to-slate-500 shadow-[0_2px_10px_rgba(148,163,184,0.4)]',
        playerIndicator: 'bg-yellow-400',
        aiIndicator: 'bg-slate-300'
    }
};

interface ThemeContextType {
    currentTheme: ThemeType;
    setTheme: (theme: ThemeType) => void;
    styles: ThemeStyles;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [currentTheme, setCurrentTheme] = useState<ThemeType>('classic');

    useEffect(() => {
        const savedTheme = localStorage.getItem('connect4-theme') as ThemeType;
        if (savedTheme && themes[savedTheme]) {
            setCurrentTheme(savedTheme);
        }
    }, []);

    const setTheme = (theme: ThemeType) => {
        setCurrentTheme(theme);
        localStorage.setItem('connect4-theme', theme);
    };

    return (
        <ThemeContext.Provider value={{ currentTheme, setTheme, styles: themes[currentTheme] }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};
