import { useGetBooksQuery } from "../api/booksApi";
import BookCard from "../components/BookCard";
import { Link, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "../components/ui/button";

function BooksPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get("page") || "1", 10);
  const limit = 9; // Set to 9 cards per page
  const { data, error, isLoading } = useGetBooksQuery({
    page: Number(page.toString()),
    limit: Number(limit.toString()),
  });

  // Debug: Console log to inspect data
  console.log("BooksPage data:", data);

  if (isLoading) return <div className="text-center text-xl text-gray-700 dark:text-gray-300">Loading...</div>;
  if (error) return <div className="text-center text-red-500">Error loading books: {JSON.stringify(error)}</div>;

  const books = data?.books || [];
  const totalPages = Math.ceil((data?.meta?.total || 0) / limit);

  const handlePageChange = (newPage: number) => {
    setSearchParams({ page: newPage.toString() });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className=""
    >

      <Button
        asChild
        className="mb-8 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300"
      >
        <Link to="/create-book">Add New Book</Link>
      </Button>
      {books.length === 0 ? (
        <div className="text-center text-gray-500 dark:text-gray-400 text-lg">
          No books available
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {books.map((book) => (
            <BookCard key={book._id} book={book} />
          ))}
        </div>
      )}
      {totalPages > 1 && (
        <div className="mt-10 flex justify-center items-center space-x-2">
          <Button
            onClick={() => handlePageChange(page - 1)}
            disabled={page === 1}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg disabled:bg-gray-300 dark:disabled:bg-gray-600 disabled:cursor-not-allowed hover:bg-indigo-700 transition duration-300"
          >
            Previous
          </Button>
          <div className="flex space-x-1">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
              <Button
                key={pageNum}
                onClick={() => handlePageChange(pageNum)}
                className={`px-4 py-2 rounded-lg ${
                  pageNum === page
                    ? "bg-indigo-700 text-white"
                    : "bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-200 hover:bg-indigo-600 hover:text-white"
                } transition duration-300`}
              >
                {pageNum}
              </Button>
            ))}
          </div>
          <Button
            onClick={() => handlePageChange(page + 1)}
            disabled={page === totalPages}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg disabled:bg-gray-300 dark:disabled:bg-gray-600 disabled:cursor-not-allowed hover:bg-indigo-700 transition duration-300"
          >
            Next
          </Button>
        </div>
      )}
    </motion.div>
  );
}

export default BooksPage;