'use client';

import Navbar from '../src/components/Navbar';
import Footer from '../src/components/Footer';

export default function HowToPlay() {
    const rules = [
        {
            step: "01",
            title: "The Objective",
            description: "Be the first player to connect four of your colored discs in a row—horizontally, vertically, or diagonally. Speed and strategy are key!",
            icon: "🎯",
            color: "from-yellow-400 to-orange-500"
        },
        {
            step: "02",
            title: "Gameplay",
            description: "Players take turns dropping one disc into any of the seven columns. Gravity takes over, and the disc falls to the lowest available space.",
            icon: "🎮",
            color: "from-blue-400 to-cyan-500"
        },
        {
            step: "03",
            title: "How to Win",
            description: "Watch your opponent closely! Block their paths while building your own. Four connected discs of your color triggers an instant victory.",
            icon: "🏆",
            color: "from-green-400 to-emerald-500"
        },
        {
            step: "04",
            title: "AI Difficulty",
            description: "Test your skills against our advanced AI. 'Easy' is for practice, while 'Hard' uses deep minimax logic to challenge even masters.",
            icon: "⚙️",
            color: "from-purple-400 to-pink-500"
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden flex flex-col pt-20">
            {/* Animated background circles */}
            <div className="absolute top-20 left-10 w-72 h-72 bg-yellow-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
            <div className="absolute top-40 right-10 w-72 h-72 bg-red-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
            <div className="absolute -bottom-8 left-20 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>

            <Navbar />

            <main className="container mx-auto px-4 py-10 md:py-20 flex-grow z-10">
                <div className="max-w-6xl mx-auto">
                    {/* Hero Section */}
                    <div className="text-center space-y-4 md:space-y-6 mb-16 md:mb-24">
                        <div className="inline-block px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-blue-400 text-[10px] md:text-sm font-bold tracking-[0.2em] uppercase mb-4 animate-fade-in">
                            Game Manual
                        </div>
                        <h1 className="text-4xl sm:text-6xl md:text-8xl font-black text-white tracking-tighter drop-shadow-[0_0_30px_rgba(255,255,255,0.2)]">
                            HOW TO <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500">PLAY</span>
                        </h1>
                        <p className="text-base md:text-xl text-blue-100/60 max-w-2xl mx-auto leading-relaxed px-4">
                            Master the classic game of strategy. Whether you're a beginner or a grandmaster,
                            here's everything you need to know to dominate the board.
                        </p>
                    </div>

                    {/* Interactive Rule Cards */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 mb-16 md:mb-24 px-2">
                        {rules.map((rule, index) => (
                            <div
                                key={index}
                                className="group relative bg-white/5 backdrop-blur-2xl rounded-[1.5rem] md:rounded-[2.5rem] p-6 md:p-10 border border-white/10 hover:border-white/20 transition-all duration-500 hover:translate-y-[-10px] shadow-2xl overflow-hidden"
                            >
                                {/* Background Accent */}
                                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${rule.color} opacity-5 blur-3xl group-hover:opacity-20 transition-opacity`}></div>

                                <div className="relative z-10 flex flex-col sm:flex-row gap-6 md:gap-8 items-center sm:items-start text-center sm:text-left">
                                    <div className={`flex-shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-2xl md:rounded-3xl bg-gradient-to-br ${rule.color} flex items-center justify-center text-3xl md:text-4xl shadow-lg transform group-hover:rotate-12 transition-transform duration-500 shadow-inner`}>
                                        {rule.icon}
                                    </div>

                                    <div className="space-y-3 md:space-y-4">
                                        <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
                                            <span className="text-[10px] md:text-sm font-black text-white/20 tracking-widest">{rule.step}</span>
                                            <h3 className="text-2xl md:text-3xl font-bold text-white tracking-tight group-hover:text-yellow-400 transition-colors">
                                                {rule.title}
                                            </h3>
                                        </div>
                                        <p className="text-blue-100/60 leading-relaxed text-sm md:text-lg">
                                            {rule.description}
                                        </p>
                                    </div>
                                </div>

                                {/* Bottom Glow Line */}
                                <div className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r ${rule.color} w-0 group-hover:w-full transition-all duration-700`}></div>
                            </div>
                        ))}
                    </div>

                    {/* Visual Tip Section */}
                    <div className="bg-gradient-to-br from-blue-600/20 to-purple-600/20 backdrop-blur-xl rounded-[1.5rem] md:rounded-[3rem] p-8 md:p-12 border border-white/10 shadow-3xl text-center mb-16 md:mb-24 mx-2">
                        <h2 className="text-2xl md:text-4xl font-black text-white mb-4 md:mb-6">PRO STRATEGY TIP 💡</h2>
                        <p className="text-base md:text-xl text-blue-100/80 max-w-3xl mx-auto leading-relaxed italic">
                            "Control the center! Occupying the middle column gives you the most opportunities to connect four
                            in any direction. Always watch for the AI's diagonal threats—they are the easiest to miss!"
                        </p>
                    </div>

                    {/* Final CTA */}
                    <div className="text-center pb-20 px-4">
                        <a
                            href="/"
                            className="group relative inline-flex items-center gap-3 md:gap-4 px-8 md:px-12 py-4 md:py-6 text-xl md:text-2xl font-bold text-white bg-white/5 rounded-full border border-white/20 hover:border-yellow-400/50 transition-all duration-500 hover:scale-105 active:scale-95 shadow-2xl overflow-hidden"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/10 via-red-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            <span>READY TO START?</span>
                            <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-yellow-400 flex items-center justify-center text-black group-hover:translate-x-2 transition-transform">
                                <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
                                </svg>
                            </div>
                        </a>
                    </div>

                </div>
            </main>

            <Footer />
        </div>
    );
}
