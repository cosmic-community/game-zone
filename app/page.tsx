import { getGames, getFeaturedGames, getCategories } from '@/lib/cosmic';
import GameCard from '@/components/GameCard';
import CategoryCard from '@/components/CategoryCard';
import HeroSection from '@/components/HeroSection';
import Link from 'next/link';

export const revalidate = 60;

export default async function HomePage() {
  const [games, featuredGames, categories] = await Promise.all([
    getGames(),
    getFeaturedGames(),
    getCategories(),
  ]);

  const sortedGames = games.sort((a, b) => 
    (b.metadata?.play_count || 0) - (a.metadata?.play_count || 0)
  );

  return (
    <div>
      <HeroSection />
      
      {/* Featured Games */}
      {featuredGames.length > 0 && (
        <section className="py-16 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold font-gaming">
                <span className="text-gradient">⭐ Featured Games</span>
              </h2>
              <Link href="/games" className="text-primary hover:text-primary/80 transition-colors">
                View All →
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredGames.slice(0, 3).map((game) => (
                <GameCard key={game.id} game={game} featured />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Categories */}
      <section className="py-16 px-4 bg-surface/50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold font-gaming mb-8">
            <span className="text-gradient">🏷️ Browse Categories</span>
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        </div>
      </section>

      {/* Popular Games */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold font-gaming">
              <span className="text-gradient">🔥 Popular Games</span>
            </h2>
            <Link href="/games" className="text-primary hover:text-primary/80 transition-colors">
              View All →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {sortedGames.slice(0, 8).map((game) => (
              <GameCard key={game.id} game={game} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-primary/20 to-accent/20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold font-gaming mb-4">Ready to Play?</h2>
          <p className="text-xl text-muted mb-8">
            Join thousands of players and start gaming now!
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/games" className="btn-primary">
              Browse All Games
            </Link>
            <Link href="/chat" className="btn-secondary">
              Join the Chat
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}