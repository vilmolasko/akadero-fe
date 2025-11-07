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
import { CalendarCheck } from 'lucide-react';
import RegForTraining from './reg-for-training';
import { fDateShort } from '@/utils/formatTime';

export default function MoreDetails({ data }) {
  return (
    <div className='my-8'>
      {/* Accordion */}
      <Accordion
        type='multiple'
        className='w-full p-0  overflow-y-auto space-y-3'>
        {/* Schedules */}
        <AccordionItem
          value='place'
          className='last:border-b-1 rounded-md border'>
          <AccordionTrigger className='h-10 lg:h-14 px-3 md:px-4 py-3 hover:bg-background flex items-center justify-between cursor-pointer'>
            <div className='flex items-center gap-2'>
              <CalendarCheck className='w-5 h-5 ' />
              <span className='text-md lg:text-normal'>Schedules</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className='px-4 md:px-6 pb-4 pt-1 border-t'>
            <Table className='min-w-[760px]'>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Number of seats</TableHead>
                  <TableHead>Comment</TableHead>
                  <TableHead align='right'></TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {data?.schedules?.map((t) => (
                  <TableRow key={t._id}>
                    <TableCell>{fDateShort(t.date)}</TableCell>
                    <TableCell className='font-medium'>{t.location}</TableCell>
                    <TableCell>{t.seats}</TableCell>
                    <TableCell>{t.comment}</TableCell>
                    <TableCell align='right'>
                      <RegForTraining
                        scheduleId={t._id}
                        courseId={data?._id}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
