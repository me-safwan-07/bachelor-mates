import { z } from "zod";

const AccessType = z.enum(["FREE", "PAID"]);
const DegreeType = z.enum(["BCOM", "BBA", "BCA"]);

export const ZNotesInput = z.object({
  images: z.array(
    z.object({
      url: z.string().url().min(1, {
        message: "minimum one document is required",
      })
    })
  ),
  name: z.string().min(2, {
    message: 'Notes name must be at least 2 characters.'
  }),
  accessType: AccessType,
  degree: DegreeType,
  stream: z.string().optional(),
  semester: z.number().min(1).max(6),
  price: z.number().min(0).optional(),
});
export type TNotesInput = z.infer<typeof ZNotesInput>;

export const ZNotes = z.object({
  id: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  uploader: z.string(),
  images: z.array(
    z.object({
      url: z.string().url()
    })
  ),
  name: z.string().min(2, {
    message: 'Notes name must be at least 2 characters.'
  }),
  accessType: AccessType,
  degree: DegreeType,
  stream: z.string().optional(),
  semester: z.number().min(1, {
    message: 'Semester must be at least 2 characters.'}),
  price: z.number().optional(),
});

export type TNotes = z.infer<typeof ZNotes>;
