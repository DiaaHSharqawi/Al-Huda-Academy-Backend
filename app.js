const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

const mongoose = require("mongoose");

const db = require("./models/index.js");

const i18next = require("i18next");
const Backend = require("i18next-fs-backend");
const i18nextHttpMiddleware = require("i18next-http-Middleware");

// API Routes:
const userRoutes = require("./src/api/v1/routes/userRoutes/userRoutes.js");
const authRoutes = require("./src/api/v1/routes/authRoutes/authRoutes.js");
const rolesRoutes = require("./src/api/v1/routes/rolesRoutes/rolesRoutes.js");
const athkarRoutes = require("./src/api/v1/routes/athkarRoutes/athkarRoutes.js");
const uploadFilesRoutes = require("./src/api/v1/routes/uploadFilesRoutes/uploadFilesRoutes.js");
const familyLinkRoutes = require("./src/api/v1/routes/familyLinkRoutes/familyLinkRoutes.js");
const supervisorRoutes = require("./src/api/v1/routes/supervisorRoutes/supervisorRoutes.js");
const memorizationGroupRoutes = require("./src/api/v1/routes/memorizationGroupRoutes/memorizationGroupRoutes.js");
const participantRoutes = require("./src/api/v1/routes/participantRoutes/participantRoutes.js");
const quranRoutes = require("./src/api/v1/routes/quranRoutes/quranRoutes.js");
const genderRoutes = require("./src/api/v1/routes/genderRoutes/genderRoutes.js");
const groupGoalRoutes = require("./src/api/v1/routes/groupGoalRoutes/groupGoalRoutes.js");
const languageRoutes = require("./src/api/v1/routes/languageRoutes/languageRoutes.js");
const teachingMethodsRoutes = require("./src/api/v1/routes/teachingMethodsRoutes/teachingMethodsRoutes.js");
const daysRoutes = require("./src/api/v1/routes/daysRoutes/daysRoutes.js");
const adminRoutes = require("./src/api/v1/routes/adminRoutes/adminRoutes.js");
const quranMemorizingAmountRoutes = require("./src/api/v1/routes/quranMemorizingAmountRoutes/quranMemorizingAmountRoutes.js");
const accountStatusRoutes = require("./src/api/v1/routes/accountStatusRoutes/accountStatusRoutes.js");
const groupStatusRoutes = require("./src/api/v1/routes/groupStatusRoutes/groupStatusRoutes.js");
const notificationsRoutes = require("./src/api/v1/routes/notificationsRoutes/notificationsRoutes.js");
const attendanceStatusRoutes = require("./src/api/v1/routes/attendanceStatusRoutes/attendanceStatusRoutes.js");
const groupPlansRoutes = require("./src/api/v1/routes/groupPlansRoutes/groupPlansRoutes.js");

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

// Use i18next Middleware
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

// Participant route
app.use("/api/participant", participantRoutes);

// Quran route
app.use("/api/quran", quranRoutes);

// Gender route
app.use("/api/gender", genderRoutes);

// Group Goal route
app.use("/api/group-goal", groupGoalRoutes);

// Language route
app.use("/api/language", languageRoutes);

// Teaching Methods route
app.use("/api/teaching-methods", teachingMethodsRoutes);

// Days route
app.use("/api/days", daysRoutes);

// Admin route
app.use("/api/admin", adminRoutes);

// Quran Memorizing Amount route
app.use("/api/quran-memorizing-amount", quranMemorizingAmountRoutes);

// Account Status route
app.use("/api/account-status", accountStatusRoutes);

// Notifications route
app.use("/api/notifications", notificationsRoutes);

// Group Status route
app.use("/api/group-status", groupStatusRoutes);

// Attendance Status route
app.use("/api/attendance-status", attendanceStatusRoutes);

// Group Plans route
app.use("/api/group-plans", groupPlansRoutes);

// Group Days route

// Express-Async-Handler Middleware
app.use((err, req, res, next) => {
  const statusCode = err.response?.status || err.statusCode || 500;
  const message =
    err.response?.data?.message || err.message || "Internal Server Error";

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
/*db.sequelize
  .sync({
    alter: false,
    force: true,
  })
  .then(() => {
    console.info("Database connected successfully");
  })
  .catch((err) => {
    console.error("Database connection error:", err);
  });*/

db.sequelize
  .query("SET FOREIGN_KEY_CHECKS = 0")
  .then(() => db.sequelize.sync({ alter: false, force: false }))
  .then(() => db.sequelize.query("SET FOREIGN_KEY_CHECKS = 1"))
  .then(() => {
    console.info("Database connected successfully");
  })
  .catch((error) => {
    console.error("Error connecting to the database:", error);
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
