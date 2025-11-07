"use client";
import Breadcrumbs from "@/layouts/_admin/breadcrumb";
import AddLecturer from "@/components/_admin/lecturers/add-lecturer";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Page Title */}
      <div className="flex items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-merriweather">Add Lecturer</h1>
          {/* Breadcrumbs */}
          <Breadcrumbs />
        </div>
      </div>
      <div className="relative">
        <AddLecturer admin />
      </div>

      {/* More dashboard sections can be added here */}
    </div>
  );
}
