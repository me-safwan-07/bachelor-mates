import React, { useCallback, useState } from 'react';
import { useControllableState } from '@/hooks/use-controllable-state';
import { cn, formatBytes } from '@/lib/utils';
import { IconFile, IconUpload, IconX } from '@tabler/icons-react';
import Dropzone, { DropzoneProps, useDropzone } from 'react-dropzone';
import { ScrollArea } from './ui/scroll-area';
import Image from 'next/image';
import { Progress } from './ui/progress';
import { Button } from './ui/Button';
import { toast } from 'sonner';

interface FileUploaderProps {
  value?: File[];
  onValueChange?: React.Dispatch<React.SetStateAction<File[]>>;
  onUpload: (files: string[]) => Promise<void>;
  progresses?: Record<string, number>;

  accept?: DropzoneProps['accept'];
  maxFiles?: DropzoneProps['maxFiles'];
  maxSize?: DropzoneProps['maxSize'];
  multiple?: boolean;
  disabled?: boolean;
}

export function FileUploader(props: FileUploaderProps) {
  const {
    value: valueProp,
    onValueChange,
    onUpload,
    progresses,
    accept = { 'image/*': [] },
    maxSize = 1024 * 1024 * 2,
    maxFiles = 1,
    multiple = false,
    disabled = false,
    ...dropzoneProps
  } = props;

  const [files, setFiles] = useControllableState({
    prop: valueProp,
    onChange: onValueChange
  });

  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (acceptedFiles.length === 0) return;
  
    setIsUploading(true);
    setError(null);
  
    try {
      const formData = new FormData();
      acceptedFiles.forEach(file => {
        formData.append('files', file);
      });
  
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
  
      if (!response.ok) {
        throw new Error(`Upload failed with status ${response.status}`);
      }
  
      const data = await response.json();
      
      if (data.successfulUploads) {
        const urls = data.successfulUploads.map((upload: any) => upload.fileUrl);
  
        // Fix here: Map URLs to file-like objects with preview
        const newUploadedFiles = urls.map((url: string, index: number) => ({
          name: `Uploaded file ${index + 1}`,
          size: 0, // You can improve later by adding real size if you want
          preview: url,
        }));
  
        const updatedFiles = [...(files ?? []), ...newUploadedFiles];
        setFiles(updatedFiles);
  
        const target = urls.length > 0 ? `${urls.length} files` : 'file';
  
        toast.promise(onUpload(urls), {
          loading: `Uploading ${target}...`,
          success: () => {
            return `Uploaded ${target} successfully!`;
          },
          error: `Failed to upload ${target}`,
        })
  
      } else {
        throw new Error(data.error || 'Unknown upload error');
      }
  
    } catch (err) {
      console.error('Upload error:', err);
      setError(err instanceof Error ? err.message : 'Upload failed');
    } finally {
      setIsUploading(false);
    }
  }, [files, onUpload, setFiles]);
  

  function onRemove(index: number) {
    if (!files) return;
    const newFiles = files.filter((_, i) => i !== index);
    setFiles(newFiles);
    onValueChange?.(newFiles);
  }

  const isDisabled = disabled || (files?.length ?? 0) >= maxFiles;

  // const { getRootProps, getInputProps, isDragActive } = useDropzone({
  //   onDrop,
  //   accept,
  //   maxFiles,
  //   maxSize,
  //   multiple: true,
  //   onError: (err) => setError(err.message),
  // });

  // Revoke preview url when component unmounts
  React.useEffect(() => {
    return () => {
      if (!files) return;
      files.forEach((file) => {   
        if (isFileWithPreview(file)) {
          URL.revokeObjectURL(file.preview);
        }
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className='relative flex flex-col gap-6 overflow-hidden'>
      <Dropzone
        onDrop={onDrop}
        accept={accept}
        maxSize={maxSize}
        maxFiles={maxFiles}
        multiple={maxFiles > 1 || multiple}
        disabled={isDisabled}
      >
        {({ getRootProps, getInputProps, isDragActive }) => (
          <div
            {...getRootProps()}
            className={cn(
              'group border-muted-foreground/25 hover:bg-muted/25 relative grid h-52 w-full cursor-pointer place-items-center rounded-lg border-2 border-dashed px-5 py-2.5 text-center transition',
              'ring-offset-background focus-visible:ring-ring focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-hidden',
              isDragActive && 'border-muted-foreground/50',
              isDisabled && 'pointer-events-none opacity-60'
            )}
            {...dropzoneProps}
          >
            <input {...getInputProps()} />
            {isDragActive ? (
              <div className='flex flex-col items-center justify-center gap-4 sm:px-5'>
                <div className='rounded-full border border-dashed p-3'>
                  <IconUpload
                    className='text-muted-foreground size-7'
                    aria-hidden='true'
                  />
                </div>
                <p className='text-muted-foreground font-medium'>
                  Drop the files here
                </p>
              </div>
            ) : (
              <div className='flex flex-col items-center justify-center gap-4 sm:px-5'>
                <div className='rounded-full border border-dashed p-3'>
                  <IconUpload
                    className='text-muted-foreground size-7'
                    aria-hidden='true'
                  />
                </div>
                <div className='space-y-px'>
                  <p className='text-muted-foreground font-medium'>
                    Drag {`'n'`} drop files here, or click to select files
                  </p>
                  {/* <p className='text-muted-foreground/70 text-sm'>
                    You can upload
                    {maxFiles > 1
                      ? ` ${maxFiles === Infinity ? 'multiple' : maxFiles}
                      files (up to ${formatBytes(maxSize)} each)`
                      : ` a file with ${formatBytes(maxSize)}`}
                  </p> */}
                  {isUploading && (
                    <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                      <span className="animate-spin rounded-full border-2 border-muted-foreground border-t-transparent h-5 w-5" />
                      Uploading files...
                    </div>
                  )}

                </div>
              </div>
            )}
          </div>
        )}
      </Dropzone>
      {files?.length ? (
        <ScrollArea className='h-fit w-full px-3'>
          <div className='max-h-48 space-y-4'>
            {files?.map((file, index) => (
              <FileCard
                key={index}
                file={file}
                onRemove={() => onRemove(index)}
                progress={progresses?.[file.name]}
              />
            ))}
          </div>
        </ScrollArea>
      ) : null}
    </div>
  );
}

interface FileCardProps {
  file: File;
  onRemove: () => void;
  progress?: number;
}

function FileCard({ file, progress, onRemove }: FileCardProps) {
  const isPdf = file.name.toLowerCase().endsWith('.pdf');
  
  return (
    <div className='relative flex items-center space-x-4'>
      <div className='flex flex-1 space-x-4'>
        {isFileWithPreview(file) ? (
          <Image
            src={file.preview}
            alt={file.name}
            width={48}
            height={48}
            loading='lazy'
            className='aspect-square shrink-0 rounded-md object-cover'
          />
        ) : isPdf ? (
          <div className='flex size-12 shrink-0 items-center justify-center rounded-md bg-gray-100 dark:bg-gray-800'>
            <IconFile className='text-muted-foreground size-6' />
          </div>
        ) : null}   
        <div className='flex w-full flex-col gap-2'>
          <div className='space-y-px'>
            <p className='text-foreground/80 line-clamp-1 text-sm font-medium'>
              {file.name}
            </p>
            <p className='text-muted-foreground text-xs'>
              {formatBytes(file.size)}
            </p>
          </div>
          {progress ? <Progress value={progress} /> : null}
        </div>
      </div>
      <div className='flex items-center gap-2'>
        <Button
          type='button'
          variant='ghost'
          size='icon'
          onClick={onRemove}
          disabled={progress !== undefined && progress < 100}
          className='size-8 rounded-full'
        >
          <IconX className='text-muted-foreground' />
          <span className='sr-only'>Remove file</span>
        </Button>
      </div>
    </div>
  );
}

function isFileWithPreview(file: File): file is File & { preview: string } {
  return 'preview' in file && typeof file.preview === 'string';
}