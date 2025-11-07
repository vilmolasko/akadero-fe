import http from './http';

//------------ Auth -------------  //

export const register = async ({ ...payload }) => {
  const { data } = await http.post(`/auth/sign-up`, payload);
  return data;
};
export const verifyOTP = async ({ ...payload }) => {
  const { data } = await http.post(`/auth/verify-otp`, payload);
  return data;
};
export const resendOTP = async ({ ...payload }) => {
  const { data } = await http.post(`/auth/resend-otp`, payload);
  return data;
};

export const login = async ({ ...payload }) => {
  const { data } = await http.post(`/auth/sign-in`, payload);
  return data;
};

export const forgetPassword = async ({ ...payload }) => {
  const { data } = await http.post('/auth/forget-password', payload);
  return data;
};

export const resetPassword = async ({ newPassword, token }) => {
  const { data } = await http.post('/auth/reset-password', {
    newPassword: newPassword,
    token: token,
  });
  return data;
};

//  ------------ Admin Categories -------------  //

export const getAllAdminCategories = async () => {
  const { data } = await http.get(`/categories/all`);
  return data;
};
export const getCategoriesByAdmin = async (params) => {
  const { data } = await http.get(`/admin/categories?${params}`);
  return data;
};
export const getCategoryByAdmin = async (slug) => {
  const { data } = await http.get(`/admin/categories/${slug}`);
  return data;
};
export const deleteCategoryByAdmin = async (slug) => {
  const { data } = await http.delete(`/admin/categories/${slug}`);
  return data;
};
export const addCategoryByAdmin = async ({ ...payload }) => {
  const { data } = await http.post(`/admin/categories`, payload);
  return data;
};
export const updateCategoryByAdmin = async ({ ...payload }) => {
  const { currentSlug, ...others } = payload;
  const { data } = await http.put(`/admin/categories/${currentSlug}`, others);
  return data;
};
//  ------------ Delete Image -------------  //
export const singleDeleteFile = async (id) => {
  const { data } = await http.delete(`/delete-file/${id}`);
  return data;
};

//  ------------ Admin Dashboard -------------  //

export const getAnalyticsByAdmin = async (range) => {
  const { data } = await http.get(`/admin/dashboard-analytics?range=${range}`);
  return data;
};

//  ------------ Admin Sub Categories -------------  //

export const getAllSubCategoriesByAdmin = async () => {
  const { data } = await http.get(`/admin/all-sub-categories`);
  return data;
};

export const getSubCategoryByAdmin = async (slug) => {
  const { data } = await http.get(`/admin/sub-categories/${slug}`);
  return data;
};
export const getSubCategoriesByAdmin = async (params) => {
  const { data } = await http.get(`/admin/sub-categories?${params}`);
  return data;
};

export const deleteSubCategoryByAdmin = async (slug) => {
  const { data } = await http.delete(`/admin/sub-categories/${slug}`);
  return data;
};
export const addSubCategoryByAdmin = async ({ ...payload }) => {
  const { data } = await http.post(`/admin/sub-categories`, payload);
  return data;
};
export const updateSubCategoryByAdmin = async ({ ...payload }) => {
  const { currentSlug, ...others } = payload;
  const { data } = await http.put(
    `/admin/sub-categories/${currentSlug}`,
    others
  );
  return data;
};

//  ------------ Admin Lecturers -------------  //
export const getAllAdminLecturers = async () => {
  const { data } = await http.get(`/lecturers/all`);
  return data;
};

export const getLecturerByAdmin = async (id) => {
  const { data } = await http.get(`/admin/lecturers/${id}`);
  return data;
};
export const getLecturersByAdmin = async (params) => {
  const { data } = await http.get(`/admin/lecturers?${params}`);
  return data;
};

