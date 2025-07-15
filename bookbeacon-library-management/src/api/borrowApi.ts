import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ApiResponse, IBorrow, IBorrowSummary } from "../types";

export const borrowsApi = createApi({
  reducerPath: "borrowsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api" }),
  tagTypes: ["Borrows"],
  endpoints: (builder) => ({
    getBorrows: builder.query<ApiResponse<IBorrowSummary[]>, void>({
      query: () => "/borrow",
      providesTags: ["Borrows"],
    }),
    getBorrow: builder.query<ApiResponse<IBorrow>, string>({
      query: (borrowId) => `/borrow/${borrowId}`,
      providesTags: ["Borrows"],
    }),
    createBorrow: builder.mutation<ApiResponse<IBorrow>, Partial<IBorrow>>({
      query: (data) => ({
        url: "/borrow",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Borrows", "Books"],
    }),
    updateBorrow: builder.mutation<ApiResponse<IBorrow>, { id: string; data: Partial<IBorrow> }>({
      query: ({ id, data }) => ({
        url: `/borrow/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Borrows", "Books"],
    }),
    deleteBorrow: builder.mutation<ApiResponse<null>, string>({
      query: (borrowId) => ({
        url: `/borrow/${borrowId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Borrows", "Books"],
    }),
  }),
});

export const {
  useGetBorrowsQuery,
  useGetBorrowQuery,
  useCreateBorrowMutation,
  useUpdateBorrowMutation,
  useDeleteBorrowMutation,
} = borrowsApi;