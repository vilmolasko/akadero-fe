import Appbar from '@/layouts/_main/appbar';
import Footer from '@/layouts/_main/footer';
import React from 'react';

export default function layout({
  children, // will be a page or nested layout
}) {
  return (
    <>
      <Appbar />
      {children}
      <Footer />
    </>
  );
}
