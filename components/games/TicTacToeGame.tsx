'use client';

import { useState } from 'react';

type Player = 'X' | 'O' | null;

const WINNING_COMBINATIONS = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
  [0, 4, 8], [2, 4, 6], // Diagonals
];

export default function TicTacToeGame() {
  const [board, setBoard] = useState<Player[]>(new Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState<'X' | 'O'>('X');
  const [winner, setWinner] = useState<Player>(null);
  const [isDraw, setIsDraw] = useState(false);
  const [scores, setScores] = useState({ X: 0, O: 0 });

  const checkWinner = (newBoard: Player[]): Player => {
    for (const combo of WINNING_COMBINATIONS) {
      const [a, b, c] = combo;
      if (a !== undefined && b !== undefined && c !== undefined) {
        if (newBoard[a] && newBoard[a] === newBoard[b] && newBoard[a] === newBoard[c]) {
          return newBoard[a];
        }
      }
    }
    return null;
  };

  const handleClick = (index: number) => {
    if (board[index] || winner || isDraw) return;

    const newBoard = [...board];
    newBoard[index] = currentPlayer;
    setBoard(newBoard);

    const gameWinner = checkWinner(newBoard);
    if (gameWinner) {
      setWinner(gameWinner);
      setScores((prev) => ({
        ...prev,
        [gameWinner]: prev[gameWinner] + 1,
      }));
    } else if (newBoard.every((cell) => cell !== null)) {
      setIsDraw(true);
    } else {
      setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
    }
  };

  const resetGame = () => {
    setBoard(new Array(9).fill(null));
    setCurrentPlayer('X');
    setWinner(null);
    setIsDraw(false);
  };

  const resetScores = () => {
    resetGame();
    setScores({ X: 0, O: 0 });
  };

  return (
    <div className="flex flex-col items-center">
      <div className="flex gap-8 mb-6">
        <div className={`text-center ${currentPlayer === 'X' && !winner && !isDraw ? 'text-primary' : ''}`}>
          <div className="text-3xl font-bold">X</div>
          <div className="text-muted">{scores.X} wins</div>
        </div>
        <div className={`text-center ${currentPlayer === 'O' && !winner && !isDraw ? 'text-accent' : ''}`}>
          <div className="text-3xl font-bold">O</div>
          <div className="text-muted">{scores.O} wins</div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 mb-6">
        {board.map((cell, index) => (
          <button
            key={index}
            onClick={() => handleClick(index)}
            className={`w-20 h-20 md:w-24 md:h-24 rounded-xl text-4xl md:text-5xl font-bold transition-all ${
              cell === 'X' 
                ? 'bg-primary/20 text-primary' 
                : cell === 'O' 
                  ? 'bg-accent/20 text-accent' 
                  : 'bg-surface-light hover:bg-surface'
            }`}
            disabled={!!cell || !!winner || isDraw}
          >
            {cell}
          </button>
        ))}
      </div>

      {winner && (
        <p className="text-2xl font-bold mb-4">
          <span className={winner === 'X' ? 'text-primary' : 'text-accent'}>
            {winner}
          </span>{' '}
          wins! 🎉
        </p>
      )}

      {isDraw && (
        <p className="text-2xl font-bold mb-4 text-muted">
          It&apos;s a draw! 🤝
        </p>
      )}

      {!winner && !isDraw && (
        <p className="text-lg mb-4">
          Current turn:{' '}
          <span className={currentPlayer === 'X' ? 'text-primary' : 'text-accent'}>
            {currentPlayer}
          </span>
        </p>
      )}

      <div className="flex gap-4">
        <button onClick={resetGame} className="btn-primary">
          New Game
        </button>
        <button onClick={resetScores} className="btn-secondary">
          Reset Scores
        </button>
      </div>
    </div>
  );
}