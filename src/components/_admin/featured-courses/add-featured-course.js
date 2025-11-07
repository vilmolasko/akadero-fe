import FeaturedCourseForm from "@/components/forms/featured-course";
import React from "react";

export default async function AddCourse() {
  const organizerRes = await fetch(
    process.env.BASE_URL + "/api/organizers/all",
    {
      cache: "no-store",
    }
  );

  const { data: AllOrganizers } = await organizerRes.json();

  return <FeaturedCourseForm organizers={AllOrganizers} />;
}
