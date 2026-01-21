'use client';

import { useState, useEffect, useCallback } from 'react';

const GRID_SIZE = 9;
const GAME_DURATION = 30;

export default function WhackAMoleGame() {
  const [moles, setMoles] = useState<boolean[]>(new Array(GRID_SIZE).fill(false));
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION);
  const [isPlaying, setIsPlaying] = useState(false);
  const [highScore, setHighScore] = useState(0);

  const showMole = useCallback(() => {
    if (!isPlaying) return;
    
    const newMoles = new Array(GRID_SIZE).fill(false);
    const randomIndex = Math.floor(Math.random() * GRID_SIZE);
    newMoles[randomIndex] = true;
    setMoles(newMoles);
  }, [isPlaying]);

  const whackMole = (index: number) => {
    if (!moles[index] || !isPlaying) return;
    
    setScore((prev) => prev + 1);
    const newMoles = [...moles];
    newMoles[index] = false;
    setMoles(newMoles);
  };

  const startGame = () => {
    setScore(0);
    setTimeLeft(GAME_DURATION);
    setIsPlaying(true);
    setMoles(new Array(GRID_SIZE).fill(false));
  };

  useEffect(() => {
    if (!isPlaying) return;

    const moleInterval = setInterval(() => {
      showMole();
    }, 800 - Math.min(score * 10, 400));

    return () => clearInterval(moleInterval);
  }, [isPlaying, showMole, score]);

  useEffect(() => {
    if (!isPlaying || timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setIsPlaying(false);
          if (score > highScore) {
            setHighScore(score);
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isPlaying, timeLeft, score, highScore]);

  return (
    <div className="flex flex-col items-center">
      <div className="flex gap-6 mb-6 text-lg">
        <span>Score: {score}</span>
        <span>Time: {timeLeft}s</span>
        <span>High Score: {highScore}</span>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        {moles.map((hasMole, index) => (
          <button
            key={index}
            onClick={() => whackMole(index)}
            className={`w-20 h-20 md:w-24 md:h-24 rounded-full transition-all duration-150 ${
              hasMole
                ? 'bg-amber-600 scale-110 shadow-lg shadow-amber-600/50'
                : 'bg-surface-light hover:bg-surface'
            }`}
            disabled={!isPlaying}
          >
            {hasMole ? '🐹' : '🕳️'}
          </button>
        ))}
      </div>

      {!isPlaying && timeLeft === 0 && (
        <div className="text-center mb-4">
          <p className="text-2xl font-bold mb-2">Game Over!</p>
          <p className="text-muted">Final Score: {score}</p>
        </div>
      )}

      <button 
        onClick={startGame} 
        className="btn-primary"
        disabled={isPlaying}
      >
        {isPlaying ? 'Game in Progress...' : timeLeft === GAME_DURATION ? 'Start Game' : 'Play Again'}
      </button>
    </div>
  );
}