export interface IBook {
  _id: string;
  title: string;
  author: string;
  genre: "FICTION" | "NON_FICTION" | "SCIENCE" | "HISTORY" | "BIOGRAPHY" | "FANTASY";
  isbn: string;
  description?: string;
  copies: number;
  available: boolean;
  image: string;
  createdAt: string;
  updatedAt: string;
}

export interface IBorrow {
  _id: string;
  book: IBook | string;
  quantity: number;
  dueDate: string;
  createdAt: string;
  updatedAt: string;
}

export interface IBorrowSummary {
  book: {
    title: string;
    isbn: string;
  };
  totalQuantity: number;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  meta?: {
    page: number;
    limit: number;
    total: number;
  };
}
