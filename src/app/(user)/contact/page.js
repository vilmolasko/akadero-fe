'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';

export default function ContactPage() {
  const [showNumber, setShowNumber] = useState(false);

  return (
    <main className='min-h-screen py-12 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-3xl mx-auto'>
        {/* Viršutinis įspėjimas */}
        <Alert
          variant='destructive'
          className='mb-8 rounded-lg'>
          <AlertDescription className='text-lg font-semibold'>
            Dėl mokymų prašome kreiptis į kontaktus, nurodytus skelbimuose.
          </AlertDescription>
        </Alert>

        {/* Kontaktinė kortelė */}
        <Card className='shadow-md'>
          <CardContent className='p-6 sm:p-8'>
            <h1 className='text-2xl font-bold mb-4 text-foreground'>
              Portalo administracijos kontaktai
            </h1>

            <div className='space-y-4 text-foreground'>
              <p>
                <span className='font-semibold'>Įmonė:</span> Training Guide,
                UAB
              </p>
              <p>
                <span className='font-semibold'>Įmonės kodas:</span> 307055707
              </p>
              <p className='flex items-center gap-2'>
                <Mail className='h-5 w-5 text-foreground' />
                <span>
                  <span className='font-semibold'>El. paštas:</span>{' '}
                  <a
                    href='mailto:info@akadero.com'
                    className='text-blue-600 hover:underline'>
                    info@akadero.com
                  </a>
                </span>
              </p>

              {/* Rodyti telefoną */}
              <p className='flex items-center gap-2'>
                <Phone className='h-5 w-5 text-foreground' />
                <span className='font-semibold'>Telefonas:</span>{' '}
                {showNumber ? (
                  <span className='text-foreground font-medium'>
                    +370 612 34567
                  </span>
                ) : (
                  <Button
                    variant='link'
                    className='p-0 text-green-600 font-medium'
                    onClick={() => setShowNumber(true)}>
                    Rodyti numerį
                  </Button>
                )}
              </p>

              <p className='flex items-start gap-2'>
                <MapPin className='h-5 w-5 text-foreground mt-1' />
                <span>
                  <span className='font-semibold'>Adresas:</span> Vilniaus g.
                  213, Šiauliai, LT-76348, Lietuva
                </span>
              </p>

              <p className='flex items-center gap-2'>
                <Clock className='h-5 w-5 text-foreground' />
                <span>
                  <span className='font-semibold'>Darbo laikas:</span> I–V 09:00
                  – 16:00
                </span>
              </p>
            </div>

            <Separator className='my-6' />

            {/* Navigacijos mygtukai */}
            <div className='flex flex-wrap gap-3'>
              <Link
                href='/'
                passHref>
                <Button variant='secondary'>Grįžti į pradžią</Button>
              </Link>
              <Link
                href='/privacy-policy'
                passHref>
                <Button variant='outline'>Privatumo politika</Button>
              </Link>
              <Link
                href='/refund-policy'
                passHref>
                <Button variant='outline'>Taisyklės ir grąžinimai</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
