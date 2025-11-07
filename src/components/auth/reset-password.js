'use client';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import NextLink from 'next/link';
import { Card } from '@/components/ui/card';
// api
import * as api from '@/services';
// components
import { useMutation } from '@tanstack/react-query';
import { Loader2 } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useRouter } from '@bprogress/next';

const validationSchema = Yup.object({
  newPassword: Yup.string()
    .min(8, 'Slaptažodis turi būti bent 8 simbolių')
    .required('Naujas slaptažodis yra privalomas'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('newPassword'), null], 'Slaptažodžiai turi sutapti')
    .required('Patvirtinti slaptažodį yra privaloma'),
});

export default function ResetPassword({ token }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const mutation = useMutation({
    mutationFn: api.resetPassword,
    onSuccess: async () => {
      setLoading(false);
      toast.success('Slaptažodis sėkmingai atnaujintas.');
      router.push(`/auth/sign-in`);
    },
    onError: (err) => {
      const message = JSON.stringify(err.response?.data?.message);
      toast.error(
        message
          ? JSON.parse(message)
          : 'Slaptažodžio atstatymas nepavyko. Bandykite dar kartą.'
      );
      setLoading(false);
    },
  });

  const formik = useFormik({
    initialValues: {
      newPassword: '',
      confirmPassword: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      await mutation.mutate({
        newPassword: values.newPassword,
        token,
      });
    },
  });

  return (
    <div className='container px-4 mx-auto'>
      <div className='min-h-[calc(100vh-66px)] py-6 flex items-center justify-center'>
        <Card className='rounded-2xl p-6 md:p-8 w-full max-w-md'>
          <div className='text-center mb-5 md:mb-8'>
            <h1 className='text-xl md:text-3xl font-bold font-merriweather'>
              Nustatyti naują slaptažodį
            </h1>
            <p className='text-muted-foreground md:mt-2'>
              Sukurkite naują slaptažodį
            </p>
          </div>

          <form
            onSubmit={formik.handleSubmit}
            className='space-y-4 md:space-y-5'>
            <div className='space-y-1'>
              <Label htmlFor='newPassword'>Naujas slaptažodis</Label>
              <Input
                id='newPassword'
                name='newPassword'
                type='password'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.newPassword}
                className={
                  formik.touched.newPassword && formik.errors.newPassword
                    ? 'border-red-500'
                    : ''
                }
              />
              {formik.touched.newPassword && formik.errors.newPassword && (
                <div className='text-red-500 text-sm mt-1'>
                  {formik.errors.newPassword}
                </div>
              )}
            </div>

            <div className='space-y-1'>
              <Label htmlFor='confirmPassword'>Patvirtinti slaptažodį</Label>
              <Input
                id='confirmPassword'
                name='confirmPassword'
                type='password'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.confirmPassword}
                className={
                  formik.touched.confirmPassword &&
                  formik.errors.confirmPassword
                    ? 'border-red-500'
                    : ''
                }
              />
              {formik.touched.confirmPassword &&
                formik.errors.confirmPassword && (
                  <div className='text-red-500 text-sm mt-1'>
                    {formik.errors.confirmPassword}
                  </div>
                )}
            </div>
            <Button
              variant='default'
              type='submit'
              className='w-full flex items-center justify-center gap-2'
              disabled={loading}>
              {loading && <Loader2 className='h-4 w-4 animate-spin' />}
              Atnaujinti slaptažodį
            </Button>
          </form>

          <p className='text-md md:text-normal text-center text-muted-foreground mt-6'>
            Grįžti į{' '}
            <NextLink
              href='/auth/sign-in'
              className='text-md md:text-normal text-primary hover:text-primary-500 transition-colors duration-200 font-medium'>
              Prisijungimą
            </NextLink>
          </p>
        </Card>
      </div>
    </div>
  );
}
