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
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import * as api from '@/services';
import ShadcnDropzone from '@/components/upload/single-upload';

// ✅ Validation Schema (Lithuanian)
const categorySchema = Yup.object({
  name: Yup.string().required('Pavadinimas yra privalomas'),
  metaTitle: Yup.string().required('Meta pavadinimas yra privalomas'),
  description: Yup.string().required('Aprašymas yra privalomas'),
  metaDescription: Yup.string().required('Meta aprašymas yra privalomas'),
  slug: Yup.string().required('Nuoroda (slug) yra privaloma'),
  cover: Yup.mixed().required('Paveikslėlis yra privalomas'),
  status: Yup.string().required('Būsena yra privaloma'),
});

export default function CategoryForm({ currentCategory }) {
  const router = useRouter();
  const { mutate, isPending } = useMutation({
    mutationFn: currentCategory
      ? api.updateCategoryByAdmin
      : api.addCategoryByAdmin,
    retry: false,
    onSuccess: (data) => {
      toast.success(data.message);
      router.push('/admin/categories');
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || 'Įvyko klaida!');
    },
  });

  const formik = useFormik({
    initialValues: {
      name: currentCategory?.name || '',
      description: currentCategory?.description || '',
      metaTitle: currentCategory?.metaTitle || '',
      metaDescription: currentCategory?.metaDescription || '',
      slug: currentCategory?.slug || '',
      cover: currentCategory?.cover || null,
      file: currentCategory?.cover || '',
      status: currentCategory?.status || '',
    },
    enableReinitialize: true,
    validationSchema: categorySchema,
    onSubmit: async (values) => {
      const { cover, file, ...rest } = values;
      try {
        mutate({
          ...rest,
          cover,
          ...(currentCategory && {
            currentSlug: currentCategory.slug,
          }),
        });
      } catch (error) {
        console.error(error);
      }
    },
  });

  // Auto-generate slug from name
  const handleNameChange = (e) => {
    const name = e.target.value;
    formik.setFieldValue('name', name);
    formik.setFieldValue('slug', name.toLowerCase().replace(/\s+/g, '-'));
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className='grid grid-cols-1 md:grid-cols-12 gap-6 '>
        <Card className='col-span-12 md:col-span-7 space-y-5 p-5 h-auto'>
          {/* Name */}
          <div>
            <Label htmlFor='name'>Pavadinimas</Label>
            <Input
              id='name'
              name='name'
              placeholder='Kategorijos pavadinimas'
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

          <div>
            <Label htmlFor='metaTitle'>Meta pavadinimas</Label>
            <Input
              id='metaTitle'
              name='metaTitle'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder='Meta pavadinimas'
              value={formik.values.metaTitle}
              className={cn(
                formik.touched.metaTitle &&
                  formik.errors.metaTitle &&
                  'border-red-500'
              )}
            />
            {formik.touched.metaTitle && formik.errors.metaTitle && (
              <p className='text-sm text-red-500 mt-1'>
                {formik.errors.metaTitle}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor='metaDescription'>Meta aprašymas</Label>
            <Textarea
              id='metaDescription'
              name='metaDescription'
              rows={3}
              placeholder='Įveskite meta aprašymą...'
              value={formik.values.metaDescription}
              onChange={formik.handleChange}
              className={cn(
                formik.touched.metaDescription &&
                  formik.errors.metaDescription &&
                  'border-red-500'
              )}
            />
            {formik.touched.metaDescription &&
              formik.errors.metaDescription && (
                <p className='text-sm text-red-500 mt-1'>
                  {formik.errors.metaDescription}
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
              placeholder='Įveskite kategorijos aprašymą...'
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

        <Card className='col-span-12 md:col-span-5 space-y-5 p-5'>
          {/* Slug */}
          <div>
            <Label htmlFor='slug'>Nuoroda (Slug)</Label>
            <Input
              id='slug'
              name='slug'
              placeholder='Automatiškai sugeneruota nuoroda'
              value={formik.values.slug}
              onChange={formik.handleChange}
              className={cn(
                formik.touched.slug && formik.errors.slug && 'border-red-500'
              )}
            />
            {formik.touched.slug && formik.errors.slug && (
              <p className='text-sm text-red-500 mt-1'>{formik.errors.slug}</p>
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

          {/* Cover */}
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

          {/* Submit Button */}
          <Button
            type='submit'
            size={'lg'}
            className='w-full'
            disabled={isPending}>
            {isPending ? 'Išsaugoma...' : 'Išsaugoti kategoriją'}
          </Button>
        </Card>
      </div>
    </form>
  );
}
