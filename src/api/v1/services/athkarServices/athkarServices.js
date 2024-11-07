import Athkar from "../../models/AthkarModel/AthkarModel.js";

import mongoose from "mongoose";
import mongo, { ObjectId } from "mongodb";

const athkarServices = {
  getAllCategorizedAthkar: async () => {
    const athkars = await Athkar.find(
      {},
      {
        category: 1,
      }
    );

    if (!athkars || athkars.length === 0) {
      const error = new Error("No athkar found");
      error.status = 404;
      throw error;
    }

    return athkars;
  },

  getAthkarByCategory: async (categoryId) => {
    console.log(`getAthkarByCategory Service : categoryId: ${categoryId}`);
    const athkars = await Athkar.find({
      _id: categoryId,
    });

    if (!athkars || athkars.length === 0) {
      const error = new Error("No athkar found");
      error.status = 404;
      throw error;
    }

    return athkars;
  },
};

export default athkarServices;
