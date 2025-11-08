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
  title: 'Akadero Course Directory App',
  description:
    'Discover and explore courses effortlessly with Akadero — a modern course directory app built using Next.js, Tailwind CSS, and Shadcn UI.',
  generator: 'Next.js',
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/favicon.ico', // or apple-touch-icon.png if you have one
  },
  keywords: [
    'Next.js courses',
    'course directory app',
    'Tailwind CSS',
    'Shadcn UI',
    'React course platform',
  ],
  applicationName: 'Akadero',
  authors: [{ name: 'Akadero Course Directory' }],
  creator: 'Akadero Course Directory',
  publisher: 'Akadero Course Directory',

  openGraph: {
    title: 'Akadero Course Directory App',
    description:
      'Discover and explore courses effortlessly with Akadero — a modern course directory app built using Next.js, Tailwind CSS, and Shadcn UI.',

    siteName: 'Akadero',
    images: [
      {
        url: '/og-image.png', // ✅ Add a proper OG image here
        width: 1200,
        height: 630,
        alt: 'Akadero Course Directory',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Akadero Course Directory App',
    description:
      'Discover and explore courses effortlessly with Akadero — a modern course directory app built using Next.js, Tailwind CSS, and Shadcn UI.',

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
