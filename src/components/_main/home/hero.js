'use client';

import React, { useState } from 'react';
import { useRouter } from '@bprogress/next';
import { Search } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';

export default function Hero({ categories }) {
  const router = useRouter();
  const [category, setCategory] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // find the selected category object
    const selectedCategory = categories.find(
      (c) => c._id === category || c.slug === category
    );

    // if category not selected, go to /courses
    const basePath = selectedCategory
      ? `/courses/${selectedCategory.slug}`
      : '/courses';

    // if search term exists, add it as query param
    const query = searchTerm.trim()
      ? `?search=${encodeURIComponent(searchTerm.trim())}`
      : '';

    router.push(`${basePath}${query}`);
  };

  return (
    <div className='hero-section max-w-[940px] mx-auto mt-10  md:mt-20 mb-5'>
      <div className='hero-content'>
        <h1 className='text-3xl md:text-5xl font-bold font-merriweather text-center leading-tight tracking-wider'>
          Mokymų ir kursų <span className='text-primary'>paieška</span>
        </h1>
        <p className='text-md md:text-normal text-center mt-4 text-secondary tracking-wider'>
          Atrask profesinius, asmeninio tobulėjimo ir online mokymus vienoje
          vietoje.
        </p>

        {/* Search Bar */}
        <form
          onSubmit={handleSubmit}
          className='flex items-center w-full max-w-[622px] mx-auto overflow-hidden rounded-[12px] border bg-card mt-8'>
          {/* Category Dropdown */}
          <Select
            value={category}
            onValueChange={setCategory}>
            <SelectTrigger className='w-full max-w-25 md:max-w-[150px] h-10 md:h-14 px-2 md:pl-6 md:pr-2 text-md md:text-normal rounded-none border-0 bg-card shadow-none focus:ring-0 focus:outline-none'>
              <SelectValue placeholder='Pasirinkite kategorija' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='none'>Visos kategorijos</SelectItem>
              {categories.map((cat) => (
                <SelectItem
                  key={cat._id}
                  value={cat._id}>
                  {cat.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <div className='h-6 md:h-8 w-[1px] bg-border' />

          {/* Search Input */}
          <Input
            type='text'
            placeholder='Ieškokite pagal raktažodį'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className='flex-1 text-md md:text-normal rounded-none border-0 bg-card shadow-none h-10 md:h-14 focus-visible:ring-0 focus-visible:ring-offset-0'
          />

          {/* Search Button */}
          <Button
            type='submit'
            className='rounded-none cursor-pointer bg-primary hover:bg-primary-500 px-4 h-10 md:h-14 md:w-14'>
            <Search className='md:h-6 h-4 md:w-6 w-4 text-white' />
          </Button>
        </form>
      </div>
    </div>
  );
}
