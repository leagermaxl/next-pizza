'use client';
import React from 'react';

import { FilterCheckbox, FilterCheckboxGroup, RangeSlider, Title } from '@/components/shared';
import { Input } from '@/components/ui';
import { useFilterIngredients } from '@/hooks/useFilterIngredients';
import { cn } from '@/lib/utils';

interface Props {
  className?: string;
}

interface PriceProps {
  priceFrom: number;
  priceTo: number;
}

export const Filters: React.FC<Props> = ({ className }) => {
  const { ingredients, loading, onAddId, selectedIds } = useFilterIngredients();
  const [prices, setPrices] = React.useState<PriceProps>({ priceFrom: 0, priceTo: 3000 });

  const items = ingredients.map((ingredient) => ({
    text: ingredient.name,
    value: String(ingredient.id),
  }));

  const updatePrices = (name: keyof PriceProps, value: number) => {
    setPrices((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className={cn(className)}>
      <Title text='Фильтрация' size='sm' className='font-bold mb-5' />

      <div className='flex flex-col gap-4'>
        <FilterCheckbox name={'qwe'} text='Можно собирать' value='1' />
        <FilterCheckbox name={'wer'} text='Новинки' value='2' />
      </div>

      <div className='mt-5 border-y border-y-neutral-100 py-6 pb-7'>
        <p className='font-bold text-sm mb-4'>Цена от и до:</p>
        <div className='flex gap-3 mb-5'>
          <Input
            type='number'
            placeholder='0'
            min={0}
            max={2999}
            defaultValue={0}
            value={String(prices.priceFrom)}
            onChange={(e) => updatePrices('priceFrom', Number(e.target.value))}
          />
          <Input
            type='number'
            placeholder='3000'
            min={10}
            max={3000}
            value={String(prices.priceTo)}
            onChange={(e) => updatePrices('priceTo', Number(e.target.value))}
          />
        </div>
        <RangeSlider
          min={0}
          max={3000}
          step={10}
          value={[prices.priceFrom, prices.priceTo]}
          onValueChange={([priceFrom, priceTo]) => setPrices({ priceFrom, priceTo })}
        />
      </div>

      <div>
        <FilterCheckboxGroup
          items={items}
          defaultItems={items.slice(0, 6)}
          title={'Ингредиенты:'}
          limit={6}
          searchItemPlaceholder={'Поиск...'}
          loading={loading}
          onClickCheckbox={onAddId}
          selectedIds={selectedIds}
          name={'ingredients'}
        />
      </div>
    </div>
  );
};
