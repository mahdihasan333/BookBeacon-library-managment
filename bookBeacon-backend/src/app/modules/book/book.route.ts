import express from "express";
import { createBook, deleteBook, findAllBooks, findSingleBook, updateBook } from "./book.controller";

const router = express.Router();

router.route("/").get(findAllBooks);
router.route("/:bookId").get(findSingleBook);
router.route("/").post(createBook);
router.route("/:bookId").patch(updateBook);
router.route("/:bookId").delete(deleteBook);

export default router;