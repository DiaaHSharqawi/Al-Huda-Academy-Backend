import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import multer from "multer";
import mongoose from "mongoose";
import logger from "./config/logger.js";

import authRoutes from "./src/api/v1/routes/authRoutes/authRoutes.js";

// Load env variables from .env file
dotenv.config();

const app = express();

// Cors policy
app.use(cors());

// Parse JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Authentication route
app.use("/api/auth", authRoutes);

// Running Server
const PORT_NUMBER = process.env.PORT_NUMBER;
app.listen(PORT_NUMBER, () => {
  logger.info(`Server is running on port ${PORT_NUMBER} `);
});

// Mongo configurations
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => logger.info(`MongoDB connected ${process.env.MONGODB_URL}`))
  .catch((err) => logger.error("MongoDB connection error:", err));
