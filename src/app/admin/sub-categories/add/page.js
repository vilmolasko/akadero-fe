import Breadcrumbs from '@/layouts/_admin/breadcrumb';
import AddSubCategory from '@/components/_admin/sub-categories/add-sub-category';

export default async function DashboardPage() {
  const data = await fetch(process.env.BASE_URL + `/api/categories/all`, {
    cache: 'no-store',
  });

  const { data: categories } = await data.json();

  return (
    <div className='space-y-6'>
      {/* Page Title */}
      <div className='flex items-center justify-between gap-3'>
        <div>
          <h1 className='text-2xl font-merriweather'>Pridėti subkategoriją</h1>
          {/* Breadcrumbs */}
          <Breadcrumbs />
        </div>
      </div>
      <div className='relative'>
        <AddSubCategory categories={categories} />
      </div>

      {/* More dashboard sections can be added here */}
    </div>
  );
}
