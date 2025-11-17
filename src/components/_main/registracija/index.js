'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';
import { useRouter } from '@bprogress/next';
import PlanPopup from './plan-popup';
import { plans } from './data.json';

export default function PricingPage() {
  const router = useRouter();
  const [popupOpen, setPopupOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const handleButtonClick = (plan) => {
    if (plan.title === 'Nemokamas') {
      router.push('/auth/sign-in'); // redirect to login
    } else {
      setSelectedPlan(plan); // pass the plan title to popup
      setPopupOpen(true);
    }
  };

  return (
    <main className='max-w-6xl mx-auto px-4 py-16'>
      {/* Header */}
      <section className='text-center mb-12'>
        <h1 className='text-xl md:text-3xl font-bold mb-4 font-merriweather'>
          Nemokamai prisijunkite prie Akadero.lt platformos
        </h1>
        <p className='text-normal text-muted-foreground max-w-3xl mx-auto'>
          Akadero.lt – tai nemokamas ir vienas labiausiai lankomų švietimo bei
          mokymo paslaugų katalogų Lietuvoje. Platformoje galite paprastai ir
          rezultatyviai dalintis informacija apie visus savo rengiamus
          profesinio tobulėjimo renginius ir mokymo programas.
        </p>
      </section>

      {/* Pricing Cards */}
      <section className='grid grid-cols-1 md:grid-cols-3 gap-6'>
        {plans.map((plan, i) => (
          <Card
            key={i}
            className={`flex flex-col  transition-transform rounded-3xl duration-300  p-6 ${
              plan.highlight
                ? 'md:scale-[1.08] border-primary shadow-lg hover:shadow-primary-100'
                : 'border-gray-200 shadow-sm hover:shadow-md'
            }`}>
            <CardHeader className='p-0'>
              <CardTitle
                className={`text-lg font-bold  ${
                  plan.highlight ? 'text-primary' : 'text-gray-900'
                }`}>
                {plan.title}
              </CardTitle>
              <p className='text-muted-foreground'>{plan.description}</p>
            </CardHeader>
            <CardContent className='flex flex-col items-center'>
              <div className='text-xl font-bold mb-1'>{plan.price}</div>
              {plan.period && (
                <div className='text-sm text-muted-foreground mb-4'>
                  /{plan.period}
                </div>
              )}
              <Button
                onClick={() => handleButtonClick(plan)}
                className={`w-full mb-6 ${
                  plan.highlight
                    ? 'bg-primary hover:primary-500 text-white'
                    : 'bg-gray-100 hover:bg-gray-200  text-gray-800'
                }`}>
                {plan.button}
              </Button>
              <ul className='space-y-2 text-md text-left w-full'>
                {plan.features.map((feature, idx) => (
                  <li
                    key={idx}
                    className='flex items-start'>
                    <span className='mr-2 text-primary'>
                      <Check size={18} />
                    </span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </section>
      {/* Plan Popup */}
      {selectedPlan && (
        <PlanPopup
          open={popupOpen}
          setOpen={setPopupOpen}
          setSelectedPlan={setSelectedPlan}
          plan={selectedPlan} // pass title to show inside popup
        />
      )}
    </main>
  );
}
// const plans = [
//   {
//     title: 'Nemokamas',
//     description: 'Išbandyk platformos galimybes be įsipareigojimų.',
//     price: '0€',
//     period: 'mėn',
//     features: ['Neriboti skelbimai', 'Užklausos mygtukas', 'Telefono numeris'],
//     button: 'Registruotis',
//     highlight: false,
//   },
//   {
//     title: 'Partneris',
//     description: 'Pirmenybė rodant kursus paieškos rezultatuose.',
//     price: '30€',
//     period: 'mėn',
//     features: [
//       '5 Skelbimai',
//       'Aukštesnė pozicija',
//       'Potencialių užklausų pranešimai',
//       'Užklausos mygtukas',
//       'Telefono numeris',
//       'Individuali registracijos forma',
//       'Aktyvi nuoroda į jūsų svetainę',
//       'Logotipo rodymas',
//       'Organizatorių skiltis',
//       'Skelbimo iškėlimas + 30€/mėn',
//       'Mokėjimų surinkimas',
//     ],
//     button: 'Registruotis',
//     highlight: true,
//   },
//   {
//     title: 'TOP',
//     description: 'Lankstus sprendimas nestandartiniams poreikiams.',
//     price: 'Individualus',
//     period: '',
//     features: [
//       'Daugiau nei 5 skelbimai',
//       'Aukštesnė pozicija',
//       'Potencialių užklausų pranešimai',
//       'Užklausos mygtukas',
//       'Telefono numeris',
//       'Individuali registracijos forma',
//       'Aktyvi nuoroda į jūsų svetainę',
//       'Logotipo rodymas',
//       'Organizatorių skiltis',
//       'Išskirtinės sąlygos',
//       'Skelbimo iškėlimas + 30€/mėn',
//       'Mokėjimų surinkimas',
//     ],
//     button: 'Registruotis',
//     highlight: false,
//   },
// ];
