import Breadcrumbs from '@/layouts/_admin/breadcrumb';
import EditCategory from '@/components/_admin/categories/edit-category';

export default async function Page({ params }) {
  const { slug } = await params;
  return (
    <div className='space-y-6'>
      {/* Page Title */}
      <div className='flex items-center justify-between gap-3'>
        <div>
          <h1 className='text-2xl font-merriweather'>Redaguoti kategoriją</h1>
          {/* Breadcrumbs */}
          <Breadcrumbs />
        </div>
      </div>
      <div className='relative'>
        <EditCategory slug={slug} />
      </div>
    </div>
  );
}
