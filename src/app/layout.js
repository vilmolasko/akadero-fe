import { Open_Sans } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import Providers from '@/providers';
import { cn } from '@/lib/utils';
// styles
import './globals.css';

import 'swiper/css';
import 'swiper/css/pagination';
import 'react-phone-number-input/style.css';

const openSans = Open_Sans({
  subsets: ['latin'],
});

export const metadata = {
  title: 'Mokymai, kursai seminarai – MokymuKatalogas.lt',
  description:
    ' Populiariausi mokymai, seminarai ir kursai Lietuvoje – gyvai ir nuotoliniu būdu.Atrask naujausius profesinius ir asmeninio tobulėjimo mokymus MokymuKatalogas.lt platformoje.',
  generator: 'Next.js',
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/favicon.ico', // or apple-touch-icon.png if you have one
  },
  keywords: [
    'online kursai',
    'nuotoliniai mokymai',
    'e-mokymosi platforma',
    'geriausi mokymai internetu',
    'tarptautiniai mokymai',
    'profesiniai mokymai',
    'kvalifikacijos kėlimo kursai',
    'asmeninio tobulėjimo mokymai',
    'verslo mokymai',
    'vadovų mokymai',
    'projektų valdymo mokymai',
    'IT mokymai internetu',
    'rinkodaros mokymai',
    'finansų mokymai',
    'žmogiškųjų išteklių mokymai',
    'minkštųjų įgūdžių mokymai',
    'sertifikuoti mokymai',
    'karjeros tobulinimo kursai',
    'kompetencijų ugdymas',
    'internetiniai seminarai',
    'webinarai Lietuvoje',
    'mokymų katalogas',
    'kursų katalogas',
    'populiariausi kursai',
    'geriausi mokymai Lietuvoje',
    'globalūs mokymai',
    'tarptautiniai kursai',
    'mokymai visame pasaulyje',
    'universitetiniai kursai internetu',
    'online sertifikatai',
    'skaitmeninių įgūdžių mokymai',
  ],
  applicationName: 'Mokymukatalogas',
  authors: [{ name: 'Mokymukatalogas Course Directory' }],
  creator: 'Mokymukatalogas Course Directory',
  publisher: 'Mokymukatalogas Course Directory',

  openGraph: {
    title: 'Mokymukatalogas Course Directory App',
    description:
      'Discover and explore courses effortlessly with Mokymukatalogas — a modern course directory app built using Next.js, Tailwind CSS, and Shadcn UI.',

    siteName: 'Mokymukatalogas',
    images: [
      {
        url: '/og-image.png', // ✅ Add a proper OG image here
        width: 1200,
        height: 630,
        alt: 'Mokymukatalogas Course Directory',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Mokymukatalogas Course Directory App',
    description:
      'Discover and explore courses effortlessly with Mokymukatalogas — a modern course directory app built using Next.js, Tailwind CSS, and Shadcn UI.',

    images: ['/og-image.png'],
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang='en'
      suppressHydrationWarning>
      <body className={cn('font-sans', openSans.className)}>
        <Providers>{children}</Providers>
        <Analytics />
      </body>
    </html>
  );
}
