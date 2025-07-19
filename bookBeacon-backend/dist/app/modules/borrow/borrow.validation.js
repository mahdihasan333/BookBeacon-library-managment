"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateBorrowZodSchema = exports.createBorrowZodSchema = void 0;
const zod_1 = require("zod");
exports.createBorrowZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        book: zod_1.z.string().min(1, "Book ID is required").refine((value) => {
            return /^[0-9a-fA-F]{24}$/.test(value);
        }, {
            message: "Invalid Book ID format",
        }),
        quantity: zod_1.z.number().min(1, "Quantity must be at least 1").refine((val) => val !== undefined, {
            message: "Quantity is required",
        }),
        dueDate: zod_1.z.string().min(1, "Due date is required").refine((value) => {
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
