import { z } from "zod";

export const createBookZodSchema = z.object({
  body: z.object({
    title: z.string().min(1, "Title is required"),
    author: z.string().min(1, "Author is required"),
    isbn: z.string().min(1, "ISBN is required"),
    genre: z.enum(["FICTION", "NON_FICTION", "SCIENCE", "HISTORY", "BIOGRAPHY", "FANTASY"]).refine(
      (val) => ["FICTION", "NON_FICTION", "SCIENCE", "HISTORY", "BIOGRAPHY", "FANTASY"].includes(val),
      { message: "Genre is required" }
    ),
    description: z.string().optional(),
    copies: z.number().min(0, "Copies cannot be negative").refine((val) => val !== undefined, {
      message: "Copies is required",
    }),
    available: z.boolean().optional(),
    image: z.string().optional(),
  }),
});

export const updateBookZodSchema = z.object({
  title: z.string().optional(),
  author: z.string().optional(),
  isbn: z.string().optional(),
  genre: z.enum(["FICTION", "NON_FICTION", "SCIENCE", "HISTORY", "BIOGRAPHY", "FANTASY"]).optional(),
  description: z.string().optional(),
  copies: z.number().min(0, "Copies cannot be negative").optional(),
  image: z.string().optional(),
});
