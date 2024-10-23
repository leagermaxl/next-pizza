'use client';
import { cn } from '@/lib/utils';
import React from 'react';

interface Props {
  className?: string;
}

const categories = [
  { id: 1, name: 'Пиццы' },
  { id: 2, name: 'Комбо' },
  { id: 3, name: 'Закуски' },
  { id: 4, name: 'Коктейли' },
  { id: 5, name: 'Кофе' },
  { id: 6, name: 'Напитки' },
  { id: 7, name: 'Десерты' },
];

const categoryActiveId = 1;

export const Categories: React.FC<Props> = ({ className }) => {
  return (
    <div className={cn('inline-flex gap-1 bg-gray-50 p-1 rounded-2xl', className)}>
      {categories.map(({ id, name }, index) => (
        <a
          key={index}
          // onClick={() => setActiveCategory(index)}
          href={`/#${name}`}
          className={cn(
            'flex items-center h-11 p-5 rounded-2xl font-semibold',
            categoryActiveId === id ? 'bg-white shadow-md shadow-gray-200 text-primary' : ''
          )}
        >
          <button>{name}</button>
        </a>
      ))}
    </div>
  );
};
