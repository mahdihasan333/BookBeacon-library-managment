import { z } from "zod";

export const createBookZodSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: "Title is required",
    }),
    author: z.string({
      required_error: "Author is required",
    }),
    isbn: z.string({
      required_error: "ISBN is required",
    }),
    genre: z.enum(["FICTION", "NON_FICTION", "SCIENCE", "HISTORY", "BIOGRAPHY", "FANTASY"], {
      required_error: "Genre is required",
    }),
    description: z.string().optional(),
    copies: z.number({
      required_error: "Copies is required",
    }).min(0, "Copies cannot be negative"),
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