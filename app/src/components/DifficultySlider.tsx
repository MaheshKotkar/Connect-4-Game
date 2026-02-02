'use client';

interface DifficultySliderProps {
  difficulty: number;
  setDifficulty: (value: number) => void;
}

export default function DifficultySlider({ difficulty, setDifficulty }: DifficultySliderProps) {
  const difficulties = ['Easy', 'Medium', 'Hard'];
  const colors = ['text-green-400', 'text-yellow-400', 'text-red-400'];
  const bgColors = ['from-green-400', 'from-yellow-400', 'from-red-400'];
  const emojis = ['😊', '😐', '😈'];
  const descriptions = [
    'Perfect for beginners! AI thinks slowly 🎯',
    'A balanced challenge! AI is smart ⚡',
    'Only for champions! AI is ruthless 🏆'
  ];

  return (
    <div className="relative bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-xl rounded-[2rem] md:rounded-3xl p-6 md:p-10 border-2 border-white/30 shadow-2xl max-w-2xl mx-auto group hover:shadow-purple-500/50 transition-all duration-500">
      {/* Animated corner accents */}
      <div className="absolute top-0 left-0 w-20 h-20 border-t-4 border-l-4 border-yellow-400 rounded-tl-3xl opacity-50"></div>
      <div className="absolute bottom-0 right-0 w-20 h-20 border-b-4 border-r-4 border-red-400 rounded-br-3xl opacity-50"></div>

      <h3 className="text-3xl md:text-4xl font-black text-white mb-8 text-center tracking-wide">
        ⚙️ SET DIFFICULTY
      </h3>

      {/* Emoji Display with Animation */}
      <div className="flex justify-center mb-8">
        <div className="relative">
          <div className={`text-8xl md:text-9xl animate-bounce transition-all duration-500 drop-shadow-2xl`}>
            {emojis[difficulty]}
          </div>
          {/* Glow effect behind emoji */}
          <div className={`absolute inset-0 bg-gradient-to-r ${bgColors[difficulty]} to-transparent blur-3xl opacity-50 animate-pulse`}></div>
        </div>
      </div>

      {/* Slider Container */}
      <div className="relative mb-12 px-4 w-full max-w-xl mx-auto">
        <div className="relative h-6 bg-white/10 rounded-full p-1 shadow-inner backdrop-blur-sm border border-white/5">
          <input
            type="range"
            min="0"
            max="2"
            step="1"
            value={difficulty}
            onChange={(e) => setDifficulty(Number(e.target.value))}
            className="w-full h-full appearance-none cursor-pointer slider-custom relative z-10"
            style={{
              background: difficulty === 0
                ? 'linear-gradient(to right, #4ade80 0%, #4ade80 100%)'
                : difficulty === 1
                  ? 'linear-gradient(to right, #4ade80 0%, #facc15 50%, #facc15 100%)'
                  : 'linear-gradient(to right, #4ade80 0%, #facc15 50%, #ef4444 100%)'
            }}
          />
          {/* Tick Markers */}
          <div className="absolute top-0 left-0 w-full h-full flex justify-between items-center px-4 pointer-events-none">
            {[0, 1, 2].map((index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${difficulty >= index
                  ? 'bg-white shadow-[0_0_10px_rgba(255,255,255,1)] scale-150'
                  : 'bg-white/20 scale-100'
                  }`}
              ></div>
            ))}
          </div>
        </div>
      </div>

      {/* Difficulty Label Buttons */}
      <div className="grid grid-cols-3 gap-2 md:gap-4 mb-8">
        {difficulties.map((diff, index) => (
          <button
            key={diff}
            onClick={() => setDifficulty(index)}
            className={`relative py-3 md:py-4 px-1 md:px-6 rounded-xl md:rounded-2xl font-black text-sm md:text-xl transition-all duration-300 border-2 flex items-center justify-center ${difficulty === index
              ? `${colors[index]} border-white bg-white/20 scale-105 shadow-xl`
              : 'text-white/60 border-white/20 bg-white/5 hover:bg-white/10 hover:scale-105'
              }`}
          >
            <span className="relative z-10">{diff}</span>
            {difficulty === index && (
              <div className={`absolute inset-0 bg-gradient-to-r ${bgColors[index]} to-transparent opacity-20 rounded-xl md:rounded-2xl animate-pulse`}></div>
            )}
          </button>
        ))}
      </div>

      {/* Current Selection Display */}
      <div className="text-center space-y-4 p-6 bg-gradient-to-r from-white/10 to-transparent rounded-2xl border border-white/20">
        <div className="flex items-center justify-center gap-3">
          <div className={`w-3 h-3 rounded-full ${difficulty === 0 ? 'bg-green-400' : difficulty === 1 ? 'bg-yellow-400' : 'bg-red-400'
            } animate-pulse`}></div>
          <div className={`text-4xl md:text-5xl font-black ${colors[difficulty]} tracking-wider`}>
            {difficulties[difficulty].toUpperCase()}
          </div>
          <div className={`w-3 h-3 rounded-full ${difficulty === 0 ? 'bg-green-400' : difficulty === 1 ? 'bg-yellow-400' : 'bg-red-400'
            } animate-pulse`}></div>
        </div>
        <p className="text-base md:text-lg text-blue-200 font-medium">
          {descriptions[difficulty]}
        </p>
      </div>
    </div >
  );
}