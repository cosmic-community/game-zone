'use client';

import Link from 'next/link';
import { GameCategory } from '@/types';

interface CategoryFilterProps {
  categories: GameCategory[];
}

export default function CategoryFilter({ categories }: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-3 justify-center">
      <Link 
        href="/games"
        className="px-4 py-2 rounded-lg bg-primary text-primary-foreground font-medium transition-all hover:scale-105"
      >
        All Games
      </Link>
      {categories.map((category) => {
        const color = category.metadata.color || '#6366f1';
        return (
          <Link
            key={category.id}
            href={`/categories/${category.slug}`}
            className="px-4 py-2 rounded-lg font-medium transition-all hover:scale-105"
            style={{ 
              backgroundColor: `${color}20`,
              color: color
            }}
          >
            {category.metadata.name}
          </Link>
        );
      })}
    </div>
  );
}