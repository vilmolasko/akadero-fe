import React from 'react';
//  component
import CourseListCard from '@/components/cards/course-list-card';

export default function Listing({ courses, path, image }) {
  return (
    <div className='courses-list my-7 md:my-12 '>
      <div className={`grid grid-cols-1  gap-4`}>
        {courses?.map((course, index) => (
          <React.Fragment key={index}>
            <CourseListCard course={course} />
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
