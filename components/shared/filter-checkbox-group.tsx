'use client';
import React from 'react';

import { FilterCheckbox } from '@/components/shared';
import { FilterCheckboxProps } from '@/components/shared/filter-checkbox';
import { Input, Skeleton } from '@/components/ui';
import { cn } from '@/lib/utils';

type Item = FilterCheckboxProps;

interface Props {
  title: string;
  items: Item[];
  defaultItems?: Item[];
  limit?: number;
  searchItemPlaceholder?: string;
  onClickCheckbox?: (id: string) => void;
  defaultValue?: string[];
  loading?: boolean;
  selected?: Set<string>;
  name?: string;
  className?: string;
}

export const FilterCheckboxGroup: React.FC<Props> = ({
  title,
  items,
  defaultItems,
  limit = 5,
  searchItemPlaceholder = 'Поиск...',
  onClickCheckbox,
  defaultValue,
  className,
  loading,
  selected,
  name,
}) => {
  const [showAll, setShowAll] = React.useState(false);
  const [searchValue, setSearchValue] = React.useState('');

  const itemsList = showAll
    ? items.filter((item) =>
        item.text.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase())
      )
    : (defaultItems || items).slice(0, limit);

  const onCheckedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  if (loading) {
    return (
      <div className={cn('', className)}>
        <p className='font-bold text-sm my-4'>{title}</p>
        {[...Array(limit)].map((_, index) => (
          <Skeleton key={index} className='mb-4 h-6 w-full bg-gray-100' />
        ))}
        <Skeleton className='mb-4 h-6 w-28 bg-gray-100' />
      </div>
    );
  }

  return (
    <div className={cn('', className)}>
      <p className='font-bold text-sm my-4'>{title}</p>
      {showAll && (
        <div className='mb-5'>
          <Input
            className='bg-gray-50 border-none'
            type='text'
            placeholder={searchItemPlaceholder}
            onChange={onCheckedChange}
            value={searchValue}
          />
        </div>
      )}
      <div className='flex flex-col gap-4 max-h-96 overflow-auto scrollbar'>
        {itemsList.map((item, index) => (
          <FilterCheckbox
            key={index}
            text={item.text}
            value={String(item.value)}
            endAdornment={item.endAdornment}
            checked={selected?.has(item.value)}
            onCheckedChange={() => onClickCheckbox?.(item.value)}
            name={name}
          />
        ))}
      </div>
      {items?.length > limit ? (
        <div className={showAll ? 'border-t border-t-neutral-100 mt-4' : ''}>
          <button onClick={() => setShowAll(!showAll)} className='text-primary mt-3'>
            {showAll ? 'Скрыть' : 'Показать все'}
          </button>
        </div>
      ) : (
        ''
      )}
    </div>
  );
};
