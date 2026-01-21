import Link from 'next/link';
import { Game } from '@/types';

interface GameCardProps {
  game: Game;
  featured?: boolean;
}

export default function GameCard({ game, featured = false }: GameCardProps) {
  const categoryColor = game.metadata.category?.metadata?.color || '#6366f1';

  return (
    <Link href={`/games/${game.slug}`} className="block">
      <article className={`game-card h-full ${featured ? 'ring-2 ring-accent' : ''}`}>
        {/* Thumbnail */}
        <div className="relative aspect-video overflow-hidden">
          {game.metadata.thumbnail ? (
            <img
              src={`${game.metadata.thumbnail.imgix_url}?w=800&h=450&fit=crop&auto=format,compress`}
              alt={game.metadata.title}
              width={400}
              height={225}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-surface-light flex items-center justify-center">
              <span className="text-6xl">🎮</span>
            </div>
          )}
          
          {/* Featured Badge */}
          {game.metadata.featured && (
            <div className="absolute top-3 left-3 bg-accent text-accent-foreground px-3 py-1 rounded-full text-xs font-semibold">
              ⭐ Featured
            </div>
          )}
          
          {/* Difficulty Badge */}
          {game.metadata.difficulty && (
            <div className="absolute top-3 right-3">
              <span className={`badge badge-${game.metadata.difficulty.key}`}>
                {game.metadata.difficulty.value}
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4">
          {/* Category */}
          {game.metadata.category && (
            <span 
              className="badge text-xs mb-2 inline-block"
              style={{ 
                backgroundColor: `${categoryColor}20`,
                color: categoryColor
              }}
            >
              {game.metadata.category.metadata.name}
            </span>
          )}
          
          <h3 className="text-lg font-bold mb-2 line-clamp-1">
            {game.metadata.title}
          </h3>
          
          <p className="text-muted text-sm line-clamp-2 mb-3">
            {game.metadata.description}
          </p>

          {/* Stats */}
          <div className="flex items-center justify-between text-xs text-muted">
            <span>{game.metadata.game_type.value}</span>
            {game.metadata.play_count !== undefined && (
              <span>👥 {game.metadata.play_count.toLocaleString()}</span>
            )}
          </div>
        </div>
      </article>
    </Link>
  );
}