import { useParams } from "react-router-dom";
import { useGetBookQuery } from "../api/booksApi";
import BorrowForm from "../components/BorrowForm";
import { motion } from "framer-motion";
import { useCreateBorrowMutation } from "../api/borrowApi";
import { IBook } from "../types";

function BorrowPage() {
  const { bookId } = useParams<{ bookId: string }>();
  const { data, error, isLoading } = useGetBookQuery(bookId!);
  const [createBorrow] = useCreateBorrowMutation();

  const handleSubmit = async (data: Partial<IBook>) => {
    await createBorrow(data).unwrap();
  };

  if (isLoading) return <div className="text-center text-xl">Loading...</div>;
  if (error) return <div className="text-center text-red-500">Error loading book</div>;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto p-4"
    >
      <h2 className="text-3xl font-bold mb-6 text-center">Borrow Book: {data?.data.title}</h2>
      <BorrowForm bookId={bookId!} maxCopies={data?.data.copies || 0} onSubmit={handleSubmit} />
    </motion.div>
  );
}

export default BorrowPage;
