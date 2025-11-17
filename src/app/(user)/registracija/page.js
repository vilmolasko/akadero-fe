import Registracija from '@/components/_main/registracija';
import React from 'react';

export const metadata = {
  title: 'Prisijunkite prie Akadero.lt | Nemokamas švietimo katalogas',
  description:
    'Akadero.lt – tai nemokamas ir vienas labiausiai lankomų švietimo bei mokymo paslaugų katalogų Lietuvoje. Paprastai ir rezultatyviai dalinkitės informacija apie savo renginius ir mokymo programas.',
  keywords: [
    'Akadero',
    'mokymai',
    'švietimo katalogas',
    'kursai',
    'profesinis tobulėjimas',
    'registracija',
  ],
  openGraph: {
    title: 'Nemokamai prisijunkite prie Akadero.lt',
    description:
      'Nemokamas švietimo ir mokymo paslaugų katalogas Lietuvoje – talpinkite savo renginius ir mokymo programas.',
    url: 'https://www.akadero.lt/registracija',
    siteName: 'Akadero.lt',
  },
};

export default function page() {
  return (
    <>
      <Registracija />
    </>
  );
}
