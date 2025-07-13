import { NavLink } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import { motion } from "framer-motion";
import { Button } from "./ui/button";

function Navbar() {
  return (
    <motion.nav
      className="bg-primary-light dark:bg-primary-dark text-white p-4"
      initial={{ y: -50 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">Library Management</h1>
        <div className="flex items-center space-x-4">
          <NavLink
            to="/books"
            className={({ isActive }) =>
              isActive
                ? "text-yellow-400 font-semibold"
                : "hover:text-gray-300"
            }
          >
            All Books
          </NavLink>
          <NavLink
            to="/create-book"
            className={({ isActive }) =>
              isActive
                ? "text-yellow-400 font-semibold"
                : "hover:text-gray-300"
            }
          >
            Add Book
          </NavLink>
          <NavLink
            to="/borrow-summary"
            className={({ isActive }) =>
              isActive
                ? "text-yellow-400 font-semibold"
                : "hover:text-gray-300"
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
