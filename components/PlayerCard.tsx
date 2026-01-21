import { PlayerProfile } from '@/types';
import Link from 'next/link';

interface PlayerCardProps {
  player: PlayerProfile;
  rank: number;
}

export default function PlayerCard({ player, rank }: PlayerCardProps) {
  const rankEmoji = rank === 1 ? '🥇' : rank === 2 ? '🥈' : rank === 3 ? '🥉' : `#${rank}`;
  const favoriteGames = player.metadata.favorite_games || [];

  return (
    <article className="bg-surface rounded-2xl p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-start gap-4">
        {/* Avatar */}
        <div className="relative">
          {player.metadata.avatar ? (
            <img
              src={`${player.metadata.avatar.imgix_url}?w=160&h=160&fit=crop&auto=format,compress`}
              alt={player.metadata.display_name}
              width={80}
              height={80}
              className="w-20 h-20 rounded-full object-cover ring-4 ring-surface-light"
            />
          ) : (
            <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center text-3xl font-bold ring-4 ring-surface-light">
              {player.metadata.display_name[0]?.toUpperCase()}
            </div>
          )}
          <div className="absolute -top-2 -right-2 bg-surface px-2 py-1 rounded-full text-lg">
            {rankEmoji}
          </div>
        </div>

        {/* Info */}
        <div className="flex-1">
          <h3 className="text-xl font-bold font-gaming mb-1">
            {player.metadata.display_name}
          </h3>
          
          {player.metadata.high_score !== undefined && (
            <div className="text-accent font-semibold mb-2">
              🏆 High Score: {player.metadata.high_score.toLocaleString()}
            </div>
          )}
          
          {player.metadata.bio && (
            <p className="text-muted text-sm mb-3 line-clamp-2">
              {player.metadata.bio}
            </p>
          )}

          {/* Favorite Games */}
          {favoriteGames.length > 0 && (
            <div>
              <p className="text-xs text-muted mb-2">Favorite Games:</p>
              <div className="flex flex-wrap gap-2">
                {favoriteGames.slice(0, 3).map((game) => (
                  <Link
                    key={game.id}
                    href={`/games/${game.slug}`}
                    className="px-3 py-1 bg-surface-light rounded-full text-xs hover:bg-primary hover:text-primary-foreground transition-colors"
                  >
                    {game.title}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}