'use client';

import { useState, useEffect, useCallback } from 'react';

const GRID_SIZE = 20;
const CELL_SIZE = 20;
const INITIAL_SPEED = 150;

type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';
type Position = { x: number; y: number };

export default function SnakeGame() {
  const [snake, setSnake] = useState<Position[]>([{ x: 10, y: 10 }]);
  const [food, setFood] = useState<Position>({ x: 15, y: 15 });
  const [direction, setDirection] = useState<Direction>('RIGHT');
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  const generateFood = useCallback((): Position => {
    return {
      x: Math.floor(Math.random() * GRID_SIZE),
      y: Math.floor(Math.random() * GRID_SIZE),
    };
  }, []);

  const resetGame = () => {
    setSnake([{ x: 10, y: 10 }]);
    setFood(generateFood());
    setDirection('RIGHT');
    setGameOver(false);
    setScore(0);
    setIsRunning(true);
  };

  const moveSnake = useCallback(() => {
    if (gameOver || !isRunning) return;

    setSnake((prevSnake) => {
      const head = prevSnake[0];
      if (!head) return prevSnake;
      
      const newHead = { ...head };

      switch (direction) {
        case 'UP':
          newHead.y -= 1;
          break;
        case 'DOWN':
          newHead.y += 1;
          break;
        case 'LEFT':
          newHead.x -= 1;
          break;
        case 'RIGHT':
          newHead.x += 1;
          break;
      }

      // Check wall collision
      if (newHead.x < 0 || newHead.x >= GRID_SIZE || newHead.y < 0 || newHead.y >= GRID_SIZE) {
        setGameOver(true);
        setIsRunning(false);
        return prevSnake;
      }

      // Check self collision
      if (prevSnake.some((segment) => segment.x === newHead.x && segment.y === newHead.y)) {
        setGameOver(true);
        setIsRunning(false);
        return prevSnake;
      }

      const newSnake = [newHead, ...prevSnake];

      // Check food collision
      if (newHead.x === food.x && newHead.y === food.y) {
        setScore((prev) => prev + 10);
        setFood(generateFood());
      } else {
        newSnake.pop();
      }

      return newSnake;
    });
  }, [direction, food, gameOver, isRunning, generateFood]);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowUp':
          if (direction !== 'DOWN') setDirection('UP');
          break;
        case 'ArrowDown':
          if (direction !== 'UP') setDirection('DOWN');
          break;
        case 'ArrowLeft':
          if (direction !== 'RIGHT') setDirection('LEFT');
          break;
        case 'ArrowRight':
          if (direction !== 'LEFT') setDirection('RIGHT');
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [direction]);

  useEffect(() => {
    if (!isRunning) return;
    const gameLoop = setInterval(moveSnake, INITIAL_SPEED);
    return () => clearInterval(gameLoop);
  }, [moveSnake, isRunning]);

  return (
    <div className="flex flex-col items-center">
      <div className="mb-4 text-xl font-bold">Score: {score}</div>
      
      <div 
        className="relative bg-surface-light rounded-lg border-2 border-primary/30"
        style={{ 
          width: GRID_SIZE * CELL_SIZE, 
          height: GRID_SIZE * CELL_SIZE 
        }}
      >
        {/* Snake */}
        {snake.map((segment, index) => (
          <div
            key={index}
            className={`absolute rounded-sm ${index === 0 ? 'bg-primary' : 'bg-primary/70'}`}
            style={{
              width: CELL_SIZE - 2,
              height: CELL_SIZE - 2,
              left: segment.x * CELL_SIZE + 1,
              top: segment.y * CELL_SIZE + 1,
            }}
          />
        ))}
        
        {/* Food */}
        <div
          className="absolute bg-accent rounded-full"
          style={{
            width: CELL_SIZE - 2,
            height: CELL_SIZE - 2,
            left: food.x * CELL_SIZE + 1,
            top: food.y * CELL_SIZE + 1,
          }}
        />

        {/* Game Over Overlay */}
        {gameOver && (
          <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center rounded-lg">
            <p className="text-2xl font-bold mb-2">Game Over!</p>
            <p className="text-muted mb-4">Final Score: {score}</p>
            <button onClick={resetGame} className="btn-primary">
              Play Again
            </button>
          </div>
        )}

        {/* Start Overlay */}
        {!isRunning && !gameOver && (
          <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center rounded-lg">
            <p className="text-xl mb-4">Use arrow keys to move</p>
            <button onClick={resetGame} className="btn-primary">
              Start Game
            </button>
          </div>
        )}
      </div>

      {/* Mobile Controls */}
      <div className="mt-6 grid grid-cols-3 gap-2 md:hidden">
        <div />
        <button 
          onClick={() => direction !== 'DOWN' && setDirection('UP')}
          className="btn-secondary p-4"
        >
          ↑
        </button>
        <div />
        <button 
          onClick={() => direction !== 'RIGHT' && setDirection('LEFT')}
          className="btn-secondary p-4"
        >
          ←
        </button>
        <button 
          onClick={() => direction !== 'UP' && setDirection('DOWN')}
          className="btn-secondary p-4"
        >
          ↓
        </button>
        <button 
          onClick={() => direction !== 'LEFT' && setDirection('RIGHT')}
          className="btn-secondary p-4"
        >
          →
        </button>
      </div>
    </div>
  );
}