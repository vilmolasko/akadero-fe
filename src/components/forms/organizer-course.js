'use client';

import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useRouter } from '@bprogress/next';

import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import { Card } from '@/components/ui/card';
import { PlusCircle, X } from 'lucide-react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import ShadcnDropzone from '../upload/single-upload';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import * as api from '@/services';
import { Multiselect } from 'multiselect-react-dropdown';
import { useSelector } from 'react-redux';
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input';

// const statusOptions = [
//   { name: 'Paskelbta', slug: 'published' },
//   { name: 'Laukiama', slug: 'pending' },
//   { name: 'Vykdoma', slug: 'inProgress' },
//   { name: 'Užbaigta', slug: 'completed' },
//   { name: 'Archyvuota', slug: 'archived' },
// ];
const levelOptions = [
  'Pradedantysis',
  'Vidutinis',
  'Pažengęs',
  'Ekspertas',
  'Visi lygiai',
];

const compensatedOptions = [
  'Nefinansuojama',
  'Užimtumo tarnyba (UŽT)',
  'LR Švietimo, mokslo ir sporto ministerija',
];

const typeOptions = [
  'Kursai',
  'Vidinis mokymas',
  'Dirbtuvės',
  'Mokymų įrašai',
  'Seminarai',
  'Internetiniai seminarai',
  'Konferencijos',
];

const languageOptions = [
  'Anglų',
  'Lietuvių',
  'Rusų',
  'Arabų',
  'Ispanų',
  'Prancūzų',
  'Vokiečių',
  'Kinų',
];

// Helper function to format duration for display
const formatDuration = (minutes) => {
  if (!minutes || minutes === 0) return '0 minutes';

  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;

  if (hours === 0) return `${minutes} minute${minutes !== 1 ? 's' : ''}`;
  if (mins === 0) return `${hours} hour${hours !== 1 ? 's' : ''}`;

  return `${hours} hour${hours !== 1 ? 's' : ''} ${mins} minute${
    mins !== 1 ? 's' : ''
  }`;
};

const CourseSchema = Yup.object().shape({
  category: Yup.string().required('Kategorija yra privaloma'),
  subCategory: Yup.string().required('Subkategorija yra privaloma'),
  cover: Yup.mixed().required('Paveikslėlis yra privalomas'),
  title: Yup.string().required('Pavadinimas yra privalomas'),
  type: Yup.array()
    .of(Yup.string())
    .min(1, 'Reikia pasirinkti bent vieną tipą')
    .required('Kurso tipas yra privalomas'),
  level: Yup.string().required('Kurso lygis yra privalomas'),
  language: Yup.array()
    .of(Yup.string())
    .min(1, 'Reikia pasirinkti bent vieną kalbą')
    .required('Kurso kalba yra privaloma'),
  graduationDocument: Yup.boolean()
    .required('Prašome pasirinkti parinktį')
    .oneOf([true, false], 'Neteisingas pasirinkimas'),
  slug: Yup.string().required('Nuoroda yra privaloma'),
  duration: Yup.number()
    .min(0, 'Trukmė turi būti teigiama')
    .required('Trukmė yra privaloma'),
  metaTitle: Yup.string().required('Meta pavadinimas yra privalomas'),
  price: Yup.number()
    .min(0, 'Kaina turi būti teigiama')
    .required('Kaina yra privaloma'),
  shortDescription: Yup.string().required('Trumpas aprašymas yra privalomas'),
  metaDescription: Yup.string().required('Meta aprašymas yra privalomas'),
  description: Yup.string().required('Aprašymas yra privalomas'),
  list: Yup.string().nullable(),
  contact: Yup.string()
    .required('Telefono numeris yra privalomas')
    .test(
      'is-valid-phone',
      'Neteisingas telefono numeris',
      (value) => value && isValidPhoneNumber(value)
    ),
  // schedules: Yup.array()
  //   .of(
  //     Yup.object().shape({
  //       date: Yup.date().required('Data yra privaloma'),
  //       location: Yup.string().nullable(),
  //       seats: Yup.number().min(0, 'Vietų skaičius turi būti teigiamas').nullable(),
  //       comment: Yup.string().nullable(),
  //       students: Yup.number().min(0, 'Studentų skaičius turi būti teigiamas').nullable(),
  //     })
  //   )
  //   .min(1, 'Reikia pridėti bent vieną tvarkaraštį'),
  lecturers: Yup.array().of(Yup.string()).nullable(),
});

