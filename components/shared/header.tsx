import { ArrowRight, ShoppingCart, User } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import { Container, SearchInput } from '@/components/shared';
import { Button } from '@/components/ui';
import { cn } from '@/lib/utils';

interface Props {
  className?: string;
}

export const Header: React.FC<Props> = ({ className }) => {
  return (
    <header className={cn('border border-b', className)}>
      <Container className='flex items-center justify-between py-8'>
        {/* Левая часть */}
        <Link href='/' className='flex items-center gap-4'>
          <Image src='/assets/logo.png' alt='Logo' width={32} height={44} />
          <div className=''>
            <h1 className='text-2xl uppercase font-black'>Next Pizza</h1>
            <p className='text-sm text-gray-400 leading-3'>вкуснее уже некуда</p>
          </div>
        </Link>
        {/* Поиск по середине */}
        <div className='flex-1 mx-10'>
          <SearchInput />
        </div>
        {/* Правая часть */}
        <div className='flex items-center gap-3'>
          <Button variant={'outline'} className='flex items-center gap-1'>
            <User size={16} />
            Войти
          </Button>
          <Button variant={'default'} className='group relative'>
            <b>520 ₴</b>
            <span className='h-full w-[1px] bg-white/30 mx-3' />
            <div className='flex items-center gap-1 transition duration-200 group-hover:opacity-0'>
              <ShoppingCart size={16} className='relative' strokeWidth={2} />
              <b>0</b>
            </div>
            <ArrowRight
              size={20}
              className='absolute right-5 transition duration-300 -translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0'
            />
          </Button>
        </div>
      </Container>
    </header>
  );
};
