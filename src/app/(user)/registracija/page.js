import Registracija from '@/components/_main/registracija';
import React from 'react';

export const metadata = {
  title: 'Prisijunkite prie Mokymukatalogas.lt | Nemokamas švietimo katalogas',
  description:
    'Mokymukatalogas.lt – tai nemokamas ir vienas labiausiai lankomų švietimo bei mokymo paslaugų katalogų Lietuvoje. Paprastai ir rezultatyviai dalinkitės informacija apie savo renginius ir mokymo programas.',
  keywords: [
    'Mokymukatalogas.lt',
    'mokymai',
    'švietimo katalogas',
    'kursai',
    'profesinis tobulėjimas',
    'registracija',
  ],
  openGraph: {
    title: 'Nemokamai prisijunkite prie Mokymukatalogas.lt',
    description:
      'Nemokamas švietimo ir mokymo paslaugų katalogas Lietuvoje – talpinkite savo renginius ir mokymo programas.',
    url: 'https://www.mokymukatalogas.lt/registracija',
    siteName: 'Mokymukatalogas.lt',
  },
};

export default function page() {
  return (
    <>
      <Registracija />
    </>
  );
}
