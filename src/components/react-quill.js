'use client';

import dynamic from 'next/dynamic';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import 'react-quill/dist/quill.snow.css';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

export default function ShadcnQuillEditor({ value, onChange, error }) {
  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['link', 'image'],
      ['clean'],
    ],
  };

  return (
    <div className='space-y-2'>
      <div
        className={cn(
          'rounded-md border border-input min-h-[200px] overflow-hidden',
          error && 'border-red-500'
        )}>
        <ReactQuill
          theme='snow'
          value={value}
          onChange={onChange}
          modules={modules}
        />
      </div>
      {error && <p className='text-sm text-red-500'>{error}</p>}
    </div>
  );
}
