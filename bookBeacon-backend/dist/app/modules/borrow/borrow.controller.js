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
exports.deleteBorrow = exports.updateBorrow = exports.findSingleBorrow = exports.findAllBorrows = exports.createBorrow = void 0;
const zod_1 = require("zod");
const borrow_model_1 = __importDefault(require("./borrow.model"));
const book_model_1 = __importDefault(require("../book/book.model"));
const borrow_validation_1 = require("./borrow.validation");
const createBorrow = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const validatedData = borrow_validation_1.createBorrowZodSchema.parse({ body: req.body });
        const { book, quantity, dueDate } = validatedData.body;
        const findBook = yield book_model_1.default.findById(book);
        if (!findBook) {
            console.log("Book not found in database", book);
            res.status(404).json({
                success: false,
                message: "Borrow creation failed",
                error: "Book not found",
            });
            return;
        }
        if (findBook.copies === 0 && !findBook.available) {
            res.status(400).json({
                success: false,
                message: "Borrow creation failed",
                error: "Book not available",
            });
            return;
        }
        if (findBook.copies < quantity) {
            console.log(`Not enough ${quantity} copies available for book`, book);
            res.status(400).json({
                success: false,
                message: "Borrow creation failed",
                error: `Not enough ${quantity} copies available`,
            });
            return;
        }
        findBook.copies -= quantity;
        findBook.available = findBook.copies > 0;
        yield findBook.save();
        const borrow = new borrow_model_1.default({
            book,
            quantity,
            dueDate: new Date(dueDate),
        });
        yield borrow.save();
        res.status(201).json({
            success: true,
            message: "Borrow created successfully",
            data: borrow,
        });
    }
    catch (error) {
        console.error("Create borrow error:", error);
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
                message: "Borrow creation failed",
                error: error.message || "An unexpected error occurred",
            });
        }
    }
});
exports.createBorrow = createBorrow;
const findAllBorrows = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const borrows = yield borrow_model_1.default.aggregate([
            {
                $group: { _id: "$book", totalQuantity: { $sum: "$quantity" } },
            },
            {
                $lookup: {
                    from: "books",
                    localField: "_id",
                    foreignField: "_id",
                    as: "book",
                },
            },
            {
                $unwind: "$book",
            },
            {
                $project: {
                    _id: 0,
                    book: {
                        title: "$book.title",
                        isbn: "$book.isbn",
                    },
                    totalQuantity: 1,
                },
            },
        ]);
        res.status(200).json({
            success: true,
            message: "Borrows summary retrieved successfully",
            data: borrows,
        });
    }
    catch (error) {
        console.error("Find all borrows error:", error);
        res.status(500).json({
            success: false,
            message: "Borrows retrieval failed",
            error: error.message || "An unexpected error occurred",
        });
    }
});
exports.findAllBorrows = findAllBorrows;
const findSingleBorrow = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { borrowId } = req.params;
        const borrow = yield borrow_model_1.default.findById(borrowId).populate("book");
        if (!borrow) {
            console.log("Borrow not found in database", borrowId);
            res.status(404).json({
                success: false,
                message: "Borrow not found",
                data: null,
            });
            return;
        }
        res.status(200).json({
            success: true,
            message: "Borrow retrieved successfully",
            data: borrow,
        });
    }
    catch (error) {
        console.error("Find single borrow error:", error);
        res.status(500).json({
            success: false,
            message: "Borrow retrieval failed",
            error: error.message || "An unexpected error occurred",
        });
    }
});
exports.findSingleBorrow = findSingleBorrow;
const updateBorrow = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const validatedData = borrow_validation_1.updateBorrowZodSchema.parse({ body: req.body });
        const { borrowId } = req.params;
        const { quantity, dueDate } = validatedData.body;
        const borrow = yield borrow_model_1.default.findById(borrowId);
        if (!borrow) {
            console.log("Borrow not found in database", borrowId);
            res.status(404).json({
                success: false,
                message: "Borrow not found",
                data: null,
            });
            return;
        }
        const findBook = yield book_model_1.default.findById(borrow.book);
        if (!findBook) {
            console.log("Book not found in database", borrow.book);
            res.status(404).json({
                success: false,
                message: "Borrow update failed",
                error: "Book not found",
            });
            return;
        }
        if (quantity !== undefined) {
            const quantityDifference = quantity - borrow.quantity;
            if (findBook.copies < quantityDifference) {
                console.log(`Not enough ${quantityDifference} copies available for book`, borrow.book);
                res.status(400).json({
                    success: false,
                    message: "Borrow update failed",
                    error: `Not enough ${quantityDifference} copies available`,
                });
                return;
            }
            findBook.copies -= quantityDifference;
            findBook.available = findBook.copies > 0;
            yield findBook.save();
            borrow.quantity = quantity;
        }
        if (dueDate !== undefined) {
            borrow.dueDate = new Date(dueDate);
        }
        yield borrow.save();
        res.status(200).json({
            success: true,
            message: "Borrow updated successfully",
            data: borrow,
        });
    }
    catch (error) {
        console.error("Update borrow error:", error);
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
                message: "Borrow update failed",
                error: error.message || "An unexpected error occurred",
            });
        }
    }
});
exports.updateBorrow = updateBorrow;
const deleteBorrow = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { borrowId } = req.params;
        const borrow = yield borrow_model_1.default.findById(borrowId);
        if (!borrow) {
            console.log("Borrow not found in database", borrowId);
            res.status(404).json({
                success: false,
                message: "Borrow not found",
                data: null,
            });
            return;
        }
        const findBook = yield book_model_1.default.findById(borrow.book);
        if (findBook) {
            findBook.copies += borrow.quantity;
            findBook.available = findBook.copies > 0;
            yield findBook.save();
        }
        yield borrow.deleteOne();
        res.status(200).json({
            success: true,
            message: "Borrow deleted successfully",
            data: null,
        });
    }
    catch (error) {
        console.error("Delete borrow error:", error);
        res.status(500).json({
            success: false,
            message: "Borrow deletion failed",
            error: error.message || "An unexpected error occurred",
        });
    }
});
exports.deleteBorrow = deleteBorrow;
