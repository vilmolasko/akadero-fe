'use client';
import Breadcrumbs from '@/layouts/_admin/breadcrumb';
import { Button } from '@/components/ui/button';
import { useRouter } from '@bprogress/next';
import LecturerList from './lecture-list';

export default function AdminLecturersList() {
  const router = useRouter();
  return (
    <div className='space-y-6'>
      {/* Page Title */}
      <div className='flex items-center justify-between gap-3'>
        <div>
          <h1 className='text-2xl font-merriweather'>Dėstytojai</h1>
          {/* Breadcrumbs */}
          <Breadcrumbs />
        </div>
        <Button
          variant='default'
          onClick={() => {
            router.push('/dashboard/lecturers/add');
          }}>
          Pridėti dėstytoją
        </Button>
      </div>
      <LecturerList />
    </div>
  );
}
