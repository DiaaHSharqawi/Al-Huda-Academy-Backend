import asyncHandler from "express-async-handler";
import dotenv from "dotenv";

import athkarServices from "./../../services/athkarServices/athkarServices.js";

dotenv.config();

const athkarControllers = {
  getAllCategorizedAthkar: asyncHandler(async (req, res) => {
    const athkars = await athkarServices.getAllCategorizedAthkar();
    res.status(200).json({
      success: true,
      message: athkars,
    });
  }),

  getAthkarByCategory: asyncHandler(async (req, res) => {
    const { categoryId } = req.params;
    console.log(`categoryId: ${categoryId}`);

    const athkars = await athkarServices.getAthkarByCategory(categoryId);
    res.status(200).json({
      success: true,
      message: athkars,
    });
  }),
};

export default athkarControllers;
