'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function Pagination({
  currentPage = 1,
  totalPages = 5,
  onPageChange,
}) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  const handlePageChange = (page) => {
    if (onPageChange) onPageChange(page);
  };

  return (
    <nav
      className='flex items-center justify-center space-x-1 mt-6'
      aria-label='Pagination'>
      {/* Previous Button */}
      <button
        onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={cn(
          'flex items-center justify-center h-9 w-9 rounded-md border text-sm transition-colors',
          currentPage === 1
            ? 'cursor-not-allowed opacity-50'
            : 'hover:bg-accent hover:text-accent-foreground'
        )}>
        <ChevronLeft className='h-4 w-4' />
      </button>

      {/* Page Numbers */}
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => handlePageChange(page)}
          className={cn(
            'flex items-center justify-center h-9 w-9 rounded-md border text-sm transition-colors',
            page === currentPage
              ? 'bg-primary text-primary-foreground'
              : 'hover:bg-accent hover:text-accent-foreground'
          )}>
          {page}
        </button>
      ))}

      {/* Next Button */}
      <button
        onClick={() =>
          currentPage < totalPages && handlePageChange(currentPage + 1)
        }
        disabled={currentPage === totalPages}
        className={cn(
          'flex items-center justify-center h-9 w-9 rounded-md border text-sm transition-colors',
          currentPage === totalPages
            ? 'cursor-not-allowed opacity-50'
            : 'hover:bg-accent hover:text-accent-foreground'
        )}>
        <ChevronRight className='h-4 w-4' />
      </button>
    </nav>
  );
}
