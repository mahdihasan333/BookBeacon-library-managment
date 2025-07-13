import { useState, FormEvent } from "react";
import { IBook } from "../types";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { toast } from "./ui/toast";
import { motion } from "framer-motion";

interface BookFormProps {
  initialData?: IBook;
  onSubmit: (data: Partial<IBook>) => Promise<void>;
}

function BookForm({ initialData, onSubmit }: BookFormProps) {
  const [formData, setFormData] = useState<Partial<IBook>>(initialData || {
    title: "",
    author: "",
    genre: "FICTION",
    isbn: "",
    description: "",
    copies: 0,
    image: "",
  });
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await onSubmit(formData);
      toast({
        title: "Success",
        description: initialData ? "Book updated successfully" : "Book created successfully",
      });
      navigate("/books");
    } catch (error) {
      toast({
        title: "Error",
        description: initialData ? "Failed to update book" : "Failed to create book",
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
          <CardTitle>{initialData ? "Edit Book" : "Create New Book"}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium">Title</label>
              <Input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Author</label>
              <Input
                type="text"
                value={formData.author}
                onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Genre</label>
              <Select
                value={formData.genre}
                onValueChange={(value) => setFormData({ ...formData, genre: value as IBook["genre"] })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select genre" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="FICTION">Fiction</SelectItem>
                  <SelectItem value="NON_FICTION">Non-Fiction</SelectItem>
                  <SelectItem value="SCIENCE">Science</SelectItem>
                  <SelectItem value="HISTORY">History</SelectItem>
                  <SelectItem value="BIOGRAPHY">Biography</SelectItem>
                  <SelectItem value="FANTASY">Fantasy</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium">ISBN</label>
              <Input
                type="text"
                value={formData.isbn}
                onChange={(e) => setFormData({ ...formData, isbn: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Description</label>
              <Input
                type="text"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Copies</label>
              <Input
                type="number"
                value={formData.copies}
                onChange={(e) => setFormData({ ...formData, copies: Number(e.target.value) })}
                min="0"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Image URL</label>
              <Input
                type="text"
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              />
            </div>
            <Button type="submit" className="w-full">
              {initialData ? "Update Book" : "Create Book"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export default BookForm;
