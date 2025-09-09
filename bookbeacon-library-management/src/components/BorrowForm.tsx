import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { toast } from "./hooks/use-toast";
import type { IBorrow } from "@/types";
import { useTheme } from "./ThemeProvider"; // <-- theme hook

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
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { theme } = useTheme();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await onSubmit(formData);
      toast({
        title: "Success",
        description: "Book borrowed successfully",
      });
      navigate("/borrow-summary");
    } catch {
      toast({
        title: "Error",
        description: "Failed to borrow book",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="flex items-center justify-center px-4 sm:px-6 lg:px-8 "
    >
      <Card className="w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl bg-white dark:bg-gray-900 shadow-xl rounded-2xl">
        <CardHeader className="border-b border-gray-200 dark:border-gray-700">
          <CardTitle className="text-2xl font-bold text-center text-gray-900 dark:text-gray-100">
            Borrow Book
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6 px-4 sm:px-6">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Quantity */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Quantity
              </label>
              <Input
                type="number"
                min={1}
                max={maxCopies}
                value={formData.quantity}
                onChange={(e) =>
                  setFormData({ ...formData, quantity: Number(e.target.value) })
                }
                required
                placeholder="Enter quantity"
                className="dark:bg-gray-800 dark:text-gray-100 dark:border-gray-600"
              />
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Available copies: <span className="font-semibold">{maxCopies}</span>
              </p>
            </div>

            {/* Due Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Due Date
              </label>
              <Input
                type="date"
                value={formData.dueDate}
                onChange={(e) =>
                  setFormData({ ...formData, dueDate: e.target.value })
                }
                required
                className="dark:bg-gray-800 dark:text-gray-100 dark:border-gray-600"
              />
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={loading}
              className="w-full py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold shadow-md transition-all duration-200"
            >
              {loading ? "Processing..." : "Borrow Book"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export default BorrowForm;
