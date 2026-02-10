# 🎮 Connect 4 Classic | Ultimate AI Edition

![Connect 4 Banner](https://img.shields.io/badge/Connect--4-Ultimate--AI-blueviolet?style=for-the-badge&logo=react)
![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)
![Tailwind CSS](https://img.shields.io/badge/Tailwind--CSS-4.0-38B2AC?style=for-the-badge&logo=tailwind-css)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript)

A premium, fully responsive, and immersive Connect 4 experience built with **Next.js**, **Tailwind CSS**, and **TypeScript**. Challenge yourself against an advanced AI or master the game with built-in strategy tools.

---

## ✨ Features

### 🧠 Advanced AI Opponent
*   **Minimax Algorithm**: Play against an AI that utilizes the Minimax algorithm with Alpha-Beta pruning to think several moves ahead.
*   **Adjustable Difficulty**:
    *   **Easy**: Depth 3 - Great for beginners.
    *   **Medium**: Depth 5 - A solid challenge for regular players.
    *   **Hard**: Depth 7 - Uses deep logic to challenge even masters.
*   **Perfect Hint System**: Stuck? Use the AI-powered hint system (limited uses) to suggest the mathematically optimal move.

### 🎨 Premium UI & Customization
*   **Modern Glassmorphism**: A sleek, translucent UI with vibrant gradients, blurred backgrounds, and high-end aesthetics.
*   **Dynamic Skins (Themes)**: Switch between **Classic**, **Cyberpunk (Neon)**, and **Royal (Gold/Silk)** styles in real-time.
*   **Fully Responsive**: Optimized for everything from small mobile screens to ultra-wide monitors.
*   **Smooth Animations**: Experience fluid piece-dropping animations, 3D hover effects, and victory celebrations.

### 🔊 Immersive Experience
*   **Tactile Feedback**: Satisfying sound effects when pieces land and UI interactions.
*   **Visual Juice**: Animated golden auras for winners and victory confetti.
*   **Background Music**: Ambient sounds to keep you focused, with a dedicated toggle in the Navbar.

### 🛠️ Quality of Life
*   **Undo Move**: Quickly backtrack if you make a mistake.
*   **Visual Game History**: State tracking allows for a seamless experience.
*   **Interactive Tutorial**: A dedicated "How to Play" section to learn the ropes and pro strategies.

---

## 🚀 Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **State Management**: React Context (Themes & Music)
- **Animations**: CSS Keyframes & Tailwind Transitions

---

## 📂 Project Structure

```bash
├── app/
│   ├── game/               # Main Game Page & Logic
│   │   └── page.tsx        # Minimax implementation & Game UI
│   ├── hooks/              # Custom hooks for game state
│   ├── how-to-play/        # Rulebook & Tutorial Page
│   ├── src/
│   │   ├── components/     # UI Components (Navbar, Footer, DifficultySlider, etc.)
│   │   └── context/        # ThemeContext & MusicContext
│   ├── globals.css         # Modern design system & custom animations
│   ├── layout.tsx          # Root Layout with Context Providers
│   └── page.tsx            # Immersive Landing Page
├── public/
│   ├── sounds/             # Game SFX & Background Music
│   └── favicon.ico         # Custom game favicon
└── tsconfig.json           # Type safety configuration
```

---

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

---

## 📖 How to Play

### The Objective
Be the first player to connect four of your colored discs in a row—**horizontally, vertically, or diagonally**.

### Gameplay
1. Players take turns dropping one disc into any of the seven columns.
2. Gravity takes over, and the disc falls to the lowest available space.
3. Use the **Hint** button if you're stuck (uses the AI's logic).
4. Use **Undo** to revert your last move.

### Pro Tip 💡
**Control the center!** Occupying the middle column gives you the most opportunities to connect four in any direction. Always watch for the AI's diagonal threats—they are the easiest to miss!

---

## 🤝 Contributing

Contributions are welcome! Whether it's:
- Optimizing the AI search depth.
- Adding new visual themes.
- Improving sound design.

Feel free to fork this project and submit a Pull Request.

---

*Built with ❤️ for strategy game enthusiasts.*
