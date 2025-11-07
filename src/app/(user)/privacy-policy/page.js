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

export default function PrivacyPage() {
  return (
    <main className='min-h-screen py-20 px-6 sm:px-8 lg:px-16'>
      <div className='mx-auto max-w-4xl animate-fadeIn'>
        <header className='text-center mb-12'>
          <h1 className='text-4xl font-bold text-primary tracking-tight'>
            Privatumo politika
          </h1>
          <p className='mt-3 text-base text-foreground max-w-2xl mx-auto'>
            Šioje privatumo politikoje paaiškinama, kaip{' '}
            <strong>akadero.lt</strong> renka, naudoja ir saugo asmens duomenis
            pagal BDAR reikalavimus.
          </p>
        </header>

        <Card className='border border-divider p-5'>
          <CardHeader className='p-0'>
            <CardTitle>Greita navigacija</CardTitle>
            <CardDescription>
              Pereikite į bet kurį skyrių arba atsispausdinkite šį dokumentą.
            </CardDescription>
          </CardHeader>
          <CardContent className='pb-0'>
            <div className='flex flex-wrap gap-3'>
              <Link href='#cookies'>
                <Button
                  variant='outline'
                  size='sm'
                  className='gap-2'>
                  Slapukai <ArrowRight size={14} />
                </Button>
              </Link>
              <Link href='#retention'>
                <Button
                  variant='outline'
                  size='sm'
                  className='gap-2'>
                  Duomenų saugojimas <ArrowRight size={14} />
                </Button>
              </Link>
              <Link href='#feedback'>
                <Button
                  variant='outline'
                  size='sm'
                  className='gap-2'>
                  Atsiliepimai <ArrowRight size={14} />
                </Button>
              </Link>
              <Link href='#rights'>
                <Button
                  variant='outline'
                  size='sm'
                  className='gap-2'>
                  Jūsų teisės <ArrowRight size={14} />
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        <article className='prose prose-slate max-w-none mt-10'>
          <section id='cookies'>
            <h2 className='text-primary font-medium mb-1'>
              1. Trečiųjų šalių slapukai
            </h2>
            <p>
              Akadero naudoja trečiųjų šalių slapukus, kad rinktų anoniminius
              duomenis apie apsilankymus, įrenginius ir sąveikas. Šie duomenys
              padeda gerinti svetainės veikimą ir naudotojo patirtį. Be jūsų
              sutikimo asmeninė informacija nerenkama.
            </p>
          </section>

          <Separator className='my-8' />

          <section id='retention'>
            <h2 className='text-primary font-medium mb-1'>
              2. Asmens duomenų saugojimas
            </h2>
            <p>
              Pateikdami užklausos arba registracijos formą, sutinkate, kad jūsų
              duomenys būtų saugomi mažiausiai <strong>5 metus</strong>. Ši
              informacija naudojama tik teikiant informaciją apie kursus,
              mokymus ar susijusius pasiūlymus. Akadero niekada neperduoda
              asmens duomenų trečiosioms šalims, nebent to reikalauja įstatymas.
            </p>
          </section>

          <Separator className='my-8' />

          <section id='feedback'>
            <h2 className='text-primary font-medium mb-1'>3. Atsiliepimai</h2>
            <p>
              Lankytojai gali viešai skelbti atsiliepimus apie kursus,
              dėstytojus ar organizatorius. Jūs valdote, kokią informaciją
              pateikiate. Paskelbti atsiliepimai matomi visiems svetainės
              lankytojams.
            </p>
          </section>

          <Separator className='my-8' />

          <section id='organisers'>
            <h2 className='text-primary font-medium mb-1'>
              4. Mokymų ir dėstytojų informacija
            </h2>
            <p>
              Mokymų organizatoriai, skelbiantys turinį, yra atsakingi už BDAR
              ir kitų įstatymų laikymąsi. Akadero suteikia platformą, tačiau
              nėra atsakinga už organizatorių paskelbtus duomenis. Kiekvienas
              organizatorius privalo atsakingai ir saugiai tvarkyti surinktus
              duomenis.
            </p>
          </section>

          <Separator className='my-8' />

          <section id='protection'>
            <h2 className='text-primary font-medium mb-1'>
              5. Asmens duomenų apsauga
            </h2>
            <p>
              Akadero taiko modernias saugumo priemones, kad apsaugotų naudotojų
              duomenis nuo neteisėtos prieigos ar netinkamo naudojimo. Tačiau
              pateikdami informaciją trečiosioms šalims jūs prisiimate
              atsakomybę už duomenis, pateiktus už Akadero kontrolės ribų.
            </p>
          </section>

          <Separator className='my-8' />

          <section id='liability'>
            <h2 className='text-primary font-medium mb-1'>
              6. Platformos atsakomybės ribojimas
            </h2>
            <p>
              Akadero veikia kaip skelbimų platforma ir nėra atsakinga už
              išorinių organizatorių duomenų tvarkymą. Organizatoriai yra
              savarankiškai atsakingi už BDAR laikymąsi ir saugų lankytojų
              duomenų tvarkymą.
            </p>
          </section>

          <Separator className='my-8' />

          <section id='rights'>
            <h2 className='text-primary font-medium mb-1'>7. Jūsų teisės</h2>
            <p>
              Jūs turite teisę susipažinti su savo duomenimis, juos taisyti,
              ištrinti ar apriboti jų naudojimą pagal taikomus įstatymus.
              Klausimams kreipkitės el. paštu{' '}
              <a href='mailto:info@akadero.lt'>info@akadero.lt</a>.
            </p>
            <p>
              Klausimus dėl šios privatumo politikos ar duomenų tvarkymo taip
              pat galite pateikti tuo pačiu adresu.
            </p>
          </section>

          <Separator className='my-8' />

          <Accordion
            type='single'
            collapsible>
            <AccordionItem value='gdpr'>
              <AccordionTrigger>BDAR atitikties pastabos</AccordionTrigger>
              <AccordionContent>
                <p>
                  Organizatoriai, tiesiogiai renkantys duomenis, turi užtikrinti
                  BDAR laikymąsi – įskaitant teisėtą duomenų tvarkymo pagrindą,
                  saugojimo laikotarpius ir atsakymus į prieigos ar ištrynimo
                  prašymus.
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
            </div>
          </div>
        </article>
      </div>
    </main>
  );
}
