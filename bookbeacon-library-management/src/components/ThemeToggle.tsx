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
      className="flex items-center space-x-2"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      <Sun className="h-5 w-5 text-yellow-400" />
      <Switch checked={isDark} onCheckedChange={setIsDark} />
      <Moon className="h-5 w-5 text-gray-800 dark:text-gray-300" />
    </motion.div>
  );
}

export default ThemeToggle;
