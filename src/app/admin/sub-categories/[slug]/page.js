import Breadcrumbs from '@/layouts/_admin/breadcrumb';
import EditSubCategory from '@/components/_admin/sub-categories/edit-sub-category';

export default async function DashboardPage({ params }) {
  const { slug } = await params;
  const data = await fetch(process.env.BASE_URL + `/api/categories/all`, {
    cache: 'no-store',
  });

  const { data: categories } = await data.json();
  return (
    <div className='space-y-6'>
      {/* Page Title */}
      <div className='flex items-center justify-between gap-3'>
        <div>
          <h1 className='text-2xl font-merriweather'>
            Redaguoti subkategoriją
          </h1>
          {/* Breadcrumbs */}
          <Breadcrumbs />
        </div>
      </div>
      <div className='relative'>
        <EditSubCategory
          slug={slug}
          categories={categories}
        />
      </div>

      {/* More dashboard sections can be added here */}
    </div>
  );
}
