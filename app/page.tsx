'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from './src/components/Navbar';
import DifficultySlider from './src/components/DifficultySlider';
import Footer from './src/components/Footer';

export default function Home() {
  const [difficulty, setDifficulty] = useState(1);
  const router = useRouter();

  const handlePlay = () => {
    router.push(`/game?difficulty=${difficulty}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden pt-20">
      {/* Animated background circles */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-yellow-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
      <div className="absolute top-40 right-10 w-72 h-72 bg-red-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-20 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>

      <Navbar />

      <main className="container mx-auto px-4 pt-10 md:pt-20 pb-32 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8 md:space-y-12">
          {/* Hero Section */}
          <div className="space-y-4">
            {/* Logo - Connect 4 Grid */}
            <div className="flex justify-center mb-6">
              <div className="grid grid-cols-4 gap-1.5 md:gap-2 p-3 md:p-4 bg-blue-600 rounded-2xl shadow-2xl border-4 border-blue-800 transform transition-all duration-500 hover:scale-110 hover:rotate-3 hover:shadow-[0_0_50px_rgba(59,130,246,0.5)] cursor-pointer group">
                {[...Array(16)].map((_, i) => (
                  <div
                    key={i}
                    className={`w-8 h-8 md:w-12 md:h-12 rounded-full shadow-inner transition-transform duration-500 group-hover:scale-90 ${i === 0 || i === 5 || i === 10 || i === 15
                      ? 'bg-yellow-400 shadow-yellow-600'
                      : i === 1 || i === 6 || i === 11 || i === 12
                        ? 'bg-red-500 shadow-red-700'
                        : 'bg-white bg-opacity-30'
                      }`}
                  ></div>
                ))}
              </div>
            </div>

            <h1 className="text-5xl sm:text-7xl md:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 drop-shadow-2xl animate-gradient tracking-tighter">
              4 IN A ROW
            </h1>
            <p className="text-lg md:text-2xl text-blue-100 font-medium opacity-80 max-w-2xl mx-auto leading-relaxed px-4">
              The ultimate battle of strategy. Play against our advanced AI and prove your skills in this classic connection game.
            </p>
          </div>

          {/* Play Button */}
          <div className="pt-8">
            <button
              onClick={handlePlay}
              className="group relative px-12 py-6 text-3xl md:text-4xl font-bold text-white bg-gradient-to-r from-green-400 to-blue-500 rounded-full shadow-2xl transform transition-all duration-300 hover:scale-110 hover:rotate-2 active:scale-95 overflow-hidden"
            >
              <span className="relative z-10 flex items-center justify-center gap-3">
                <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                </svg>
                PLAY NOW
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-green-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          </div>

          {/* Difficulty Slider */}
          <div className="pt-12">
            <DifficultySlider
              difficulty={difficulty}
              setDifficulty={setDifficulty}
            />
          </div>

          {/* Animated Game pieces decoration */}
          <div className="hidden md:flex justify-center gap-4 pt-8">
            {[...Array(7)].map((_, i) => (
              <div
                key={i}
                className={`w-12 h-12 rounded-full ${i % 2 === 0 ? 'bg-yellow-400 shadow-lg shadow-yellow-600' : 'bg-red-500 shadow-lg shadow-red-700'
                  } animate-bounce border-2 border-white border-opacity-50`}
                style={{ animationDelay: `${i * 0.1}s` }}
              ></div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div >
  );
}