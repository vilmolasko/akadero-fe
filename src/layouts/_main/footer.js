'use client';
// components/footer.tsx
import { LocateFixed, Mail, PhoneCall, Search } from 'lucide-react';
import Image from 'next/image';
import NextLink from 'next/link';
import { toast } from 'react-hot-toast';
// formik
import { Form, FormikProvider, useFormik } from 'formik';
// api
import * as api from 'src/services';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { Spinner } from '@/components/ui/spinner';

const Footer = () => {
  const [loading, setloading] = useState(false);
  const { mutate } = useMutation({
    mutationFn: api.sendNewsletter,
    onSuccess: (data) => {
      toast.success(data.message);
      setloading(false);
      formik.resetForm();
    },
    onError: (err) => {
      setloading(false);
      toast.error(err?.response?.data?.message || 'Something went wrong!');
    },
  });
  //   api integrate
  const formik = useFormik({
    initialValues: { email: '' },
    onSubmit: async (values) => {
      if (
        values.email
          .toLowerCase()
          .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          )
      ) {
        setloading(true);
        mutate(values);
      } else {
        toast.error('Invalid email!');
      }
    },
  });

  const { handleSubmit, getFieldProps } = formik;

  return (
    <footer className='bg-card border-t md:mt-10'>
      <div className='layout-container pt-10'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8'>
          {/* Brand Section */}
          <div className='lg:col-span-4'>
            <div className='space-y-4'>
              {/* Logo */}
              <NextLink href='/'>
                <Image
                  src='/logo.svg'
                  alt='Logo'
                  placeholder='blur'
                  blurDataURL='/logo.svg'
                  className='object-contain'
                  width={190}
                  height={52}
                />
              </NextLink>
              <p className='text-md  text-muted-foreground leading-relaxed tracking-wide mt-1 '>
                „Lorem Ipsum“ yra tiesiog spausdinimo ir maketavimo pramonės
                fiktyvus tekstas. „Lorem Ipsum“ yra pramonės standartas kaip
                fiktyvus tekstas nuo pat...
              </p>
              <div className='space-y-2 text-md  tracking-wide text-muted-foreground '>
                <div className='flex items-center gap-3 hover:text-primary transition-colors duration-200'>
                  <div className='h-8 w-8 rounded-md bg-primary-100 text-foreground flex items-center justify-center'>
                    <Mail className='h-4 w-4' />
                  </div>

                  <a href='mailto:Info@akadero.com'>Info@akadero.com</a>
                </div>
                <div className='flex items-center gap-3 hover:text-primary transition-colors duration-200'>
                  <div className='h-8 w-8 rounded-md bg-primary-100 text-foreground flex items-center justify-center'>
                    <PhoneCall className='h-4 w-4' />
                  </div>

                  <a href='tel:+11234567891'>+1 123 456 7891</a>
                </div>
                <div className='flex items-center gap-3 hover:text-primary transition-colors duration-200'>
                  <div className='h-8 w-8 rounded-md bg-primary-100 text-foreground flex items-center justify-center'>
                    <LocateFixed className='h-4 w-4' />
                  </div>

                  <a href='https://www.google.com/maps/place/New+York,+NY,+USA'>
                    Niujorkas, Jungtinės Valstijos
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Company NextLinks Sections */}
          <div className='lg:col-span-4 grid grid-cols-1 sm:grid-cols-2 gap-8'>
            {/* First Company Column */}
            <div className='space-y-4'>
              <h3 className=' tracking-wide text-lg font-semibold text-foreground'>
                Ištekliai
              </h3>
              <ul className='space-y-3'>
                {resourceData.map((item, index) => (
                  <li key={index}>
                    <NextLink
                      href={item.link}
                      className=' tracking-wide text-muted-foreground hover:text-primary transition-colors duration-200'>
                      {item.name}
                    </NextLink>
                  </li>
                ))}
              </ul>
            </div>

            {/* Second Company Column */}
            <div className='space-y-4'>
              <h3 className=' tracking-wide text-lg font-semibold text-foreground'>
                Įmonė
              </h3>
              <ul className='space-y-3'>
                {companyData.map((item, index) => (
                  <li key={index}>
                    <NextLink
                      href={item.link}
                      className=' tracking-wide text-muted-foreground  hover:text-primary transition-colors duration-200'>
                      {item.name}
                    </NextLink>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Newsletter Section */}
          <div className='lg:col-span-4 space-y-4'>
            <h3 className=' tracking-wide text-lg font-semibold text-foreground'>
              Naujienlaiškis
            </h3>
            <FormikProvider value={formik}>
              <Form
                noValidate
                autoComplete='off'
                onSubmit={handleSubmit}>
                <div className='flex flex-col space-y-3'>
                  <div className='flex'>
                    <input
                      type='email'
                      placeholder='El. paštas'
                      {...getFieldProps('email')}
                      className='flex-1 px-2 py-2 md:px-3 md:py-3.5 text-normal border border-r-0 rounded-l-md focus:outline-none  text-foreground bg-transparent placeholder:text-muted-foreground transition-colors duration-200'
                    />
                    <button
                      type='submit'
                      className='px-3 md:px-4 py-2 bg-primary cursor-pointer text-white rounded-r-md hover:bg-primary-500 transition-colors duration-200'>
                      {loading ? <Spinner /> : <Search className='h-5 w-5' />}
                    </button>
                  </div>
                </div>
              </Form>
            </FormikProvider>
          </div>
        </div>

        {/* Bottom Border */}
        <div className='border-t mt-8 py-5'>
          <div className='flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0'>
            <p className='text-md  tracking-wide text-muted-foreground'>
              © 2024 akadero. Visos teisės saugomos.
            </p>
            <div className='flex space-x-3 md:space-x-6'>
              <NextLink
                href='/privacy-policy'
                className='text-md  tracking-wide text-muted-foreground hover:text-primary transition-colors duration-200'>
                Privatumo politika
              </NextLink>
              <NextLink
                href='/refund-policy'
                className='text-md  tracking-wide text-muted-foreground hover:text-primary transition-colors duration-200'>
                Naudojimo sąlygos ir pinigų grąžinimo politika
              </NextLink>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

const resourceData = [
  {
    name: 'Kursai',
    link: '/courses',
  },
  {
    name: 'Dėstytojai',
    link: '/teachers',
  },
  {
    name: 'Organizatoriai',
    link: '/organizers',
  },
];

const companyData = [
  {
    name: 'Susisiekite su mumis',
    link: '/contact',
  },
  {
    name: 'Privatumo politika',
    link: '/privacy-policy',
  },
  {
    name: 'Taisyklės ir pinigų grąžinimas',
    link: '/refund-policy',
  },
];
