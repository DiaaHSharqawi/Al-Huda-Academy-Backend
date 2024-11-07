import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import i18next from "i18next";
import Backend from "i18next-fs-backend";
import i18nextHttpMiddleware from "i18next-http-middleware";

import authRoutes from "./src/api/v1/routes/authRoutes/authRoutes.js";
import uploadFilesRoutes from "./src/api/v1/routes/uploadFilesRoutes/uploadFilesRoutes.js";
import athkarRoutes from "./src/api/v1/routes/athkarRoutes/athkarRoutes.js";

// Load env variables from .env file
dotenv.config();

// i18next configuration
i18next
  .use(Backend)
  .use(i18nextHttpMiddleware.LanguageDetector)
  .init({
    fallbackLng: "en",
    backend: {
      loadPath: "./src/api/v1/localization/{{lng}}/translation.json",
    },
    lng: "en",
  });

const app = express();

// Use i18next middleware
app.use(i18nextHttpMiddleware.handle(i18next));

// Cors policy
app.use(cors());

// Parse JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Authentication route
app.use("/api/auth", authRoutes);

// Cloudinary route
app.use("/api/uploadFile", uploadFilesRoutes);

// Athkar route
app.use("/api/athkar", athkarRoutes);

// Express-Async-Handler MiddleWare
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  res.status(statusCode).json({
    success: false,
    message: req.t(message),
  });
});

// Running Server
const PORT_NUMBER = process.env.PORT_NUMBER;
app.listen(PORT_NUMBER, () => {
  console.info(`Server is running on port ${PORT_NUMBER} `);
});

// Mongo configurations
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.info(`MongoDB connected ${process.env.MONGODB_URL}`))
  .catch((err) => console.error("MongoDB connection error:", err));
