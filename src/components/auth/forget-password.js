'use client';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import NextLink from 'next/link';
// api
import * as api from '@/services';
// components
import { useMutation } from '@tanstack/react-query';
import { Loader2 } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';

const validationSchema = Yup.object({
  email: Yup.string()
    .email('Neteisingas el. pašto formatas')
    .required('El. paštas yra privalomas'),
});

export default function ForgetPassword() {
  const [loading, setLoading] = useState(false);

  const mutation = useMutation({
    mutationFn: api.forgetPassword,
    onSuccess: async () => {
      setLoading(false);
      toast.success('El. laiškas išsiųstas. Patikrinkite gautuosius.');
    },
    onError: (err) => {
      const message = JSON.stringify(err.response?.data?.message);
      toast.error(
        message
          ? JSON.parse(message)
          : 'Neteisingas el. paštas. Bandykite dar kartą.'
      );
      setLoading(false);
    },
  });

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      await mutation.mutate({
        email: values.email,
        origin: window.location.origin,
      });
    },
  });

  return (
    <div className='container px-4 mx-auto'>
      <div className='min-h-[calc(100vh-66px)] py-6 flex items-center justify-center'>
        <Card className='rounded-2xl p-6 md:p-8 w-full max-w-md'>
          <div className='text-center mb-5 md:mb-8'>
            <h1 className='text-xl md:text-3xl font-bold font-merriweather'>
              Pamiršote slaptažodį
            </h1>
            <p className='text-muted-foreground md:mt-2'>
              Įveskite el. pašto adresą, susietą su jūsų paskyra, ir mes
              atsiųsime jums nuorodą slaptažodžiui atkurti.
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
            <Button
              variant='default'
              type='submit'
              className='w-full flex items-center justify-center gap-2'
              disabled={loading}>
              {loading && <Loader2 className='h-4 w-4 animate-spin' />}
              Siųsti nuorodą atstatymui
            </Button>
          </form>

          <p className='text-md md:text-normal text-center text-muted-foreground mt-6'>
            Prisiminate slaptažodį?{' '}
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
