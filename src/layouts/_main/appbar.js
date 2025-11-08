'use client';

import NextLink from 'next/link';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

// import { ThemeToggle } from '@/components/theme-toggle';
import Image from 'next/image';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTrigger,
} from '@/components/ui/drawer';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useRouter } from '@bprogress/next';
import { useDispatch, useSelector } from 'react-redux';
import { deleteSession } from '@/lib/session';

import { usePathname } from 'next/navigation';
import { setLogout } from '@/redux/slices/user';
import { deleteCookie } from '@/hooks/use-cookies';

export default function Appbar() {
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useDispatch();

  const isActive = (path) => pathname.startsWith(path);

  const { user } = useSelector(({ user }) => user);

  const onLogout = async () => {
    await deleteSession();
    deleteCookie('token');
    dispatch(setLogout());

    setTimeout(() => {
      location.href = '/auth/sign-in';
    }, 1000);
  };

  return (
    <header className='w-full border-b bg-card sticky top-0 z-50'>
      <div className='layout-container flex h-16 items-center justify-between'>
        {/* Logo */}
        <NextLink href='/'>
          <Image
            src='/logo.svg'
            alt='Logo'
            placeholder='blur'
            blurDataURL='/logo.svg'
            className='object-contain'
            width={190}
            height={52}
          />
        </NextLink>

        {/* Desktop Menu */}
        <nav className='hidden md:flex gap-4 items-center'>
          <NextLink
            href='/courses'
            className={
              isActive('/courses')
                ? 'text-primary font-semibold'
                : 'text-foreground hover:text-primary transition'
            }>
            Kursai
          </NextLink>
          <NextLink
            href='/lecturers'
            className={
              isActive('/lecturers')
                ? 'text-primary font-semibold'
                : 'text-foreground hover:text-primary transition'
            }>
            Mokytojai
          </NextLink>
          <NextLink
            href='/organizers'
            className={
              isActive('/organizers')
                ? 'text-primary font-semibold'
                : 'text-foreground hover:text-primary transition'
            }>
            Organizatoriai
          </NextLink>
          {/* <ThemeToggle /> */}

          {!user ? (
            <>
              <Button
                variant='default'
                size='lg'
                onClick={() => {
                  router.push('/auth/sign-up');
                }}>
                Paskelbti
              </Button>
              <Button
                onClick={() => {
                  router.push('/auth/sign-in');
                }}
                variant='secondary'
                size='lg'>
                Prisijungti
              </Button>
            </>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className='flex items-center gap-2 cursor-pointer text-left focus:outline-none'>
                  <Avatar className='h-13 w-13 cursor-pointer object-cover'>
                    {user?.cover && (
                      <AvatarImage
                        src={user?.cover.url}
                        alt='avatar'
                        className='object-cover'
                      />
                    )}
                    <AvatarFallback>
                      {user?.firstName?.slice(0, 2)?.toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </button>
              </DropdownMenuTrigger>

              <DropdownMenuContent
                align='end'
                className='w-48'>
                <div className='px-2 py-1'>
                  <h6 className='font-merriweather font-medium tracking-wide text-md'>
                    {user?.firstName + ' ' + user?.lastName}
                  </h6>
                  <p className='text-sm text-muted-foreground'>
                    {user?.email}{' '}
                  </p>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <NextLink
                    href={
                      user?.role === 'admin'
                        ? '/admin/dashboard'
                        : '/dashboard/main'
                    }>
                    Dašaordas
                  </NextLink>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <NextLink href={`/admin/settings`}>Nustatymai</NextLink>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className='text-red-600'
                  onClick={onLogout}>
                  Atsijungti
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <div className='flex items-center gap-2 md:hidden'>
          {/* <ThemeToggle /> */}
          <Drawer direction='left'>
            <DrawerTrigger asChild>
              <button className='md:hidden border h-9 cursor-pointer border-input p-2 rounded-md hover:bg-muted'>
                <Menu size={18} />
              </button>
            </DrawerTrigger>

            <DrawerContent>
              <div className='h-full w-full'>
                <DrawerHeader>
                  <nav className='layout-container flex flex-col py-4 space-y-4'>
                    <NextLink
                      href='/courses'
                      className='hover:text-primary'>
                      Kursai
                    </NextLink>
                    <NextLink
                      href='/lecturers'
                      className='hover:text-primary'>
                      Mokytojai
                    </NextLink>
                    <NextLink
                      href='/organizers'
                      className='hover:text-primary'>
                      Organizatoriai
                    </NextLink>
                    {!user && (
                      <>
                        <DrawerClose asChild>
                          <Button
                            variant='default'
                            size='sm'>
                            Paskelbti
                          </Button>
                        </DrawerClose>
                        <DrawerClose asChild>
                          <Button
                            onClick={() => {
                              router.push('/auth/sign-in');
                            }}
                            variant='secondary'
                            size='sm'>
                            Prisijungti
                          </Button>
                        </DrawerClose>
                      </>
                    )}
                  </nav>
                </DrawerHeader>
              </div>
            </DrawerContent>
          </Drawer>
          {user && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className='flex items-center gap-2 cursor-pointer text-left focus:outline-none'>
                  <Avatar className='h-13 w-13 cursor-pointer object-cover'>
                    {user?.cover && (
                      <AvatarImage
                        src={user?.cover.url}
                        alt='avatar'
                        className='object-cover'
                      />
                    )}
                    <AvatarFallback>
                      {user?.firstName?.slice(0, 2)?.toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </button>
              </DropdownMenuTrigger>

              <DropdownMenuContent
                align='end'
                className='w-48'>
                <div className='px-2 py-1'>
                  <h6 className='font-merriweather font-medium tracking-wide text-md'>
                    {user?.firstName + ' ' + user?.lastName}
                  </h6>
                  <p className='text-sm text-muted-foreground'>
                    {user?.email}{' '}
                  </p>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <NextLink
                    href={
                      user?.role === 'admin'
                        ? '/admin/dashboard'
                        : '/dashboard/main'
                    }>
                    Dašaordas
                  </NextLink>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <NextLink
                    href={
                      user?.role === 'admin'
                        ? '/admin/settings'
                        : 'dashboard/settings/general'
                    }>
                    Nustatymai
                  </NextLink>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className='text-red-600'
                  onClick={onLogout}>
                  Atsijungti
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>
    </header>
  );
}