export default function OrganizerCourseForm({
  currentCourse = null,
  categories,
  lecturers,
}) {
  const { user } = useSelector(({ user }) => user);
  const router = useRouter();
  const { mutate, isPending } = useMutation({
    mutationFn: currentCourse
      ? api.updateCourseByOrganizer
      : api.addCourseByOrganizer,
    retry: false,
    onSuccess: (data) => {
      toast.success(data.message);

      router.push('/dashboard/courses');
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || 'Something went wrong!');
    },
  });

  const defaultSchedule = React.useMemo(
    () => [
      {
        date: new Date().toISOString(), // stable string value ✅
        location: '',
        seats: '',
        comment: '',
        students: [],
      },
    ],
    [] // never changes
  );

  const formik = useFormik({
    initialValues: {
      category:
        currentCourse?.category ||
        (categories.length && categories[0]?.id) ||
        '',
      organizer: user._id,
      subCategory: currentCourse?.subCategory || '',
      slug: currentCourse?.slug || '',
      duration: currentCourse?.duration || '',
      type: currentCourse?.type || [],
      language: currentCourse?.language || [],
      level: currentCourse?.level || '',
      graduationDocument: false,
      compensated: currentCourse?.compensated || '',
      cover: currentCourse?.cover || null,
      title: currentCourse?.title || '',
      metaTitle: currentCourse?.metaTitle || '',
      price: currentCourse?.price ?? '',
      shortDescription: currentCourse?.shortDescription || '',
      metaDescription: currentCourse?.metaDescription || '',
      description: currentCourse?.description || '',
      list: currentCourse?.list
        ? JSON.stringify(currentCourse.list, null, 2)
        : '',
      contact: currentCourse?.contact || '',
      // 👇 FIXED: schedules now stable
      schedules:
        currentCourse?.schedules && currentCourse.schedules.length > 0
          ? currentCourse.schedules
          : defaultSchedule,
      lecturers: currentCourse?.lecturers || [],
      // status: currentCourse?.status || statusOptions[0].slug || '',
      graduationDocument: currentCourse?.graduationDocument || false,
    },
    enableReinitialize: true,
    validationSchema: CourseSchema,
    onSubmit: async (values) => {
      const { cover, ...rest } = values;
      console.log('👉 Formik Category:', values);
      try {
        mutate({
          ...rest,
          cover,
          ...(currentCourse && {
            currentSlug: currentCourse.slug,
          }),
        });
      } catch (error) {
        console.error(error);
      }
    },
  });

  const handleNameChange = (e) => {
    const title = e.target.value;
    formik.setFieldValue('title', title);
    formik.setFieldValue('slug', title.toLowerCase().replace(/\s+/g, '-'));
  };

  React.useEffect(() => {
    if (currentCourse?.subCategory && formik.values.subCategory === '') {
      formik.setFieldValue('subCategory', currentCourse.subCategory);
    }
  }, [currentCourse, formik.values.subCategory, formik.setFieldValue]);

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className='grid grid-cols-1 md:grid-cols-12 gap-6'>
        {/* Left: main inputs */}
        <Card className='col-span-12 md:col-span-8 space-y-5 p-5'>
          {/* Category / Subcategory / Organizer */}
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div>
              <Label>Pavadinimas</Label>
              <Input
                value={formik.values.title}
                onChange={handleNameChange}
              />
              {formik.touched.title && formik.errors.title && (
                <p className='text-red-500 text-sm mt-1'>
                  {formik.errors.title}
                </p>
              )}
            </div>
            <div>
              <Label>Meta pavadinimas</Label>
              <Input
                value={formik.values.metaTitle}
                onChange={(e) =>
                  formik.setFieldValue('metaTitle', e.target.value)
                }
              />
              {formik.touched.metaTitle && formik.errors.metaTitle && (
                <p className='text-red-500 text-sm mt-1'>
                  {formik.errors.metaTitle}
                </p>
              )}
            </div>
            <div>
              <Label>Kategorija</Label>
              <Select
                value={formik.values.category}
                onValueChange={(v) => formik.setFieldValue('category', v)}>
                <SelectTrigger>
                  <SelectValue placeholder='Pasirinkite kategoriją' />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((c) => (
                    <SelectItem
                      key={c._id}
                      value={String(c._id)}>
                      {c.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {formik.touched.category && formik.errors.category && (
                <p className='text-red-500 text-sm mt-1'>
                  {formik.errors.category}
                </p>
              )}
            </div>

            <div>
              <Label>Subkategorija</Label>
              <Select
                value={formik.values.subCategory}
                onValueChange={(v) => formik.setFieldValue('subCategory', v)}>
                <SelectTrigger>
                  <SelectValue placeholder='Pasirinkite subkategoriją' />
                </SelectTrigger>
                <SelectContent>
                  {categories
                    .find((v) => v._id === formik.values.category)
                    ?.subCategories?.map((subCategory) => (
                      <SelectItem
                        key={subCategory._id}
                        value={String(subCategory._id)}>
                        {subCategory.name}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
              {formik.touched.subCategory && formik.errors.subCategory && (
                <p className='text-red-500 text-sm mt-1'>
                  {formik.errors.subCategory}
                </p>
              )}
            </div>
            <div>
              <Label>URL</Label>
              <Input
                value={formik.values.slug}
                onChange={formik.handleChange}
              />
              {formik.touched.slug && formik.errors.slug && (
                <p className='text-red-500 text-sm mt-1'>
                  {formik.errors.slug}
                </p>
              )}
            </div>
            <div>
              <Label>Kaina</Label>
              <Input
                type='number'
                value={formik.values.price}
                onChange={(e) => formik.setFieldValue('price', e.target.value)}
              />
              {formik.touched.price && formik.errors.price && (
                <p className='text-red-500 text-sm mt-1'>
                  {formik.errors.price}
                </p>
              )}
            </div>

            <div className='md:col-span-2 flex flex-col'>
              <Label>Trukmė (minutėmis)</Label>
              <Input
                type='number'
                min='1'
                step='1'
                placeholder='Enter duration in minutes'
                value={formik.values.duration}
                onChange={(e) =>
                  formik.setFieldValue('duration', e.target.value)
                }
              />
              {formik.values.duration && (
                <div className='text-sm text-gray-600 px-2 pt-1'>
                  {formatDuration(Number(formik.values.duration))}
                </div>
              )}
              {formik.touched.duration && formik.errors.duration && (
                <p className='text-red-500 text-sm mt-1'>
                  {formik.errors.duration}
                </p>
              )}
            </div>
            <div>
              <Label>Trumpas aprašymas</Label>
              <Textarea
                value={formik.values.shortDescription}
                onChange={(e) =>
                  formik.setFieldValue('shortDescription', e.target.value)
                }
                rows={3}
                className='resize-none'
              />
              {formik.touched.shortDescription &&
                formik.errors.shortDescription && (
                  <p className='text-red-500 text-sm mt-1'>
                    {formik.errors.shortDescription}
                  </p>
                )}
            </div>

            <div>
              <Label>Meta aprašymas</Label>
              <Textarea
                value={formik.values.metaDescription}
                onChange={(e) =>
                  formik.setFieldValue('metaDescription', e.target.value)
                }
                rows={3}
                className='resize-none'
              />
              {formik.touched.metaDescription &&
                formik.errors.metaDescription && (
                  <p className='text-red-500 text-sm mt-1'>
                    {formik.errors.metaDescription}
                  </p>
                )}
            </div>
          </div>

          <div>
            <Label>Aprašymas</Label>
            <Textarea
              value={formik.values.description}
              onChange={(e) =>
                formik.setFieldValue('description', e.target.value)
              }
              rows={6}
              className='resize-none'
            />
            {formik.touched.description && formik.errors.description && (
              <p className='text-red-500 text-sm mt-1'>
                {formik.errors.description}
              </p>
            )}
          </div>

          <div className='grid grid-cols-1'>
            <div>
              <Label>Mokytojai (daug pasirinkimų)</Label>
              <Multiselect
                options={lecturers}
                displayValue='name'
                selectedValues={lecturers.filter((opt) =>
                  formik.values.lecturers.includes(opt._id)
                )}
                onSelect={(selectedList) =>
                  formik.setFieldValue(
                    'lecturers',
                    selectedList.map((item) => item._id)
                  )
                }
                onRemove={(selectedList) =>
                  formik.setFieldValue(
                    'lecturers',
                    selectedList.map((item) => item._id)
                  )
                }
                placeholder='Choose lecturers'
                className=''
              />
            </div>
          </div>

          {/* Schedules dynamic array */}
          <div>
            <div className='flex  items-center justify-between'>
              <Label>Tvarkaraščiai</Label>
              <Button
                type='button'
                size='sm'
                onClick={() => {
                  const arr = formik.values.schedules || [];
                  formik.setFieldValue('schedules', [
                    ...arr,
                    {
                      date: new Date(),
                      location: '',
                      seats: '',
                      comment: '',
                      students: [],
                    },
                  ]);
                }}>
                <PlusCircle className='mr-2' /> Pridėti tvarkaraštį
              </Button>
            </div>

            {formik.values.schedules &&
              formik.values.schedules.length === 0 && (
                <p className='text-sm text-muted-foreground mt-2'>
                  Tvarkaraščiai dar nepridėti.
                </p>
              )}

            <div className='space-y-4 mt-3'>
              {formik.values.schedules?.map((s, idx) => (
                <div
                  key={idx}
                  className='relative border rounded-md px-3 py-4 grid grid-cols-1 md:grid-cols-2 gap-3 '>
                  <div className='flex flex-col'>
                    <Label>Data</Label>
                    <DatePicker
                      selected={s.date ? new Date(s.date) : null}
                      onChange={(d) => {
                        const arr = [...formik.values.schedules];
                        arr[idx] = { ...arr[idx], date: d };
                        formik.setFieldValue('schedules', arr);
                      }}
                      className='w-full rounded-md border px-2 py-1.5'
                      dateFormat='yyyy-MM-dd'
                    />
                    {/* validation */}
                    {formik.touched.schedules &&
                      formik.errors.schedules &&
                      typeof formik.errors.schedules === 'object' &&
                      formik.errors.schedules[idx]?.date && (
                        <p className='text-sm text-red-500 mt-1'>
                          {String(formik.errors.schedules[idx].date)}
                        </p>
                      )}
                  </div>

                  <div>
                    <Label>Miestas</Label>
                    <Input
                      value={s.location}
                      onChange={(e) => {
                        const arr = [...formik.values.schedules];
                        arr[idx] = { ...arr[idx], location: e.target.value };
                        formik.setFieldValue('schedules', arr);
                      }}
                    />
                  </div>

                  <div>
                    <Label>Sėdynės</Label>
                    <Input
                      type='number'
                      value={s.seats}
                      onChange={(e) => {
                        const arr = [...formik.values.schedules];
                        arr[idx] = { ...arr[idx], seats: e.target.value };
                        formik.setFieldValue('schedules', arr);
                      }}
                    />
                  </div>
                  <div>
                    <Label>Komentaras</Label>
                    <Input
                      value={s.comment}
                      onChange={(e) => {
                        const arr = [...formik.values.schedules];
                        arr[idx] = { ...arr[idx], comment: e.target.value };
                        formik.setFieldValue('schedules', arr);
                      }}
                    />
                  </div>
                  <div className='absolute right-0 top-0'>
                    <Button
                      type='button'
                      variant='destructive'
                      onClick={() => {
                        const arr = [...formik.values.schedules];
                        arr.splice(idx, 1);
                        formik.setFieldValue('schedules', arr);
                      }}>
                      <X size={15} />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Right: cover, submit */}
        <Card className='col-span-12 md:col-span-4 space-y-4 p-5'>
          <div>
            <Label>Tipas</Label>
            <Multiselect
              options={typeOptions}
              isObject={false} // ✅ string array support
              selectedValues={formik.values.type} // ✅ direct
              onSelect={(selectedList) => {
                formik.setFieldValue('type', selectedList);
              }}
              onRemove={(selectedList) => {
                formik.setFieldValue('type', selectedList);
              }}
              placeholder='Choose type'
              showCheckbox
            />
            {formik.touched.type && formik.errors.type && (
              <p className='text-red-500 text-sm mt-1'>{formik.errors.type}</p>
            )}
          </div>
          <div>
            <Label>Kalba</Label>
            <Multiselect
              options={languageOptions}
              isObject={false} // ✅ string array support
              selectedValues={formik.values.language} // ✅ direct
              onSelect={(selectedList) => {
                formik.setFieldValue('language', selectedList);
              }}
              onRemove={(selectedList) => {
                formik.setFieldValue('language', selectedList);
              }}
              placeholder='Choose language'
              showCheckbox
            />
            {formik.touched.language && formik.errors.language && (
              <p className='text-red-500 text-sm mt-1'>
                {formik.errors.language}
              </p>
            )}
          </div>
          <div>
            <Label>Lygis</Label>
            <Select
              value={formik.values.level}
              onValueChange={(v) => formik.setFieldValue('level', v)}>
              <SelectTrigger>
                <SelectValue placeholder='Select Level' />
              </SelectTrigger>
              <SelectContent>
                {levelOptions.map((c) => (
                  <SelectItem
                    key={c}
                    value={String(c)}>
                    {c}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {formik.touched.level && formik.errors.level && (
              <p className='text-red-500 text-sm mt-1'>{formik.errors.level}</p>
            )}
          </div>

          <div>
            <Label>Kontaktas</Label>
            <PhoneInput
              id='contact'
              name='contact'
              placeholder='+370 600 00000'
              value={formik.values.contact}
              onChange={(value) => formik.setFieldValue('contact', value)}
              defaultCountry='LT'
              countries={['LT']}
              international
              countryCallingCodeEditable={false}
              className={`w-full border px-3 py-1.5 rounded-md ${
                formik.touched.contact && formik.errors.contact
                  ? 'border-red-500'
                  : ''
              }`}
            />
            {formik.touched.contact && formik.errors.contact && (
              <p className='text-red-500 text-sm mt-1'>
                {formik.errors.contact}
              </p>
            )}
          </div>
          <div>
            <Label>Finansavimas</Label>
            <Select
              value={formik.values.compensated}
              onValueChange={(v) => formik.setFieldValue('compensated', v)}>
              <SelectTrigger>
                <SelectValue placeholder='Select Compensated' />
              </SelectTrigger>
              <SelectContent>
                {compensatedOptions.map((c) => (
                  <SelectItem
                    key={c}
                    value={String(c)}>
                    {c}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className='flex flex-col gap-2'>
            <Label className='font-medium'>Baigimo dokumentas</Label>

            <div className='flex gap-6'>
              {/* ✅ Yes Option */}
              <label className='flex items-center gap-2 cursor-pointer'>
                <input
                  type='radio'
                  name='graduationDocument'
                  value='true'
                  checked={formik.values.graduationDocument === true}
                  onChange={() =>
                    formik.setFieldValue('graduationDocument', true)
                  }
                />
                <span>Taip</span>
              </label>

              {/* ✅ No Option */}
              <label className='flex items-center gap-2 cursor-pointer'>
                <input
                  type='radio'
                  name='graduationDocument'
                  value='false'
                  checked={formik.values.graduationDocument === false}
                  onChange={() =>
                    formik.setFieldValue('graduationDocument', false)
                  }
                />
                <span>Ne</span>
              </label>
            </div>

            {formik.errors.graduationDocument &&
              formik.touched.graduationDocument && (
                <span className='text-red-500 text-sm'>
                  {formik.errors.graduationDocument}
                </span>
              )}
          </div>

          {/* Status
          <div>
            <Label>Status</Label>
            <Select
              value={formik.values.status}
              onValueChange={(v) => formik.setFieldValue('status', v)}
              className='capitalize'>
              <SelectTrigger>
                <SelectValue placeholder='Select status' />
              </SelectTrigger>

              <SelectContent>
                {statusOptions.map((status) => (
                  <SelectItem
                    key={status}
                    value={status.slug}
                    className='capitalize'>
                    {status.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {formik.touched.status && formik.errors.status && (
              <p className='text-sm text-red-500 mt-1'>
                {formik.errors.status}
              </p>
            )}
          </div> */}
          <div>
            <Label>Viršelis</Label>
            <ShadcnDropzone
              value={formik.values.cover}
              onChange={(file) => formik.setFieldValue('cover', file)}
            />
            {formik.touched.cover && formik.errors.cover && (
              <p className='text-red-500 text-sm mt-1'>{formik.errors.cover}</p>
            )}
          </div>
          <div>
            <Button
              type='submit'
              disabled={isPending}
              size='lg'
              className='w-full'>
              {isPending ? 'Įrašoma...' : 'Išsaugoti kursą'}
            </Button>
          </div>
        </Card>
      </div>
    </form>
  );
}
