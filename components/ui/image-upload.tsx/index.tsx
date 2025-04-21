"use client"

import { useEffect, useState } from "react";
import { Button } from "../Button";
import { ImagePlus, Trash } from "lucide-react";
import Image from "next/image";
import { CldUploadWidget, CloudinaryUploadWidgetResults } from "next-cloudinary";

const cloudPresetName = process.env.NEXT_PUBLIC_CLOUDINARY_PRESET_NAME;

interface ImageUploadProps {
    disabled?: boolean;
    onChange: (value: string) => void;
    onRemove: (value: string) => void;
    value: string[];
}


export const ImageUpload = ({
    disabled,
    onChange,
    onRemove,
    value
}: ImageUploadProps) => {
    const [isMounted, setIsMounted] = useState(false);
    const [imageUrl, setImageUrl] = useState<string | null>(null);

    useEffect(() => {
        setIsMounted(true);
    }, [])

      

    const onUpload = (result: CloudinaryUploadWidgetResults) => {
        if (typeof result.info !== "object" || !result.info?.secure_url) {
            return;
        }

        setImageUrl(result.info?.secure_url ?? null);
        console.log('Image URL:', result.info.secure_url);
        fetch('/api/')
    }
    
    // And in your form:
    // console.log('Current field value:', field.value);

    if (!isMounted) {
        return null;
    }

    return (
        <div>
            <div className="mb-4 flex items-center gap-4">
                {value.map((url) => (
                    <div key={url} className="relative w-24 h-24 rounded-md overflow-hidden">
                        <div className="z-10 absolute top-2 right-2">
                            <Button type="button" onClick={() => onRemove(url)} variant="primary" size="icon" disabled={disabled}>
                                <Trash className="h-4 w-4" />   
                            </Button>
                       </div>
                       <Image fill className="object-cover" src={url} alt="Image" />
                    </div>
                ))}
            </div>
            <CldUploadWidget 
                onUpload={onUpload} 
                uploadPreset={cloudPresetName}
                options={{
                    maxFiles: 1,
                    maxImageWidth: 800,
                    maxImageHeight: 800,
                    cropping: true,
                    croppingAspectRatio: 1,
                    showAdvancedOptions: false,
                    sources: ["local", "url"],
                    resourceType: "image",
                }}
            >
                {({ open }) => {
                    const onClick = (e: any) => {
                        e.preventDefault();
                        open();
                    }

                    return (
                        <Button type="button" disabled={disabled} variant="secondary" onClick={onClick}>
                            <ImagePlus className="h-4 w-4 mr-2" />
                            Upload an Image
                        </Button>
                    )
                }}
            </CldUploadWidget>
        </div>
    )
};