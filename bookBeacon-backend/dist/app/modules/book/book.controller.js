"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateBook = exports.findSingleBook = exports.findAllBooks = exports.deleteBook = exports.createBook = void 0;
const zod_1 = require("zod");
const book_model_1 = __importDefault(require("./book.model"));
const book_validation_1 = require("./book.validation");
const createBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const validatedData = book_validation_1.createBookZodSchema.parse({ body: req.body });
        const { title, author, isbn, genre, description, copies, available, image } = validatedData.body;
        const book = new book_model_1.default({
            title,
            author,
            isbn,
            genre,
            description,
            copies,
            image,
            available: copies > 0 ? true : available !== null && available !== void 0 ? available : false,
        });
        yield book.save();
        res.status(201).json({
            success: true,
            message: "Book created successfully",
            data: book,
        });
    }
    catch (error) {
        console.error("Create error:", error);
        if (error instanceof zod_1.ZodError) {
            res.status(400).json({
                success: false,
                message: "Validation failed",
                error: error.issues,
            });
        }
        else {
            res.status(500).json({
                success: false,
                message: "Book creation failed",
                error: error.message || "An unexpected error occurred",
            });
        }
    }
});
exports.createBook = createBook;
const deleteBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { bookId } = req.params;
        const book = yield book_model_1.default.findById(bookId);
        if (!book) {
            res.status(404).json({ message: "Book not found", success: false, data: null });
            return;
        }
        yield book.deleteOne();
        res.status(200).json({
            success: true,
            message: "Book deleted successfully",
            data: null,
        });
    }
    catch (error) {
        console.error("Delete error:", error);
        res.status(500).json({
            success: false,
            message: "Book deletion failed",
            error: error.message || "An unexpected error occurred",
        });
    }
});
exports.deleteBook = deleteBook;
const findAllBooks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { filter, sortBy = "createdAt", sort = "desc", limit = "6", page = "1", } = req.query;
        const query = {};
        if (filter) {
            query.genre = filter;
        }
        const sortField = sortBy === "copies" ? "copies" : sortBy;
        const sortOrder = sort === "desc" ? -1 : 1;
        const limitNumber = parseInt(limit, 10);
        const pageNumber = parseInt(page, 10);
        const skip = (pageNumber - 1) * limitNumber;
        const [books, total] = yield Promise.all([
            book_model_1.default.find(query)
                .sort({ [sortField]: sortOrder })
                .skip(skip)
                .limit(limitNumber),
            book_model_1.default.countDocuments(query),
        ]);
        res.status(200).json({
            success: true,
            message: "Books retrieved successfully",
            books,
            meta: {
                page: pageNumber,
                limit: limitNumber,
                total,
            },
        });
    }
    catch (error) {
        console.error("Find all books error:", error);
        res.status(500).json({
            success: false,
            message: "Books retrieval failed",
            error: error.message || "An unexpected error occurred",
        });
    }
});
exports.findAllBooks = findAllBooks;
const findSingleBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { bookId } = req.params;
        const book = yield book_model_1.default.findById(bookId);
        if (!book) {
            res.status(404).json({
                success: false,
                message: "Book not found",
                data: null,
            });
            return;
        }
        res.status(200).json({
            success: true,
            message: "Book retrieved successfully",
            data: book,
        });
    }
    catch (error) {
        console.error("Find single book error:", error);
        res.status(500).json({
            success: false,
            message: "Book retrieval failed",
            error: error.message || "An unexpected error occurred",
        });
    }
});
exports.findSingleBook = findSingleBook;
const updateBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const validatedData = book_validation_1.updateBookZodSchema.parse(req.body);
        const { bookId } = req.params;
        const { title, author, isbn, genre, copies, description, image } = validatedData;
        const book = yield book_model_1.default.findById(bookId);
        if (!book) {
            res.status(404).json({
                success: false,
                message: "Book not found",
                data: null,
            });
            return;
        }
        book.title = title !== null && title !== void 0 ? title : book.title;
        book.author = author !== null && author !== void 0 ? author : book.author;
        book.isbn = isbn !== null && isbn !== void 0 ? isbn : book.isbn;
        book.genre = genre !== null && genre !== void 0 ? genre : book.genre;
        book.description = description !== null && description !== void 0 ? description : book.description;
        book.copies = copies !== null && copies !== void 0 ? copies : book.copies;
        book.available = copies !== undefined ? copies > 0 : book.available;
        book.image = image !== null && image !== void 0 ? image : book.image;
        yield book.save();
        res.status(200).json({
            success: true,
            message: "Book updated successfully",
            data: book,
        });
    }
    catch (error) {
        console.error("Update error:", error);
        if (error instanceof zod_1.ZodError) {
            res.status(400).json({
                success: false,
                message: "Validation failed",
                error: error.issues,
            });
        }
        else {
            res.status(500).json({
                success: false,
                message: "Book update failed",
                error: error.message || "An unexpected error occurred",
            });
        }
    }
});
exports.updateBook = updateBook;
