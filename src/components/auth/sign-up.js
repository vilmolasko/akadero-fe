'use client';
import { useFormik } from 'formik';
import { useState } from 'react';
import { useRouter } from '@bprogress/next';

import { toast } from 'react-hot-toast';
import * as Yup from 'yup';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import NextLink from 'next/link';
import { Card } from '@/components/ui/card';
// redux
import { useDispatch } from 'react-redux';
import { setLogin } from '@/redux/slices/user';
// API
import * as api from '@/services';

import { useMutation } from '@tanstack/react-query';
// hooks
import { createSession } from '@/lib/session';

import { Loader2 } from 'lucide-react';
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input';

const validationSchema = Yup.object({
  firstName: Yup.string().required('Vardas yra privalomas'),
  lastName: Yup.string().required('Pavardė yra privaloma'),
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
  password: Yup.string()
    .min(8, 'Slaptažodis turi būti bent 8 simbolių')
    .required('Slaptažodis yra privalomas'),
});

export default function SignUp() {
  const router = useRouter();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  const mutation = useMutation({
    mutationFn: api.register,
    onSuccess: async (data) => {
      await createSession(data.token);
      dispatch(setLogin(data.user));
      toast.success('OTP išsiųstas į jūsų el. paštą ' + data.user.firstName);
      setLoading(false);

      router.push(`/auth/verify-otp`);
    },
    onError: (err) => {
      const message = JSON.stringify(err.response?.data?.message);
      toast.error(message ? JSON.parse(message) : 'Įvyko klaida!');
      setLoading(false);
    },
  });

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      password: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      mutation.mutate(values);
    },
  });

  return (
    <div className='container py-10 px-4 mx-auto'>
      <div className='flex items-center justify-center '>
        <Card className='rounded-2xl p-6 md:p-8 w-full max-w-md'>
          <div className='text-center mb-5 md:mb-8'>
            <h1 className='text-xl md:text-3xl font-bold font-merriweather'>
              Sukurti paskyrą
            </h1>
            <p className='text-muted-foreground md:mt-2'>
              Prisijunkite šiandien
            </p>
          </div>

          <form
            onSubmit={formik.handleSubmit}
            className='space-y-4 md:space-y-5'>
            <div className='grid grid-cols-2 gap-4'>
              <div className='space-y-1'>
                <Label htmlFor='firstName'>Vardas</Label>
                <Input
                  id='firstName'
                  name='firstName'
                  type='text'
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.firstName}
                  className={
                    formik.touched.firstName && formik.errors.firstName
                      ? 'border-red-500'
                      : ''
                  }
                />
                {formik.touched.firstName && formik.errors.firstName && (
                  <div className='text-red-500 text-sm mt-1'>
                    {formik.errors.firstName}
                  </div>
                )}
              </div>

              <div className='space-y-1'>
                <Label htmlFor='lastName'>Pavardė</Label>
                <Input
                  id='lastName'
                  name='lastName'
                  type='text'
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.lastName}
                  className={
                    formik.touched.lastName && formik.errors.lastName
                      ? 'border-red-500'
                      : ''
                  }
                />
                {formik.touched.lastName && formik.errors.lastName && (
                  <div className='text-red-500 text-sm mt-1'>
                    {formik.errors.lastName}
                  </div>
                )}
              </div>
            </div>

            <div className='space-y-1'>
              <Label htmlFor='email'>El. paštas</Label>
              <Input
                id='email'
                name='email'
                type='email'
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

            <div className='space-y-1'>
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
            <div className='space-y-1'>
              <Label htmlFor='password'>Slaptažodis</Label>
              <Input
                id='password'
                name='password'
                type='password'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
                className={
                  formik.touched.password && formik.errors.password
                    ? 'border-red-500'
                    : ''
                }
              />
              {formik.touched.password && formik.errors.password && (
                <div className='text-red-500 text-sm mt-1'>
                  {formik.errors.password}
                </div>
              )}
            </div>

            <Button
              variant='default'
              type='submit'
              className='w-full flex items-center justify-center gap-2'
              disabled={loading}>
              {loading && <Loader2 className='h-4 w-4 animate-spin' />}
              {loading ? 'Kuriama paskyra...' : 'Sukurti paskyrą'}
            </Button>
          </form>

          <p className='text-md md:text-normal text-center text-muted-foreground mt-6'>
            Jau turite paskyrą?{' '}
            <NextLink
              href='/auth/sign-in'
              className='text-md md:text-normal text-primary hover:text-primary-500 transition-colors duration-200 font-medium'>
              Prisijungti
            </NextLink>
          </p>
        </Card>
      </div>
    </div>
  );
}
