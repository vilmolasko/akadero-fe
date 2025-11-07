'use client';
import React from 'react';
import DashboardStats from '@/components/_admin/dashboard-stats';
import { ChartAreaInteractive } from '@/components/_admin/charts/area-chart';
import { CoursesDonutChart } from '@/components/_admin/charts/pie-chart';
import { useQuery } from '@tanstack/react-query';
import * as api from '@/services';
import toast from 'react-hot-toast';

export default function AdminDashboard() {
  const [range, setRange] = React.useState('30days');

  const { data, isPending } = useQuery({
    queryKey: ['admin-dashboard', range],
    queryFn: () => api.getAnalyticsByAdmin(range),

    retry: false,
    onError: (err) => {
      toast.error(err?.response?.data?.message || 'Something went wrong!');
    },
  });

  const summary = data?.data?.summary;
  return (
    <div className='space-y-6'>
      {/* Stats Cards */}
      <DashboardStats summary={summary} />

      {/* Charts Grid */}
      <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
        <div className='md:col-span-2 col-span-1 w-full'>
          <ChartAreaInteractive
            data={data?.data?.report?.lineChart}
            range={range}
            setRange={setRange}
            isPending={isPending}
          />
        </div>
        <div className='col-span-1 w-full'>
          <CoursesDonutChart overview={data?.data?.overview} />
        </div>
      </div>
    </div>
  );
}
