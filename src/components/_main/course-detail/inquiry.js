'use client';

import * as React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import * as api from '@/services';
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input';

const validationSchema = Yup.object({
  firstName: Yup.string().required('Vardas yra privalomas'),
  lastName: Yup.string().required('Pavardė yra privaloma'),
  email: Yup.string()
    .email('Neteisingas el. pašto adresas')
    .required('El. paštas yra privalomas'),
  phone: Yup.string()
    .required('Telefono numeris yra privalomas')
    .test(
      'is-valid-phone',
      'Neteisingas telefono numeris',
      (value) => value && isValidPhoneNumber(value)
    ),
  question: Yup.string().required('Prašome įrašyti savo klausimą'),
});

export default function Inquiry({ courseId }) {
  const [open, setOpen] = React.useState(false);
  const { mutate, isPending } = useMutation({
    mutationFn: api.createInquiryByCourse,
    retry: false,
    onSuccess: (data) => {
      toast.success(data.message);
      setTimeout(() => {
        setOpen(false);
        formik.resetForm();
      }, 2000);
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || 'Įvyko klaida!');
    },
  });

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      question: '',
    },
    enableReinitialize: true,
    validationSchema,
    onSubmit: async (values) => {
      try {
        mutate({
          ...values,
          ...(courseId && {
            courseId: courseId,
          }),
        });
      } catch (error) {
        console.error(error);
      }
    },
  });

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          size='lg'
          variant='default'>
          Užklausa
        </Button>
      </DialogTrigger>

      <DialogContent className='sm:max-w-[500px]'>
        <form
          onSubmit={formik.handleSubmit}
          className='space-y-4'>
          <DialogHeader>
            <DialogTitle>Mokymų užklausa</DialogTitle>
          </DialogHeader>

          {/* Vardas */}
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
              <p className='text-sm text-red-500'>{formik.errors.firstName}</p>
            )}
          </div>

          {/* Pavardė */}
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
              <p className='text-sm text-red-500'>{formik.errors.lastName}</p>
            )}
          </div>

          {/* El. paštas */}
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
              <p className='text-sm text-red-500'>{formik.errors.email}</p>
            )}
          </div>

          {/* Telefonas */}
          <div className='space-y-1'>
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
              <p className='text-sm text-red-500'>{formik.errors.phone}</p>
            )}
          </div>

          {/* Klausimas */}
          <div className='space-y-1'>
            <Label htmlFor='question'>Klausimas</Label>
            <Textarea
              id='question'
              name='question'
              rows={4}
              placeholder='Įrašykite savo klausimą...'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.question}
              className={
                formik.touched.question && formik.errors.question
                  ? 'border-red-500'
                  : ''
              }
            />
            {formik.touched.question && formik.errors.question && (
              <p className='text-sm text-red-500'>{formik.errors.question}</p>
            )}
          </div>

          <DialogFooter className='gap-2'>
            <DialogClose asChild>
              <Button
                variant='outline'
                type='button'>
                Atšaukti
              </Button>
            </DialogClose>
            <Button
              type='submit'
              disabled={isPending}>
              {isPending ? 'Siunčiama...' : 'Siųsti užklausą'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
