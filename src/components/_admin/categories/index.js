import Breadcrumbs from '@/layouts/_admin/breadcrumb';
import { Button } from '@/components/ui/button';
import CategoryList from './category-list';

export default function CategoriesList() {
  return (
    <div className='space-y-6'>
      {/* Page Title */}
      <div className='flex items-center justify-between gap-3'>
        <div>
          <h1 className='text-2xl font-merriweather'>Kategorijos</h1>
          {/* Breadcrumbs */}
          <Breadcrumbs />
        </div>
        <Button
          variant='default'
          href='/admin/categories/add'>
          Pridėti kategoriją
        </Button>
      </div>
      <CategoryList />
    </div>
  );
}
