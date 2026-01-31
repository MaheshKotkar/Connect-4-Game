import { useState } from 'react';
import { usePathname } from 'next/navigation';
import MusicToggleWrapper from './MusicToggleWrapper';
import { useTheme, ThemeType } from '../context/ThemeContext';

export default function Navbar() {
  const { currentTheme, setTheme } = useTheme();
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSkinsOpen, setIsSkinsOpen] = useState(false);

  const isGamePage = pathname === '/game';

  return (
    <nav className="bg-black bg-opacity-30 backdrop-blur-lg border-b border-white border-opacity-20 fixed top-0 left-0 w-full z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="flex gap-1">
              <div className="w-3 h-3 rounded-full bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-400 shadow-[0_0_10px_rgba(250,204,21,0.5)]"></div>
            </div>
            <a href="/" className="text-xl font-black text-white tracking-widest uppercase hover:text-yellow-400 transition-colors">
              4 IN A <span className="text-yellow-400">ROW</span>
            </a>
          </div>

          <div className="flex items-center gap-6">
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="/" className="text-sm font-bold text-white opacity-70 hover:opacity-100 transition-opacity uppercase tracking-widest">Home</a>
              <a href="/how-to-play" className="text-sm font-bold text-white opacity-70 hover:opacity-100 transition-opacity uppercase tracking-widest">How to Play</a>

              {/* Theme Selector Dropdown - Only on Game Page */}
              {isGamePage && (
                <div className="relative group">
                  <button className="flex items-center gap-2 text-sm font-bold text-white opacity-70 group-hover:opacity-100 transition-opacity uppercase tracking-widest">
                    <span>Skins</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                  </button>
                  <div className="absolute top-full right-0 mt-2 w-40 bg-black/80 backdrop-blur-xl border border-white/10 rounded-xl py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all transform origin-top translate-y-2 group-hover:translate-y-0 shadow-2xl">
                    {(['classic', 'cyberpunk', 'royal'] as ThemeType[]).map((theme) => (
                      <button
                        key={theme}
                        onClick={() => setTheme(theme)}
                        className={`w-full px-4 py-2 text-left text-xs font-bold uppercase tracking-widest hover:bg-white/10 transition-colors ${currentTheme === theme ? 'text-yellow-400' : 'text-white/60'}`}
                      >
                        {theme}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <a href="/game" className="px-6 py-2 bg-yellow-400 text-black text-sm font-black rounded-full hover:bg-yellow-300 transition-all hover:scale-105 uppercase tracking-widest">Play Now</a>
            </div>

            {/* Music Toggle - Always visible on desktop, moved next to menu on mobile */}
            <div className="ml-4 border-l border-white/10 pl-4 hidden md:block">
              <MusicToggleWrapper />
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center gap-4">
              <MusicToggleWrapper />
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 text-white hover:bg-white/10 rounded-lg transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {isMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden py-4 space-y-4 px-4 bg-black/20 backdrop-blur-xl border-t border-white/10 animate-slideDown">
          <a
            href="/"
            className="block text-white hover:text-yellow-400 transition-colors duration-200 font-semibold text-lg py-2"
          >
            Home
          </a>
          <a
            href="/how-to-play"
            className="block text-white hover:text-yellow-400 transition-colors duration-200 font-semibold text-lg py-2"
          >
            How to Play
          </a>

          {isGamePage && (
            <>
              <button
                onClick={() => setIsSkinsOpen(!isSkinsOpen)}
                className="w-full flex items-center justify-between text-white hover:text-yellow-400 transition-colors duration-200 font-semibold text-lg py-2"
              >
                <span>Skins</span>
                <span className="text-sm opacity-60 uppercase">{currentTheme}</span>
              </button>

              {isSkinsOpen && (
                <div className="pl-4 grid grid-cols-1 gap-2 border-l border-white/10 mt-2">
                  {(['classic', 'cyberpunk', 'royal'] as ThemeType[]).map((theme) => (
                    <button
                      key={theme}
                      onClick={() => { setTheme(theme); setIsMenuOpen(false); setIsSkinsOpen(false); }}
                      className={`text-left py-2 text-sm uppercase tracking-widest font-bold ${currentTheme === theme ? 'text-yellow-400' : 'text-white/40'}`}
                    >
                      {theme}
                    </button>
                  ))}
                </div>
              )}
            </>
          )}

          <a
            href="/game"
            className="block text-yellow-400 hover:text-yellow-300 transition-colors duration-200 font-black text-lg py-2 uppercase tracking-widest"
          >
            Play Now
          </a>
        </div>
      )}
    </nav>
  );
}