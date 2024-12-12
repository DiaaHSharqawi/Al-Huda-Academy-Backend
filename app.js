const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

const mongoose = require("mongoose");

const db = require("./models/index.js");

const i18next = require("i18next");
const Backend = require("i18next-fs-backend");
const i18nextHttpMiddleware = require("i18next-http-middleware");

// API Routes:
const userRoutes = require("./src/api/v1/routes/userRoutes/userRoutes.js");
const authRoutes = require("./src/api/v1/routes/authRoutes/authRoutes.js");
const rolesRoutes = require("./src/api/v1/routes/rolesRoutes/rolesRoutes.js");
const athkarRoutes = require("./src/api/v1/routes/athkarRoutes/athkarRoutes.js");
const uploadFilesRoutes = require("./src/api/v1/routes/uploadFilesRoutes/uploadFilesRoutes.js");
const familyLinkRoutes = require("./src/api/v1/routes/familyLinkRoutes/familyLinkRoutes.js");
const supervisorRoutes = require("./src/api/v1/routes/supervisorRoutes/supervisorRoutes.js");
const memorizationGroupRoutes = require("./src/api/v1/routes/memorizationGroupRoutes/memorizationGroupRoutes.js");
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

const app = express(); // local: http://localhost:3000

// Use i18next middleware
app.use(i18nextHttpMiddleware.handle(i18next));

// Cors policy
app.use(cors());

// Parse JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Authentication route
app.use("/api/auth", authRoutes);

// Users route
app.use("/api/users", userRoutes);

// Cloudinary route
app.use("/api/uploadFile", uploadFilesRoutes);

app.use("/api/roles", rolesRoutes);

// Athkar route
app.use("/api/athkar", athkarRoutes);

// Family Link route
app.use("/api/family-link", familyLinkRoutes);

// Memorization Group route
app.use("/api/memorization-group", memorizationGroupRoutes);

// Supervisor route :
app.use("/api/supervisor", supervisorRoutes);

// Express-Async-Handler MiddleWare
app.use((err, req, res, next) => {
  const statusCode = err.response?.status || err.statusCode || 500;
  const message =
    err.response?.data.message || err.message || "Internal Server Error";

  res.status(statusCode).json({
    success: false,

    message: req.t(message),
  });
});

// Running Server
const PORT_NUMBER = 3000;
app.listen(PORT_NUMBER, () => {
  console.info(`Server is running on port ${PORT_NUMBER} `);
});

// Sequlize connection configurations
db.sequelize
  .sync({
    alter: false,
    force: false,
  })
  .then(() => {
    console.info("Database connected successfully");
  })
  .catch((err) => {
    console.error("Database connection error:", err);
  });

// MongoDB configurations
mongoose
  .connect(process.env.MONGODB_URL, {})
  .then(() => {
    console.info(`MongoDB connected: ${process.env.MONGODB_URL}`);
    // Check the database
    mongoose.connection.db.listCollections().toArray((err, collections) => {
      if (err) {
        console.error("Error fetching collections:", err);
      } else {
        console.log("Collections in database:", collections);
      }
    });
  })
  .catch((err) => console.error("MongoDB connection error:", err));