export const deleteLecturerByAdmin = async (id) => {
  const { data } = await http.delete(`/admin/lecturers/${id}`);
  return data;
};
export const addLecturerByAdmin = async ({ ...payload }) => {
  const { data } = await http.post(`/admin/lecturers`, payload);
  return data;
};
export const updateLecturerByAdmin = async ({ ...payload }) => {
  const { currentId, ...others } = payload;
  const { data } = await http.put(`/admin/lecturers/${currentId}`, others);
  return data;
};
//  ------------ Admin Organizers -------------  //
export const getAllAdminOrganizers = async () => {
  const { data } = await http.get(`/organizers/all`);
  return data;
};

export const getOrganizerByAdmin = async (id) => {
  const { data } = await http.get(`admin/organizers/${id}`);
  return data;
};
export const getOrganizersByAdmin = async (params) => {
  const { data } = await http.get(`/admin/users?${params}`);
  return data;
};
export const updateOrganizersByAdmin = async (id) => {
  console.log(id, status, 'service');
  const { data } = await http.put(`/admin/users/status/${id}`);
  return data;
};
//  ------------ Admin Courses -------------  //
export const getCourseByAdmin = async (slug) => {
  const { data } = await http.get(`/admin/courses/${slug}`);
  return data;
};
export const getCoursesByAdmin = async (params) => {
  const { data } = await http.get(`/admin/courses?${params}`);
  return data;
};

export const deleteCourseByAdmin = async (id) => {
  const { data } = await http.delete(`/admin/courses/${id}`);
  return data;
};
export const addCourseByAdmin = async ({ ...payload }) => {
  const { data } = await http.post(`/admin/courses`, payload);
  return data;
};
export const updateCourseByAdmin = async ({ ...payload }) => {
  const { currentSlug, ...others } = payload;
  const { data } = await http.put(`/admin/courses/${currentSlug}`, others);
  return data;
};
//  ------------ Admin featured courses -------------  //
export const getFeaturedCoursesByAdmin = async (params) => {
  const { data } = await http.get(`/admin/featured?${params}`);
  return data;
};
export const getFeaturedCourseByAdmin = async (params) => {
  const { data } = await http.get(`/admin/featured/${params}`);
  return data;
};
export const addFeaturedCourseByAdmin = async ({ ...payload }) => {
  const { data } = await http.post(`/admin/featured`, payload);
  return data;
};
export const updateFeaturedCourseByAdmin = async ({ ...payload }) => {
  const { _id, ...others } = payload;
  const { data } = await http.put(`/admin/featured/${_id}`, others);
  return data;
};

export const deleteFeaturedCourseByAdmin = async (id) => {
  const { data } = await http.delete(`/admin/featured/${id}`);
  return data;
};
//  ------------ Admin students -------------  //

export const getStudentsByAdmin = async (params) => {
  const { data } = await http.get(`/admin/students?${params}`);
  return data;
};

export const deleteStudentByAdmin = async (id) => {
  const { data } = await http.delete(`/admin/students/${id}`);
  return data;
};
//  ------------ Admin Newsletter -------------  //
export const getNewsletter = async (params) => {
  const { data } = await http.get(`/admin/newsletter?${params}`);
  return data;
};
//  ------------ Admin Profile -------------  //

export const getProfile = async () => {
  const { data } = await http.get(`/users/profile`);
  return data;
};
export const updateProfile = async ({ ...payload }) => {
  const { data } = await http.put(`/users/profile`, payload);
  return data;
};

//  ------------ Organizer Lecturers -------------  //
export const getAllOrganizerLecturers = async () => {
  const { data } = await http.get(`/lecturers/all`);
  return data;
};
export const getAnalyticsByOrganizer = async (range) => {
  const { data } = await http.get(
    `/organizer/dashboard-analytics?range=${range}`
  );
  return data;
};
export const getLecturerByOrganizer = async (id) => {
  const { data } = await http.get(`/organizer/lecturers/${id}`);
  return data;
};
export const getLecturersByOrganizer = async (params) => {
  const { data } = await http.get(`/organizer/lecturers?${params}`);
  return data;
};

