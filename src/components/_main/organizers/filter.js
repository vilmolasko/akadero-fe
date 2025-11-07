'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useRouter } from '@bprogress/next';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Badge } from '@/components/ui/badge';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Glasses, ChevronDownIcon } from 'lucide-react';

export default function OrganizerFilter({ filters }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // ✅ Load from URL param -> category
  const urlCategories = searchParams.get('category')?.split('_') || [];
  const [selectedCategories, setSelectedCategories] = useState(urlCategories);

  const selectedCount = selectedCategories.length;

  const updateURL = (updated) => {
    const params = new URLSearchParams(searchParams.toString());

    if (updated.length > 0) {
      params.set('category', updated.join('_'));
    } else {
      params.delete('category');
    }

    router.push(`?${params.toString()}`);
  };

  const toggleSelection = (value) => {
    let updated;
    if (selectedCategories.includes(value)) {
      updated = selectedCategories.filter((v) => v !== value);
    } else {
      updated = [...selectedCategories, value];
    }
    setSelectedCategories(updated);
    updateURL(updated);
  };

  useEffect(() => {
    setSelectedCategories(urlCategories);
  }, [searchParams]);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className='px-3 lg:px-6 text-md lg:text-normal bg-card flex items-center justify-between gap-2 border rounded-md h-10 lg:h-14 py-2 w-full'>
          <span>
            Filtrai{' '}
            {selectedCount > 0 && (
              <Badge className='bg-primary text-white rounded-full text-xs lg:text-sm'>
                {selectedCount}
              </Badge>
            )}
          </span>
          <ChevronDownIcon className='size-5 shrink-0 transition-transform duration-200' />
        </button>
      </PopoverTrigger>

      <PopoverContent
        align='start'
        className='w-100 p-0 rounded-lg border'>
        <Accordion
          type='multiple'
          className='divide-y'>
          <AccordionItem value='category'>
            <AccordionTrigger className='h-10 lg:h-14 px-3 md:px-4 py-3 hover:bg-background items-center'>
              <div className='flex items-center gap-2'>
                <Glasses className='w-5 h-5' />
                <span className='text-md lg:text-normal'>Kategorija</span>
              </div>
            </AccordionTrigger>

            <AccordionContent className='px-4 md:px-6 pb-4 pt-1'>
              <div className='space-y-2'>
                {filters?.typeOfTraining?.map((item) => (
                  <label
                    key={item}
                    className='flex items-center gap-2 text-md cursor-pointer'>
                    <input
                      type='checkbox'
                      checked={selectedCategories.includes(item)}
                      onChange={() => toggleSelection(item)}
                      className='w-4 h-4 rounded border-gray-400'
                    />
                    {item}
                  </label>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </PopoverContent>
    </Popover>
  );
}
