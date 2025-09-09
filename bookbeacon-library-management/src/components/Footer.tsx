import { motion } from "framer-motion";

function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="backdrop-blur-lg bg-card-light/70 dark:bg-card-dark/40 border-t border-border-light dark:border-border-dark shadow-inner mt-10"
    >
      <div className="max-w-6xl mx-auto px-4 py-6 flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Left Text */}
        <p className="text-sm text-foreground-light dark:text-foreground-dark">
          © {new Date().getFullYear()}{" "}
          <span className="font-semibold">BookBeacon Library</span>. All rights
          reserved.
        </p>

        {/* Links */}
        <div className="flex gap-4 text-sm text-muted-light dark:text-muted-dark">
          <a
            href="#privacy"
            className="hover:text-primary-light dark:hover:text-primary-dark transition-colors duration-200"
          >
            Privacy Policy
          </a>
          <a
            href="#terms"
            className="hover:text-primary-light dark:hover:text-primary-dark transition-colors duration-200"
          >
            Terms of Service
          </a>
          <a
            href="#contact"
            className="hover:text-primary-light dark:hover:text-primary-dark transition-colors duration-200"
          >
            Contact
          </a>
        </div>
      </div>
    </motion.footer>
  );
}

export default Footer;
