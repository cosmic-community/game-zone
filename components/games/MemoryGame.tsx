'use client';

import { useState, useEffect } from 'react';

const EMOJIS = ['🎮', '🎲', '🎯', '🎪', '🎨', '🎭', '🎬', '🎸'];

interface Card {
  id: number;
  emoji: string;
  isFlipped: boolean;
  isMatched: boolean;
}

export default function MemoryGame() {
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [matches, setMatches] = useState(0);
  const [isChecking, setIsChecking] = useState(false);

  const initializeGame = () => {
    const shuffledEmojis = [...EMOJIS, ...EMOJIS]
      .sort(() => Math.random() - 0.5)
      .map((emoji, index) => ({
        id: index,
        emoji,
        isFlipped: false,
        isMatched: false,
      }));
    setCards(shuffledEmojis);
    setFlippedCards([]);
    setMoves(0);
    setMatches(0);
  };

  useEffect(() => {
    initializeGame();
  }, []);

  const handleCardClick = (id: number) => {
    if (isChecking || flippedCards.length >= 2) return;
    
    const card = cards.find((c) => c.id === id);
    if (!card || card.isFlipped || card.isMatched) return;

    const newCards = cards.map((c) =>
      c.id === id ? { ...c, isFlipped: true } : c
    );
    setCards(newCards);

    const newFlipped = [...flippedCards, id];
    setFlippedCards(newFlipped);

    if (newFlipped.length === 2) {
      setMoves((prev) => prev + 1);
      setIsChecking(true);

      const [first, second] = newFlipped;
      const firstCard = newCards.find((c) => c.id === first);
      const secondCard = newCards.find((c) => c.id === second);

      if (firstCard && secondCard && firstCard.emoji === secondCard.emoji) {
        setCards((prev) =>
          prev.map((c) =>
            c.id === first || c.id === second ? { ...c, isMatched: true } : c
          )
        );
        setMatches((prev) => prev + 1);
        setFlippedCards([]);
        setIsChecking(false);
      } else {
        setTimeout(() => {
          setCards((prev) =>
            prev.map((c) =>
              c.id === first || c.id === second ? { ...c, isFlipped: false } : c
            )
          );
          setFlippedCards([]);
          setIsChecking(false);
        }, 1000);
      }
    }
  };

  const isWon = matches === EMOJIS.length;

  return (
    <div className="flex flex-col items-center">
      <div className="flex gap-6 mb-6 text-lg">
        <span>Moves: {moves}</span>
        <span>Matches: {matches}/{EMOJIS.length}</span>
      </div>

      <div className="grid grid-cols-4 gap-3 mb-6">
        {cards.map((card) => (
          <button
            key={card.id}
            onClick={() => handleCardClick(card.id)}
            className={`w-16 h-16 md:w-20 md:h-20 rounded-xl text-3xl md:text-4xl transition-all duration-300 transform ${
              card.isFlipped || card.isMatched
                ? 'bg-primary rotate-0'
                : 'bg-surface-light hover:bg-surface hover:scale-105 rotate-y-180'
            } ${card.isMatched ? 'bg-green-500' : ''}`}
            disabled={card.isMatched || isChecking}
          >
            {(card.isFlipped || card.isMatched) ? card.emoji : '?'}
          </button>
        ))}
      </div>

      {isWon && (
        <div className="text-center">
          <p className="text-2xl font-bold text-green-400 mb-4">
            🎉 Congratulations! You won in {moves} moves!
          </p>
          <button onClick={initializeGame} className="btn-primary">
            Play Again
          </button>
        </div>
      )}

      {!isWon && (
        <button onClick={initializeGame} className="btn-secondary">
          Reset Game
        </button>
      )}
    </div>
  );
}