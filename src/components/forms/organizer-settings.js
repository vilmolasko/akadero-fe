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

// redux
import { useDispatch } from 'react-redux';
import { setLogin } from '@/redux/slices/user';
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input';

// ✅ Validation Schema (Lithuanian)
const categorySchema = Yup.object({
  firstName: Yup.string().required('Vardas yra privalomas'),
  lastName: Yup.string().required('Pavardė yra privaloma'),
  about: Yup.string().required('Apie yra privaloma'),
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
  cover: Yup.mixed().required('Nuotrauka yra privaloma'),
});

export default function OrganizerSettingsForm() {
  const dispatch = useDispatch();

  const { data, isPending: profileLoading } = useQuery({
    queryKey: ['user-profile'],
    queryFn: api.getProfile,
    select: (res) => res.data,
    onError: (err) => {
      toast.error(err?.response?.data?.message || 'Įvyko klaida!');
    },
  });

  const user = data;

  const { mutate, isPending: updateLoading } = useMutation({
    mutationFn: api.updateProfile,
    onSuccess: (res) => {
      dispatch(setLogin(res.data));
      toast.success('Profilis sėkmingai atnaujintas');
    },
    onError: (err) => {
      toast.error(
        err?.response?.data?.message || 'Nepavyko atnaujinti profilio'
      );
    },
  });

  const formik = useFormik({
    initialValues: {
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
      email: user?.email || '',
      phone: user?.phone || '',
      about: user?.about || '',
      cover: user?.cover || null,
    },
    enableReinitialize: true,
    validationSchema: categorySchema,
    onSubmit: async (values) => {
      await mutate(values);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className='grid grid-cols-1 md:grid-cols-12 gap-6'>
        {/* Avatar */}
        <Card className='col-span-12 md:col-span-5 space-y-5 p-5'>
          <div className='text-center'>
            <Label>Avataras</Label>
            <AvatarDropzone
              value={formik.values.cover}
              onChange={(file) => formik.setFieldValue('cover', file)}
            />
            {formik.touched.cover && formik.errors.cover && (
              <p className='text-red-500 text-sm mt-1'>{formik.errors.cover}</p>
            )}
          </div>
        </Card>

        {/* Form fields */}
        <Card className='col-span-12 md:col-span-7 space-y-5 p-5'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            {/* First Name */}
            <div>
              <Label htmlFor='firstName'>Vardas</Label>
              <Input
                id='firstName'
                name='firstName'
                placeholder='Įveskite vardą'
                value={formik.values.firstName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={cn(
                  formik.touched.firstName &&
                    formik.errors.firstName &&
                    'border-red-500'
                )}
              />
              {formik.touched.firstName && formik.errors.firstName && (
                <p className='text-sm text-red-500 mt-1'>
                  {formik.errors.firstName}
                </p>
              )}
            </div>

            {/* Last Name */}
            <div>
              <Label htmlFor='lastName'>Pavardė</Label>
              <Input
                id='lastName'
                name='lastName'
                placeholder='Įveskite pavardę'
                value={formik.values.lastName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={cn(
                  formik.touched.lastName &&
                    formik.errors.lastName &&
                    'border-red-500'
                )}
              />
              {formik.touched.lastName && formik.errors.lastName && (
                <p className='text-sm text-red-500 mt-1'>
                  {formik.errors.lastName}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <Label htmlFor='email'>El. paštas</Label>
              <Input
                id='email'
                name='email'
                type='email'
                disabled
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

            {/* Phone */}
            <div>
              <Label htmlFor='phone'>Telefonas</Label>
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

          {/* About */}
          <div>
            <Label htmlFor='about'>Apie</Label>
            <Textarea
              id='about'
              name='about'
              rows={3}
              placeholder='Aprašykite save...'
              value={formik.values.about}
              onChange={formik.handleChange}
              className={cn(
                formik.touched.about && formik.errors.about && 'border-red-500'
              )}
            />
            {formik.touched.about && formik.errors.about && (
              <p className='text-sm text-red-500 mt-1'>{formik.errors.about}</p>
            )}
          </div>

          {/* Submit Button */}
          <Button
            type='submit'
            disabled={updateLoading}>
            {updateLoading ? 'Saugoma...' : 'Išsaugoti'}
          </Button>
        </Card>
      </div>
    </form>
  );
}
