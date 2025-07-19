"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateBookZodSchema = exports.createBookZodSchema = void 0;
const zod_1 = require("zod");
exports.createBookZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string().min(1, "Title is required"),
        author: zod_1.z.string().min(1, "Author is required"),
        isbn: zod_1.z.string().min(1, "ISBN is required"),
        genre: zod_1.z.enum(["FICTION", "NON_FICTION", "SCIENCE", "HISTORY", "BIOGRAPHY", "FANTASY"]).refine((val) => ["FICTION", "NON_FICTION", "SCIENCE", "HISTORY", "BIOGRAPHY", "FANTASY"].includes(val), { message: "Genre is required" }),
        description: zod_1.z.string().optional(),
        copies: zod_1.z.number().min(0, "Copies cannot be negative").refine((val) => val !== undefined, {
            message: "Copies is required",
        }),
        available: zod_1.z.boolean().optional(),
        image: zod_1.z.string().optional(),
    }),
});
exports.updateBookZodSchema = zod_1.z.object({
    title: zod_1.z.string().optional(),
    author: zod_1.z.string().optional(),
    isbn: zod_1.z.string().optional(),
    genre: zod_1.z.enum(["FICTION", "NON_FICTION", "SCIENCE", "HISTORY", "BIOGRAPHY", "FANTASY"]).optional(),
    description: zod_1.z.string().optional(),
    copies: zod_1.z.number().min(0, "Copies cannot be negative").optional(),
    image: zod_1.z.string().optional(),
});
