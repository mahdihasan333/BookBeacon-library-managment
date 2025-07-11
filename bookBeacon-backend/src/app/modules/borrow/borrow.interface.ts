import { Model, Types } from "mongoose";

export interface IBorrow {
  book: Types.ObjectId;
  quantity: number;
  dueDate: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface IBorrowMethods {
  updateAvailability(id: string): void;
}

export type BorrowModel = Model<IBorrow, {}, IBorrowMethods>;