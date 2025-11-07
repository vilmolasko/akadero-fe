"use client";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import * as api from "@/services";
import toast from "react-hot-toast";
import CourseForm from "@/components/forms/course";

export default function EditCourse({
  categories,
  lecturers,
  organizers,
  slug,
}) {
  const { data, isPending } = useQuery({
    queryKey: ["course  ", slug],
    queryFn: () => api.getCourseByAdmin(slug),
    retry: false,
    enabled: !!slug,
    throwOnError: false,
    onError: (err) => {
      toast.error(err?.response?.data?.message || "Something went wrong!");
    },
  });
  return (
    <CourseForm
      currentCourse={data?.data}
      isLoading={isPending}
      categories={categories}
      organizers={organizers}
      lecturers={lecturers}
    />
  );
}
