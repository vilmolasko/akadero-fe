'use client';
import React from 'react';
import NextLink from 'next/link';
import Image from 'next/image';
// import { ThemeToggle } from '@/components/theme-toggle';

export default function AuthAppBar() {
  return (
    <div className='w-full border-b bg-card sticky top-0 z-50'>
      <div className='container-xl mx-auto flex h-16 items-center justify-between px-4 md:px-8'>
        {/* Logo */}
        <NextLink href='/'>
          <Image
            src='/logo.svg'
            alt='Logo'
            placeholder='blur'
            blurDataURL='/logo.svg'
            className='object-contain'
            width={190}
            height={52}
          />
        </NextLink>
        {/* <ThemeToggle /> */}
      </div>
    </div>
  );
}
