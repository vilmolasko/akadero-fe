import Breadcrumbs from '@/layouts/_admin/breadcrumb';
import AddFeaturedCourse from '@/components/_admin/featured-courses/add-featured-course';

export default async function DashboardPage() {
  return (
    <div className='space-y-6'>
      {/* Page Title */}
      <div className='flex items-center justify-between gap-3'>
        <div>
          <h1 className='text-2xl font-merriweather'>Pridėti funkcijų kursą</h1>

          <Breadcrumbs />
        </div>
      </div>
      <div className='relative'>
        <AddFeaturedCourse />
      </div>
    </div>
  );
}
