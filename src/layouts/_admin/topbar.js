'use client';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ThemeToggle } from '@/components/theme-toggle';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useDispatch, useSelector } from 'react-redux';
import { deleteSession } from '@/lib/session';

import NextLink from 'next/link';
import { setLogout } from '@/redux/slices/user';
import { deleteCookie } from '@/hooks/use-cookies';

export default function Topbar() {
  const dispatch = useDispatch();
  const onLogout = async () => {
    await deleteSession();
    deleteCookie('token');
    dispatch(setLogout());

    setTimeout(() => {
      location.href = '/auth/sign-in';
    }, 1000);
  };

  const { user } = useSelector(({ user }) => user);
  return (
    <header className='h-16 bg-card border-b flex items-center justify-between py-4 px-4 md:pl-6'>
      {/* Left: Search + Mobile menu toggle */}
      <div className='flex items-center gap-2'></div>

      {/* Right: Actions */}
      <div className='flex items-center gap-2'>
        <ThemeToggle />
        {/* Profile Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className='flex items-center gap-2 cursor-pointer text-left focus:outline-none'>
              <Avatar className='h-10 w-10 cursor-pointer object-cover'>
                {user?.cover && (
                  <AvatarImage
                    src={user?.cover.url}
                    alt='avatar'
                    className={'object-cover'}
                  />
                )}
                <AvatarFallback>
                  {user?.firstName?.slice(0, 2)?.toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div>
                <h6 className='font-merriweather font-medium tracking-wide text-md'>
                  {user?.firstName + ' ' + user?.lastName}
                </h6>
                <p className='text-sm text-muted-foreground'>{user?.email} </p>
              </div>
            </button>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            align='end'
            className='w-48'>
            <DropdownMenuLabel>Mano paskyra</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profilis</DropdownMenuItem>
            <DropdownMenuItem>
              <NextLink href='/admin/settings'>Nustatymai</NextLink>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className='text-red-600'
              onClick={onLogout}>
              Atsijungti
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
