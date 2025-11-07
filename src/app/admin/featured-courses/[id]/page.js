import Breadcrumbs from '@/layouts/_admin/breadcrumb';
import EditFeaturedCourse from '@/components/_admin/featured-courses/edit-featured-course';
import * as api from '@/services';

export default async function Page({ params }) {
  const { id } = await params;
  const organizerRes = await fetch(
    process.env.BASE_URL + '/api/organizers/all',
    {
      cache: 'no-store',
    }
  );
  const { data: AllOrganizers } = await organizerRes.json();
  return (
    <div className='space-y-6'>
      <div className='flex items-center justify-between gap-3'>
        <div>
          <h1 className='text-2xl font-merriweather'>Redaguoti siūlomus</h1>
          <Breadcrumbs />
        </div>
      </div>
      <div className='relative'>
        <EditFeaturedCourse
          id={id}
          organizers={AllOrganizers}
        />
      </div>
    </div>
  );
}
