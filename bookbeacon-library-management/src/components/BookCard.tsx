import { Link } from "react-router-dom";
import { useState } from "react";
import { useDeleteBookMutation } from "../api/booksApi";
import { motion } from "framer-motion";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { toast } from "./hooks/use-toast";
import type { IBook } from "@/types";

interface BookCardProps {
  book: IBook;
}

function BookCard({ book }: BookCardProps) {
  const [deleteBook, { isLoading: isDeleting }] = useDeleteBookMutation();
  const [openDialog, setOpenDialog] = useState(false);

  const handleDelete = async () => {
    try {
      await deleteBook(book._id).unwrap();
      toast({
        title: "Success",
        description: "Book deleted successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete book",
        variant: "destructive",
      });
    }
    setOpenDialog(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 shadow-md hover:shadow-lg transition-all duration-300">
        {/* Header */}
        <CardHeader>
          {book.image && (
            <img
              src={book.image}
              alt={book.title}
              className="w-full h-48 object-cover rounded-md"
            />
          )}
          <CardTitle className="mt-2 text-lg font-semibold text-gray-900 dark:text-gray-100">
            {book.title}
          </CardTitle>
        </CardHeader>

        {/* Content */}
        <CardContent className="space-y-1">
          <p className="text-sm text-gray-700 dark:text-gray-300">
            <span className="font-medium">Author:</span> {book.author}
          </p>
          <p className="text-sm text-gray-700 dark:text-gray-300">
            <span className="font-medium">Genre:</span> {book.genre}
          </p>
          <p className="text-sm text-gray-700 dark:text-gray-300">
            <span className="font-medium">ISBN:</span> {book.isbn}
          </p>
          <p className="text-sm text-gray-700 dark:text-gray-300">
            <span className="font-medium">Copies:</span> {book.copies}
          </p>
          <p className="text-sm text-gray-700 dark:text-gray-300">
            <span className="font-medium">Available:</span>{" "}
            {book.available ? "Yes ✅" : "No ❌"}
          </p>
        </CardContent>

        {/* Footer */}
        <CardFooter className="flex flex-wrap gap-2">
          <Button asChild variant="outline" className="flex-1">
            <Link to={`/edit-book/${book._id}`}>Edit</Link>
          </Button>
          <Button asChild variant="outline" className="flex-1">
            <Link to={`/books/${book._id}`}>View</Link>
          </Button>
          <Button asChild variant="outline" className="flex-1">
            <Link to={`/borrow/${book._id}`}>Borrow</Link>
          </Button>
          <Button
            variant="destructive"
            className="flex-1"
            onClick={() => setOpenDialog(true)}
            disabled={isDeleting}
          >
            Delete
          </Button>
        </CardFooter>
      </Card>

      {/* Confirm Delete Dialog */}
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700">
          <DialogHeader>
            <DialogTitle className="text-gray-900 dark:text-gray-100">
              Confirm Deletion
            </DialogTitle>
            <DialogDescription className="text-gray-700 dark:text-gray-300">
              Are you sure you want to delete{" "}
              <span className="font-semibold">"{book.title}"</span>?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setOpenDialog(false)}
              className="mr-2"
            >
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Confirm
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </motion.div>
  );
}

export default BookCard;
