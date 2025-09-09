// src/App.tsx
import { Routes, Route } from "react-router-dom";

import { ThemeProvider } from "./components/ThemeProvider";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ThemeToggle from "./components/ThemeToggle";

import BooksPage from "./pages/BooksPage";
import CreateBookPage from "./pages/CreateBookPage";
import EditBookPage from "./pages/EditBookPage";
import BookDetailsPage from "./pages/BookDetailsPage";
import BorrowPage from "./pages/BorrowPage";
import BorrowSummaryPage from "./pages/BorrowSummaryPage";

function App() {
  return (
    <ThemeProvider>
      <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
        <Navbar>
          {/* Theme toggle inside navbar */}
          <ThemeToggle />
        </Navbar>
        <main className="flex-grow container mx-auto p-4 sm:p-6 lg:p-8">
          <Routes>
            <Route path="/" element={<BooksPage />} />
            <Route path="/books" element={<BooksPage />} />
            <Route path="/create-book" element={<CreateBookPage />} />
            <Route path="/edit-book/:id" element={<EditBookPage />} />
            <Route path="/books/:id" element={<BookDetailsPage />} />
            <Route path="/borrow/:bookId" element={<BorrowPage />} />
            <Route path="/borrow-summary" element={<BorrowSummaryPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;
