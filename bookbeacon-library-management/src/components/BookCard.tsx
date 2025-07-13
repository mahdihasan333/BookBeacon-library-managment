import { Link } from "react-router-dom";
import { IBook } from "../types";
import { useState } from "react";
import { useDeleteBookMutation } from "../api/booksApi";
import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { toast } from "./hooks/use-toast";

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
      transition={{ duration: 0.3 }}
      whileHover={{ scale: 1.05, boxShadow: "0 8px 16px rgba(0,0,0,0.1)" }}
    >
      <Card className="bg-card-light dark:bg-card-dark">
        <CardHeader>
          {book.image && (
            <img
              src={book.image}
              alt={book.title}
              className="w-full h-48 object-cover rounded-md"
            />
          )}
          <CardTitle>{book.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-600 dark:text-gray-300">Author: {book.author}</p>
          <p className="text-sm text-gray-600 dark:text-gray-300">Genre: {book.genre}</p>
          <p className="text-sm text-gray-600 dark:text-gray-300">ISBN: {book.isbn}</p>
          <p className="text-sm text-gray-600 dark:text-gray-300">Copies: {book.copies}</p>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Available: {book.available ? "Yes" : "No"}
          </p>
        </CardContent>
        <CardFooter className="flex gap-2">
          <Button asChild variant="outline">
            <Link to={`/edit-book/${book._id}`}>Edit</Link>
          </Button>
          <Button asChild variant="outline">
            <Link to={`/books/${book._id}`}>View</Link>
          </Button>
          <Button asChild variant="outline">
            <Link to={`/borrow/${book._id}`}>Borrow</Link>
          </Button>
          <Button
            variant="destructive"
            onClick={() => setOpenDialog(true)}
            disabled={isDeleting}
          >
            Delete
          </Button>
        </CardFooter>
      </Card>
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete "{book.title}"?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpenDialog(false)}>
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
