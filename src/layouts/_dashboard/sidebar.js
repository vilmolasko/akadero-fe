'use client';

import { usePathname } from 'next/navigation';
import {
  Home,
  Settings,
  ChevronLeft,
  ChevronRight,
  Menu,
  BookOpen,
  GraduationCap,
  ChevronDown,
  ChevronUp,
  Users,
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
    href: '/dashboard/main',
    icon: Home,
  },
  {
    label: 'Kursai',
    href: '/dashboard/courses',
    icon: BookOpen,
  },
  {
    label: 'Rekomenduojami kursai',
    href: '/dashboard/featured-courses',
    icon: BookOpenCheck,
  },
  {
    label: 'Mokytojai',
    href: '/dashboard/lecturers',
    icon: GraduationCap,
  },
  {
    label: 'Studentai',
    href: '/dashboard/students',
    icon: Users,
  },
  {
    label: 'Nustatymai',
    icon: Settings,
    childrens: [
      { label: 'Bendrieji', href: '/dashboard/settings/general' },
      { label: 'Organizatorius', href: '/dashboard/settings/organizer' },
    ],
  },
];

export default function OrganizerSidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [openMenus, setOpenMenus] = useState([]);

  const toggleMenu = (label) => {
    setOpenMenus((prev) =>
      prev.includes(label)
        ? prev.filter((item) => item !== label)
        : [...prev, label]
    );
  };

  return (
    <>
      {/* Sidebar for large screens */}
      <aside
        className={cn(
          'hidden md:flex flex-col h-screen bg-card border-r transition-all duration-300 relative ',
          collapsed ? 'w-20' : 'w-69'
        )}>
        {/* Header */}
        <div className='min-h-16 flex items-center justify-between px-4 border-b relative'>
          {collapsed ? (
            <NextLink href='/'>
              <Image
                src='/logo.png'
                alt='Logo'
                width={40}
                height={40}
                className='object-contain'
              />
            </NextLink>
          ) : (
            <NextLink href='/'>
              <Image
                src='/logo-dark.png'
                alt='Logo'
                width={160}
                height={45}
                className='object-contain'
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
        <nav className='flex-1 p-4 space-y-2 text-[15px]'>
          {navItems.map(({ label, href, icon: Icon, childrens }) => {
            const isActive =
              pathname === href || pathname.startsWith(`${href}/`);
            const isOpen = openMenus.includes(label);

            if (childrens) {
              return (
                <div key={label}>
                  <button
                    onClick={() => toggleMenu(label)}
                    className={cn(
                      'w-full flex items-center justify-between px-4 py-2 rounded-md transition-colors font-medium',
                      isOpen
                        ? 'bg-primary-100 text-primary'
                        : 'text-foreground hover:bg-accent'
                    )}>
                    <div className='flex items-center gap-3'>
                      <Icon size={18} />
                      {!collapsed && <span>{label}</span>}
                    </div>
                    {!collapsed &&
                      (isOpen ? (
                        <ChevronUp size={16} />
                      ) : (
                        <ChevronDown size={16} />
                      ))}
                  </button>

                  {/* Children */}
                  <div
                    className={cn(
                      'pl-10 mt-1 space-y-1 overflow-hidden transition-all duration-300',
                      isOpen && !collapsed ? 'max-h-40' : 'max-h-0'
                    )}>
                    {childrens.map((child) => {
                      const active =
                        pathname === child.href ||
                        pathname.startsWith(`${child.href}/`);
                      return (
                        <NextLink
                          key={child.href}
                          href={child.href}
                          className={cn(
                            'block px-3 py-1.5 rounded-md text-[14px] transition-colors',
                            active
                              ? 'bg-primary-50 text-primary'
                              : 'text-muted-foreground hover:bg-accent'
                          )}>
                          {child.label}
                        </NextLink>
                      );
                    })}
                  </div>
                </div>
              );
            }

            return (
              <NextLink
                key={href}
                href={href}
                className={cn(
                  'flex items-center gap-3 px-4 py-2 rounded-md font-medium transition-colors',
                  isActive
                    ? 'bg-primary-100 text-primary'
                    : 'text-foreground hover:bg-accent'
                )}>
                <Icon size={18} />
                {!collapsed && <span>{label}</span>}
              </NextLink>
            );
          })}
          {!collapsed && (
            <div className='relative h-90 mt-2 border border-gray-200 rounded-md   '>
              <NextLink href='/'>
                <Image
                  src='/banner.png'
                  alt='banners'
                  fill
                  className='object-cover rounded-md'
                />
              </NextLink>
            </div>
          )}
        </nav>
      </aside>

      {/* Mobile Sidebar */}
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
          className='p-0 w-64 font-merriweather'>
          <div className='p-4 border-b'>
            <NextLink href='/'>
              <Image
                src='/logo-dark.png'
                alt='Logo'
                width={160}
                height={45}
                className='object-contain'
              />
            </NextLink>
          </div>
          <nav className='p-4 space-y-1 text-[15px]'>
            {navItems.map(({ label, href, icon: Icon, childrens }) => {
              const isActive = pathname === href;
              const isOpen = openMenus.includes(label);

              if (childrens) {
                return (
                  <div key={label}>
                    <button
                      onClick={() => toggleMenu(label)}
                      className={cn(
                        'w-full flex items-center justify-between px-3 py-2 rounded-md text-[15px] font-medium transition-colors',
                        isOpen
                          ? 'bg-primary-100 text-primary'
                          : 'text-foreground hover:bg-accent'
                      )}>
                      <div className='flex items-center gap-3'>
                        <Icon size={18} />
                        <span>{label}</span>
                      </div>
                      {isOpen ? (
                        <ChevronUp size={16} />
                      ) : (
                        <ChevronDown size={16} />
                      )}
                    </button>

                    {isOpen && (
                      <div className='pl-8 mt-1 space-y-1'>
                        {childrens.map((child) => (
                          <NextLink
                            key={child.href}
                            href={child.href}
                            className={cn(
                              'block px-3 py-1.5 rounded-md text-[14px] transition-colors',
                              pathname === child.href
                                ? 'bg-primary-50 text-primary'
                                : 'text-muted-foreground hover:bg-accent'
                            )}>
                            {child.label}
                          </NextLink>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <NextLink
                  key={href}
                  href={href}
                  className={cn(
                    'flex items-center gap-3 px-3 py-2 rounded-md text-[15px] font-medium transition-colors',
                    isActive
                      ? 'bg-primary-100 text-primary'
                      : 'text-foreground hover:bg-accent'
                  )}>
                  <Icon size={18} />
                  <span>{label}</span>
                </NextLink>
              );
            })}
            <div className='relative h-60 mt-2  '>
              <NextLink href='/'>
                <Image
                  src='/banner.png'
                  alt='banners'
                  fill
                  className='object-contain'
                />
              </NextLink>
            </div>
          </nav>
        </SheetContent>
      </Sheet>
    </>
  );
}
