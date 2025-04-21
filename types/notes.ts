import { z } from "zod";

const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp'
];

const AccessType = z.enum(["FREE", "PAID"]);
const DegreeType = z.enum(["BCOM", "BBA", "BCA"]);

export const ZNotesInput = z.object({
  image: z.array(
    z.object({
      url: z.string().url()
    })
  ).min(1, "At least one image is required"),
  name: z.string().min(2, {
    message: 'Notes name must be at least 2 characters.'
  }),
  accessType: AccessType,
  year: z.number().min(1).max(3),
  degree: DegreeType,
  stream: z.string().min(2).optional(),
  semester: z.number().min(1).max(6),
  category: z.string().min(2),
  price: z.number().min(0).optional(),
  description: z.string().optional()
});
export type TNotesInput = z.infer<typeof ZNotesInput>;

export const ZNotes = z.object({
  id: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  uploader: z.string(),
  image: z 
    .any()
    .refine((files) => files?.length == 1, 'Image is required.')
    .refine(
      (files) => files?.[0]?.size <= MAX_FILE_SIZE,
      `Max file size is 5MB.`
    )
    .refine(
      (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
      '.jpg, .jpeg, .png and .webp files are accepted.'
    ),
  name: z.string().min(2, {
    message: 'Notes name must be at least 2 characters.'
  }),
  accessType: AccessType,
  year: z.number().min(1, {
    message: 'Year must be at least 1.'}),
  degree: DegreeType,
  stream: z.string().min(2, {
    message: 'Stream must be at least 2 characters.'}).optional(),
  semester: z.number().min(2, {
    message: 'Semester must be at least 2 characters.'}),
  category: z.string(),
  price: z.number().optional(),
});

export type TNotes = z.infer<typeof ZNotes>;
