"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateBorrowZodSchema = exports.createBorrowZodSchema = void 0;
const zod_1 = require("zod");
exports.createBorrowZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        book: zod_1.z.string({
            required_error: "Book ID is required",
        }).refine((value) => {
            // Validate that the book ID is a valid MongoDB ObjectId
            return /^[0-9a-fA-F]{24}$/.test(value);
        }, {
            message: "Invalid Book ID format",
        }),
        quantity: zod_1.z.number({
            required_error: "Quantity is required",
        }).min(1, "Quantity must be at least 1"),
        dueDate: zod_1.z.string({
            required_error: "Due date is required",
        }).refine((value) => {
            // Validate that dueDate is a valid ISO date string
            return !isNaN(Date.parse(value));
        }, {
            message: "Invalid date format",
        }),
    }),
});
exports.updateBorrowZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        quantity: zod_1.z.number().min(1, "Quantity must be at least 1").optional(),
        dueDate: zod_1.z.string().refine((value) => {
            return !isNaN(Date.parse(value));
        }, {
            message: "Invalid date format",
        }).optional(),
    }),
});
