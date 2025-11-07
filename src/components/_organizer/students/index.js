import Breadcrumbs from '@/layouts/_admin/breadcrumb';
import StudentsListMain from './student-list';

export default async function OrganizerStudentsList() {
  return (
    <div className='space-y-6'>
      {/* Page Title */}
      <div className='flex items-center justify-between gap-3'>
        <div>
          <h1 className='text-2xl font-merriweather'>Studentai</h1>
          {/* Breadcrumbs */}
          <Breadcrumbs />
        </div>
      </div>
      <StudentsListMain />
    </div>
  );
}
