'use client';
import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import Countdown from 'react-countdown';
// api
import * as api from '@/services';
import { useRef } from 'react';
import { useRouter } from '@bprogress/next';
import { useSelector } from 'react-redux';

import { useMutation } from '@tanstack/react-query';
import { Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';

// Renderer callback
const renderer = ({ minutes, seconds }) => {
  return <h6>{minutes + ':' + seconds} sek</h6>;
};

const validationSchema = Yup.object({
  otp1: Yup.string()
    .length(1, 'Turi būti tiksliai 1 skaitmuo')
    .required('Privaloma'),
  otp2: Yup.string()
    .length(1, 'Turi būti tiksliai 1 skaitmuo')
    .required('Privaloma'),
  otp3: Yup.string()
    .length(1, 'Turi būti tiksliai 1 skaitmuo')
    .required('Privaloma'),
  otp4: Yup.string()
    .length(1, 'Turi būti tiksliai 1 skaitmuo')
    .required('Privaloma'),
  otp5: Yup.string()
    .length(1, 'Turi būti tiksliai 1 skaitmuo')
    .required('Privaloma'),
  otp6: Yup.string()
    .length(1, 'Turi būti tiksliai 1 skaitmuo')
    .required('Privaloma'),
});

export default function VerifyOTP() {
  const router = useRouter();
  const { user } = useSelector((state) => state.user);
  const [loading, setLoading] = React.useState(false);
  const [resendLoading, setResendLoading] = React.useState(false);
  const [complete, setComplete] = React.useState(false);
  const [countdownDate, setCountdownDate] = React.useState(Date.now() + 120000);

  const mutation = useMutation({
    mutationFn: api.verifyOTP,
    onSuccess: async () => {
      setLoading(false);
      toast.success('OTP patvirtintas!');
      router.push(
        user?.role === 'admin' ? `/admin/dashboard` : '/start-selling'
      );
    },
    onError: (err) => {
      const message = JSON.stringify(err.response?.data?.message);
      toast.error(message ? JSON.parse(message) : 'Neteisingas OTP.');
      setLoading(false);
    },
  });

  const mutationResend = useMutation({
    mutationFn: api.resendOTP,
    onSuccess: async () => {
      setComplete(false);
      toast.success('OTP išsiųstas dar kartą');
      setResendLoading(false);
    },
    onError: () => {
      toast.error('Nepavyko išsiųsti OTP.');
      setResendLoading(false);
    },
  });

  const inputRefs = Array.from({ length: 6 }, () => useRef(null));

  const formik = useFormik({
    initialValues: {
      otp1: '',
      otp2: '',
      otp3: '',
      otp4: '',
      otp5: '',
      otp6: '',
    },
    validationSchema,
    onSubmit: (values) => {
      const otp = Object.values(values).join('');
      setLoading(true);
      mutation.mutate({ otp: otp, email: user.email });
    },
  });

  const handleChange = (index, value) => {
    if (value.length <= 1) {
      formik.setFieldValue(`otp${index + 1}`, value);
      if (value && index < 5) inputRefs[index + 1].current.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (
      e.key === 'Backspace' &&
      !formik.values[`otp${index + 1}`] &&
      index > 0
    ) {
      inputRefs[index - 1].current.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData('text').slice(0, 6);
    pasteData.split('').forEach((digit, index) => {
      if (index < 6) formik.setFieldValue(`otp${index + 1}`, digit);
    });
    if (pasteData.length === 6) inputRefs[5].current.focus();
    else if (pasteData.length > 0) inputRefs[pasteData.length].current.focus();
  };

  const onResend = () => {
    setResendLoading(true);
    mutationResend.mutate({ email: user.email });
    setCountdownDate(Date.now() + 60000);
  };

  return (
    <div className='container px-4 mx-auto'>
      <div className='min-h-[calc(100vh-66px)] py-6 flex items-center justify-center '>
        <Card className='rounded-2xl p-6 md:p-8 w-full max-w-md'>
          <div className='text-center mb-5 md:mb-8'>
            <h1 className='text-xl md:text-3xl font-bold font-merriweather'>
              Patvirtinti OTP
            </h1>
            <p className='text-muted-foreground md:mt-2'>
              Įveskite 6 skaitmenų kodą, išsiųstą jūsų el. paštu
            </p>
          </div>

          <form
            onSubmit={formik.handleSubmit}
            className='space-y-4 md:space-y-5'>
            <div className='space-y-1'>
              <Label>Kodo patvirtinimas</Label>
              <div className='flex justify-between space-x-2'>
                {inputRefs.map((ref, index) => (
                  <div
                    key={index}
                    className='flex-1'>
                    <Input
                      ref={ref}
                      id={`otp${index + 1}`}
                      name={`otp${index + 1}`}
                      type='text'
                      inputMode='numeric'
                      maxLength={1}
                      value={formik.values[`otp${index + 1}`]}
                      onChange={(e) => handleChange(index, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(index, e)}
                      onPaste={index === 0 ? handlePaste : undefined}
                      className={`text-center text-xl font-semibold h-12 ${
                        formik.touched[`otp${index + 1}`] &&
                        formik.errors[`otp${index + 1}`]
                          ? 'border-red-500'
                          : ''
                      }`}
                    />
                  </div>
                ))}
              </div>
              <div className='flex flex-wrap justify-between mt-2'>
                {inputRefs.map((_, index) =>
                  formik.touched[`otp${index + 1}`] &&
                  formik.errors[`otp${index + 1}`] ? (
                    <div
                      key={index}
                      className='text-red-500 text-xs mt-1 w-1/3 text-center'>
                      {formik.errors[`otp${index + 1}`]}
                    </div>
                  ) : null
                )}
              </div>
            </div>

            <Button
              variant='default'
              type='submit'
              className='w-full flex items-center justify-center gap-2'
              disabled={loading}>
              {loading && <Loader2 className='h-4 w-4 animate-spin' />}
              Patvirtinti kodą
            </Button>
          </form>

          <div className='text-center mt-6'>
            {complete ? (
              <p className='text-md md:text-normal text-muted-foreground'>
                Nepasirinkote kodo?{' '}
                <button
                  disabled={resendLoading}
                  onClick={onResend}
                  className='text-md md:text-normal cursor-pointer text-pink-600 hover:text-pink-700 font-medium'>
                  Siųsti dar kartą
                </button>
              </p>
            ) : (
              <Countdown
                date={countdownDate}
                renderer={renderer}
                onComplete={() => setComplete(true)}
              />
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}
