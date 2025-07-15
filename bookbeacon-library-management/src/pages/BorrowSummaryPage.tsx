import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { useGetBorrowsQuery } from "../api/borrowApi";

function BorrowSummaryPage() {
  const { data, error, isLoading } = useGetBorrowsQuery();

  if (isLoading) return <div className="text-center text-xl">Loading...</div>;
  if (error) return <div className="text-center text-red-500">Error loading borrow summary</div>;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto p-4"
    >
      <h2 className="text-3xl font-bold mb-6 text-center">Borrow Summary</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {data?.data.map((borrow, index) => (
          <motion.div
            key={borrow.book.isbn}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <Card className="bg-card-light dark:bg-card-dark">
              <CardHeader>
                <CardTitle>{borrow.book.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 dark:text-gray-300">ISBN: {borrow.book.isbn}</p>
                <p className="text-sm text-gray-600 dark:text-gray-300">Total Quantity Borrowed: {borrow.totalQuantity}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

export default BorrowSummaryPage;