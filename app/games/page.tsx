import { getGames, getCategories } from '@/lib/cosmic';
import GameCard from '@/components/GameCard';
import CategoryFilter from '@/components/CategoryFilter';

export const revalidate = 60;

export const metadata = {
  title: 'All Games | Game Zone',
  description: 'Browse and play all available games on Game Zone',
};

export default async function GamesPage() {
  const [games, categories] = await Promise.all([
    getGames(),
    getCategories(),
  ]);

  const sortedGames = games.sort((a, b) => 
    (b.metadata?.play_count || 0) - (a.metadata?.play_count || 0)
  );

  return (
    <div className="py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold font-gaming mb-4">
            <span className="text-gradient">🎮 All Games</span>
          </h1>
          <p className="text-xl text-muted">
            Choose from our collection of {games.length} amazing games
          </p>
        </div>

        <CategoryFilter categories={categories} />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8">
          {sortedGames.map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>

        {games.length === 0 && (
          <div className="text-center py-20">
            <p className="text-2xl text-muted">No games available yet</p>
          </div>
        )}
      </div>
    </div>
  );
}