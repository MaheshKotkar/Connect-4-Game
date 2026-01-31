'use client';

interface MusicToggleProps {
  isPlaying: boolean;
  isMuted: boolean;
  onToggle: () => void;
}

export default function MusicToggle({ isPlaying, isMuted, onToggle }: MusicToggleProps) {
  return (
    <button
      onClick={onToggle}
      className="relative group p-2 hover:bg-white/10 rounded-xl transition-all duration-300"
      aria-label="Toggle background music"
    >
      <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${isMuted ? 'bg-red-500/20 text-red-400' : 'bg-yellow-400/20 text-yellow-400'
        }`}>
        {isMuted ? (
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM12.293 7.293a1 1 0 011.414 0L15 8.586l1.293-1.293a1 1 0 111.414 1.414L16.414 10l1.293 1.293a1 1 0 01-1.414 1.414L15 11.414l-1.293 1.293a1 1 0 01-1.414-1.414L13.586 10l-1.293-1.293a1 1 0 010-1.414z" />
          </svg>
        ) : (
          <div className="relative">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM14.657 2.929a1 1 0 011.414 0A9.972 9.972 0 0119 10a9.972 9.972 0 01-2.929 7.071 1 1 0 01-1.414-1.414A7.971 7.971 0 0017 10c0-2.21-.894-4.208-2.343-5.657a1 1 0 010-1.414zm-2.829 2.828a1 1 0 011.415 0A5.983 5.983 0 0115 10a5.984 5.984 0 01-1.757 4.243 1 1 0 01-1.415-1.415A3.984 3.984 0 0013 10a3.983 3.983 0 00-1.172-2.828 1 1 0 010-1.415z" />
            </svg>
            {isPlaying && (
              <div className="absolute -top-1 -right-2 flex gap-0.5">
                <div className="w-0.5 h-2 bg-yellow-400 animate-pulse"></div>
                <div className="w-0.5 h-3 bg-yellow-400 animate-pulse delay-75"></div>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="absolute top-full right-0 mt-2 px-3 py-1 bg-black/80 text-white text-[10px] font-bold rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap uppercase tracking-tighter">
        {isMuted ? 'Music Off' : 'Music On'}
      </div>
    </button>
  );
}