import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import BooksPage from "./pages/BooksPage";
import CreateBookPage from "./pages/CreateBookPage";
import EditBookPage from "./pages/EditBookPage";
import BookDetailsPage from "./pages/BookDetailsPage";
import BorrowPage from "./pages/BorrowPage";
import BorrowSummaryPage from "./pages/BorrowSummaryPage";

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow container mx-auto p-4">
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
  );
}

export default App;
