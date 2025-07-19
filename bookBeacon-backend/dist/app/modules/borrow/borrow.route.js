"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const borrow_controller_1 = require("./borrow.controller");
const router = express_1.default.Router();
router.route("/").get(borrow_controller_1.findAllBorrows);
router.route("/:borrowId").get(borrow_controller_1.findSingleBorrow);
router.route("/").post(borrow_controller_1.createBorrow);
router.route("/:borrowId").patch(borrow_controller_1.updateBorrow);
router.route("/:borrowId").delete(borrow_controller_1.deleteBorrow);
exports.default = router;
