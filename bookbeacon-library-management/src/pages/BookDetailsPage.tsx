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
      <div className="flex justify-center items-center min-h-screen bg-gray-50 dark:bg-gray-900">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="h-12 w-12 border-4 border-t-indigo-500 dark:border-t-indigo-400 border-gray-300 dark:border-gray-700 rounded-full"
        />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen bg-gray-50 dark:bg-gray-900 text-center px-4">
        <p className="text-red-500 dark:text-red-400 text-xl mb-4">
          Could not load book details.
        </p>
        <Link to="/books">
          <Button
            variant="outline"
            className="flex items-center space-x-2 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100 dark:hover:bg-indigo-800 transition-colors duration-300"
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
      className="min-h-screen bg-gray-50 dark:bg-gray-900 py-10 px-4 sm:px-6 lg:px-8"
    >
      {/* Back Button */}
      <div className="mb-6">
        <Link to="/books">
          <Button
            variant="outline"
            className="flex items-center space-x-2 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100 dark:hover:bg-indigo-800 transition-colors duration-300"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>Back to Books</span>
          </Button>
        </Link>
      </div>

      {/* Book Details Card */}
      <Card className="max-w-4xl mx-auto bg-white dark:bg-gray-800 shadow-2xl rounded-3xl overflow-hidden">
        <div className="md:flex">
          {/* Left: Image */}
          <motion.div className="md:w-1/2">
            {book?.image ? (
              <motion.img
                src={book.image}
                alt={book.title}
                className="w-full h-80 sm:h-full object-cover"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              />
            ) : (
              <div className="w-full h-80 sm:h-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-500 dark:text-gray-300 text-lg font-medium">
                No Image Available
              </div>
            )}
          </motion.div>

          {/* Right: Details */}
          <CardContent className="md:w-1/2 p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <CardTitle className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                {book?.title || "N/A"}
              </CardTitle>
              <div className="space-y-3 text-gray-700 dark:text-gray-300">
                <p>
                  <span className="font-semibold">Author:</span> {book?.author || "N/A"}
                </p>
                <p>
                  <span className="font-semibold">Genre:</span> {book?.genre || "N/A"}
                </p>
                <p>
                  <span className="font-semibold">ISBN:</span> {book?.isbn || "N/A"}
                </p>
                <p>
                  <span className="font-semibold">Description:</span> {book?.description || "N/A"}
                </p>
                <p>
                  <span className="font-semibold">Copies:</span> {book?.copies || "N/A"}
                </p>
                <p>
                  <span className="font-semibold">Available:</span>{" "}
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

            {/* Borrow Button */}
            <div className="mt-6 flex justify-center md:justify-start">
              <Link to={`/borrow/${book?._id}`}>
                <Button className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-6 rounded-xl shadow-md transition duration-300">
                  Borrow Book
                </Button>
              </Link>
            </div>
          </CardContent>
        </div>
      </Card>
    </motion.div>
  );
}

export default BookDetailsPage;
