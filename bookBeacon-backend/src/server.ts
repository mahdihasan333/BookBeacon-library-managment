import dotenv from "dotenv";
import { Server } from "http";
import mongoose from "mongoose";
import app from "./app";

dotenv.config();

let server: Server;

const PORT = process.env.PORT || 5000;

async function main() {
  try {
    if (!process.env.DATABASE_URL) {
      throw new Error("DATABASE_URL is not defined in .env file");
    }

    await mongoose.connect(process.env.DATABASE_URL, {
      dbName: "bookBeacon",
    });
    console.log("Connected to MongoDB Using Mongoose!");

    server = app.listen(PORT, () => {
      console.log(`App is listening on port ${PORT}`);
    });

    server.on("error", (error) => {
      console.error("Server error:", error);
      process.exit(1);
    });
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
    process.exit(1);
  }

  process.on("SIGTERM", () => {
    console.log("SIGTERM received. Shutting down gracefully...");
    server.close(() => {
      mongoose.connection.close();
      process.exit(0);
    });
  });
}

main();