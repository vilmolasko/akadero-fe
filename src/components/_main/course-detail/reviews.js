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
import { Textarea } from '@/components/ui/textarea'; // You can create this or use a basic <textarea>
import { Rating } from '@/components/ui/rating';

const validationSchema = Yup.object({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  comment: Yup.string().required('Comment is required'),
  rating: Yup.number()
    .min(1, 'Please give a rating')
    .required('Rating is required'),
});

export default function Reviews() {
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      comment: '',
      rating: '',
    },
    validationSchema,
    onSubmit: (values) => {
      console.log('Submitted values:', values);
      // You can integrate API or toast here
    },
  });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant='link'
          size='sm'>
          Leave a review
        </Button>
      </DialogTrigger>

      <DialogContent className='sm:max-w-[450px]'>
        <form
          onSubmit={formik.handleSubmit}
          className='space-y-4'>
          <DialogHeader>
            <DialogTitle>Leave a Review</DialogTitle>
          </DialogHeader>

          {/* Rating */}
          <div className='space-y-1'>
            <Label htmlFor='rating'>Rating</Label>
            <Rating
              editable
              size={24}
              value={formik.values.rating}
              onChange={(val) => formik.setFieldValue('rating', val)}
            />
            {formik.touched.rating && formik.errors.rating && (
              <p className='text-red-500 text-sm'>{formik.errors.rating}</p>
            )}
          </div>
          {/* Name */}
          <div className='space-y-1'>
            <Label htmlFor='name'>Name</Label>
            <Input
              id='name'
              name='name'
              type='text'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
              className={
                formik.touched.name && formik.errors.name
                  ? 'border-red-500'
                  : ''
              }
            />
            {formik.touched.name && formik.errors.name && (
              <p className='text-sm text-red-500'>{formik.errors.name}</p>
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

          {/* Comment */}
          <div className='space-y-1'>
            <Label htmlFor='comment'>Comment</Label>
            <Textarea
              id='comment'
              name='comment'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.comment}
              className={
                formik.touched.comment && formik.errors.comment
                  ? 'border-red-500'
                  : ''
              }
              placeholder='Write your review...'
              rows={4}
            />
            {formik.touched.comment && formik.errors.comment && (
              <p className='text-sm text-red-500'>{formik.errors.comment}</p>
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
            <Button type='submit'>Submit Review</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
