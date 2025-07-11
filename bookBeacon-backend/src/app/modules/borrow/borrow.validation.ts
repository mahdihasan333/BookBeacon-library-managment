import { z } from "zod";

export const createBorrowZodSchema = z.object({
  body: z.object({
    book: z.string({
      required_error: "Book ID is required",
    }).refine((value) => {
      // Validate that the book ID is a valid MongoDB ObjectId
      return /^[0-9a-fA-F]{24}$/.test(value);
    }, {
      message: "Invalid Book ID format",
    }),
    quantity: z.number({
      required_error: "Quantity is required",
    }).min(1, "Quantity must be at least 1"),
    dueDate: z.string({
      required_error: "Due date is required",
    }).refine((value) => {
      // Validate that dueDate is a valid ISO date string
      return !isNaN(Date.parse(value));
    }, {
      message: "Invalid date format",
    }),
  }),
});

export const updateBorrowZodSchema = z.object({
  body: z.object({
    quantity: z.number().min(1, "Quantity must be at least 1").optional(),
    dueDate: z.string().refine((value) => {
      return !isNaN(Date.parse(value));
    }, {
      message: "Invalid date format",
    }).optional(),
  }),
});