'use client';

import * as React from 'react';
import { Check, ChevronsUpDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '@/components/ui/popover';
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandInput,
  CommandEmpty,
} from '@/components/ui/command';
import { Button } from '@/components/ui/button';

import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';

export function MultiSelect({ options, value, onChange, placeholder }) {
  const [open, setOpen] = React.useState(false);

  const toggleOption = (val) => {
    onChange(
      value.includes(val) ? value.filter((v) => v !== val) : [...value, val]
    );
  };

  return (
    <div className='w-full'>
      <Popover
        open={open}
        onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant='outline'
            role='combobox'
            className='w-full justify-between'>
            {value.length > 0 ? (
              <div className='flex flex-wrap gap-1'>
                {value.map((val) => {
                  const item = options.find((o) => o.value === val._id);
                  return (
                    <Badge
                      key={val}
                      variant='secondary'>
                      {item?.name}
                    </Badge>
                  );
                })}
              </div>
            ) : (
              placeholder || 'Select options...'
            )}
            <ChevronsUpDown className='ml-2 h-4 w-4 opacity-50' />
          </Button>
        </PopoverTrigger>
        <PopoverContent className='w-[300px] p-0'>
          <Command>
            <CommandInput placeholder='Search...' />
            <CommandEmpty>No results found.</CommandEmpty>
            <ScrollArea className='h-56'>
              <CommandGroup>
                {options.map((option) => (
                  <CommandItem
                    key={option._id}
                    onSelect={() => toggleOption(option._id)}>
                    <Check
                      className={cn(
                        'mr-2 h-4 w-4',
                        value.includes(option._id) ? 'opacity-100' : 'opacity-0'
                      )}
                    />
                    {option.name}
                  </CommandItem>
                ))}
              </CommandGroup>
            </ScrollArea>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
