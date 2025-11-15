'use client';

import { usePathname } from 'next/navigation';
import {
  Home,
  Users,
  Settings,
  ChevronLeft,
  ChevronRight,
  Menu,
  FolderTree,
  FolderOpen,
  BookOpen,
  GraduationCap,
  Building2,
  Mails,
  BookOpenCheck,
} from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import NextLink from 'next/link';
import Image from 'next/image';

const navItems = [
  {
    label: 'Prietaisų skydelis',
    href: '/admin/dashboard',
    icon: Home,
  },
  {
    label: 'Kategorijos',
    href: '/admin/categories',
    icon: FolderTree,
  },
  {
    label: 'Paukategorės',
    href: '/admin/sub-categories',
    icon: FolderOpen,
  },
  {
    label: 'Kursai',
    href: '/admin/courses',
    icon: BookOpen,
  },
  {
    label: 'Rekomenduojami kursai',
    href: '/admin/featured-courses',
    icon: BookOpenCheck,
  },
  {
    label: 'Organizatoriai',
    href: '/admin/organizers',
    icon: Building2,
  },
  {
    label: 'Mokytojai',
    href: '/admin/lecturers',
    icon: GraduationCap,
  },
  {
    label: 'Studentai',
    href: '/admin/students',
    icon: Users,
  },
  {
    label: 'Naujienlaiškis',
    href: '/admin/newsletter',
    icon: Mails,
  },
  {
    label: 'Nustatymai',
    href: '/admin/settings',
    icon: Settings,
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <>
      {/* Sidebar for large screens */}
      <aside
        className={cn(
          'hidden md:flex flex-col h-screen bg-card border-r transition-all duration-300 relative',
          collapsed ? 'w-20' : 'w-68'
        )}>
        {/* Header */}
        <div className='h-16 flex items-center justify-between px-4 border-b'>
          {collapsed ? (
            <NextLink href='/'>
              <Image
                src='/logo.png'
                alt='Logo'
                placeholder='blur'
                blurDataURL='/logo-dark.png'
                className='object-contain'
                width={40}
                height={40}
              />
            </NextLink>
          ) : (
            <NextLink href='/'>
              <Image
                src='/logo-dark.png'
                alt='Logo'
                placeholder='blur'
                blurDataURL='/logo-dark.png'
                className='object-contain'
                width={160}
                height={45}
              />
            </NextLink>
          )}
          <Button
            variant='ghost'
            size='icon'
            className='absolute right-[-14px] border rounded-full bg-accent size-7'
            onClick={() => setCollapsed(!collapsed)}>
            {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          </Button>
        </div>

        {/* Nav Items */}
        <nav className='flex-1 p-4 space-y-2'>
          {navItems.map(({ label, href, icon: Icon }) => {
            const active = pathname === href || pathname.startsWith(`${href}/`);
            return (
              <NextLink
                key={href}
                href={href}
                className={cn(
                  'flex items-center gap-3 px-2 py-2 rounded-md text-normal font-medium transition-colors',
                  active
                    ? 'bg-primary-100 text-primary'
                    : 'text-forground hover:bg-accent'
                )}>
                <Icon size={18} />
                {!collapsed && <span>{label}</span>}
              </NextLink>
            );
          })}
        </nav>
      </aside>

      {/* Mobile Sidebar using Shadcn Sheet */}
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant='ghost'
            size='icon'
            className='md:hidden fixed top-4 left-4 z-50'>
            <Menu size={20} />
          </Button>
        </SheetTrigger>
        <SheetContent
          side='left'
          className='p-0 w-64'>
          {/* Logo */}
          <NextLink href='/'>
            <Image
              src='/logo-dark.png'
              alt='Logo'
              placeholder='blur'
              blurDataURL='/logo-dark.png'
              className='object-contain'
              width={190}
              height={52}
            />
          </NextLink>
          <nav className='flex-1 p-4'>
            {navItems.map(({ label, href, icon: Icon }) => {
              const active = pathname === href;
              return (
                <NextLink
                  key={href}
                  href={href}
                  className={cn(
                    'flex items-center gap-3 px-4 py-2 rounded-md text-md font-normal transition-colors',
                    active
                      ? 'bg-primary-100 text-primary'
                      : 'text-forground hover:bg-accent'
                  )}>
                  <Icon size={20} />
                  <span>{label}</span>
                </NextLink>
              );
            })}
          </nav>
        </SheetContent>
      </Sheet>
    </>
  );
}
