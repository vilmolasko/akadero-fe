import HomePage from "@/components/_main/home";

export const revalidate = 60; // Page ISR window

const baseUrl = process.env.BASE_URL;

export default async function Home() {
  const res = await fetch(`${baseUrl}/api/home/categories`, {
    next: { revalidate: 60 }, // Fetch cache window
  });
  const { data } = await res.json();

  const res2 = await fetch(`${baseUrl}/api/home/courses`, {
    next: { revalidate: 60 }, // Fetch cache window
  });
  const { data: homeCourses } = await res2.json();

  return (
    <div className="layout-container">
      <HomePage categories={data} startCourses={homeCourses} />
    </div>
  );
}
