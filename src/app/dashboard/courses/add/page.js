import Breadcrumbs from '@/layouts/_admin/breadcrumb';
import * as api from '@/services';
import AddOrganizerCourse from '@/components/_organizer/courses/add-course';

export default async function Page() {
  const categories = await api.getAllAdminCategories();
  const lecturers = await api.getAllAdminLecturers();

  return (
    <div className='space-y-6'>
      {/* Page Title */}
      <div className='flex items-center justify-between gap-3'>
        <div>
          <h1 className='text-2xl font-merriweather'>Pridėti kursą</h1>
          {/* Breadcrumbs */}
          <Breadcrumbs />
        </div>
      </div>
      <div className='relative'>
        <AddOrganizerCourse
          categories={categories?.data}
          lecturers={lecturers?.data}
        />
      </div>
    </div>
  );
}
