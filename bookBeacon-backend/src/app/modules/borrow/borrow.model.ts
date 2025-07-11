import { Schema, model } from "mongoose";
import { IBorrow, IBorrowMethods, BorrowModel } from "./borrow.interface";
import Book from "../book/book.model";

const BorrowSchema = new Schema<IBorrow, BorrowModel, IBorrowMethods>(
  {
    book: {
      type: Schema.Types.ObjectId,
      ref: "Book",
      required: [true, "Book is required"],
    },
    quantity: {
      type: Number,
      required: [true, "Quantity is required"],
      min: [1, "Quantity must be at least 1"],
    },
    dueDate: {
      type: Date,
      required: [true, "Due date is required"],
    },
  },
  {
    timestamps: true,
  }
);

BorrowSchema.static("updateAvailability", async function (id: string) {
  const findBook = await Book.findById(id);
  if (findBook?.copies === 0) {
    await Book.findByIdAndUpdate(
      id,
      {
        $set: {
          available: false,
        },
      },
      {
        runValidators: true,
      }
    );
  }
});

const Borrow = model<IBorrow, BorrowModel>("Borrow", BorrowSchema);

export default Borrow;
