"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const app_1 = __importDefault(require("./app"));
dotenv_1.default.config();
let server;
const PORT = process.env.PORT || 5000;
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (!process.env.DATABASE_URL) {
                throw new Error("DATABASE_URL is not defined in .env file");
            }
            yield mongoose_1.default.connect(process.env.DATABASE_URL, {
                dbName: "bookBeacon",
            });
            console.log("Connected to MongoDB Using Mongoose!");
            server = app_1.default.listen(PORT, () => {
                console.log(`App is listening on port ${PORT}`);
            });
            server.on("error", (error) => {
                console.error("Server error:", error);
                process.exit(1);
            });
        }
        catch (error) {
            console.error("Failed to connect to MongoDB:", error);
            process.exit(1);
        }
        process.on("SIGTERM", () => {
            console.log("SIGTERM received. Shutting down gracefully...");
            server.close(() => {
                mongoose_1.default.connection.close();
                process.exit(0);
            });
        });
    });
}
main();
