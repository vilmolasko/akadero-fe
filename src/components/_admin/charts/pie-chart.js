'use client';

import { TrendingUp } from 'lucide-react';
import { Pie, PieChart } from 'recharts';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';

export const description = 'Courses status overview - donut chart';

const chartConfig = {
  published: { label: 'Paskelbta', color: 'var(--chart-1)' },
  pending: { label: 'Laukiama', color: 'var(--chart-2)' },
  canceled: { label: 'Atšaukta', color: 'var(--chart-3)' },
  completed: { label: 'Užbaigta', color: 'var(--chart-4)' },
};

export function CoursesDonutChart({ overview }) {
  // 🧠 Convert API overview object → chartData array
  const chartData = Object.entries(overview || {}).map(([key, value]) => ({
    status: key,
    count: value,
    fill: chartConfig[key]?.color || 'var(--chart-1)',
  }));

  return (
    <Card className='flex flex-col p-4'>
      <CardHeader className='items-center pb-0'>
        <CardTitle>Kursų apžvalga</CardTitle>
        <CardDescription>Apžvalga pagal būseną</CardDescription>
      </CardHeader>

      <CardContent className='flex-1 pb-0'>
        <ChartContainer
          config={chartConfig}
          className='mx-auto aspect-square max-h-[250px]'>
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey='count'
              nameKey='status'
              innerRadius={60}
              outerRadius={100}
              stroke='none'
            />
          </PieChart>
        </ChartContainer>
      </CardContent>

      <CardFooter className='flex-col gap-2 text-sm'>
        <div className='flex items-center gap-2 leading-none font-medium'>
          Šią savaitę tendencija išaugo 12,5 %{' '}
          <TrendingUp className='h-4 w-4' />
        </div>
        <div className='text-muted-foreground leading-none'>
          Rodomos bendros kursų būsenos (tiesioginiai duomenys)
        </div>
      </CardFooter>
    </Card>
  );
}
