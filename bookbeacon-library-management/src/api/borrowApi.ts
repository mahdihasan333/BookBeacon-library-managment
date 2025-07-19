import type { ApiResponse, IBorrow, IBorrowSummary } from "@/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const borrowsApi = createApi({
  reducerPath: "borrowsApi",
  baseQuery: fetchBaseQuery({
  baseUrl: process.env.REACT_APP_API_URL || "https://book-beacon-backend.vercel.app/api",
}),
  tagTypes: ["Borrows", "Books"],
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