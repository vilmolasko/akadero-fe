import Breadcrumbs from '@/layouts/_admin/breadcrumb';
import { Button } from '@/components/ui/button';
import SubCategoryList from './sub-category-list';

export default async function SubCategoriesList() {
  const res = await fetch(process.env.BASE_URL + '/api/categories/all', {
    cache: 'no-store',
  });
  const { data: categories } = await res.json();
  return (
    <div className='space-y-6'>
      <div className='flex items-center justify-between gap-3'>
        <div>
          <h1 className='text-2xl font-merriweather'>Subkategorijos</h1>
          <Breadcrumbs />
        </div>
        <Button
          variant='default'
          href='/admin/sub-categories/add'>
          Pridėti subkategoriją
        </Button>
      </div>
      <SubCategoryList categories={categories} />
    </div>
  );
}
