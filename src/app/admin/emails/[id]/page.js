import Breadcrumbs from '@/layouts/_admin/breadcrumb';
import EmailThreadDetails from '@/components/_admin/emails/email-details';

export default async function Page({ params }) {
  const { id } = await params;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-merriweather">El. laiško užklausa</h1>
          <Breadcrumbs />
        </div>
      </div>

      <EmailThreadDetails id={id} />
    </div>
  );
}
