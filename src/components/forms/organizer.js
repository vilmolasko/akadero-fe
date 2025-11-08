'use client';
import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

import { cn } from '@/lib/utils';
import * as api from '@/services';
import toast from 'react-hot-toast';
import { useQuery, useMutation } from '@tanstack/react-query';
import { Card } from '@/components/ui/card';
import AvatarDropzone from '../upload/avatar';
import ShadcnDropzone from '../upload/single-upload';
import { useRouter } from '@bprogress/next';
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input';

// ✅ Patvirtinimo schema (Validacijos schema)
const OrganizerSchema = Yup.object({
  name: Yup.string().required('Organizatoriaus pavadinimas yra privalomas'),
  description: Yup.string().required('Aprašymas yra privalomas'),
  email: Yup.string()
    .email('Neteisingas el. pašto formatas')
    .required('El. paštas yra privalomas'),
  phone: Yup.string()
    .required('Telefono numeris yra privalomas')
    .test(
      'is-valid-phone',
      'Neteisingas telefono numeris',
      (value) => value && isValidPhoneNumber(value)
    ),
  cover: Yup.mixed().required('Reikalingas viršelio paveikslėlis'),
  logo: Yup.mixed().required('Reikalingas logotipas'),
});

export default function OrganizerSettingsForm() {
  const router = useRouter();

  const { data } = useQuery({
    queryKey: ['organizer-detail'],
    queryFn: api.getOrganizerProfile,
    select: (res) => res.data,
    onError: (err) => {
      toast.error(err?.response?.data?.message || 'Įvyko klaida!');
    },
  });

  const currentOrganizer = data?.organizer;

  const { mutate, isPending: updateLoading } = useMutation({
    mutationFn: currentOrganizer
      ? api.updateOrganizerProfile
      : api.createOrganizerProfile,
    onSuccess: () => {
      toast.success(
        'Sėkmingai išsaugota! Administratorius netrukus peržiūrės.'
      );
      router.push('/dashboard/main');
    },
  });

  const formik = useFormik({
    initialValues: {
      name: currentOrganizer?.name || '',
      email: currentOrganizer?.email || '',
      phone: currentOrganizer?.phone || '',
      slug: currentOrganizer?.slug || '',
      description: currentOrganizer?.description || '',
      address: currentOrganizer?.address || '',
      cover: currentOrganizer?.cover || null,
      logo: currentOrganizer?.logo || null,
    },
    enableReinitialize: true,
    validationSchema: OrganizerSchema,
    onSubmit: async (values) => {
      await mutate(values);
    },
  });

  // Automatiškai generuoja nuorodą (slug) iš pavadinimo
  const handleNameChange = (e) => {
    const name = e.target.value;
    formik.setFieldValue('name', name);
    formik.setFieldValue('slug', name.toLowerCase().replace(/\s+/g, '-'));
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className='grid grid-cols-1 md:grid-cols-12 gap-6'>
        {/* Kairysis blokas: logotipas ir viršelis */}
        <Card className='col-span-12 md:col-span-5 space-y-5 p-5'>
          <div className='text-center'>
            <Label>Logotipas</Label>
            <AvatarDropzone
              value={formik.values.logo}
              onChange={(file) => formik.setFieldValue('logo', file)}
            />
            {formik.touched.logo && formik.errors.logo && (
              <p className='text-red-500 text-sm mt-1'>{formik.errors.logo}</p>
            )}
          </div>
          <div>
            <Label>Viršelio paveikslėlis</Label>
            <ShadcnDropzone
              value={formik.values.cover}
              onChange={(file) => formik.setFieldValue('cover', file)}
            />
            {formik.touched.cover && formik.errors.cover && (
              <p className='text-red-500 text-sm mt-1'>{formik.errors.cover}</p>
            )}
          </div>
        </Card>

        {/* Dešinysis blokas: formos laukai */}
        <Card className='col-span-12 md:col-span-7 space-y-5 p-5'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div>
              <Label htmlFor='name'>Organizatoriaus pavadinimas</Label>
              <Input
                id='name'
                name='name'
                placeholder='Įveskite organizatoriaus pavadinimą'
                value={formik.values.name}
                onChange={handleNameChange}
                onBlur={formik.handleBlur}
                className={cn(
                  formik.touched.name && formik.errors.name && 'border-red-500'
                )}
              />
              {formik.touched.name && formik.errors.name && (
                <p className='text-sm text-red-500 mt-1'>
                  {formik.errors.name}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor='slug'>Nuorodos pavadinimas (slug)</Label>
              <Input
                id='slug'
                name='slug'
                placeholder='Pvz.: mano-organizacija'
                value={formik.values.slug}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={cn(
                  formik.touched.slug && formik.errors.slug && 'border-red-500'
                )}
              />
              {formik.touched.slug && formik.errors.slug && (
                <p className='text-sm text-red-500 mt-1'>
                  {formik.errors.slug}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor='email'>El. paštas</Label>
              <Input
                id='email'
                name='email'
                type='email'
                placeholder='Įveskite el. pašto adresą'
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

            <div>
              <Label htmlFor='phone'>Telefono numeris</Label>
              <PhoneInput
                id='phone'
                name='phone'
                placeholder='+370 600 00000'
                value={formik.values.phone}
                onChange={(value) => formik.setFieldValue('phone', value)}
                defaultCountry='LT'
                countries={['LT']}
                international
                countryCallingCodeEditable={false}
                className={`w-full border px-3 py-1.5 rounded-md ${
                  formik.touched.phone && formik.errors.phone
                    ? 'border-red-500'
                    : ''
                }`}
              />
              {formik.touched.phone && formik.errors.phone && (
                <div className='text-red-500 text-sm mt-1'>
                  {formik.errors.phone}
                </div>
              )}
            </div>
          </div>

          <div>
            <Label htmlFor='address'>Adresas</Label>
            <Input
              id='address'
              name='address'
              type='text'
              placeholder='Įveskite adresą'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.address}
              className={
                formik.touched.address && formik.errors.address
                  ? 'border-red-500'
                  : ''
              }
            />
            {formik.touched.address && formik.errors.address && (
              <div className='text-red-500 text-sm mt-1'>
                {formik.errors.address}
              </div>
            )}
          </div>

          <div>
            <Label htmlFor='description'>Aprašymas</Label>
            <Textarea
              id='description'
              name='description'
              rows={3}
              placeholder='Įveskite trumpą aprašymą...'
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

          {/* Pateikimo mygtukas */}
          <Button
            type='submit'
            disabled={updateLoading}>
            {updateLoading ? 'Išsaugoma...' : 'Išsaugoti'}
          </Button>
        </Card>
      </div>
    </form>
  );
}
