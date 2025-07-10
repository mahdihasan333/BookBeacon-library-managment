import { Model } from "mongoose";

export interface IBook {
  title: string;
  author: string;
  genre:
    | "FICTION"
    | "NON_FICTION"
    | "SCIENCE"
    | "HISTORY"
    | "BIOGRAPHY"
    | "FANTASY";
  isbn: string;
  description?: string;
  copies: number;
  available: boolean;
  createdAt: Date;
  updatedAt: Date;
  image: string;
}


export interface IBookModel extends Model<IBook> {
  updateAvailability(id: string): Promise<void>;
}
