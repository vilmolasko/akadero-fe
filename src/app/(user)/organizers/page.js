import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'; // Breadcrumb components
import OrganizersList from '@/components/_main/organizers'; // OrganizersList components

const baseUrl = process.env.BASE_URL;

export default async function OrganizersPage() {
  const res = await fetch(`${baseUrl}/api/filters`, {
    next: { revalidate: 60 }, // Revalidate every 60 seconds
  });

  const response = await res.json();

  const { filters } = response;
  return (
    <div className='layout-container py-4 md:py-9'>
      <div>
        {/* Page Title */}
        <h1 className='text-3xl sm:text-4xl lg:text-5xl font-bold font-merriweather tracking-wide text-foreground mb-2'>
          Organizatoriai
        </h1>
        {/* Breadcrumb */}
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href='/'>Pradžia</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Organizatoriai</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      {/* Organizers List Component */}
      <OrganizersList filters={filters} />
    </div>
  );
}
