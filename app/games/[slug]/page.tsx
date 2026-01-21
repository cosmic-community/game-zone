// app/games/[slug]/page.tsx
import { getGameBySlug, getGames } from '@/lib/cosmic';
import { notFound } from 'next/navigation';
import GamePlayer from '@/components/GamePlayer';
import Link from 'next/link';

export const revalidate = 60;

export async function generateStaticParams() {
  const games = await getGames();
  return games.map((game) => ({
    slug: game.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const game = await getGameBySlug(slug);
  
  if (!game) {
    return { title: 'Game Not Found' };
  }

  return {
    title: `${game.metadata.title} | Game Zone`,
    description: game.metadata.description,
  };
}

export default async function GamePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const game = await getGameBySlug(slug);

  if (!game) {
    notFound();
  }

  const categoryColor = game.metadata.category?.metadata?.color || '#6366f1';

  return (
    <div className="py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Back Link */}
        <Link 
          href="/games" 
          className="inline-flex items-center text-muted hover:text-white transition-colors mb-6"
        >
          ← Back to Games
        </Link>

        {/* Game Header */}
        <div className="bg-surface rounded-2xl p-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-center gap-6">
            {game.metadata.thumbnail && (
              <img
                src={`${game.metadata.thumbnail.imgix_url}?w=400&h=300&fit=crop&auto=format,compress`}
                alt={game.metadata.title}
                width={200}
                height={150}
                className="rounded-xl w-full md:w-48 object-cover"
              />
            )}
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-3 mb-3">
                {game.metadata.category && (
                  <span 
                    className="badge"
                    style={{ 
                      backgroundColor: `${categoryColor}20`,
                      color: categoryColor
                    }}
                  >
                    {game.metadata.category.metadata.name}
                  </span>
                )}
                {game.metadata.difficulty && (
                  <span className={`badge badge-${game.metadata.difficulty.key}`}>
                    {game.metadata.difficulty.value}
                  </span>
                )}
              </div>
              <h1 className="text-3xl md:text-4xl font-bold font-gaming mb-3">
                {game.metadata.title}
              </h1>
              <p className="text-muted text-lg mb-4">
                {game.metadata.description}
              </p>
              <div className="flex items-center gap-4 text-sm text-muted">
                <span>🎮 {game.metadata.game_type.value}</span>
                {game.metadata.play_count && (
                  <span>👥 {game.metadata.play_count.toLocaleString()} plays</span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Game Player */}
        <div className="mb-8">
          <GamePlayer game={game} />
        </div>

        {/* Instructions */}
        {game.metadata.instructions && (
          <div className="bg-surface rounded-2xl p-6">
            <h2 className="text-2xl font-bold font-gaming mb-4">📖 How to Play</h2>
            <div className="prose prose-invert max-w-none">
              <div 
                className="text-muted leading-relaxed"
                dangerouslySetInnerHTML={{ 
                  __html: game.metadata.instructions
                    .replace(/## /g, '<h3 class="text-xl font-semibold text-white mt-6 mb-3">')
                    .replace(/\*\*(.*?)\*\*/g, '<strong class="text-white">$1</strong>')
                    .replace(/\n/g, '<br/>')
                }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}