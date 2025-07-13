import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ApiResponse, IBook } from "../types";

export const booksApi = createApi({
  reducerPath: "booksApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api" }),
  tagTypes: ["Books"],
  endpoints: (builder) => ({
    getBooks: builder.query<
      ApiResponse<IBook[]>,
      { page?: number; limit?: number; filter?: string; sortBy?: string; sort?: string }
    >({
      query: ({ page = 1, limit = 6, filter, sortBy = "createdAt", sort = "desc" }) => ({
        url: "/books",
        params: { page, limit, filter, sortBy, sort },
      }),
      providesTags: ["Books"],
    }),
    getBook: builder.query<ApiResponse<IBook>, string>({
      query: (bookId) => `/books/${bookId}`,
      providesTags: ["Books"],
    }),
    createBook: builder.mutation<ApiResponse<IBook>, Partial<IBook>>({
      query: (data) => ({
        url: "/books",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Books"],
    }),
    updateBook: builder.mutation<ApiResponse<IBook>, { id: string; data: Partial<IBook> }>({
      query: ({ id, data }) => ({
        url: `/books/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Books"],
    }),
    deleteBook: builder.mutation<ApiResponse<null>, string>({
      query: (bookId) => ({
        url: `/books/${bookId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Books"],
    }),
  }),
});

export const {
  useGetBooksQuery,
  useGetBookQuery,
  useCreateBookMutation,
  useUpdateBookMutation,
  useDeleteBookMutation,
} = booksApi;
