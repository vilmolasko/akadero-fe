import HomePage from '@/components/_main/home';
import * as api from '@/services';

export default async function Home() {
  const categories = await api.getHomeCategories();
  // const featuredCourses = await api.getFeaturedCourses();
  const startCourses = await api.getStartLearningCourses();
  return (
    <div className='layout-container '>
      <HomePage
        categories={categories?.data}
        // featuredCourses={featuredCourses?.data}
        startCourses={startCourses?.data}
      />
    </div>
  );
}
