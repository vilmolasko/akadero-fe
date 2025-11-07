import React from 'react';
import SearchBar from './search';
import FilterPopover from './filters-popover';

export default function Filters({ filters }) {
  return (
    <div className='filters grid grid-cols-1 md:grid-cols-2  gap-4'>
      {/* Future filter components can be added here */}
      <FilterPopover filters={filters} />
      {/*  */}
      <SearchBar />
    </div>
  );
}
