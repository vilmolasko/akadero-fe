// import { Rating } from '@/components/ui/rating';
import { ArrowRight } from 'lucide-react';
import React, { useState } from 'react';
// import Reviews from './reviews';
import Inquiry from './inquiry';
import { useCurrencyFormat } from '@/hooks/formatCurrency';

export default function CourseSummary({ data }) {
  const fCurrency = useCurrencyFormat();
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
        {data?.title}
      </h2>
      <div className='flex flex-col sm:flex-row items-start sm:items-center gap-1 md:gap-3 justify-between mb-2 md:mb-4'>
        {/* <div className='flex items-center gap-1'>
          <div className='flex  items-center gap-0.5'>
            <Rating
              value={data?.rating}
              size={16}
            />
            <span className='text-md md:text-normal font-medium text-secondary ml-2'>
              ({data?.totalReviews} )
            </span>
          </div>
          <div className='ml-3 h-5 lg:h-5 w-[1px] bg-border ' />
          <Reviews />
        </div> */}
        <div className='text-18 md:text-22 tracking-wider font-bold text-foreground'>
          <span className='text-primary'>{fCurrency(data?.price)}</span>
        </div>
      </div>
      <p className='text-muted-foreground text-md md:text-normal tracking-wide mb-3'>
        {data?.shortDescription}
      </p>
      <hr className='my-4' />
      <div className='type-of-items py-2'>
        {data?.type?.length > 0 && (
          <div className='flex items-center justify-between gap-2 my-2'>
            <h4 className='flex items-center gap-2 text-md md:text-normal tracking-wide text-secondary'>
              <ArrowRight className='h-5 w-5' />
              Mokymai
            </h4>
            <h5 className='text-md md:text-normal font-bold tracking-wide'>
              {data?.type?.join(', ')}
            </h5>
          </div>
        )}
        {data?.level && (
          <div className='flex items-center justify-between gap-2 my-2'>
            <h4 className='flex items-center gap-2 text-md md:text-normal tracking-wide text-secondary'>
              <ArrowRight className='h-5 w-5' />
              Lygis
            </h4>
            <h5 className='text-md md:text-normal font-bold tracking-wide'>
              {data?.level}
            </h5>
          </div>
        )}
        {data?.duration && (
          <div className='flex items-center justify-between gap-2 my-2'>
            <h4 className='flex items-center gap-2 text-md md:text-normal tracking-wide text-secondary'>
              <ArrowRight className='h-5 w-5' />
              Trukmė
            </h4>
            <h5 className='text-md md:text-normal font-bold tracking-wide'>
              {data?.duration}
            </h5>
          </div>
        )}
        {data?.language?.length > 0 && (
          <div className='flex items-center justify-between gap-2 my-2'>
            <h4 className='flex items-center gap-2 text-md md:text-normal tracking-wide text-secondary'>
              <ArrowRight className='h-5 w-5' />
              Kalba
            </h4>
            <h5 className='text-md md:text-normal font-bold tracking-wide'>
              {data?.language?.join(', ')}
            </h5>
          </div>
        )}
        {data?.access && (
          <div className='flex items-center justify-between gap-2 my-2'>
            <h4 className='flex items-center gap-2 text-md md:text-normal tracking-wide text-secondary'>
              <ArrowRight className='h-5 w-5' />
              Prieiga
            </h4>
            <h5 className='text-md md:text-normal font-bold tracking-wide'>
              {data?.access}
            </h5>
          </div>
        )}
        {data?.certificate && (
          <div className='flex items-center justify-between gap-2 my-2'>
            <h4 className='flex items-center gap-2 text-md md:text-normal tracking-wide text-secondary'>
              <ArrowRight className='h-5 w-5' />
              Sertifikatas
            </h4>
            <h5 className='text-md md:text-normal font-bold tracking-wide'>
              {data?.certificate}
            </h5>
          </div>
        )}
        {data?.compensated && (
          <div className='flex items-center justify-between gap-2 my-2'>
            <h4 className='flex items-center gap-2 text-md md:text-normal tracking-wide text-secondary'>
              <ArrowRight className='h-5 w-5' />
              Finansavimas
            </h4>
            <h5 className='text-md md:text-normal font-bold tracking-wide'>
              {data?.compensated}
            </h5>
          </div>
        )}

        <div className='flex items-center justify-between gap-2 my-2'>
          <h4 className='flex items-center gap-2 text-md md:text-normal tracking-wide text-secondary'>
            <ArrowRight className='h-5 w-5' />
            Baigimo dokumentas
          </h4>
          <h5 className='text-md md:text-normal font-bold tracking-wide'>
            {data?.graduationDocument ? 'Yes' : 'No'}
          </h5>
        </div>
      </div>
      <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3'>
        <Inquiry courseId={data?._id} />
        <button
          onClick={handleClick}
          className='flex items-center justify-center rounded-md h-11 px-4 bg-primary-100 text-normal cursor-pointer text-foreground shadow-xs hover:bg-primary/50'
          {...(showNumber && {
            as: 'a',
            onClick: () => {},
            href: `tel:${data?.contact}`,
          })}>
          {showNumber ? data?.contact : 'Skambinkite'}
        </button>
      </div>
    </div>
  );
}
