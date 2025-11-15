import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'; // Breadcrumb components
import LecturersMain from '@/components/_main/lecturers'; // LecturersList components
// ✅ Base URL (set once for all fetches)
const baseUrl = process.env.BASE_URL;

export default async function LecturersPage() {
  const res2 = await fetch(`${baseUrl}/api/filters`, {
    next: { revalidate: 60 }, // Revalidate every 60 seconds
  });

  const response = await res2.json();

  const { filters } = response;
  return (
    <div className='layout-container py-4 md:py-9'>
      <div>
        {/* Page Title */}
        <h1 className='text-3xl sm:text-4xl lg:text-5xl font-bold font-merriweather tracking-wide text-foreground mb-2'>
          Mokytojai
        </h1>
        {/* Breadcrumb */}
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href='/'>Pradžia</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Mokytojai</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      {/* Courses List Component */}
      <LecturersMain filters={filters} />
    </div>
  );
}
