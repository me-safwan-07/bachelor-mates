// app/api/v1/upload/route.ts
import { NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const files = formData.getAll('files') as File[];
    
    if (!files || files.length === 0) {
      return NextResponse.json(
        { error: 'No files uploaded' },
        { status: 400 }
      );
    }

    // Process each file
    const uploadPromises = files.map(async (file) => {
      try {
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        
        // Convert buffer to data URL
        const dataUrl = `data:${file.type};base64,${buffer.toString('base64')}`;
        
        // Upload to Cloudinary
        const result = await cloudinary.uploader.upload(dataUrl, {
          resource_type: 'auto',
          folder: 'bacheloremate/notes',
          public_id: file.name.split('.')[0],
          overwrite: false,
          quality: 'auto',
          // format: 'webp', // Convert images to webp for better compression
        });

        return {
          success: true,
          fileUrl: result.secure_url,
          filePath: result.public_id,
          fileName: file.name,
          fileSize: result.bytes,
          fileType: result.resource_type,
          uploadTime: new Date(),
        };
      } catch (error) {
        console.error(`Error uploading file ${file.name}:`, error);
        return {
          success: false,
          fileName: file.name,
          error: error instanceof Error ? error.message : 'Upload failed',
        };
      }
    });

    const results = await Promise.all(uploadPromises);
    const successfulUploads = results.filter(r => r.success);
    const failedUploads = results.filter(r => !r.success);

    if (successfulUploads.length === 0) {
      return NextResponse.json(
        { 
          error: 'All uploads failed',
          failedUploads 
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      message: 'Upload complete',
      successfulUploads,
      failedUploads: failedUploads.length > 0 ? failedUploads : undefined,
    });

  } catch (error) {
    console.error('Error in upload API:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { publicIds } = await request.json();
    
    if (!publicIds || !Array.isArray(publicIds)) {
      return NextResponse.json(
        { error: 'Invalid publicIds array' },
        { status: 400 }
      );
    }

    const deletionResults = await cloudinary.api.delete_resources(publicIds);
    
    return NextResponse.json({
      message: 'Deletion complete',
      deletionResults,
    });

  } catch (error) {
    console.error('Error deleting files:', error);
    return NextResponse.json(
      { error: 'Failed to delete files' },
      { status: 500 }
    );
  }
}