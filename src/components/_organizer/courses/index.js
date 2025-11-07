import Breadcrumbs from '@/layouts/_admin/breadcrumb';
import { Button } from '@/components/ui/button';

import CourseList from './course-list';

export default async function AdminCoursesList() {
  const categoryRes = await fetch(
    process.env.BASE_URL + '/api/categories/all',
    {
      cache: 'no-store',
    }
  );

  const { data: allCategories } = await categoryRes.json();
  const mappedCategories = allCategories.map((v) => {
    return {
      slug: v._id,
      name: v.name,
    };
  });

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
          href='/dashboard/courses/add'>
          Pridėti kursą
        </Button>
      </div>

      <CourseList allCategories={mappedCategories} />
    </div>
  );
}
