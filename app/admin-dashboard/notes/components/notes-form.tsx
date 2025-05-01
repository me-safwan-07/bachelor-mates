'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TNotesInput, ZNotesInput } from "@/types/notes";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/Button";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Degree, AccessType } from "@prisma/client";
import { useToast } from "@/hooks/use-toast";
import { FileUploader } from "@/components/file-uploader";

interface NotesFormProps {
    pageTitle?: string;
    uploaderId?: string;
}
export interface UploadError {
  message: string;
  details?: string;
}

export interface FileUploadResult {
  fileUrl: string;
  filePath: string;
  fileName: string;
  fileSize: number;
  fileType: string;
  uploadTime: Date;
}

export default function NotesForm({
    pageTitle = 'Create New Notes',
    uploaderId,
}: NotesFormProps) {
    const { toast } = useToast();
    const router = useRouter();
    const [imageUrls, setImageUrls] = useState<string[]>([]);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const form = useForm({
        resolver: zodResolver(ZNotesInput),
        defaultValues: {
            name: "",
            degree: undefined,
            stream: "",
            semester: undefined,
            accessType: undefined,
            price: 0,
            images: []
        }
    });

    const onSubmit = async (values: TNotesInput) => {
        try {
            setIsSubmitting(true);
            
            // Include image URLs in the submission
            const dataToSubmit = {
                ...values,
                images: imageUrls.map(url => ({ url })),
                uploaderId,
            };

            const response = await fetch('/api/v1/notes', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dataToSubmit),
            });

            console.log(response);

            if (!response.ok) {
                throw new Error('Failed to create notes');
            }
            
            toast({
                title: "Success",
                description: "Notes created successfully!",
                variant: "default",
            });

            router.refresh();
            router.push('/admin-dashboard/notes');
        } catch (error) {
            toast({
                title: "Error",
                description: error instanceof Error ? error.message : "Something went wrong",
                variant: "destructive",
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Card className="mx-auto w-full">
            <CardHeader>
                <CardTitle className='text-left text-2xl font-bold'>
                    {pageTitle}
                </CardTitle>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit as SubmitHandler<TNotesInput>)} className="space-y-8">
                        {/* Image upload section */}
                        <FormField
                            control={form.control}
                            name='images'
                            render={() => (
                                <div className='space-y-6'>
                                <FormItem className='w-full'>
                                    <FormLabel>Images</FormLabel>
                                    <FormControl>
                                        <FileUploader 
                                            onUpload={async (urls) => {
                                                setImageUrls(urls);
                                                return Promise.resolve();
                                            }}
                                            accept={{ 
                                                'image/*': ['.png', '.jpg', '.jpeg'],
                                                'application/pdf': ['.pdf', '.docx'],
                                                'video/*': ['.mp4']
                                            }}
                                            maxFiles={5}
                                            maxSize={10 * 1024 * 1024} // 10MB
                                            // folder="user-uploads"
                                        />  
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            </div>
                            )}
                        />
                        <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
                            <FormField 
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Notes Name</FormLabel>
                                        <FormControl>
                                            <Input 
                                                placeholder="Enter Notes Name"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            
                            {/* Degree field */}
                            <FormField 
                                control={form.control}
                                name="degree"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Degree</FormLabel>
                                        <Select
                                            onValueChange={field.onChange}
                                            value={field.value}
                                        >
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select Degree" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {Object.values(Degree).map((degree) => (
                                                    <SelectItem key={degree} value={degree}>
                                                        {degree}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Stream field */}
                            <FormField 
                                control={form.control}
                                name="stream"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Stream Name (optional)</FormLabel>
                                        <FormControl>
                                            <Input 
                                                placeholder="Computer Application, general, data analysis, taxation"
                                                {...field}
                                                value={field.value || ""}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />     

                            {/* semester field */}
                            <FormField 
                                control={form.control}
                                name="semester"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Semester</FormLabel>
                                        <Select
                                            onValueChange={(value) => field.onChange(parseInt(value))}
                                            value={field.value?.toString()}
                                        >
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select Semester" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {[1, 2, 3, 4, 5, 6].map((sem) => (
                                                    <SelectItem key={sem} value={sem.toString()}>
                                                        {sem}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Access Type field */}
                            <FormField 
                                control={form.control}
                                name="accessType"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Access Type</FormLabel>
                                        <Select
                                            onValueChange={field.onChange}
                                            value={field.value}
                                        >
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select Access Type" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {Object.values(AccessType).map((type) => (
                                                    <SelectItem key={type} value={type}>
                                                        {type}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {form.watch("accessType") === AccessType.PAID && (
                                <FormField
                                    control={form.control}
                                    name="price"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Price</FormLabel>
                                            <FormControl>
                                                <Input 
                                                    placeholder="Enter Price"
                                                    type="number"
                                                    {...field}
                                                    onChange={(e) => field.onChange(parseFloat(e.target.value))}
                                                    required={false}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}    
                                />
                            )}
                            <div className="md:col-span-2 flex justify-end">
                                <Button 
                                    type="submit" 
                                    className="w-full md:w-1/2"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? "Submitting..." : "Submit"}
                                </Button>
                            </div>
                        </div>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
}