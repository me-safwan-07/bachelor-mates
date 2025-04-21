'use client';

import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { ImageUpload } from '@/components/ui/image-upload.tsx';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
// import { toast } from '@/hooks/use-toast';
import { TNotes, TNotesInput, ZNotes, ZNotesInput } from '@/types/notes';
// import { Product } from '@/constants/mock-api';
import { zodResolver } from '@hookform/resolvers/zod';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import * as z from 'zod';
import axios from 'axios';
import { v2 as cloudinary } from 'cloudinary';
import Image from 'next/image';

export default async function ProductForm({
  initialData,
  pageTitle
}: {
  initialData: TNotes | null;
  pageTitle: string;
}) {

  const params = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof ZNotesInput>>({
    resolver: zodResolver(ZNotesInput),
    defaultValues: initialData ? {
      ...initialData,
      price: parseFloat(String(initialData?.price)),
    } : {
      name: '',
      category: '',
      price: 0,
      image: [],
      accessType: 'FREE',
      year: 1,
      degree: 'BCOM',
      stream: undefined,
      semester: 1
    }
  });               

  const onSubmit = async (data: TNotesInput) =>  {
    try {
      setLoading(true);

      const response = initialData 
        ? await axios.patch(`/api/notes/${params.notesId}`, data)
        : await axios.post('/api/notes', data);

      toast.success(
        initialData
          ? 'Notes updated successfully'
          : 'Notes created successfully'
      );

      router.refresh()
      // router.push('/dashboard/product');
    } catch (error) {
        toast.error('Something went wrong');
        console.error(error);
      } finally {
        setLoading(false);
      }
  }

  return (
    <Card className='mx-auto w-full'>
      <CardHeader>
        <CardTitle className='text-left text-2xl font-bold'>
          {pageTitle}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
            <FormField
              control={form.control}
              name='image'
              render={({ field }) => (
                <div className='space-y-6'>
                  <FormItem className='w-full'>
                    <FormLabel>Images</FormLabel>
                    <FormControl>
                      {/* <FileUploader
                        value={field.value}
                        onValueChange={field.onChange}
                        maxFiles={4}
                        maxSize={4 * 1024 * 1024}
                        // disabled={loading}s
                        // progresses={progresses}
                        // pass the onUpload function here for direct upload
                        // onUpload={uploadFiles}
                        // disabled={isUploading}
                      /> */}

                      <ImageUpload
                          value={field.value.map(image => image.url)}  // Convert to array of strings
                          disabled={loading}
                          onChange={(url) => field.onChange([...field.value, { url }])}
                          onRemove={(url) => field.onChange(field.value.filter(image => image.url !== url))}
                      />
                    
                      {/* add the console log with field.value*/}
                      {/* {(() => {
                        console.log('Current field value:', field.value);
                        return null;
                      })()} */}
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                </div>
              )}
            />

            <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
              <FormField
                control={form.control}
                name='name'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Product Name</FormLabel>
                    <FormControl>
                      <Input placeholder='Enter product name' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='category'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <Select
                      onValueChange={(value) => field.onChange(value)}
                      value={field.value[field.value.length - 1]}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder='Select semester' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {[1, 2, 3, 4, 5, 6].map((sem) => (
                          <SelectItem key={sem} value={String(sem)}>
                            {sem}
                          </SelectItem>
                        ))}
                      </SelectContent>
                        {/* <SelectItem value='beauty'>Beauty Products</SelectItem>
                        <SelectItem value='electronics'>Electronics</SelectItem>
                        <SelectItem value='clothing'>Clothing</SelectItem>
                        <SelectItem value='home'>Home & Garden</SelectItem>
                        <SelectItem value='sports'>
                          Sports & Outdoors
                        </SelectItem> */}
                      {/* </SelectContent> */}
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='price'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price</FormLabel>
                    <FormControl>
                      <Input
                        type='number'
                        step='0.01'
                        placeholder='Enter price'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name='description'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder='Enter product description'
                      className='resize-none'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type='submit'>Add Product</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
