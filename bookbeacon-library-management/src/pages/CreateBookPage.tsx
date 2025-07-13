import BookForm from "../components/BookForm";
import { useCreateBookMutation } from "../api/booksApi";
import { motion } from "framer-motion";

function CreateBookPage() {
  const [createBook] = useCreateBookMutation();

  const handleSubmit = async (data: Partial<IBook>) => {
    await createBook(data).unwrap();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto p-4"
    >
      <h2 className="text-3xl font-bold mb-6 text-center">Create New Book</h2>
      <BookForm onSubmit={handleSubmit} />
    </motion.div>
  );
}

export default CreateBookPage;
