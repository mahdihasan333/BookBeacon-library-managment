import { useParams, Link } from "react-router-dom";
import { useGetBookQuery } from "../api/booksApi";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { ArrowLeft } from "lucide-react";

function BookDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const { data, error, isLoading } = useGetBookQuery(id!);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-white dark:bg-gray-900">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="h-12 w-12 border-4 border-t-blue-500 dark:border-t-blue-400 border-gray-300 dark:border-gray-600 rounded-full"
        />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col justify-center items-center h-screen bg-white dark:bg-gray-900 text-center">
        <p className="text-red-500 dark:text-red-400 text-xl mb-4">Could not load book details.</p>
        <Link to="/books">
          <Button
            variant="outline"
            className="flex items-center space-x-2 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-800 transition-colors duration-300"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>Back to Books</span>
          </Button>
        </Link>
      </div>
    );
  }

  const book = data?.data;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="container mx-auto p-4 sm:p-6 lg:p-8 bg-white dark:bg-gray-900"
    >
      <Link to="/books">
        <Button
          variant="outline"
          className="mb-6 flex items-center space-x-2 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-800 transition-colors duration-300"
        >
          <ArrowLeft className="h-5 w-5" />
          <span>Back to Books</span>
        </Button>
      </Link>

      <Card className="max-w-6xl mx-auto bg-gradient-to-br from-white to-gray-100 dark:from-gray-800 dark:to-gray-900 shadow-xl rounded-xl overflow-hidden">
        <CardHeader className="bg-blue-600 dark:bg-blue-800 text-white p-8">
          <CardTitle className="text-3xl font-bold tracking-tight">{book?.title || "N/A"}</CardTitle>
        </CardHeader>
        <CardContent className="p-8">
          {book?.image ? (
            <motion.img
              src={book.image}
              alt={book.title}
              className="w-full h-96 object-cover rounded-lg mb-8 shadow-md"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            />
          ) : (
            <div className="w-full h-96 bg-gray-200 dark:bg-gray-700 rounded-lg mb-8 flex items-center justify-center text-gray-500 dark:text-gray-400 text-lg">
              No Image Available
            </div>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700 dark:text-gray-200">
            <div className="space-y-4">
              <p>
                <strong className="font-semibold text-lg">Author:</strong> {book?.author || "N/A"}
              </p>
              <p>
                <strong className="font-semibold text-lg">Genre:</strong> {book?.genre || "N/A"}
              </p>
              <p>
                <strong className="font-semibold text-lg">ISBN:</strong> {book?.isbn || "N/A"}
              </p>
            </div>
            <div className="space-y-4">
              <p>
                <strong className="font-semibold text-lg">Description:</strong>{" "}
                {book?.description || "N/A"}
              </p>
              <p>
                <strong className="font-semibold text-lg">Copies:</strong> {book?.copies || "N/A"}
              </p>
              <p>
                <strong className="font-semibold text-lg">Available:</strong>{" "}
                <span
                  className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                    book?.available
                      ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                      : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                  }`}
                >
                  {book?.available ? "Yes" : "No"}
                </span>
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export default BookDetailsPage;