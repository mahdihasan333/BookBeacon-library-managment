import { useState } from "react";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { Menu, X, Sun, Moon } from "lucide-react";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleTheme = () => setDarkMode(!darkMode);

  const navLinks = [
    { to: "/books", label: "All Books" },
    { to: "/create-book", label: "Add Book" },
    { to: "/borrow-summary", label: "Borrow Summary" },
  ];

  return (
    <motion.nav
      className={`${
        darkMode
          ? "bg-gray-900 text-white"
          : "bg-gradient-to-r from-blue-500 to-blue-700 text-white"
      } p-4 shadow-lg sticky top-0 z-50`}
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <h1 className="text-2xl font-extrabold tracking-tight">BookBeacon</h1>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-6">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `text-lg font-medium transition-colors duration-300 ${
                  isActive
                    ? "text-yellow-300 border-b-2 border-yellow-300"
                    : "hover:text-yellow-200"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="ml-4 p-2 rounded-md hover:bg-white/20 transition-colors duration-300"
            aria-label="Toggle Theme"
          >
            {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center md:hidden">
          {/* Theme Toggle for Mobile */}
          <button
            onClick={toggleTheme}
            className="mr-2 p-2 rounded-md hover:bg-white/20 transition-colors duration-300"
            aria-label="Toggle Theme"
          >
            {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>

          <button
            className="focus:outline-none"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <motion.div
          className={`md:hidden p-4 mt-2 rounded-b-lg shadow-lg ${
            darkMode ? "bg-gray-800 text-white" : "bg-blue-600 text-white"
          }`}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          <div className="flex flex-col space-y-4">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `text-lg font-medium transition-colors duration-300 ${
                    isActive
                      ? "text-yellow-300 border-l-4 border-yellow-300 pl-2"
                      : "hover:text-yellow-200"
                  }`
                }
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </NavLink>
            ))}
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
}

export default Navbar;
