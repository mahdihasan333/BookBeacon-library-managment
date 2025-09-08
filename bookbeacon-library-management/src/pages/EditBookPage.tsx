import { useParams } from "react-router-dom";
import { useGetBookQuery, useUpdateBookMutation } from "../api/booksApi";
import BookForm from "../components/BookForm";
import { motion } from "framer-motion";
import type { IBook } from "@/types";

function EditBookPage() {
  const { id } = useParams<{ id: string }>();
  const { data, error, isLoading } = useGetBookQuery(id!);
  const [updateBook] = useUpdateBookMutation();

  const handleSubmit = async (data: Partial<IBook>) => {
    await updateBook({ id: id!, data }).unwrap();
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
      <h2 className="text-3xl font-bold mb-6 text-center">Edit Book</h2>
      {data?.data && <BookForm initialData={data.data} onSubmit={handleSubmit} />}
    </motion.div>
  );
}

export default EditBookPage;