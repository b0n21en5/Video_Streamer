import express from "express";
import authRoutes from "./routes/authRoutes.js";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

// rest objects
const app = express();

// configure env
dotenv.config();

// es-module fix
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// middlewares
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "./client/build")));

// routes
app.use("/api/v1/auth", authRoutes);

// PORT
const PORT = process.env.PORT || 8080;

// database config
mongoose.connect(process.env.MONGO_URL);

mongoose.connection.on("connected", () => {});

// app listen
app.listen(PORT, () => {});
