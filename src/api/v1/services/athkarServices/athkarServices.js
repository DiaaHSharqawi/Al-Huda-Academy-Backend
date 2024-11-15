import Athkar from "../../models/AthkarModel/AthkarModel.js";

const athkarServices = {
  getCategorizedAthkars: async (lang, pagination, filters) => {
    const querySearch = {};

    if (filters?.categoryName && filters.categoryName.trim() !== "") {
      querySearch[`category.${lang}`] = {
        $regex: `.*${filters.categoryName}.*`,
        $options: "i",
      };
    }

    const { page, limit } = pagination;
    const totalAthkarsCategories = await Athkar.countDocuments(querySearch);

    const totalPages = Math.ceil(totalAthkarsCategories / limit);
    if (page > totalPages) {
      const error = new Error("Page number exceeds total available pages");
      error.status = 404;
      throw error;
    }

    const projection = { [`category.${lang}`]: 1 };
    const skip = (page - 1) * limit;

    const athkars = await Athkar.find(querySearch, projection)
      .skip(skip)
      .limit(limit);

    if (!athkars || athkars.length === 0) {
      const error = new Error("No athkar found");
      error.status = 404;
      throw error;
    }

    const formattedAthkars = athkars.map((athkar) => ({
      _id: athkar._id,
      category: athkar.category ? athkar.category[lang] : "",
    }));

    const metaData = {
      totalAthkarsCategories,
      totalPages,
      page,
      limit,
    };

    return { formattedAthkars, metaData };
  },

  getAthkarByCategory: async (categoryId, lang) => {
    console.log(`getAthkarByCategory Service : categoryId: ${categoryId}`);
    if (!categoryId) {
      const error = new Error("Category id is required");
      error.status = 400;
      throw error;
    }

    const athkars = await Athkar.find({
      _id: categoryId,
    })
      .select(`array category.${lang}`)
      .lean();
    console.log(`getAthkarByCategory Service : athkars: ${athkars}`);
    if (!athkars || athkars.length === 0) {
      const error = new Error("No athkar found");
      error.status = 404;
      throw error;
    }

    return {
      categoryId: athkars[0]._id,
      category: athkars[0].category[lang],
      athkars: athkars[0].array,
    };
  },
};

export default athkarServices;
