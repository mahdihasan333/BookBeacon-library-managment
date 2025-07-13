import { useState, FormEvent } from "react";
import { IBorrow } from "../types";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { motion } from "framer-motion";
import { toast } from "./hooks/use-toast";

interface BorrowFormProps {
  bookId: string;
  maxCopies: number;
  onSubmit: (data: Partial<IBorrow>) => Promise<void>;
}

function BorrowForm({ bookId, maxCopies, onSubmit }: BorrowFormProps) {
  const [formData, setFormData] = useState<Partial<IBorrow>>({
    book: bookId,
    quantity: 1,
    dueDate: "",
  });
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await onSubmit(formData);
      toast({
        title: "Success",
        description: "Book borrowed successfully",
      });
      navigate("/borrow-summary");
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to borrow book",
        variant: "destructive",
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="max-w-lg mx-auto bg-card-light dark:bg-card-dark">
        <CardHeader>
          <CardTitle>Borrow Book</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium">Quantity</label>
              <Input
                type="number"
                value={formData.quantity}
                onChange={(e) => setFormData({ ...formData, quantity: Number(e.target.value) })}
                min="1"
                max={maxCopies}
                required
              />
              <p className="text-sm text-gray-500 dark:text-gray-400">Available copies: {maxCopies}</p>
            </div>
            <div>
              <label className="block text-sm font-medium">Due Date</label>
              <Input
                type="date"
                value={formData.dueDate}
                onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                required
              />
            </div>
            <Button type="submit" className="w-full">
              Borrow Book
            </Button>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export default BorrowForm;
