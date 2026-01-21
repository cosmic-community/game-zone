'use client';

import { useState, useEffect, useCallback } from 'react';

const COLORS = [
  { name: 'RED', code: '#ef4444' },
  { name: 'BLUE', code: '#3b82f6' },
  { name: 'GREEN', code: '#22c55e' },
  { name: 'YELLOW', code: '#eab308' },
  { name: 'PURPLE', code: '#a855f7' },
  { name: 'ORANGE', code: '#f97316' },
];

export default function ColorQuizGame() {
  const [word, setWord] = useState('');
  const [wordColor, setWordColor] = useState('');
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [gameOver, setGameOver] = useState(false);
  const [streak, setStreak] = useState(0);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);

  const generateQuestion = useCallback(() => {
    const wordIndex = Math.floor(Math.random() * COLORS.length);
    const colorIndex = Math.floor(Math.random() * COLORS.length);
    
    const wordColor = COLORS[wordIndex];
    const displayColor = COLORS[colorIndex];
    
    if (wordColor && displayColor) {
      setWord(wordColor.name);
      setWordColor(displayColor.code);
    }
    setFeedback(null);
  }, []);

  useEffect(() => {
    generateQuestion();
  }, [generateQuestion]);

  const handleAnswer = (colorName: string) => {
    if (gameOver) return;

    if (colorName === word) {
      setScore((prev) => prev + 10 + streak * 2);
      setStreak((prev) => prev + 1);
      setFeedback('correct');
    } else {
      setLives((prev) => prev - 1);
      setStreak(0);
      setFeedback('wrong');
      if (lives <= 1) {
        setGameOver(true);
        return;
      }
    }

    setTimeout(() => {
      generateQuestion();
    }, 500);
  };

  const resetGame = () => {
    setScore(0);
    setLives(3);
    setStreak(0);
    setGameOver(false);
    generateQuestion();
  };

  return (
    <div className="flex flex-col items-center">
      <div className="flex gap-6 mb-6 text-lg">
        <span>Score: {score}</span>
        <span>Lives: {'❤️'.repeat(lives)}{'🖤'.repeat(3 - lives)}</span>
        <span>Streak: {streak}🔥</span>
      </div>

      <div className="mb-8 text-center">
        <p className="text-sm text-muted mb-2">Click the color that matches the WORD:</p>
        <div 
          className={`text-6xl md:text-8xl font-bold font-gaming transition-all duration-200 ${
            feedback === 'correct' ? 'scale-110' : feedback === 'wrong' ? 'shake' : ''
          }`}
          style={{ color: wordColor }}
        >
          {word}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3 mb-6">
        {COLORS.map((color) => (
          <button
            key={color.name}
            onClick={() => handleAnswer(color.name)}
            className="w-24 h-16 md:w-28 md:h-20 rounded-xl font-bold text-white transition-all hover:scale-105 hover:shadow-lg disabled:opacity-50"
            style={{ backgroundColor: color.code }}
            disabled={gameOver}
          >
            {color.name}
          </button>
        ))}
      </div>

      {gameOver && (
        <div className="text-center">
          <p className="text-2xl font-bold mb-2">Game Over!</p>
          <p className="text-muted mb-4">Final Score: {score}</p>
          <button onClick={resetGame} className="btn-primary">
            Play Again
          </button>
        </div>
      )}

      <style jsx>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
        .shake {
          animation: shake 0.3s ease-in-out;
        }
      `}</style>
    </div>
  );
}