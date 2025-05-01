// lib/notes/services.ts
import { prisma } from "@/prisma";

type GetNotesFilters = {
  page?: string | number;
  limit?: string | number;
  search?: string;
  categories?: string; // Comma-separated degree values
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

  const whereClause: any = {};

  if (search) {
    whereClause.name = {
      contains: search,
      mode: 'insensitive',
    };
  }

  if (categories) {
    const degreeList = categories.split(",");
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