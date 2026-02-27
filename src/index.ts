import express from "express";
import dotenv from "dotenv";
dotenv.config();
import connectDB from "./config/db";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRouter from "./modules/user/user.router";

const app = express();
const PORT = process.env.PORT || 3000;

connectDB();

app.use(
  cors({
    origin: ["http://localhost:5173", "https://garment-627fe.web.app"],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/users", userRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});