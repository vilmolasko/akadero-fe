"use client";
import Breadcrumbs from "@/layouts/_admin/breadcrumb";
import EditLecturer from "@/components/_admin/lecturers/edit-lecturer";

export default async function Page({ params }) {
  const { id } = await params;
  return (
    <div className="space-y-6">
      {/* Page Title */}
      <div className="flex items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-merriweather">Edit Lecturer</h1>
          {/* Breadcrumbs */}
          <Breadcrumbs />
        </div>
      </div>
      <div className="relative">
        <EditLecturer id={id} admin />
      </div>
    </div>
  );
}
