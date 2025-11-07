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
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { Card } from '@/components/ui/card';
import ShadcnDropzone from '../upload/single-upload';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import * as api from '@/services';

// ✅ Lithuanian validation schema
const lecturerSchema = Yup.object({
  name: Yup.string().required('Vardas yra privalomas'),
  email: Yup.string()
    .email('Neteisingas el. pašto formatas')
    .required('El. paštas yra privalomas'),
  description: Yup.string().required('Aprašymas yra privalomas'),
  cover: Yup.mixed().required('Paveikslėlis yra privalomas'),
  status: Yup.string().required('Būsena yra privaloma'),
});

export default function OrganizerLecturerForm({ currentLecturer }) {
  const router = useRouter();

  const { mutate, isPending } = useMutation({
    mutationFn: currentLecturer
      ? api.updateLecturerByAdmin
      : api.addLecturerByAdmin,
    retry: false,
    onSuccess: (data) => {
      toast.success(data.message);
      router.push('/admin/lecturers');
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || 'Įvyko klaida!');
    },
  });

  const formik = useFormik({
    initialValues: {
      name: currentLecturer?.name || '',
      email: currentLecturer?.email || '',
      description: currentLecturer?.description || '',
      cover: currentLecturer?.cover || null,
      file: currentLecturer?.cover || '',
      status: currentLecturer?.status || '',
    },
    enableReinitialize: true,
    validationSchema: lecturerSchema,
    onSubmit: async (values) => {
      const { cover, file, ...rest } = values;
      try {
        mutate({
          ...rest,
          cover,
          ...(currentLecturer && {
            currentId: currentLecturer._id,
          }),
        });
      } catch (error) {
        console.error(error);
      }
    },
  });

  // Auto-generate slug (optional)
  const handleNameChange = (e) => {
    const name = e.target.value;
    formik.setFieldValue('name', name);
    formik.setFieldValue('slug', name.toLowerCase().replace(/\s+/g, '-'));
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className='grid grid-cols-1 md:grid-cols-12 gap-6 '>
        <Card className='col-span-12 md:col-span-7 space-y-5 p-5'>
          {/* Name */}
          <div>
            <Label htmlFor='name'>Vardas</Label>
            <Input
              id='name'
              name='name'
              placeholder='Įveskite dėstytojo vardą'
              value={formik.values.name}
              onChange={handleNameChange}
              className={cn(
                formik.touched.name && formik.errors.name && 'border-red-500'
              )}
            />
            {formik.touched.name && formik.errors.name && (
              <p className='text-sm text-red-500 mt-1'>{formik.errors.name}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <Label htmlFor='email'>El. paštas</Label>
            <Input
              id='email'
              name='email'
              type='email'
              placeholder='Įveskite el. paštą'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              className={
                formik.touched.email && formik.errors.email
                  ? 'border-red-500'
                  : ''
              }
            />
            {formik.touched.email && formik.errors.email && (
              <div className='text-red-500 text-sm mt-1'>
                {formik.errors.email}
              </div>
            )}
          </div>

          {/* Status */}
          <div>
            <Label>Būsena</Label>
            <Select
              onValueChange={(value) => formik.setFieldValue('status', value)}
              value={formik.values.status}>
              <SelectTrigger>
                <SelectValue placeholder='Pasirinkite būseną' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='active'>Aktyvus</SelectItem>
                <SelectItem value='inactive'>Neaktyvus</SelectItem>
              </SelectContent>
            </Select>
            {formik.touched.status && formik.errors.status && (
              <p className='text-sm text-red-500 mt-1'>
                {formik.errors.status}
              </p>
            )}
          </div>

          {/* Description */}
          <div>
            <Label htmlFor='description'>Aprašymas</Label>
            <Textarea
              id='description'
              name='description'
              rows={3}
              placeholder='Įveskite dėstytojo aprašymą...'
              value={formik.values.description}
              onChange={formik.handleChange}
              className={cn(
                formik.touched.description &&
                  formik.errors.description &&
                  'border-red-500'
              )}
            />
            {formik.touched.description && formik.errors.description && (
              <p className='text-sm text-red-500 mt-1'>
                {formik.errors.description}
              </p>
            )}
          </div>
        </Card>

        {/* Right side */}
        <Card className='col-span-12 md:col-span-5 space-y-5 p-5'>
          <div>
            <Label>Paveikslėlis</Label>
            <ShadcnDropzone
              value={formik.values.cover}
              onChange={(file) => formik.setFieldValue('cover', file)}
            />
            {formik.touched.cover && formik.errors.cover && (
              <p className='text-red-500 text-sm mt-1'>{formik.errors.cover}</p>
            )}
          </div>

          {/* Submit */}
          <Button
            type='submit'
            size={'lg'}
            className='w-full'
            disabled={isPending}>
            {isPending ? 'Išsaugoma...' : 'Išsaugoti dėstytoją'}
          </Button>
        </Card>
      </div>
    </form>
  );
}
