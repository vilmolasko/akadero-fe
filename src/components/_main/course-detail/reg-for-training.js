'use client';

import { useState } from 'react';
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
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import * as api from '@/services';

const validationSchema = Yup.object({
  firstName: Yup.string().required('Vardas yra privalomas'),
  lastName: Yup.string().required('Pavardė yra privaloma'),
  email: Yup.string()
    .email('Neteisingas el. pašto adresas')
    .required('El. paštas yra privalomas'),
  phone: Yup.string()
    .matches(/^[0-9+\-\s]*$/, 'Neteisingas telefono numeris')
    .required('Telefono numeris yra privalomas'),
});

export default function RegForTraining({ scheduleId, courseId }) {
  const [open, setOpen] = useState(false);

  const { mutate, isPending } = useMutation({
    mutationFn: api.registerStudent,
    retry: false,
    onSuccess: (data) => {
      toast.success(data.message);
      formik.resetForm();
      setOpen(false);
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || 'Įvyko klaida!');
    },
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        mutate({
          ...values,
          scheduleId,
          courseId,
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
          variant='secondary'
          onClick={() => setOpen(true)}>
          Registruotis
        </Button>
      </DialogTrigger>

      <DialogContent className='sm:max-w-[500px]'>
        <form
          onSubmit={formik.handleSubmit}
          className='space-y-4'>
          <DialogHeader>
            <DialogTitle>Registracija į mokymus</DialogTitle>
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
            <Input
              id='phone'
              name='phone'
              type='text'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.phone}
              className={
                formik.touched.phone && formik.errors.phone
                  ? 'border-red-500'
                  : ''
              }
            />
            {formik.touched.phone && formik.errors.phone && (
              <p className='text-sm text-red-500'>{formik.errors.phone}</p>
            )}
          </div>

          <DialogFooter>
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
              {isPending ? 'Kraunama...' : 'Registruotis'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
