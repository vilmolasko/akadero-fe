'use client';

import { useState } from 'react';
import { useRouter } from '@bprogress/next';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  MapPin,
  Wallet,
  Glasses,
  Calendar,
  ChevronDownIcon,
  GraduationCap,
} from 'lucide-react';

export default function FilterPopover({ filters }) {
  const router = useRouter();

  const [selectedPlaces, setSelectedPlaces] = useState([]);
  const [selectedCompensated, setSelectedCompensated] = useState([]);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');

  // Count selected filters for badge
  const selectedCount =
    selectedPlaces.length +
    selectedCompensated.length +
    selectedTypes.length +
    (dateFrom ? 1 : 0) +
    (dateTo ? 1 : 0);

  // handle toggle for checkboxes
  const toggleSelection = (value, setFn, currentArray) => {
    if (currentArray.includes(value)) {
      setFn(currentArray.filter((v) => v !== value));
    } else {
      setFn([...currentArray, value]);
    }
  };

  const applyFilters = () => {
    const params = new URLSearchParams();

    if (selectedPlaces.length > 0) {
      params.set('place', selectedPlaces.join('_'));
    }
    if (selectedCompensated.length > 0) {
      params.set('compensated', selectedCompensated.join('_'));
    }
    if (selectedTypes.length > 0) {
      params.set('type', selectedTypes.join('_'));
    }
    if (dateFrom) params.set('date_from', dateFrom);
    if (dateTo) params.set('date_to', dateTo);

    router.push(`?${params.toString()}`);
  };

  const clearFilters = () => {
    setSelectedPlaces([]);
    setSelectedCompensated([]);
    setSelectedTypes([]);
    setDateFrom('');
    setDateTo('');
    router.push('?'); // clear URL params
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className='px-3 lg:px-6 text-md lg:text-normal bg-card flex items-center justify-between gap-2 border rounded-md  h-10 lg:h-14 py-2 w-full'>
          <span>
            Filtrai{' '}
            {selectedCount > 0 && (
              <Badge className='bg-primary text-white rounded-full text-xs lg:text-sm'>
                {selectedCount}
              </Badge>
            )}
          </span>

          <ChevronDownIcon className='size-5 shrink-0 translate-y-0.5 transition-transform duration-200' />
        </button>
      </PopoverTrigger>

      <PopoverContent
        align='start'
        className='w-100 p-0 rounded-lg border overflow-y-auto'>
        {/* Accordion */}
        <Accordion
          type='multiple'
          className='divide-y'>
          {/* Place */}
          <AccordionItem
            value='place'
            className='border-b'>
            <AccordionTrigger className='h-10 lg:h-14 px-3 md:px-4 py-3 hover:bg-background flex items-center justify-between cursor-pointer'>
              <div className='flex items-center gap-2'>
                <MapPin className='w-5 h-5 ' />
                <span className='text-md lg:text-normal'>Miestas</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className='px-4 md:px-6 pb-4 pt-1'>
              <div className='space-y-2'>
                {filters?.place.map((p) => (
                  <label
                    key={p}
                    className='flex items-center gap-2 text-md cursor-pointer'>
                    <input
                      type='checkbox'
                      checked={selectedPlaces.includes(p)}
                      onChange={() =>
                        toggleSelection(p, setSelectedPlaces, selectedPlaces)
                      }
                      className='w-4 h-4 border-gray-400 rounded'
                    />
                    {p}
                  </label>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Compensated */}
          <AccordionItem
            value='compensated'
            className='border-b'>
            <AccordionTrigger className='h-10 lg:h-14 px-3 md:px-4 py-3 hover:bg-background flex items-center justify-between cursor-pointer'>
              <div className='flex items-center gap-2'>
                <Wallet className='w-5 h-5 ' />
                <span className='text-md lg:text-normal'>Finansavimas</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className='px-4 md:px-6 pb-4 pt-1'>
              <div className='space-y-2'>
                {filters?.compensated.map((c) => (
                  <label
                    key={c}
                    className='flex items-center gap-2 text-md'>
                    <input
                      type='checkbox'
                      checked={selectedCompensated.includes(c)}
                      onChange={() =>
                        toggleSelection(
                          c,
                          setSelectedCompensated,
                          selectedCompensated
                        )
                      }
                      className='w-4 h-4 border-gray-400 rounded'
                    />
                    {c}
                  </label>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Type of training */}
          <AccordionItem
            value='type'
            className='border-b'>
            <AccordionTrigger className='h-10 lg:h-14 px-3 md:px-4 py-3 hover:bg-background flex items-center justify-between cursor-pointer'>
              <div className='flex items-center gap-2'>
                <GraduationCap className='w-5 h-5 ' />
                <span className='text-md lg:text-normal'>Mokymai</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className='px-4 md:px-6 pb-4 pt-1'>
              <div className='space-y-2'>
                {filters?.typeOfTraining.map((t) => (
                  <label
                    key={t}
                    className='flex items-center gap-2 text-md'>
                    <input
                      type='checkbox'
                      checked={selectedTypes.includes(t)}
                      onChange={() =>
                        toggleSelection(t, setSelectedTypes, selectedTypes)
                      }
                      className='w-4 h-4 border-gray-400 rounded'
                    />
                    {t}
                  </label>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Start of training */}
          <AccordionItem value='start'>
            <AccordionTrigger className='h-10 lg:h-14 px-3 md:px-4 py-3 hover:bg-background flex items-center justify-between cursor-pointer'>
              <div className='flex items-center gap-2'>
                <Calendar className='w-5 h-5 ' />
                <span className='text-md lg:text-normal'>Mokymų pradžia</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className='px-4 md:px-6 pb-4 pt-1 space-y-2'>
              <div>
                <label className='block text-xs mb-1 '>Data nuo</label>
                <input
                  type='date'
                  value={dateFrom}
                  onChange={(e) => setDateFrom(e.target.value)}
                  className='w-full border rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500'
                />
              </div>
              <div>
                <label className='block text-xs mb-1 '>Data iki</label>
                <input
                  type='date'
                  value={dateTo}
                  onChange={(e) => setDateTo(e.target.value)}
                  className='w-full border rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500'
                />
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        {/* Footer Buttons */}
        <div className='flex gap-2 p-4 border-t'>
          <Button
            className='flex-1'
            size={'lg'}
            variant={'default'}
            onClick={applyFilters}>
            Filtras
          </Button>
          <Button
            className='flex-1'
            size={'lg'}
            variant='secondary'
            onClick={clearFilters}>
            Išvalyti
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
