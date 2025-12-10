import ContactUs from '@/components/contact';

export const metadata = {
  title: 'Kontaktai - Mokymukatalogas.lt',
  description:
    'Susisiekite su Mokymukatalogas.lt mokymų organizatoriais dėl pagalbos, papildomos informacijos ar klausimų.',
  openGraph: {
    title: 'Kontaktai - Mokymukatalogas.lt',
    description:
      'Susisiekite su Mokymukatalogas.lt mokymų organizatoriais dėl pagalbos, papildomos informacijos ar klausimų.',
    type: 'website',
    url: 'https://mokymukatalogas.lt/kontaktai',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Mokymukatalogas.lt Kontaktai',
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function Page() {
  return <ContactUs />;
}
