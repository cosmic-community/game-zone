import Link from 'next/link';
import { GameCategory } from '@/types';

interface CategoryCardProps {
  category: GameCategory;
}

export default function CategoryCard({ category }: CategoryCardProps) {
  const color = category.metadata.color || '#6366f1';

  return (
    <Link href={`/categories/${category.slug}`} className="block">
      <article 
        className="rounded-xl p-6 transition-all duration-300 hover:scale-105 hover:shadow-lg"
        style={{ 
          backgroundColor: `${color}15`,
          borderColor: `${color}30`,
          borderWidth: '1px'
        }}
      >
        <div className="flex items-center gap-4">
          {category.metadata.icon ? (
            <img
              src={`${category.metadata.icon.imgix_url}?w=120&h=120&fit=crop&auto=format,compress`}
              alt={category.metadata.name}
              width={48}
              height={48}
              className="rounded-lg"
            />
          ) : (
            <div 
              className="w-12 h-12 rounded-lg flex items-center justify-center text-2xl"
              style={{ backgroundColor: `${color}30` }}
            >
              🏷️
            </div>
          )}
          <div>
            <h3 
              className="font-bold text-lg"
              style={{ color }}
            >
              {category.metadata.name}
            </h3>
            {category.metadata.description && (
              <p className="text-muted text-sm line-clamp-1">
                {category.metadata.description}
              </p>
            )}
          </div>
        </div>
      </article>
    </Link>
  );
}