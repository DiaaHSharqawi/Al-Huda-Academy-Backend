import express from "express";
import dotenv from "dotenv";
import cors from "cors";

// Load env variables from .env file
dotenv.config();

const app = express();

// Cors policy
app.use(cors());

// Running Server
const PORT_NUMBER = process.env.PORT_NUMBER;
app.listen(PORT_NUMBER, () => {
  console.log(`Server is running on port ${PORT_NUMBER} `);
});
