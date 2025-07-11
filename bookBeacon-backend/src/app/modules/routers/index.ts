import express from "express";
import bookRouter from "../book/book.route";

const router = express.Router();
router.use("/books", bookRouter);

export default router;