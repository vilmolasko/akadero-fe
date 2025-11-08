import ContactUs from '@/components/contact';

export const metadata = {
  title: 'Kontaktai - Akadero.lt',
  description:
    'Susisiekite su Akadero.lt mokymų organizatoriais dėl pagalbos, papildomos informacijos ar klausimų.',
  openGraph: {
    title: 'Kontaktai - Akadero.lt',
    description:
      'Susisiekite su Akadero.lt mokymų organizatoriais dėl pagalbos, papildomos informacijos ar klausimų.',
    type: 'website',
    url: 'https://akadero.lt/kontaktai',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Akadero.lt Kontaktai',
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
