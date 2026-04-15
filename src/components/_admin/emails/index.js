import Breadcrumbs from '@/layouts/_admin/breadcrumb';
import EmailThreadsList from './email-list';

export default function AdminEmailThreads() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-merriweather">El. laiškai</h1>
          <Breadcrumbs />
        </div>
      </div>

      <EmailThreadsList />
    </div>
  );
}