export const deleteLecturerByOrganizer = async (id) => {
  const { data } = await http.delete(`/organizer/lecturers/${id}`);
  return data;
};
export const addLecturerByOrganizer = async ({ ...payload }) => {
  const { data } = await http.post(`/organizer/lecturers`, payload);
  return data;
};
export const updateLecturerByOrganizer = async ({ ...payload }) => {
  const { currentId, ...others } = payload;
  const { data } = await http.put(`/organizer/lecturers/${currentId}`, others);
  return data;
};
//  ------------ Organizer Courses -------------  //
export const getCourseByOrganizer = async (slug) => {
  const { data } = await http.get(`/organizer/courses/${slug}`);
  return data;
};
export const getCoursesByOrganizer = async (params) => {
  const { data } = await http.get(`/organizer/courses?${params}`);
  return data;
};

export const deleteCourseByOrganizer = async (id) => {
  const { data } = await http.delete(`/organizer/courses/${id}`);
  return data;
};
export const addCourseByOrganizer = async ({ ...payload }) => {
  const { data } = await http.post(`/organizer/courses`, payload);
  return data;
};
export const updateCourseByOrganizer = async ({ ...payload }) => {
  const { currentSlug, ...others } = payload;
  const { data } = await http.put(`/organizer/courses/${currentSlug}`, others);
  return data;
};
//  ------------ Organizers students -------------  //

export const getStudentsByOrganizer = async (params) => {
  const { data } = await http.get(`/organizer/students?${params}`);
  return data;
};
export const getOrganizerCourses = async () => {
  const { data } = await http.get(`/organizer/all-courses`);
  return data;
};
export const deleteStudentByOrganizer = async (id) => {
  const { data } = await http.delete(`/organizer/students/${id}`);
  return data;
};
//  ------------ Organizer Profile -------------  //

export const getOrganizerProfile = async () => {
  const { data } = await http.get(`/organizer/profile`);
  return data;
};
export const createOrganizerProfile = async ({ ...payload }) => {
  const { data } = await http.post(`/organizer/profile`, payload);
  return data;
};
export const updateOrganizerProfile = async ({ ...payload }) => {
  const { data } = await http.put(`/organizer/profile`, payload);
  return data;
};

//  ------------ /////// -------------  //

//  ------------ User Side APIs -------------  //

//  ------------ /////// -------------  //

//  ------------ home  -------------  //
export const getHomeCategories = async () => {
  const { data } = await http.get(`/home/categories`);
  return data;
};
export const getFeaturedCourses = async () => {
  const { data } = await http.get(`/home/courses/featured`);
  return data;
};
export const getStartLearningCourses = async () => {
  const { data } = await http.get(`/home/courses`);
  return data;
};
// export const getLecturers = async () => {
//   const { data } = await http.get(`/lecturers`);
//   return data;
// };
export const getLecturers = async (query) => {
  const { data } = await http.get(`/lecturers?${query}`);
  return data;
};
export const getOrganizers = async (query) => {
  const { data } = await http.get(`/organizers?${query}`);
  return data;
};
export const getFilterCourses = async (query) => {
  const { data } = await http.get(`/courses?${query}`);
  return data;
};
export const createInquiryByCourse = async ({ courseId, ...payload }) => {
  const { data } = await http.post(`course/inquiry/${courseId}`, payload);
  return data;
};
export const createInquiryByOrganizer = async ({ slug, ...payload }) => {
  const { data } = await http.post(`organizer/inquiry/${slug}`, payload);
  return data;
};

export const registerStudent = async ({ ...payload }) => {
  const { courseId, scheduleId, ...others } = payload;
  const { data } = await http.post(
    `/courses/${courseId}/schedules/${scheduleId}/students`,
    others
  );
  return data;
};
export const sendNewsletter = async (payload) => {
  const { data } = await http.post(`/newsletter`, payload);
  return data;
};
