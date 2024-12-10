'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import QueryString from 'qs';
import React from 'react';
import { useSet } from 'react-use';

import { FilterCheckboxGroup, RangeSlider, Title } from '@/components/shared';
import { Input } from '@/components/ui';
import { useFilterIngredients } from '@/hooks/useFilterIngredients';
import { cn } from '@/lib/utils';

interface Props {
  className?: string;
}

interface PriceProps {
  priceFrom?: number;
  priceTo?: number;
}

interface QueryFilters extends PriceProps {
  pizzaTypes: string;
  sizes: string;
  ingredients: string;
}

export const Filters: React.FC<Props> = ({ className }) => {
  const router = useRouter();
  const searchParams = useSearchParams() as unknown as Map<keyof QueryFilters, string>;

  console.log(searchParams);

  const { ingredients, loading, onAddIngredients, selectedIngredients } = useFilterIngredients(
    searchParams.get('ingredients')?.split(',')
  );
  const [prices, setPrices] = React.useState<PriceProps>({
    priceFrom: Number(searchParams.get('priceFrom')) || undefined,
    priceTo: Number(searchParams.get('priceTo')) || undefined,
  });

  const [selectedPizzaTypes, { toggle: onAddPizzaTypes }] = useSet<string>(
    new Set(searchParams.get('pizzaTypes')?.split(',') || [])
  );
  const [selectedSizes, { toggle: onAddSizes }] = useSet<string>(
    new Set(searchParams.get('sizes')?.split(',') || [])
  );

  const items = ingredients.map((ingredient) => ({
    text: ingredient.name,
    value: String(ingredient.id),
  }));

  const updatePrices = (name: keyof PriceProps, value: number) => {
    setPrices((prev) => ({ ...prev, [name]: value }));
  };

  React.useEffect(() => {
    const filters = {
      ...prices,
      pizzaTypes: Array.from(selectedPizzaTypes),
      sizes: Array.from(selectedSizes),
      ingredients: Array.from(selectedIngredients),
    };

    const query = QueryString.stringify(filters, { arrayFormat: 'comma' });

    router.push(`?${query}`, { scroll: false });
  }, [prices, selectedIngredients, selectedPizzaTypes, selectedSizes, router]);

  return (
    <div className={cn(className)}>
      <Title text='Фильтрация' size='sm' className='font-bold mb-5' />

      <div className='flex flex-col gap-4'>
        <FilterCheckboxGroup
          title={'Тип теста:'}
          items={[
            { text: 'Тонкое', value: '1' },
            { text: 'Традиционное', value: '2' },
          ]}
          onClickCheckbox={onAddPizzaTypes}
          selected={selectedPizzaTypes}
          name={'pizzaTypes'}
        />

        <FilterCheckboxGroup
          title={'Размеры:'}
          items={[
            { text: '20 см', value: '20' },
            { text: '30 см', value: '30' },
            { text: '40 см', value: '40' },
          ]}
          onClickCheckbox={onAddSizes}
          selected={selectedSizes}
          name={'sizes'}
        />
      </div>

      <div className='mt-5 border-y border-y-neutral-100 py-6 pb-7'>
        <p className='font-bold text-sm mb-4'>Цена от и до:</p>
        <div className='flex gap-3 mb-5'>
          <Input
            type='number'
            placeholder='0'
            min={0}
            max={999}
            value={String(prices.priceFrom)}
            onChange={(e) => updatePrices('priceFrom', Number(e.target.value))}
          />
          <Input
            type='number'
            placeholder='3000'
            min={10}
            max={1000}
            value={String(prices.priceTo)}
            onChange={(e) => updatePrices('priceTo', Number(e.target.value))}
          />
        </div>
        <RangeSlider
          min={0}
          max={1000}
          step={10}
          value={[prices.priceFrom || 0, prices.priceTo || 1000]}
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
          onClickCheckbox={onAddIngredients}
          selected={selectedIngredients}
          name={'ingredients'}
        />
      </div>
    </div>
  );
};
