'use client';

import { useState } from 'react';
import { Game } from '@/types';
import SnakeGame from '@/components/games/SnakeGame';
import MemoryGame from '@/components/games/MemoryGame';
import WhackAMoleGame from '@/components/games/WhackAMoleGame';
import NumberGuessGame from '@/components/games/NumberGuessGame';
import ColorQuizGame from '@/components/games/ColorQuizGame';
import TicTacToeGame from '@/components/games/TicTacToeGame';

interface GamePlayerProps {
  game: Game;
}

export default function GamePlayer({ game }: GamePlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  const renderGame = () => {
    switch (game.slug) {
      case 'snake':
        return <SnakeGame />;
      case 'memory-match':
        return <MemoryGame />;
      case 'whack-a-mole':
        return <WhackAMoleGame />;
      case 'number-guess':
        return <NumberGuessGame />;
      case 'color-quiz':
        return <ColorQuizGame />;
      case 'tic-tac-toe':
        return <TicTacToeGame />;
      default:
        return (
          <div className="text-center py-20">
            <p className="text-2xl mb-4">🎮</p>
            <p className="text-muted">Game coming soon!</p>
          </div>
        );
    }
  };

  if (!isPlaying) {
    return (
      <div className="bg-surface rounded-2xl p-12 text-center">
        <div className="text-6xl mb-6">🎮</div>
        <h2 className="text-2xl font-bold font-gaming mb-4">
          Ready to play {game.metadata.title}?
        </h2>
        <p className="text-muted mb-8 max-w-md mx-auto">
          {game.metadata.description}
        </p>
        <button 
          onClick={() => setIsPlaying(true)}
          className="btn-primary text-lg"
        >
          Start Game
        </button>
      </div>
    );
  }

  return (
    <div className="bg-surface rounded-2xl overflow-hidden">
      <div className="bg-surface-light px-6 py-4 flex items-center justify-between border-b border-white/10">
        <h2 className="font-bold font-gaming">{game.metadata.title}</h2>
        <button 
          onClick={() => setIsPlaying(false)}
          className="text-muted hover:text-white transition-colors"
        >
          ✕ Close
        </button>
      </div>
      <div className="p-6">
        {renderGame()}
      </div>
    </div>
  );
}