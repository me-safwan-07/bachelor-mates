import { NextResponse } from 'next/server';
import { ZNotesInput } from '@/types/notes';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';
import { prisma } from '@/prisma';
import { getUser } from '@/lib/user/service';

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user.id) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const user = await getUser(session?.user?.id);

    if (user?.role !== 'ADMIN') {
      return new NextResponse('Forbidden', { status: 403 });
    }
    

    const body = await req.json();
    const validatedData = ZNotesInput.parse(body);

    // Create the notes
    const notes = await prisma.notes.create({
      data: {
        name: validatedData.name,
        accessType: validatedData.accessType,
        year: validatedData.year,
        degree: validatedData.degree,
        stream: validatedData.stream,
        semester: validatedData.semester,
        price: validatedData.price || 0,
        uploaderId: user.id,
        image: {
          create: validatedData.image.map(img => ({ url: img.url }))
        }
      },
      include: {
        image: true
      }
    });

    return NextResponse.json(notes, { status: 201 });
  } catch (error) {
    console.error('[NOTES_POST]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}

// export async function PATCH(
//   req: Request,
//   { params }: { params: { notesId: string } }
// ) {
//   try {
//     const session = await getServerSession(authOptions);
    
//     if (!session) {
//       return new NextResponse('Unauthorized', { status: 401 });
//     }

//     const body = await req.json();
//     const validatedData = ZNotesInput.parse(body);

//     // First delete all existing images
//     await prisma.image.deleteMany({
//       where: {
//         notesId: params.notesId
//       }
//     });

//     // Update the notes
//     const notes = await prisma.notes.update({
//       where: {
//         id: params.notesId
//       },
//       data: {
//         name: validatedData.name,
//         accessType: validatedData.accessType,
//         year: validatedData.year,
//         degree: validatedData.degree,
//         stream: validatedData .stream,
//         semester: validatedData.semester,
//         category: validatedData.category,
//         price: validatedData.price || 0,
//         image: {
//           create: validatedData.image.map(img => ({ url: img.url }))
//         }
//       },
//       include: {
//         image: true
//       }
//     });

//     return NextResponse.json(notes);
//   } catch (error) {
//     console.error('[NOTES_PATCH]', error);
//     return new NextResponse('Internal error', { status: 500 });
//   }
// }