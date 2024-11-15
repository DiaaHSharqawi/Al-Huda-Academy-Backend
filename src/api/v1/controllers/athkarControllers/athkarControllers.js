import asyncHandler from "express-async-handler";
import dotenv from "dotenv";

import athkarServices from "./../../services/athkarServices/athkarServices.js";

dotenv.config();

const athkarControllers = {
  getCategorizedAthkars: asyncHandler(async (req, res) => {
    const lang = req.headers["accept-language"]?.includes("ar") ? "ar" : "en";

    let { page, limit, ...filters } = req.query;
    page = parseInt(page ?? 1);
    limit = parseInt(limit ?? 10);

    const pagination = { page, limit };

    console.log(`Controller --> lang: ${lang}, page: ${page}, limit: ${limit}`);
    const { formattedAthkars, metaData } =
      await athkarServices.getCategorizedAthkars(lang, pagination, filters);
    res.status(200).json({
      success: true,
      message: { athkars: formattedAthkars },
      metaData: metaData,
    });
  }),

  getAthkarByCategory: asyncHandler(async (req, res) => {
    const lang = req.headers["accept-language"]?.includes("ar") ? "ar" : "en";

    const { categoryId } = req.params;
    console.log(`categoryId: ${categoryId}`);

    const athkars = await athkarServices.getAthkarByCategory(categoryId, lang);
    res.status(200).json({
      success: true,
      message: athkars,
    });
  }),
};

export default athkarControllers;
