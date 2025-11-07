import React from 'react';
//  component
import LecturerCard from '@/components/cards/lecturer-card';

export default function LecturersList({ lecturers }) {
  return (
    <div className='courses-list my-7 md:my-12 '>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'>
        {lecturers?.map((lecturer, index) => (
          <React.Fragment key={index}>
            <LecturerCard lecturer={lecturer} />
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
