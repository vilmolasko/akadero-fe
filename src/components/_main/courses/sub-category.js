'use client';

import React from 'react';
import Image from 'next/image';
import NextLink from 'next/link';

export default function SubCategoryList({ subCategories, category }) {
  return (
    <div className='pb-4'>
      <div className='grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-6 gap-4 justify-center'>
        {subCategories.map((subCategory, index) => (
          <NextLink
            key={index}
            href={`/courses/${category}/${subCategory?.slug}`}
            className='group cursor-pointer'>
            {/* Image Wrapper */}
            <div className='relative aspect-square w-full rounded-full overflow-hidden mb-2 border-2 border-transparent transition-all duration-300 group-hover:border-primary'>
              <Image
                src={subCategory?.cover?.url || '/placeholder-image.png'}
                alt={subCategory?.name}
                fill
                className='object-cover transition-transform duration-300 group-hover:scale-105'
                sizes='(max-width: 640px) 100vw, 50vw'
              />
            </div>

            {/* Text */}
            <h6 className='block text-md md:text-normal text-center font-medium tracking-wide transition-colors duration-300 group-hover:text-primary'>
              {subCategory?.name}
            </h6>
          </NextLink>
        ))}
      </div>
    </div>
  );
}
