import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import ThemeToggle from "./ThemeToggle";

function Navbar() {
  return (
    <motion.nav
      className="bg-gradient-to-r from-blue-500 to-blue-700 dark:from-gray-800 dark:to-gray-900 text-white p-4 shadow-lg"
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-extrabold tracking-tight">
          BookBeacon
        </h1>
        <div className="flex items-center space-x-6">
          <NavLink
            to="/books"
            className={({ isActive }) =>
              `text-lg font-medium transition-colors duration-300 ${
                isActive
                  ? "text-yellow-300 border-b-2 border-yellow-300"
                  : "text-white hover:text-yellow-200"
              }`
            }
          >
            All Books
          </NavLink>
          <NavLink
            to="/create-book"
            className={({ isActive }) =>
              `text-lg font-medium transition-colors duration-300 ${
                isActive
                  ? "text-yellow-300 border-b-2 border-yellow-300"
                  : "text-white hover:text-yellow-200"
              }`
            }
          >
            Add Book
          </NavLink>
          <NavLink
            to="/borrow-summary"
            className={({ isActive }) =>
              `text-lg font-medium transition-colors duration-300 ${
                isActive
                  ? "text-yellow-300 border-b-2 border-yellow-300"
                  : "text-white hover:text-yellow-200"
              }`
            }
          >
            Borrow Summary
          </NavLink>
          <ThemeToggle />
        </div>
      </div>
    </motion.nav>
  );
}

export default Navbar;