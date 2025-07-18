"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const book_controller_1 = require("./book.controller");
const router = express_1.default.Router();
router.route("/").get(book_controller_1.findAllBooks);
router.route("/:bookId").get(book_controller_1.findSingleBook);
router.route("/").post(book_controller_1.createBook);
router.route("/:bookId").patch(book_controller_1.updateBook);
router.route("/:bookId").delete(book_controller_1.deleteBook);
exports.default = router;
