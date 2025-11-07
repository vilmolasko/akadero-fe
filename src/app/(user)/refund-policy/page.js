'use client';

import React from 'react';
import Link from 'next/link';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ArrowRight } from 'lucide-react';

export default function TermsPage() {
  return (
    <main className='min-h-screen py-20 px-6 sm:px-8 lg:px-16'>
      <div className='mx-auto max-w-4xl animate-fadeIn'>
        <header className='text-center mb-12'>
          <h1 className='text-4xl font-bold text-primary tracking-tight'>
            Naudojimosi sąlygos ir pinigų grąžinimo politika
          </h1>
          <p className='mt-3 text-base text-foreground max-w-2xl mx-auto'>
            Šios sąlygos reglamentuoja <strong>akadero.lt</strong> naudojimą ir
            apibrėžia dalyvių įsipareigojimus, pinigų grąžinimo tvarką bei
            duomenų saugumo priemones.
          </p>
        </header>

        <Card className='border border-divider p-5'>
          <CardHeader className='p-0'>
            <CardTitle>Greita navigacija</CardTitle>
            <CardDescription>
              Pereikite į reikiamą skyrių arba atsispausdinkite šį dokumentą.
            </CardDescription>
          </CardHeader>
          <CardContent className='pb-0'>
            <div className='flex flex-wrap gap-3'>
              <Link href='#general'>
                <Button
                  variant='outline'
                  size='sm'
                  className='gap-2'>
                  Bendros nuostatos <ArrowRight size={14} />
                </Button>
              </Link>
              <Link href='#registration'>
                <Button
                  variant='outline'
                  size='sm'
                  className='gap-2'>
                  Registracija ir mokėjimai <ArrowRight size={14} />
                </Button>
              </Link>
              <Link href='#refund'>
                <Button
                  variant='outline'
                  size='sm'
                  className='gap-2'>
                  Pinigų grąžinimas <ArrowRight size={14} />
                </Button>
              </Link>
              <Link href='#reviews'>
                <Button
                  variant='outline'
                  size='sm'
                  className='gap-2'>
                  Atsiliepimai <ArrowRight size={14} />
                </Button>
              </Link>
              <Link href='#privacy'>
                <Button
                  variant='outline'
                  size='sm'
                  className='gap-2'>
                  Duomenų saugumas <ArrowRight size={14} />
                </Button>
              </Link>
              <Link href='#obligations'>
                <Button
                  variant='outline'
                  size='sm'
                  className='gap-2'>
                  Dalyvių įsipareigojimai <ArrowRight size={14} />
                </Button>
              </Link>
              <Link href='#final'>
                <Button
                  variant='outline'
                  size='sm'
                  className='gap-2'>
                  Baigiamosios nuostatos <ArrowRight size={14} />
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        <article className='prose prose-slate max-w-none mt-10'>
          <section id='general'>
            <h2 className='text-primary font-medium mb-1'>
              1. Bendros nuostatos
            </h2>
            <p>
              Šios naudojimosi sąlygos reglamentuoja <strong>akadero.lt</strong>{' '}
              platformos (toliau – „Platforma“) naudojimą, kurią administruoja
              UAB „Akadero“. Registruodamiesi ir naudodamiesi Platforma jūs
              sutinkate su šiomis sąlygomis ir Privatumo politika.
              Administratorius gali bet kada atnaujinti šias sąlygas, o
              naudotojai apie reikšmingus pakeitimus bus informuojami el. paštu.
            </p>
          </section>

          <Separator className='my-8' />

          <section id='registration'>
            <h2 className='text-primary font-medium mb-1'>
              2. Registracija ir mokėjimai
            </h2>
            <p>
              Registruodamiesi į mokymus, dalyviai moka{' '}
              <strong>registracijos mokestį</strong> UAB „Akadero“. Platforma
              netvarko kitų mokymų mokesčių – jie derinami tiesiogiai su mokymų
              organizatoriumi. Registracijos mokestis negarantuoja vietos
              mokymuose, kol nėra sumokėta visa suma.
            </p>
          </section>

          <Separator className='my-8' />

          <section id='refund'>
            <h2 className='text-primary font-medium mb-1'>
              3. Pinigų grąžinimo politika
            </h2>
            <p>
              Dalyviai turi teisę atgauti registracijos mokestį per{' '}
              <strong>7 kalendorines dienas</strong> nuo registracijos, jei
              atšaukia per šį laikotarpį. Po 7 dienų registracijos mokestis
              negrąžinamas. Likusios mokymų kainos grąžinimus tvarko pats
              organizatorius.
            </p>
          </section>

          <Separator className='my-8' />

          <section id='reviews'>
            <h2 className='text-primary font-medium mb-1'>4. Atsiliepimai</h2>
            <p>
              Dalyvavę mokymuose asmenys gali palikti atsiliepimus apie
              organizatorių ar kursą. Atsiliepimai padeda būsimiems naudotojams
              pasirinkti tinkamus mokymus ir yra viešai matomi platformoje.
            </p>
          </section>

          <Separator className='my-8' />

          <section id='privacy'>
            <h2 className='text-primary font-medium mb-1'>
              5. Duomenų saugumas ir privatumas
            </h2>
            <p>
              Visi dalyvių duomenys saugomi saugioje Platformos sistemoje.
              Akadero saugo asmens duomenis pagal BDAR ir taikomus įstatymus,
              užtikrindama konfidencialumą ir atsakingą duomenų tvarkymą.
            </p>
          </section>

          <Separator className='my-8' />

          <section id='obligations'>
            <h2 className='text-primary font-medium mb-1'>
              6. Dalyvių įsipareigojimai
            </h2>
            <p>
              Dalyviai privalo teikti tikslią informaciją registracijos metu,
              atlikti mokėjimus laiku, kaip sutarta su organizatoriumi, ir
              susipažinti su organizatoriaus taisyklėmis bei grąžinimo sąlygomis
              prieš registraciją.
            </p>
          </section>

          <Separator className='my-8' />

          <section id='final'>
            <h2 className='text-primary font-medium mb-1'>
              7. Baigiamosios nuostatos
            </h2>
            <p>
              Akadero pasilieka teisę keisti šias sąlygas. Dalyviai bus
              informuojami apie reikšmingus pakeitimus el. paštu. Ginčai bus
              sprendžiami derybų keliu arba, jei reikia, pagal Lietuvos
              Respublikos įstatymus. Dėl klausimų galite kreiptis el. paštu{' '}
              <a href='mailto:info@akadero.lt'>info@akadero.lt</a>.
            </p>
          </section>

          <Accordion
            type='single'
            collapsible>
            <AccordionItem value='legal'>
              <AccordionTrigger>Teisinė pastaba</AccordionTrigger>
              <AccordionContent>
                <p>
                  Šios sąlygos yra teisiškai privalomos ir taikomos visiems
                  Akadero Platformos naudotojams. Toliau naudojantis Platforma
                  laikoma, kad sutinkate su visais atnaujinimais.
                </p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <div className='mt-12 flex items-center justify-between border-t border-slate-200 pt-6'>
            <p className='text-sm text-slate-500'>
              Paskutinį kartą atnaujinta:{' '}
              <time dateTime={new Date().toISOString()}>
                {new Date().toLocaleDateString('lt-LT')}
              </time>
            </p>
            <div className='flex gap-2'>
              <Link
                href='/'
                aria-label='Atgal į pradžią'>
                <Button
                  variant='ghost'
                  size='sm'>
                  Atgal į pradžią
                </Button>
              </Link>
              <Link
                href='/privacy-policy'
                aria-label='Privatumo politika'>
                <Button
                  variant='outline'
                  size='sm'>
                  Privatumo politika
                </Button>
              </Link>
            </div>
          </div>
        </article>
      </div>
    </main>
  );
}
