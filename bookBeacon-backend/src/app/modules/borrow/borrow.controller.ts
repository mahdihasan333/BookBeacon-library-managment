import { Request, Response } from "express";
import { z, ZodError } from "zod";
import Borrow from "./borrow.model";
import Book from "../book/book.model";
import { createBorrowZodSchema, updateBorrowZodSchema } from "./borrow.validation";

export const createBorrow = async (req: Request, res: Response) => {
  try {
    console.log("POST /api/borrow called", req.body);
    const validatedData = createBorrowZodSchema.parse({ body: req.body });
    const { book, quantity, dueDate } = validatedData.body;

    const findBook = await Book.findById(book);
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
      console.log("Book not available", book);
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
    await findBook.save();

    const borrow = new Borrow({
      book,
      quantity,
      dueDate: new Date(dueDate),
    });

    await borrow.save();

    res.status(201).json({
      success: true,
      message: "Borrow created successfully",
      data: borrow,
    });
  } catch (error) {
    console.error("Create borrow error:", error);
    if (error instanceof ZodError) {
      res.status(400).json({
        success: false,
        message: "Validation failed",
        error: error.issues,
      });
    } else {
      res.status(500).json({
        success: false,
        message: "Borrow creation failed",
        error: error.message || error,
      });
    }
  }
};

export const findAllBorrows = async (req: Request, res: Response) => {
  try {
    console.log("GET /api/borrow called");
    const borrows = await Borrow.aggregate([
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
  } catch (error) {
    console.error("Find all borrows error:", error);
    res.status(500).json({
      success: false,
      message: "Borrows retrieval failed",
      error: error.message || error,
    });
  }
};

export const findSingleBorrow = async (req: Request, res: Response) => {
  try {
    const { borrowId } = req.params;
    console.log("GET /api/borrow/:borrowId called", borrowId);
    const borrow = await Borrow.findById(borrowId).populate("book");

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
      message: "Borrow returned successfully",
      data: borrow,
    });
  } catch (error) {
    console.error("Find single borrow error:", error);
    res.status(500).json({
      success: false,
      message: "Borrow retrieval failed",
      error: error.message || error,
    });
  }
};

export const updateBorrow = async (req: Request, res: Response) => {
  try {
    console.log("PATCH /api/borrow/:borrowId called", req.params, req.body);
    const validatedData = updateBorrowZodSchema.parse({ body: req.body });
    const { borrowId } = req.params;
    const { quantity, dueDate } = validatedData.body;

    const borrow = await Borrow.findById(borrowId);
    if (!borrow) {
      console.log("Borrow not found in database", borrowId);
      res.status(404).json({
        success: false,
        message: "Borrow not found",
        data: null,
      });
      return;
    }

    const findBook = await Book.findById(borrow.book);
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
      if (quantityDifference > 0 && findBook.copies < quantityDifference) {
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
      await findBook.save();
      borrow.quantity = quantity;
    }

    if (dueDate !== undefined) {
      borrow.dueDate = new Date(dueDate);
    }

    await borrow.save();

    res.status(200).json({
      success: true,
      message: "Borrow updated successfully",
      data: borrow,
    });
  } catch (error) {
    console.error("Update borrow error:", error);
    if (error instanceof ZodError) {
      res.status(400).json({
        success: false,
        message: "Validation failed",
        error: error.issues,
      });
    } else {
      res.status(500).json({
        success: false,
        message: "Borrow update failed",
        error: error.message || error,
      });
    }
  }
};

export const deleteBorrow = async (req: Request, res: Response) => {
  try {
    const { borrowId } = req.params;
    console.log("DELETE /api/borrow/:borrowId called", borrowId);
    const borrow = await Borrow.findById(borrowId);

    if (!borrow) {
      console.log("Borrow not found in database", borrowId);
      res.status(404).json({
        success: false,
        message: "Borrow not found",
        data: null,
      });
      return;
    }

    const findBook = await Book.findById(borrow.book);
    if (findBook) {
      findBook.copies += borrow.quantity;
      findBook.available = findBook.copies > 0;
      await findBook.save();
    }

    await borrow.deleteOne();

    res.status(200).json({
      success: true,
      message: "Borrow deleted successfully",
      data: null,
    });
  } catch (error) {
    console.error("Delete borrow error:", error);
    res.status(500).json({
      success: false,
      message: "Borrow deletion failed",
      error: error.message || error,
    });
  }
};
