import { useGetBooksQuery } from "../api/booksApi";
import BookCard from "../components/BookCard";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "../components/ui/button";

function BooksPage() {
  const { data, error, isLoading } = useGetBooksQuery({});

  // Debug: Console log to inspect data
  console.log("BooksPage data:", data);

  if (isLoading) return <div className="text-center text-xl">Loading...</div>;
  if (error) return <div className="text-center text-red-500">Error loading books: {JSON.stringify(error)}</div>;

  // Fallback to empty array if data?.data is undefined
  const books = data?.books || [];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto p-4"
    >
      <h2 className="text-3xl font-bold mb-6 text-center">All Books</h2>
      <Button asChild className="mb-6">
        <Link to="/create-book">Add New Book</Link>
      </Button>
      {books.length === 0 ? (
        <div className="text-center text-gray-500">No books available</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {books.map((book) => (
            <BookCard key={book._id} book={book} />
          ))}
        </div>
      )}
    </motion.div>
  );
}

export default BooksPage;
