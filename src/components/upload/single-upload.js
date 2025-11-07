'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, X, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useMutation } from '@tanstack/react-query';
// api
import * as api from '@/services';
import toast from 'react-hot-toast';

export default function ShadcnDropzone({
  label = 'Upload Image',
  onChange,
  value,
}) {
  const [preview, setPreview] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  // ✅ Automatically show existing image when editing
  useEffect(() => {
    if (value?.url) {
      setPreview(value.url);
    } else if (typeof value === 'string') {
      // fallback if backend only sends image URL (string)
      setPreview(value);
    } else {
      setPreview(null);
    }
  }, [value]);

  const uploadToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', process.env.CLOUDINARY_UPLOAD_PRESET);

    const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      {
        method: 'POST',
        body: formData,
      }
    );

    if (!res.ok) throw new Error('Cloudinary upload failed');
    const data = await res.json();

    return {
      _id: data.public_id,
      url: data.secure_url,
    };
  };

  // ✅ Delete Mutation (React Query v5)
  const deleteMutation = useMutation({
    mutationFn: api.singleDeleteFile,
    onSuccess: () => {
      toast.success('Image deleted');
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to delete image');
    },
  });

  const onDrop = useCallback(
    async (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (file) {
        setIsUploading(true);
        try {
          const uploaded = await uploadToCloudinary(file);
          setPreview(uploaded.url);
          onChange?.(uploaded); // ✅ return { _id, url }
        } catch (err) {
          console.error('Cloudinary upload error:', err);
        } finally {
          setIsUploading(false);
        }
      }
    },
    [onChange]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': [] },
    maxFiles: 1,
  });

  return (
    <div
      {...getRootProps()}
      className={cn(
        'flex flex-col items-center justify-center border-2 border-dashed rounded-xl p-6 text-center transition cursor-pointer',
        isDragActive
          ? 'bg-muted/50 border-primary'
          : 'hover:bg-muted/30 border-muted-foreground/30'
      )}
      style={{ minHeight: '200px' }}>
      <input {...getInputProps()} />

      {isUploading ? (
        <div className='flex flex-col items-center justify-center'>
          <Loader2 className='w-6 h-6 animate-spin text-muted-foreground mb-2' />
          <p className='text-sm text-muted-foreground'>Įkeliama...</p>
        </div>
      ) : preview ? (
        <div className='relative w-full'>
          <img
            src={preview}
            alt='Preview'
            className='object-cover w-full h-[180px] rounded-md'
          />
          <Button
            type='button'
            size='icon'
            variant='destructive'
            className='absolute top-2 right-2'
            onClick={async (e) => {
              e.stopPropagation();
              if (value?._id) {
                await deleteMutation.mutateAsync(value._id);
              }
              setPreview(null);
              onChange?.(null);
            }}>
            <X className='w-4 h-4' />
          </Button>
        </div>
      ) : (
        <>
          <Upload className='w-8 h-8 mb-2 text-muted-foreground' />
          <p className='text-sm text-muted-foreground'>
            {isDragActive
              ? 'Įmesk paveikslėlį čia...'
              : 'Nuvilkite arba spustelėkite, kad įkeltumėte'}
          </p>
        </>
      )}
    </div>
  );
}
