import Breadcrumbs from '@/layouts/_admin/breadcrumb';
import AddCategory from '@/components/_admin/categories/add-category';

export default function DashboardPage() {
  return (
    <div className='space-y-6'>
      {/* Page Title */}
      <div className='flex items-center justify-between gap-3'>
        <div>
          <h1 className='text-2xl font-merriweather'>Pridėti kategoriją</h1>
          <Breadcrumbs />
        </div>
      </div>
      <div className='relative'>
        <AddCategory />
      </div>
    </div>
  );
}
