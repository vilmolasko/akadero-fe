import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import LecturerDetail from '@/components/_main/lecturer-detail';

// Static generation with ISR
export const revalidate = 60;

// ✅ Base URL (set once for all fetches)
const baseUrl = process.env.BASE_URL;
// ✅ Generate metadata per product
export async function generateMetadata({ params }) {
  const { lid } = await params;
  const res = await fetch(`${baseUrl}/api/lecturers/${lid}`, {
    cache: 'force-cache', // Prefer cached
  });

  const { data } = await res.json();

  if (!data) return {};

  return {
    title: data?.lecturer.name || data?.lecturer.name,
    description: data?.lecturer.description || data?.lecturer.description,
    keywords: data?.lecturer.tags || [],
    openGraph: {
      title: data?.lecturer.name,
      description: data?.lecturer.description,
      images: data?.lecturer?.cover?.url,
    },
  };
}

export default async function Page({ params }) {
  const { lid } = await params;

  const res = await fetch(`${baseUrl}/api/lecturers/${lid}`, {
    next: { revalidate: 60 }, // Revalidate every 60 seconds
  });

  const response = await res.json();

  const { data } = await response;
  return (
    <div className='layout-container py-4 md:py-9'>
      <div>
        {/* Page Title */}
        <h1 className='text-3xl sm:text-4xl lg:text-5xl font-bold font-merriweather tracking-wide text-foreground mb-2'>
          {data?.lecturer?.name}
        </h1>
        {/* Breadcrumb */}
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href='/'>Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href='/lecturers'>Lecturers</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{data?.lecturer?.name}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      {/* Component */}
      <LecturerDetail data={data?.lecturer} />
    </div>
  );
}
