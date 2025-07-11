import { Request, Response } from "express";
import { z } from "zod";
import Book from "./book.model";
import { createBookZodSchema, updateBookZodSchema } from "./book.validation";


export const createBook = async (req: Request, res: Response) => {
  try {
    const validatedData = createBookZodSchema.parse(req);
    const { title, author, isbn, genre, description, copies, available, image } = validatedData.body;
    const book = new Book({
      title,
      author,
      isbn,
      genre,
      description,
      copies,
      image,
      available: copies > 0 ? true : available ?? false,
    });
    await book.save();

    res.status(201).json({
      success: true,
      message: "Book created successfully",
      data: book,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({
        success: false,
        message: "Validation failed",
        error: error.errors,
      });
    } else {
      res.status(500).json({
        success: false,
        message: "Book creation failed",
        error: error.message || error,
      });
    }
  }
};

export const deleteBook = async (req: Request, res: Response): Promise<void> => {
  try {
    const { bookId } = req.params;
    const book = await Book.findById(bookId);

    if (!book) {
      res.status(404).json({ message: "Book not found", success: false, data: null });
      return;
    }

    await book.deleteOne();

    res.status(200).json({
      success: true,
      message: "Book deleted successfully",
      data: null,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Book deletion failed",
      error: error.message || error,
    });
  }
};

export const findAllBooks = async (req: Request, res: Response) => {
  try {
    const {
      filter,
      sortBy = "createdAt",
      sort = "desc",
      limit = "6",
      page = "1",
    } = req.query;

    const query: Record<string, any> = {};
    if (filter) {
      query.genre = filter;
    }

    const sortField = sortBy === "copies" ? "copies" : sortBy as string;
    const sortOrder = sort === "desc" ? -1 : 1;
    const limitNumber = parseInt(limit as string, 10);
    const pageNumber = parseInt(page as string, 10);
    const skip = (pageNumber - 1) * limitNumber;

    const [books, total] = await Promise.all([
      Book.find(query)
        .sort({ [sortField]: sortOrder })
        .skip(skip)
        .limit(limitNumber),
      Book.countDocuments(query),
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
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Books retrieval failed",
      error: error.message || error,
    });
  }
};

export const findSingleBook = async (req: Request, res: Response): Promise<void> => {
  try {
    const { bookId } = req.params;
    const book = await Book.findById(bookId);

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
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Book retrieval failed",
      error: error.message || error,
    });
  }
};

export const updateBook = async (req: Request, res: Response) => {
  try {
    const validatedData = updateBookZodSchema.parse(req.body);
    const { bookId } = req.params;
    const { title, author, isbn, genre, copies, description, image } = validatedData;

    const book = await Book.findById(bookId);

    if (!book) {
      res.status(404).json({
        success: false,
        message: "Book not found",
        data: null,
      });
      return;
    }

    book.title = title ?? book.title;
    book.author = author ?? book.author;
    book.isbn = isbn ?? book.isbn;
    book.genre = genre ?? book.genre;
    book.description = description ?? book.description;
    book.copies = copies ?? book.copies;
    book.available = copies !== undefined ? copies > 0 : book.available;
    book.image = image ?? book.image;

    await book.save();

    res.status(200).json({
      success: true,
      message: "Book updated successfully",
      data: book,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({
        success: false,
        message: "Validation failed",
        error: error.errors,
      });
    } else {
      res.status(500).json({
        success: false,
        message: "Book update failed",
        error: error.message || error,
      });
    }
  }
};
