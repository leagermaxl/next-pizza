import React from 'react';

import { Checkbox } from '@/components/ui';

export interface FilterCheckboxProps {
  text: string;
  value: string;
  endAdornment?: string;
  onCheckedChange?: (checked: boolean) => void;
  checked?: boolean;
  name?: string;
}

export const FilterCheckbox: React.FC<FilterCheckboxProps> = ({
  text,
  value,
  endAdornment,
  onCheckedChange,
  checked,
  name,
}) => {
  return (
    <div className='flex items-center space-x-2'>
      <Checkbox
        value={value}
        onCheckedChange={onCheckedChange}
        checked={checked}
        className='rounded-[8px] size-6'
        id={`checkbox-${String(name)}-${String(value)}`}
      />
      <label
        htmlFor={`checkbox-${String(name)}-${String(value)}`}
        className=' flex-1 cursor-pointer'
      >
        {text}
      </label>
      {endAdornment}
    </div>
  );
};
