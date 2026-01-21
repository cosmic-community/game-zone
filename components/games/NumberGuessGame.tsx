'use client';

import { useState } from 'react';

export default function NumberGuessGame() {
  const [target, setTarget] = useState(() => Math.floor(Math.random() * 100) + 1);
  const [guess, setGuess] = useState('');
  const [message, setMessage] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [history, setHistory] = useState<{ guess: number; hint: string }[]>([]);
  const [gameWon, setGameWon] = useState(false);

  const handleGuess = () => {
    const num = parseInt(guess);
    if (isNaN(num) || num < 1 || num > 100) {
      setMessage('Please enter a number between 1 and 100');
      return;
    }

    setAttempts((prev) => prev + 1);
    
    let hint = '';
    if (num === target) {
      setMessage(`🎉 Correct! The number was ${target}!`);
      hint = '✅ Correct!';
      setGameWon(true);
    } else if (num < target) {
      setMessage('📈 Too low! Try a higher number.');
      hint = '📈 Too low';
    } else {
      setMessage('📉 Too high! Try a lower number.');
      hint = '📉 Too high';
    }

    setHistory((prev) => [...prev, { guess: num, hint }]);
    setGuess('');
  };

  const resetGame = () => {
    setTarget(Math.floor(Math.random() * 100) + 1);
    setGuess('');
    setMessage('');
    setAttempts(0);
    setHistory([]);
    setGameWon(false);
  };

  return (
    <div className="flex flex-col items-center max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Guess the Number (1-100)</h2>
      
      <div className="text-muted mb-6">Attempts: {attempts}</div>

      {!gameWon ? (
        <div className="w-full space-y-4">
          <input
            type="number"
            value={guess}
            onChange={(e) => setGuess(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleGuess()}
            className="w-full px-4 py-3 bg-surface-light border border-white/10 rounded-lg text-center text-2xl focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Enter your guess"
            min={1}
            max={100}
          />
          <button onClick={handleGuess} className="btn-primary w-full">
            Guess
          </button>
        </div>
      ) : (
        <button onClick={resetGame} className="btn-primary">
          Play Again
        </button>
      )}

      {message && (
        <p className={`mt-4 text-lg font-semibold ${gameWon ? 'text-green-400' : 'text-accent'}`}>
          {message}
        </p>
      )}

      {history.length > 0 && (
        <div className="mt-6 w-full">
          <h3 className="text-sm text-muted mb-2">Guess History:</h3>
          <div className="flex flex-wrap gap-2">
            {history.map((h, i) => (
              <div 
                key={i} 
                className={`px-3 py-1 rounded-full text-sm ${
                  h.hint.includes('Correct') 
                    ? 'bg-green-500/20 text-green-400' 
                    : h.hint.includes('low') 
                      ? 'bg-blue-500/20 text-blue-400' 
                      : 'bg-red-500/20 text-red-400'
                }`}
              >
                {h.guess}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}