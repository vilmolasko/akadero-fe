'use client';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import NextLink from 'next/link';
import { Card } from '@/components/ui/card';
import { useRouter } from '@bprogress/next';

// redux
import { useDispatch } from 'react-redux';
import { setLogin } from '@/redux/slices/user';
// api
import * as api from '@/services';
import { createSession } from '@/lib/session';
import { useMutation } from '@tanstack/react-query';
import { Loader2 } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';

const validationSchema = Yup.object({
  email: Yup.string()
    .email('Neteisingas el. pašto formatas')
    .required('El. paštas yra privalomas'),
  password: Yup.string().required('Slaptažodis yra privalomas'),
});

export default function SignIn() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const mutation = useMutation({
    mutationFn: api.login,
    onSuccess: async (data) => {
      await createSession(data.token);
      dispatch(setLogin(data.user));
      toast.success('Sėkmingai prisijungta!');
      setLoading(false);
      const slug =
        data.user.role === 'organizer' ? '/dashboard/main' : '/admin/dashboard';
      router.push(slug);
    },
    onError: (err) => {
      const message = JSON.stringify(err.response?.data?.message);
      toast.error(message ? JSON.parse(message) : 'Įvyko klaida!');
      setLoading(false);
    },
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      mutation.mutate(values);
    },
  });

  return (
    <div className='container px-4 mx-auto'>
      <div className='min-h-[calc(100vh-66px)] py-6 flex items-center justify-center '>
        <Card className='rounded-2xl p-6 md:p-8 w-full max-w-md'>
          <div className='text-center mb-5 md:mb-8'>
            <h1 className='text-xl md:text-3xl font-bold font-merriweather'>
              Sveiki sugrįžę
            </h1>
            <p className='text-muted-foreground md:mt-2'>
              Prisijunkite prie savo paskyros
            </p>
          </div>

          <form
            onSubmit={formik.handleSubmit}
            className='space-y-4 md:space-y-5'>
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
              <NextLink
                href='/auth/forget-password'
                className='block w-full text-end text-md text-blue-600 hover:text-blue-800 transition-colors duration-200 font-medium'>
                Pamiršote slaptažodį?
              </NextLink>
            </div>
            <Button
              variant='default'
              type='submit'
              className='w-full flex items-center justify-center gap-2'
              disabled={loading}>
              {loading && <Loader2 className='h-4 w-4 animate-spin' />}
              Prisijungti
            </Button>
          </form>

          <p className='text-md md:text-normal text-center text-muted-foreground mt-6'>
            Neturite paskyros?{' '}
            <NextLink
              href='/auth/sign-up'
              className='text-md md:text-normal text-primary hover:text-primary-500 transition-colors duration-200 font-medium'>
              Registruotis
            </NextLink>
          </p>
        </Card>
      </div>
    </div>
  );
}
