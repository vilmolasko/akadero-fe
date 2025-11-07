'use client';
import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { useRouter } from '@bprogress/next';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function SearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const urlSearch = searchParams.get('search') || '';
  const [searchTerm, setSearchTerm] = useState(urlSearch);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateURL(searchTerm.trim());
  };

  const updateURL = (value) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value) {
      params.set('search', value);
    } else {
      params.delete('search');
    }

    router.push(`?${params.toString()}`);
  };

  // ✅ Update URL instantly when input clears
  useEffect(() => {
    if (!searchTerm.trim()) {
      updateURL('');
    }
  }, [searchTerm]);

  // ✅ Sync UI when user uses back/forward navigation
  useEffect(() => {
    setSearchTerm(urlSearch);
  }, [searchParams]);

  return (
    <form
      onSubmit={handleSubmit}
      className='flex items-center w-full md:max-w-[540px] lg:max-w-[622px] overflow-hidden rounded-[12px] border bg-card'>
      <Input
        type='text'
        placeholder='Ieškoti kurso'
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className='flex-1 text-md lg:text-normal rounded-none border-0 bg-card shadow-none h-10 lg:h-14 focus-visible:ring-0 focus-visible:ring-offset-0'
      />

      <Button
        type='submit'
        className='rounded-none cursor-pointer bg-primary hover:bg-primary-500 px-4 h-10 lg:h-14 lg:w-14'>
        <Search className='lg:h-6 h-4 lg:w-6 w-4 text-white' />
      </Button>
    </form>
  );
}
