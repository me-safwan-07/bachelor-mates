// lib/notes/services.ts
import { prisma } from "@/prisma";
import { DatabaseError } from "@/types/errors";
import { Prisma, Degree } from "@prisma/client";

type GetNotesFilters = {
  page?: string | number;
  limit?: string | number;
  search?: string;
  categories?: string; // Comma-separated degree values
};

const selectedNotes = {
  id: true,
  createdAt: true,
  updatedAt: true,     
  uploaderId: true,
  name: true,
  accessType: true,
  degree: true,
  stream: true,
  semester: true,
  price: true,
  images: {
    select: {
      id: true,
      notesId: true,
      url: true,
      createdAt: true, 
    }
  }
};


export async function getNotes(filters: GetNotesFilters) {
  const { 
    page = 1, 
    limit = 10, 
    search, 
    categories
  } = filters;

  const pageNumber = Number(page);
  const pageSize = Number(limit);

  const whereClause: Prisma.NotesWhereInput = {};

  if (search) {
    whereClause.name = {
      contains: search,
      mode: 'insensitive',
    };
  }

  if (categories) {
    const degreeList = categories.split(",") as Degree[];
    whereClause.degree = {
      in: degreeList
    }
  }

  const [total_Notes, notes] = await Promise.all([
    prisma.notes.count({ where: whereClause }),
    prisma.notes.findMany({
      where: whereClause,
      skip: (pageNumber - 1) * pageSize,
      take: pageSize,
      include: {
        images: true,
        uploader: {
          select: {
            name: true
          }
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    }),
  ]);

  // Transform the data to match TNotes type
  const transformedNotes = notes.map(note => ({
    ...note,
    uploader: note.uploader.name,
    images: note.images.map(image => ({ url: image.url }))
  }));

  return {
    total_Notes,
    notes: transformedNotes,
  };
}


export async function getNoteById(noteId: string) {
  const data = await prisma.notes.findUnique({
    where: {
      id: noteId, 
    },
    include: {
      images: true,
    },
  });
  return data;
}


export const deleteNotes = async (notesId: string) => {
  try {
    const deletedNotes = await prisma.notes.delete({
      where: { id: notesId },
      select: selectedNotes,
    });

    if (!deletedNotes) {
      throw new Error("Notes not found");
    }

    return deletedNotes;
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      console.error(error);
      throw new DatabaseError(error.message);
    }

    throw error;
  }
};
