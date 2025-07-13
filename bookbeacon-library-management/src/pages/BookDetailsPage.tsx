import { useParams } from "react-router-dom";
import { useGetBookQuery } from "../api/booksApi";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";

function BookDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const { data, error, isLoading } = useGetBookQuery(id!);

  if (isLoading) return <div className="text-center text-xl">Loading...</div>;
  if (error) return <div className="text-center text-red-500">Error loading book</div>;

  const book = data?.data;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto p-4"
    >
      <h2 className="text-3xl font-bold mb-6 text-center">{book?.title}</h2>
      <Card className="max-w-md mx-auto bg-card-light dark:bg-card-dark">
        <CardHeader>
          <CardTitle>{book?.title}</CardTitle>
        </CardHeader>
        <CardContent>
          {book?.image && (
            <img src={book.image} alt={book.title} className="w-full h-64 object-cover rounded-md mb-4" />
          )}
          <p className="text-gray-600 dark:text-gray-300"><strong>Author:</strong> {book?.author}</p>
          <p className="text-gray-600 dark:text-gray-300"><strong>Genre:</strong> {book?.genre}</p>
          <p className="text-gray-600 dark:text-gray-300"><strong>ISBN:</strong> {book?.isbn}</p>
          <p className="text-gray-600 dark:text-gray-300"><strong>Description:</strong> {book?.description || "N/A"}</p>
          <p className="text-gray-600 dark:text-gray-300"><strong>Copies:</strong> {book?.copies}</p>
          <p className="text-gray-600 dark:text-gray-300"><strong>Available:</strong> {book?.available ? "Yes" : "No"}</p>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export default BookDetailsPage;
