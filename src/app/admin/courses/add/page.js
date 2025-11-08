import Breadcrumbs from "@/layouts/_admin/breadcrumb";
import AddCourse from "@/components/_admin/courses/add-course";

export default async function DashboardPage() {
  const res1 = await fetch(process.env.BASE_URL + "/api/categories/all", {
    cache: "no-store",
  });
  const res2 = await fetch(process.env.BASE_URL + "/api/lecturers/all", {
    cache: "no-store",
  });
  const res3 = await fetch(process.env.BASE_URL + "/api/organizers/all", {
    cache: "no-store",
  });
  const { data: categories } = await res1.json();
  const { data: lecturers } = await res2.json();
  const { data: organizers } = await res3.json();
  return (
    <div className="space-y-6">
      {/* Page Title */}
      <div className="flex items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-merriweather">Pridėti kursą</h1>
          {/* Breadcrumbs */}
          <Breadcrumbs />
        </div>
      </div>
      <div className="relative">
        <AddCourse
          categories={categories ?? []}
          lecturers={lecturers ?? []}
          organizers={organizers ?? []}
        />
      </div>
    </div>
  );
}
