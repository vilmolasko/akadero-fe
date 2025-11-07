import {
  FileSearch,
  Search,
  FolderOpen,
  Inbox,
  AlertCircle,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const iconMap = {
  default: FileSearch,
  search: Search,
  folder: FolderOpen,
  inbox: Inbox,
  alert: AlertCircle,
};

export default function NotFound({
  title = 'No Data Found',
  description = "There's no data to display at the moment.",
  showButton = false,
  buttonText = 'Go Back',
  onButtonClick,
  icon = 'default',
  iconSize = 'lg',
  className,
  variant = 'default',
}) {
  const IconComponent = iconMap[icon] || FileSearch;

  const variants = {
    default: 'text-muted-foreground',
    warning: 'text-amber-500',
    error: 'text-destructive',
    success: 'text-green-500',
  };

  const iconSizes = {
    sm: 'h-8 w-8',
    md: 'h-12 w-12',
    lg: 'h-16 w-16',
    xl: 'h-20 w-20',
  };

  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center py-12 px-4 text-center',
        className
      )}>
      <div
        className={cn(
          'mb-4 flex items-center justify-center rounded-full bg-muted/50',
          iconSize === 'sm' && 'h-16 w-16',
          iconSize === 'md' && 'h-20 w-20',
          iconSize === 'lg' && 'h-24 w-24',
          iconSize === 'xl' && 'h-28 w-28'
        )}>
        <IconComponent className={cn(iconSizes[iconSize], variants[variant])} />
      </div>

      <h3
        className={cn(
          'mb-2 font-semibold text-foreground',
          iconSize === 'sm' && 'text-base',
          iconSize === 'md' && 'text-lg',
          iconSize === 'lg' && 'text-xl',
          iconSize === 'xl' && 'text-2xl'
        )}>
        {title}
      </h3>

      <p
        className={cn(
          'mb-6 max-w-sm text-muted-foreground',
          iconSize === 'sm' && 'text-xs',
          iconSize === 'md' && 'text-sm',
          iconSize === 'lg' && 'text-base',
          iconSize === 'xl' && 'text-lg'
        )}>
        {description}
      </p>

      {showButton && onButtonClick && (
        <Button
          variant={variant === 'error' ? 'destructive' : 'outline'}
          onClick={onButtonClick}
          className='mt-2'>
          {buttonText}
        </Button>
      )}
    </div>
  );
}
