import Breadcrumbs from '@/layouts/_admin/breadcrumb';

import OrganizerFeaturedCourseList from './featured-course-list';

export default function OrganizerFeaturedCoursesList() {
  return (
    <div className='space-y-6'>
      {/* Page Title */}
      <div className='flex items-center justify-between gap-3'>
        <div>
          <h1 className='text-2xl font-merriweather'>Kursai</h1>
          {/* Breadcrumbs */}
          <Breadcrumbs />
        </div>
      </div>
      <OrganizerFeaturedCourseList />
    </div>
  );
}
