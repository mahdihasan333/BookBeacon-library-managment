import { z } from "zod";

export const createBorrowZodSchema = z.object({
  body: z.object({
    book: z.string().min(1, "Book ID is required").refine((value) => {
      return /^[0-9a-fA-F]{24}$/.test(value);
    }, {
      message: "Invalid Book ID format",
    }),
    quantity: z.number().min(1, "Quantity must be at least 1").refine((val) => val !== undefined, {
      message: "Quantity is required",
    }),
    dueDate: z.string().min(1, "Due date is required").refine((value) => {
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
