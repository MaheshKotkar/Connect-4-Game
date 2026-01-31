# 🎮 Connect 4 Classic | Ultimate AI Edition

A premium, fully responsive, and immersive Connect 4 experience built with **Next.js**, **Tailwind CSS**, and **TypeScript**. Challenge yourself against an advanced AI or master the game with built-in strategy tools.


## ✨ Features

### 🧠 Advanced AI Opponent
- **Minimax Algorithm**: Play against an AI that thinks several moves ahead.
- **Adjustable Difficulty**: Toggle between **Easy**, **Medium**, and **Hard** modes to match your skill level.
- **Perfect Hint System**: Stuck? Use the AI-powered hint system to suggest the mathematically optimal move.

### 🎨 Premium UI & Customization
- **Modern Glassmorphism**: A sleek, translucent UI with vibrant gradients and animated backgrounds.
- **Dynamic Skins (Themes)**: Switch between **Classic**, **Cyberpunk (Neon)**, and **Royal (Gold/Silk)** styles in real-time.
- **Fully Responsive**: Optimized for everything from mobile phones up to ultra-wide monitors.

### 🔊 Immersive Experience
- **Tactile Feedback**: Satisfying "clink" sound effects when pieces land.
- **Visual Juice**: Screen shake on impact, animated golden auras for winners, and victory confetti.
- **Background Music**: Ambient sounds to keep you focused (can be toggled in the Navbar).

### 🛠️ Quality of Life
- **Undo Move**: Made a mistake? Quickly backtrack with the Undo feature.
- **Visual Game History**: Strategic review enabled through state tracking.
- **Interactive Tutorial**: A dedicated "How to Play" section for newcomers.

## 🚀 Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Logic**: TypeScript
- **State Management**: React Context (Themes & Music)
- **Animations**: CSS Keyframes & Tailwind Transitions

## 📂 Project Structure

```bash
├── app/
│   ├── game/               # Core game board and logic
│   ├── how-to-play/        # Rulebook and tutorial
│   ├── src/
│   │   ├── components/     # Reusable UI (Navbar, Footer, etc.)
│   │   └── context/        # Global Theme & Music providers
│   ├── globals.css         # Custom animations and design system
│   └── page.tsx            # Landing page
├── public/
│   └── sounds/             # SFX and Background Music
└── components/             # Shadcn-inspired UI components
```

## 🛠️ Installation & Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/mahes/Connect-4-master.git
   cd Connect-4-master
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run the development server**:
   ```bash
   npm run dev
   ```

4. **Open in browser**:
   Navigate to `http://localhost:3000` to start playing!

## 🤝 Contributing

Feel free to fork this project and submit PRs. Whether it's adding a new theme or optimizing the AI search depth, all contributions are welcome!

---
*Built with ❤️ for strategy game enthusiasts.*
