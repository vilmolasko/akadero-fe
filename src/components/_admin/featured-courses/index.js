import Breadcrumbs from '@/layouts/_admin/breadcrumb';
import { Button } from '@/components/ui/button';

import FeaturedCourseList from './featured-course-list';

export default function AdminFeaturedCoursesList() {
  return (
    <div className='space-y-6'>
      {/* Page Title */}
      <div className='flex items-center justify-between gap-3'>
        <div>
          <h1 className='text-2xl font-merriweather'>Kursai</h1>
          {/* Breadcrumbs */}
          <Breadcrumbs />
        </div>
        <Button
          variant='default'
          href='/admin/featured-courses/add'>
          Pridėti siūlomą kursą
        </Button>
      </div>
      <FeaturedCourseList />
    </div>
  );
}
