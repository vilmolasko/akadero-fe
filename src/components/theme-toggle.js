'use client';
import { Moon, Sun, Monitor } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <button className='inline-flex items-center justify-center cursor-pointer rounded-md h-10 w-10 border border-input bg-card hover:bg-accent hover:text-accent-foreground'>
        <Sun className='h-5 w-5' />
      </button>
    );
  }

  const cycleTheme = () => {
    if (theme === 'light') setTheme('dark');
    else if (theme === 'dark') setTheme('system');
    else setTheme('light');
  };

  const getIcon = () => {
    if (theme === 'light') return <Sun className='h-5 w-5' />;
    if (theme === 'dark') return <Moon className='h-5 w-5' />;
    return <Monitor className='h-5 w-5' />;
  };

  return (
    <Button
      size='icon'
      onClick={cycleTheme}
      className='inline-flex items-center justify-center cursor-pointer rounded-md border border-input text-foreground bg-card hover:bg-accent hover:text-accent-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2'
      aria-label={`Current theme: ${theme}. Click to cycle themes.`}>
      {getIcon()}
    </Button>
  );
}
