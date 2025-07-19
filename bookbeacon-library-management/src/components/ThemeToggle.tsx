import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Switch } from "./ui/switch";
import { Sun, Moon } from "lucide-react";

function ThemeToggle() {
  const [isDark, setIsDark] = useState(() => localStorage.getItem("theme") === "dark");

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  return (
    <motion.div
      className="flex items-center space-x-2 rounded-full bg-gray-100 dark:bg-gray-800 p-2 shadow-md"
      whileHover={{ scale: 1.05, boxShadow: "0 0 8px rgba(0,0,0,0.2)" }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <Sun className="h-5 w-5 text-yellow-500 dark:text-yellow-400 transition-colors duration-300" />
      <Switch
        checked={isDark}
        onCheckedChange={setIsDark}
        className="data-[state=checked]:bg-blue-600 data-[state=unchecked]:bg-gray-300"
      />
      <Moon className="h-5 w-5 text-gray-600 dark:text-gray-200 transition-colors duration-300" />
    </motion.div>
  );
}

export default ThemeToggle;