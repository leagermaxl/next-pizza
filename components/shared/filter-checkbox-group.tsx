'use client';
import { cn } from '@/lib/utils';
import React from 'react';
import { FilterCheckbox } from '.';
import { Input } from '../ui';
import { FilterCheckboxProps } from './filter-checkbox';

type Item = FilterCheckboxProps;

interface Props {
  title: string;
  items: Item[];
  defaultItems: Item[];
  limit: number;
  searchItemPlaceholder?: string;
  onChange?: (values: string) => void;
  defaultValue?: string[];
  className?: string;
}

export const FilterCheckboxGroup: React.FC<Props> = ({
  title,
  items,
  defaultItems,
  limit = 5,
  searchItemPlaceholder = 'Поиск...',
  // onChange,
  // defaultValue,
  className,
}) => {
  const [showAll, setShowAll] = React.useState(false);
  const [searchValue, setSearchValue] = React.useState('');

  const itemsList = showAll
    ? items.filter((item) =>
        item.text.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase())
      )
    : defaultItems.slice(0, limit);

  const onCheckedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

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
            checked={false}
            onCheckedChange={(ids) => console.log(ids)}
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
