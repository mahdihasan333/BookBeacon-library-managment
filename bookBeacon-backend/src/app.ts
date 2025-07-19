import express, { Application, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import router from "./app/modules/routers";

dotenv.config();

const app: Application = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: [
      "https://bookbeacon-library-management.vercel.app",
      "http://localhost:5173",
    ],
    credentials: true,
  })
);

// Routes
app.use("/api", router);

// Root route
app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "Welcome to Book App",
    data: null,
  });
});

export default app;