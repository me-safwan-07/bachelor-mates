'use client';

import { CldUploadWidget } from 'next-cloudinary';
import { ImagePlus, Trash } from 'lucide-react';
import Image from 'next/image';
import { Button } from '../Button';
import { useState } from 'react';

interface ImageUploadProps {
    disabled?: boolean;
    onChange: (value: string) => void;
    onRemove: (value: string) => void;
    value: string[];
}

export const ImageUpload: React.FC<ImageUploadProps> = ({
    disabled,
    onChange,
    onRemove,
    value
}) => {
    const [uploadError, setUploadError] = useState<string | null>(null);
    const [isUploading, setIsUploading] = useState(false);

    const onUpload = (result: any) => {
        console.log('Upload result:', result);
        
        if (result.event === 'success') {
            const url = result.info?.secure_url;
            if (!url) {
                console.error('No URL in result:', result);
                setUploadError('Upload failed - no URL returned');
                return;
            }
            onChange(url);
            setUploadError(null);
        } else if (result.event === 'error') {
            console.error('Upload error:', result);
            setUploadError(result.message || 'Upload failed');
        }
    };

    return (
        <div className="space-y-4">
            {uploadError && (
                <div className="text-red-500 text-sm p-2 bg-red-50 rounded">
                    {uploadError}
                </div>
            )}
            
            <div className="mb-4 flex flex-wrap items-center gap-4">
                {value.map((url) => (
                    <div key={url} className="relative w-[200px] h-[200px] rounded-md overflow-hidden border">
                        <div className="z-10 absolute top-2 right-2">
                            <Button
                                type="button"
                                onClick={() => onRemove(url)}
                                variant="destructive"
                                size="sm"
                            >
                                <Trash className="h-4 w-4" />
                            </Button>
                        </div>
                        <Image
                            fill
                            className="object-cover"
                            alt="Uploaded content"
                            src={url}
                            onError={(e) => {
                                console.error('Image load error:', e);
                                onRemove(url);
                            }}
                        />
                    </div>
                ))}
            </div>
            
            <CldUploadWidget 
                onUpload={onUpload}
                uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_PRESET_NAME}
                options={{
                    cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
                    folder: process.env.NEXT_PUBLIC_CLOUDINARY_FOLDER,
                    multiple: true,
                    maxFiles: 10,
                    sources: ['local'],
                    resourceType: 'auto',
                    clientAllowedFormats: ['image/jpeg', 'image/png', 'image/webp', 'application/pdf'],
                    maxFileSize: 50000000, // 5MB
                    showPoweredBy: false
                }}
            >
                {({ open }) => (
                    <Button
                        type="button"
                        disabled={disabled || isUploading}
                        variant="secondary"
                        onClick={() => {
                            setUploadError(null);
                            open();
                        }}
                    >
                        <ImagePlus className="h-4 w-4 mr-2" />
                        {isUploading ? 'Uploading...' : 'Upload Images'}
                    </Button>
                )}
            </CldUploadWidget>
        </div>
    );
};