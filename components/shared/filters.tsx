import { cn } from '@/lib/utils';
import React from 'react';
import { FilterCheckbox, FilterCheckboxGroup, RangeSlider, Title } from '.';
import { Input } from '../ui';

interface Props {
  className?: string;
}

const ingredients = [
  {
    text: 'Сырный соус',
    value: '1',
  },
  {
    text: 'Моцарелла',
    value: '2',
  },
  {
    text: 'Чеснок',
    value: '3',
  },
  {
    text: 'Соленные огурчики',
    value: '4',
  },
  {
    text: 'Красный лук',
    value: '5',
  },
  {
    text: 'Томаты',
    value: '6',
  },
  {
    text: 'Ананас',
    value: '7',
  },
  {
    text: 'Сырный соус',
    value: '1',
  },
  {
    text: 'Моцарелла',
    value: '2',
  },
  {
    text: 'Чеснок',
    value: '3',
  },
  {
    text: 'Соленные огурчики',
    value: '4',
  },
  {
    text: 'Красный лук',
    value: '5',
  },
  {
    text: 'Томаты',
    value: '6',
  },
  {
    text: 'Ананас',
    value: '7',
  },
];

export const Filters: React.FC<Props> = ({ className }) => {
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
          items={ingredients}
          defaultItems={ingredients}
          title={'Ингридиенты:'}
          limit={6}
          searchItemPlaceholder={'Поиск...'}
        />
      </div>
    </div>
  );
};
