import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  ArrowDownAZ,
  CalendarCheck,
  ClipboardList,
  GraduationCap,
} from 'lucide-react';
import RegForTraining from './reg-for-training';
import { fDateShort } from '@/utils/formatTime';
import Image from 'next/image';
import NextLink from 'next/link';

export default function MoreDetails({ data, courses }) {
  return (
    <div className='my-8'>
      {/* Accordion */}
      <Accordion
        type='multiple'
        className='w-full p-0 overflow-y-auto space-y-3'>
        {/* Tvarkaraščiai */}
        <AccordionItem
          value='place'
          className='last:border-b-1 rounded-md border'>
          <AccordionTrigger className='h-10 lg:h-14 px-3 md:px-4 py-3 hover:bg-background flex items-center justify-between cursor-pointer'>
            <div className='flex items-center gap-2'>
              <CalendarCheck className='w-5 h-5' />
              <span className='text-md lg:text-normal'>Tvarkaraščiai</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className='px-4 md:px-6 pb-4 pt-1 border-t'>
            <Table className='min-w-[760px]'>
              <TableHeader>
                <TableRow>
                  <TableHead>Kurso pavadinimas</TableHead>
                  <TableHead>Data</TableHead>
                  <TableHead>Miestas</TableHead>
                  <TableHead>Vietų skaičius</TableHead>
                  <TableHead>Komentaras</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {courses?.map((course) =>
                  course?.schedules?.map((t) => (
                    <TableRow key={t._id}>
                      <TableCell className='font-semibold'>
                        {course.title}
                      </TableCell>
                      <TableCell>{fDateShort(t.date)}</TableCell>
                      <TableCell>{t.location}</TableCell>
                      <TableCell>{t.seats}</TableCell>
                      <TableCell>{t.comment}</TableCell>
                      <TableCell align='right'>
                        <RegForTraining
                          scheduleId={t._id}
                          courseId={course._id}
                        />
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </AccordionContent>
        </AccordionItem>

        {/* Aprašymas */}
        {data?.description && (
          <AccordionItem
            value='description'
            className='last:border-b-1 rounded-md border'>
            <AccordionTrigger className='h-10 lg:h-14 px-3 md:px-4 py-3 hover:bg-background flex items-center justify-between cursor-pointer'>
              <div className='flex items-center gap-2'>
                <ArrowDownAZ className='w-5 h-5' />
                <span className='text-md lg:text-normal'>Aprašymas</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className='px-4 md:px-6 pb-4 pt-3 border-t'>
              <p className='text-md md:text-normal text-justify text-muted-foreground tracking-wide'>
                {data?.description}
              </p>
            </AccordionContent>
          </AccordionItem>
        )}

        {/* Programa */}
        {data?.program && (
          <AccordionItem
            value='pProgram'
            className='last:border-b-1 border-b rounded-md border'>
            <AccordionTrigger className='h-10 lg:h-14 px-3 md:px-4 py-3 hover:bg-background flex items-center justify-between cursor-pointer'>
              <div className='flex items-center gap-2'>
                <ClipboardList className='w-5 h-5' />
                <span className='text-md lg:text-normal'>Programa</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className='px-4 md:px-6 pb-4 pt-3 border-t'>
              <p className='text-md md:text-normal text-justify text-muted-foreground tracking-wide'>
                {data?.program?.descriptions}
              </p>
            </AccordionContent>
          </AccordionItem>
        )}

        {/* Lektoriai */}
        {data?.lecturers && (
          <AccordionItem
            value='Lecturers'
            className='last:border-b-1 rounded-md border'>
            <AccordionTrigger className='h-10 lg:h-14 px-3 md:px-4 py-3 hover:bg-background flex items-center justify-between cursor-pointer'>
              <div className='flex items-center gap-2'>
                <GraduationCap className='w-5 h-5' />
                <span className='text-md lg:text-normal'>Lektoriai</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className='px-4 md:px-6 pb-4 pt-3 border-t'>
              <div className='space-y-1'>
                {data?.lecturers?.map((lecturer) => (
                  <div
                    key={lecturer._id}
                    className='space-y-1 flex items-center justify-between gap-2 border-b border-border last:border-b-0'>
                    <div className='relative flex items-center gap-4'>
                      <Image
                        src={lecturer?.cover?.url || '/placeholder-image.png'}
                        alt={lecturer.name}
                        width={60}
                        height={60}
                        className='object-cover rounded-md'
                      />
                      <div>
                        <h3 className='text-md md:text-normal font-semibold'>
                          {lecturer.name}
                        </h3>
                        <p className='text-md md:text-md text-justify text-muted-foreground tracking-wide'>
                          {lecturer.description}
                        </p>
                      </div>
                    </div>
                    <NextLink
                      className='text-normal text-primary hover:underline font-medium'
                      href={`/lecturers/${lecturer._id}`}>
                      Peržiūrėti profilį
                    </NextLink>
                  </div>
                ))}
              </div>
              {data?.lecturers?.length === 0 && (
                <p className='text-md md:text-normal text-justify text-muted-foreground tracking-wide'>
                  Šis mokymas neturi paskirtų lektorių
                </p>
              )}
            </AccordionContent>
          </AccordionItem>
        )}
        {/* End Accordion */}
      </Accordion>
    </div>
  );
}
