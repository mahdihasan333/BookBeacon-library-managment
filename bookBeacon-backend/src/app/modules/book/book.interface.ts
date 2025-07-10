import { Model } from "mongoose";

export interface IBook {
  title: string;
  author: string;
  genre: "FICTION" | "NON_FICTION" | "SCIENCE" | "HISTORY" | "BIOGRAPHY" | "FANTASY";
  isbn: string;
  description?: string;
  copies: number;
  available: boolean;
  createdAt: Date;
  image: string;
  updatedAt: Date;
}

export interface IBookMethods {
  updateAvailability(id: string): void;
}

export type BookModel = Model<IBook, {}, IBookMethods>;