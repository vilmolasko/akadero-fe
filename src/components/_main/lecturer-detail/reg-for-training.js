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
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input';

const validationSchema = Yup.object({
  firstName: Yup.string().required('First Name is required'),
  lastName: Yup.string().required('Last Name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  phone: Yup.string()
    .required('Telefono numeris yra privalomas')
    .test(
      'is-valid-phone',
      'Neteisingas telefono numeris',
      (value) => value && isValidPhoneNumber(value)
    ),
});

export default function RegForTraining({ scheduleId, courseId }) {
  const [open, setOpen] = useState(false);

  const { mutate, isPending } = useMutation({
    mutationFn: api.registerStudent,
    retry: false,
    onSuccess: (data) => {
      toast.success(data.message);
      formik.resetForm(); // ✅ Reset form
      setOpen(false); // ✅ Close dialog
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || 'Something went wrong!');
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
          Register
        </Button>
      </DialogTrigger>

      <DialogContent className='sm:max-w-[500px]'>
        <form
          onSubmit={formik.handleSubmit}
          className='space-y-4'>
          <DialogHeader>
            <DialogTitle>Registration for training</DialogTitle>
          </DialogHeader>

          {/* First Name */}
          <div className='space-y-1'>
            <Label htmlFor='firstName'>First Name</Label>
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

          {/* Last Name */}
          <div className='space-y-1'>
            <Label htmlFor='lastName'>Last Name</Label>
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

          {/* Email */}
          <div className='space-y-1'>
            <Label htmlFor='email'>Email</Label>
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

          {/* Phone */}
          <div className='space-y-1'>
            <Label htmlFor='phone'>Phone Number</Label>
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

          <DialogFooter>
            <DialogClose asChild>
              <Button
                variant='outline'
                type='button'>
                Cancel
              </Button>
            </DialogClose>
            <Button
              type='submit'
              disabled={isPending}>
              {isPending ? 'Loading...' : 'Register'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
