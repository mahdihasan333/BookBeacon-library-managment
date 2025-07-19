"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const routers_1 = __importDefault(require("./app/modules/routers"));
dotenv_1.default.config();
const app = (0, express_1.default)();
// Middleware
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)({
    origin: [
        "https://bookbeacon-library-management.vercel.app",
        "http://localhost:5173",
    ],
    credentials: true,
}));
// Routes
app.use("/api", routers_1.default);
// Root route
app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Welcome to Book App",
        data: null,
    });
});
exports.default = app;
