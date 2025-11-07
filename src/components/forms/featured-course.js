'use client';
import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useRouter } from '@bprogress/next';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card } from '@/components/ui/card';
import { useMutation, useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import * as api from '@/services';
import { cn } from '@/lib/utils';
import { useDebounce } from '@/hooks/use-debounce';
import { Loader2, Search } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

// ✅ Vertimas į lietuvių kalbą – validacijos schema
const featuredSchema = Yup.object({
  course: Yup.string().required('Kursas yra privalomas'),
  totalCost: Yup.number()
    .required('Bendra kaina yra privaloma')
    .min(0, 'Kaina negali būti neigiama'),
  discount: Yup.number()
    .min(0, 'Mažiausia nuolaida yra 0%')
    .max(100, 'Didžiausia nuolaida yra 100%'),
  expire: Yup.date().required('Galiojimo data yra privaloma'),
  isActive: Yup.boolean().required(),
  priority: Yup.number().min(1, 'Mažiausias prioritetas yra 1').required(),
  label: Yup.string().nullable(),
});

export default function FeaturedCourseForm({ currentFeatured, organizers }) {
  const router = useRouter();
  const [search, setSearch] = React.useState('');
  const [showList, setShowList] = React.useState(false);
  const debouncedSearch = useDebounce(search, 400);
  const { mutate, isPending } = useMutation({
    mutationFn: currentFeatured
      ? api.updateFeaturedCourseByAdmin
      : api.addFeaturedCourseByAdmin,
    onSuccess: (data) => {
      toast.success(data.message || 'Išsaugota sėkmingai!');
      router.push('/admin/featured-courses');
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || 'Įvyko klaida!');
    },
  });

  const formik = useFormik({
    initialValues: {
      course: currentFeatured?.course._id || '',
      organizer: currentFeatured?.course.organizer._id,
      totalCost: currentFeatured?.totalCost || '',
      discount: currentFeatured?.discount || 0,
      expire: currentFeatured?.expire
        ? new Date(currentFeatured.expire).toISOString().split('T')[0]
        : '',
      isActive: currentFeatured?.isActive ?? true,
      priority: currentFeatured?.priority || 1,
      label: currentFeatured?.label || '',
    },
    enableReinitialize: true,
    validationSchema: featuredSchema,
    onSubmit: async (values) => {
      try {
        const { organizer, ...rest } = values;
        mutate({
          ...rest,
          ...(currentFeatured && { _id: currentFeatured._id }),
        });
      } catch (error) {
        console.error(error);
      }
    },
  });

  const queryString = React.useMemo(() => {
    const params = new URLSearchParams();
    params.set('limit', 1000);
    if (debouncedSearch) params.set('search', debouncedSearch);
    if (formik.values.organizer)
      params.set('organizer', formik.values.organizer);
    return params.toString();
  }, [debouncedSearch, formik.values.organizer]);

  const { data: courses, isPending: isLoading } = useQuery({
    queryKey: ['courses', queryString],
    queryFn: () => api.getCoursesByAdmin(queryString),
    enabled: showList && Boolean(debouncedSearch),
    staleTime: 1000 * 30,
  });

  const handleSelectCourse = (course) => {
    formik.setFieldValue('course', course._id);
    setSearch(course.title);
    setShowList(false);
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearch(value);
    setShowList(Boolean(value));
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className='grid grid-cols-1 md:grid-cols-12 gap-6'>
        <Card className='col-span-12 md:col-span-7 space-y-5 p-5'>
          <div>
            <Label>Organizatorius</Label>
            <Select
              value={formik.values.organizer}
              onValueChange={(val) => formik.setFieldValue('organizer', val)}>
              <SelectTrigger>
                <SelectValue placeholder='Pasirinkite organizatorių' />
              </SelectTrigger>
              <SelectContent>
                {organizers?.map((organizer) => (
                  <SelectItem
                    key={organizer._id}
                    value={organizer._id}>
                    {organizer.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Kursas */}
          <div>
            <Label>Kursas</Label>
            <div className='relative'>
              <Input
                placeholder='Ieškokite kurso pagal pavadinimą...'
                value={search}
                onChange={handleSearchChange}
                onFocus={() => {
                  if (search) setShowList(true);
                }}
                className='pl-9'
              />
              <Search className='absolute left-2 top-2.5 h-4 w-4 text-gray-400' />
            </div>

            {showList && (
              <div className='border rounded-md mt-2 max-h-56 overflow-hidden'>
                {isLoading ? (
                  <div className='flex items-center justify-center py-3'>
                    <Loader2 className='animate-spin h-5 w-5 text-gray-500' />
                  </div>
                ) : (
                  <ScrollArea
                    className='max-h-[200px]'
                    style={{ height: 200, overflow: 'auto' }}>
                    {courses?.data?.length > 0 ? (
                      courses.data.map((course) => (
                        <div
                          key={course._id}
                          onClick={() => handleSelectCourse(course)}
                          className={cn(
                            'cursor-pointer px-3 py-2 hover:bg-gray-100 text-sm',
                            formik.values.course === course._id &&
                              'bg-gray-100 font-medium'
                          )}>
                          {course.title}
                        </div>
                      ))
                    ) : (
                      <p className='text-sm text-gray-500 p-3 text-center'>
                        Kursų nerasta
                      </p>
                    )}
                  </ScrollArea>
                )}
              </div>
            )}

            {formik.touched.course && formik.errors.course && (
              <p className='text-sm text-red-500 mt-1'>
                {formik.errors.course}
              </p>
            )}
          </div>

          {/* Bendra kaina */}
          <div>
            <Label>Bendra kaina</Label>
            <Input
              type='number'
              name='totalCost'
              placeholder='Įveskite bendrą kainą'
              value={formik.values.totalCost}
              onChange={formik.handleChange}
              className={cn(
                formik.touched.totalCost &&
                  formik.errors.totalCost &&
                  'border-red-500'
              )}
            />
            {formik.touched.totalCost && formik.errors.totalCost && (
              <p className='text-sm text-red-500 mt-1'>
                {formik.errors.totalCost}
              </p>
            )}
          </div>

          {/* Nuolaida */}
          <div>
            <Label>Nuolaida (%)</Label>
            <Input
              type='number'
              name='discount'
              placeholder='0–100'
              value={formik.values.discount}
              onChange={formik.handleChange}
              className={cn(
                formik.touched.discount &&
                  formik.errors.discount &&
                  'border-red-500'
              )}
            />
            {formik.touched.discount && formik.errors.discount && (
              <p className='text-sm text-red-500 mt-1'>
                {formik.errors.discount}
              </p>
            )}
          </div>

          {/* Galiojimo data */}
          <div>
            <Label>Galiojimo data</Label>
            <Input
              type='date'
              name='expire'
              value={formik.values.expire}
              onChange={formik.handleChange}
              className={cn(
                formik.touched.expire &&
                  formik.errors.expire &&
                  'border-red-500'
              )}
            />
            {formik.touched.expire && formik.errors.expire && (
              <p className='text-sm text-red-500 mt-1'>
                {formik.errors.expire}
              </p>
            )}
          </div>
        </Card>

        <Card className='col-span-12 md:col-span-5 space-y-5 p-5'>
          {/* Prioritetas */}
          <div>
            <Label>Prioritetas</Label>
            <Input
              type='number'
              name='priority'
              value={formik.values.priority}
              onChange={formik.handleChange}
            />
          </div>

          {/* Etiketė */}
          <div>
            <Label>Pritaikyta etiketė (nebūtina)</Label>
            <Input
              type='text'
              name='label'
              placeholder='pvz. Dienos pasiūlymas'
              value={formik.values.label}
              onChange={formik.handleChange}
            />
          </div>

          {/* Būsena */}
          <div>
            <Label>Būsena</Label>
            <Select
              value={formik.values.isActive ? 'active' : 'inactive'}
              onValueChange={(val) =>
                formik.setFieldValue('isActive', val === 'active')
              }>
              <SelectTrigger>
                <SelectValue placeholder='Pasirinkite būseną' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='active'>Aktyvus</SelectItem>
                <SelectItem value='inactive'>Neaktyvus</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Mygtukas */}
          <Button
            type='submit'
            size='lg'
            className='w-full'
            disabled={isPending}>
            {isPending
              ? 'Saugoma...'
              : currentFeatured
              ? 'Atnaujinti išskirtinį kursą'
              : 'Pridėti išskirtinį kursą'}
          </Button>
        </Card>
      </div>
    </form>
  );
}
