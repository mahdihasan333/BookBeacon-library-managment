import { useParams } from "react-router-dom";
import { useGetBookQuery, useGetBooksQuery } from "../api/booksApi";
import { useGetBorrowsQuery, useCreateBorrowMutation } from "../api/borrowApi";
import BorrowForm from "../components/BorrowForm";
import { motion } from "framer-motion";

import { toast } from "../components/hooks/use-toast";

function BorrowPage() {
  const { bookId } = useParams<{ bookId: string }>();
  const { data: bookData, error, isLoading } = useGetBookQuery(bookId!);
  const { refetch: refetchBooks } = useGetBooksQuery({});
  const { refetch: refetchBorrows } = useGetBorrowsQuery();
  const [createBorrow, { isLoading: isCreating }] = useCreateBorrowMutation();

  const handleSubmit = async (data: { quantity: number; dueDate: string }) => {
    if (!bookId) return;

    try {
      await createBorrow({ book: bookId, ...data }).unwrap();
      toast({
        title: "Success",
        description: "Book borrowed successfully",
      });
      // Refetch data to update UI
      await Promise.all([refetchBooks(), refetchBorrows()]);
    } catch (error) {
      Toast({
        title: "Error",
        description: "Failed to borrow book",
        variant: "destructive",
      });
    }
  };

  if (isLoading) return <div className="text-center text-xl">Loading...</div>;
  if (error) return <div className="text-center text-red-500">Error loading book: {JSON.stringify(error)}</div>;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto p-4"
    >
      <h2 className="text-3xl font-bold mb-6 text-center">Borrow Book: {bookData?.data.title}</h2>
      <BorrowForm
        bookId={bookId!}
        maxCopies={bookData?.data.copies || 0}
        onSubmit={handleSubmit}
        isLoading={isCreating}
      />
    </motion.div>
  );
}

export default BorrowPage;
