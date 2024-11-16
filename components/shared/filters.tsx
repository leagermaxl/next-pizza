'use client';
import React from 'react';

import { FilterCheckbox, FilterCheckboxGroup, RangeSlider, Title } from '@/components/shared';
import { Input } from '@/components/ui';
import { useFilterIngredients } from '@/hooks/useFilterIngredients';
import { cn } from '@/lib/utils';

interface Props {
  className?: string;
}

export const Filters: React.FC<Props> = ({ className }) => {
  const { ingredients, loading } = useFilterIngredients();

  const items = ingredients.map((ingredient) => ({
    text: ingredient.name,
    value: String(ingredient.id),
  }));

  return (
    <div className={cn(className)}>
      <Title text='Фильтрация' size='sm' className='font-bold mb-5' />

      <div className='flex flex-col gap-4'>
        <FilterCheckbox text='Можно собирать' value='1' />
        <FilterCheckbox text='Новинки' value='2' />
      </div>

      <div className='mt-5 border-y border-y-neutral-100 py-6 pb-7'>
        <p className='font-bold text-sm mb-4'>Цена от и до:</p>
        <div className='flex gap-3 mb-5'>
          <Input type='number' placeholder='0' min={0} max={2999} defaultValue={0} />
          <Input type='number' placeholder='3000' min={100} max={3000} />
        </div>
        <RangeSlider min={0} max={3000} step={10} value={[0, 3000]} />
      </div>

      <div>
        <FilterCheckboxGroup
          items={items}
          defaultItems={items.slice(0, 6)}
          title={'Ингредиенты:'}
          limit={6}
          searchItemPlaceholder={'Поиск...'}
          loading={loading}
        />
      </div>
    </div>
  );
};
