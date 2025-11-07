import React from 'react';
//  component

import ProductCard from '@/components/cards/product-card';

export default function UserOrganizersList({ organizers }) {
  return (
    <div className='courses-list my-7 md:my-12 '>
      <div
        className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4`}>
        {organizers?.map((organizer, index) => (
          <React.Fragment key={index}>
            <ProductCard organizer={organizer} />
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
