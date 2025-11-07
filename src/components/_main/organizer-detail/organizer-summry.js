import { ArrowRight } from 'lucide-react';
import React, { useState } from 'react';
import Inquiry from './inquiry';

export default function OrganizerSummary({ data }) {
  const [showNumber, setShowNumber] = useState(false);

  const handleClick = () => {
    if (!showNumber) {
      setShowNumber(true); // pehla click: number show
    } else {
      window.location.href = `tel:${data?.contact}`; // dusra click: call
    }
  };
  return (
    <div>
      <h4 className='text-md md:text-18 uppercase font-medium tracking-wide text-primary mb-0 md:mb-1'>
        {data?.category?.name}
      </h4>
      <h2 className='text-lg md:text-3xl font-merriweather tracking-wider font-bold mb-0 md:mb-2'>
        {data?.name}
      </h2>
      <p className='text-muted-foreground text-md md:text-normal tracking-wide mb-3'>
        {data?.description}
      </p>
      <hr className='my-4' />
      <div className='type-of-items py-2'>
        {data?.address && (
          <div className='flex items-center justify-between gap-2 my-2'>
            <h4 className='flex items-center gap-2 text-md md:text-normal tracking-wide text-secondary'>
              <ArrowRight className='h-5 w-5' />
              Adresas
            </h4>
            <h5 className='text-md md:text-normal font-bold tracking-wide'>
              {data?.address}
            </h5>
          </div>
        )}
        {data?.website && (
          <div className='flex items-center justify-between gap-2 my-2'>
            <h4 className='flex items-center gap-2 text-md md:text-normal tracking-wide text-secondary'>
              <ArrowRight className='h-5 w-5' />
              Svetainė
            </h4>
            <h5 className='text-md md:text-normal font-bold tracking-wide'>
              {data?.website}
            </h5>
          </div>
        )}
      </div>
      <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3'>
        <Inquiry organizerSlug={data?.slug} />
        <button
          onClick={handleClick}
          className='flex items-center justify-center rounded-md h-11 px-4 bg-primary-100 text-normal cursor-pointer text-foreground shadow-xs hover:bg-primary/50'
          {...(showNumber && {
            as: 'a',
            onClick: () => {},
            href: `tel:${data?.phone}`,
          })}>
          {showNumber ? data?.phone : 'Call'}
        </button>
      </div>
    </div>
  );
}
