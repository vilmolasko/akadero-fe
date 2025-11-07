"use client";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import * as api from "@/services";
import toast from "react-hot-toast";
import CourseFeaturedForm from "@/components/forms/featured-course";

export default function EditFeaturedCourse({ organizers, id }) {
  const { data, isPending } = useQuery({
    queryKey: ["featured-course  ", id],
    queryFn: () => api.getFeaturedCourseByAdmin(id),
    retry: false,
    enabled: !!id,
    throwOnError: false,
    onError: (err) => {
      toast.error(err?.response?.data?.message || "Something went wrong!");
    },
  });
  return (
    <CourseFeaturedForm
      organizers={organizers}
      currentFeatured={data?.data}
      isLoading={isPending}
    />
  );
}
