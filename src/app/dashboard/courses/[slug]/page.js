import Breadcrumbs from '@/layouts/_admin/breadcrumb';
import * as api from '@/services';
import EditOrganizerCourse from '@/components/_organizer/courses/edit-course';

export default async function Page({ params }) {
  const { slug } = await params;
  const categories = await api.getAllAdminCategories();
  const lecturers = await api.getAllAdminLecturers();
  return (
    <div className='space-y-6'>
      {/* Page Title */}
      <div className='flex items-center justify-between gap-3'>
        <div>
          <h1 className='text-2xl font-merriweather'>Redaguoti kursą</h1>
          {/* Breadcrumbs */}
          <Breadcrumbs />
        </div>
      </div>
      <div className='relative'>
        <EditOrganizerCourse
          slug={slug}
          categories={categories?.data}
          lecturers={lecturers?.data}
        />
      </div>
    </div>
  );
}
