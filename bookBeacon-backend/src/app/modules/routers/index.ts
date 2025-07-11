import express from "express";
import bookRouter from "../book/book.route";
import borrowRouter from '../borrow/borrow.route'

const router = express.Router();
router.use("/books", bookRouter);
router.use("/borrow", borrowRouter);

export default router;