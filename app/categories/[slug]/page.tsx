// app/categories/[slug]/page.tsx
import { getCategories, getGamesByCategory } from '@/lib/cosmic';
import { notFound } from 'next/navigation';
import GameCard from '@/components/GameCard';
import Link from 'next/link';

export const revalidate = 60;

export async function generateStaticParams() {
  const categories = await getCategories();
  return categories.map((category) => ({
    slug: category.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const categories = await getCategories();
  const category = categories.find((c) => c.slug === slug);
  
  if (!category) {
    return { title: 'Category Not Found' };
  }

  return {
    title: `${category.metadata.name} Games | Game Zone`,
    description: category.metadata.description || `Browse ${category.metadata.name} games`,
  };
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const categories = await getCategories();
  const category = categories.find((c) => c.slug === slug);

  if (!category) {
    notFound();
  }

  const games = await getGamesByCategory(category.id);
  const categoryColor = category.metadata.color || '#6366f1';

  return (
    <div className="py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <Link 
          href="/games" 
          className="inline-flex items-center text-muted hover:text-white transition-colors mb-6"
        >
          ← Back to All Games
        </Link>

        <div 
          className="rounded-2xl p-8 mb-12"
          style={{ 
            background: `linear-gradient(135deg, ${categoryColor}20, ${categoryColor}05)`
          }}
        >
          <div className="flex items-center gap-4 mb-4">
            {category.metadata.icon && (
              <img
                src={`${category.metadata.icon.imgix_url}?w=120&h=120&fit=crop&auto=format,compress`}
                alt={category.metadata.name}
                width={60}
                height={60}
                className="rounded-xl"
              />
            )}
            <div>
              <h1 
                className="text-4xl font-bold font-gaming"
                style={{ color: categoryColor }}
              >
                {category.metadata.name}
              </h1>
              {category.metadata.description && (
                <p className="text-xl text-muted mt-2">
                  {category.metadata.description}
                </p>
              )}
            </div>
          </div>
          <p className="text-muted">
            {games.length} game{games.length !== 1 ? 's' : ''} available
          </p>
        </div>

        {games.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {games.map((game) => (
              <GameCard key={game.id} game={game} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-2xl text-muted">No games in this category yet</p>
            <Link href="/games" className="btn-primary mt-4 inline-block">
              Browse All Games
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}