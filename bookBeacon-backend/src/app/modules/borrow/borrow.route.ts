import express from "express";
import { createBorrow, deleteBorrow, findAllBorrows, findSingleBorrow, updateBorrow } from "./borrow.controller";

const router = express.Router();

router.route("/").get(findAllBorrows);
router.route("/:borrowId").get(findSingleBorrow);
router.route("/").post(createBorrow);
router.route("/:borrowId").patch(updateBorrow);
router.route("/:borrowId").delete(deleteBorrow);

export default router;
