const Athkar = require("./../../models/AthkarModel/AthkarModel.js");

const athkarServices = {
  getCategorizedAthkars: async (lang, pagination, filters) => {
    console.log(`getCategorizedAthkars Service : lang: ${lang}`);
    console.log(`getCategorizedAthkars Service : page: ${pagination.page}`);
    console.log(`getCategorizedAthkars Service : limit: ${pagination.limit}`);
    console.log(`getCategorizedAthkars Service : filters: ${filters}`);
    const querySearch = {};

    if (filters?.categoryName && filters.categoryName.trim() !== "") {
      querySearch[`category.${lang}`] = {
        $regex: `.*${filters.categoryName}.*`,
        $options: "i",
      };
    }
    const { page, limit } = pagination;

    try {
      const ath = await Athkar.find({});
      console.dir(ath, { depth: null });
      console.log(`All Athkar Data:`);
      console.dir(ath, { depth: null });
    } catch (error) {
      console.error("Error fetching Athkar data:", error);
      throw error;
    }

    console.log(`querySearch`);
    console.dir(querySearch, { depth: null });
    const totalAthkarsCategories = await Athkar.countDocuments(querySearch);
    console.log(`totalAthkarsCategories: ${totalAthkarsCategories}`);

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

    console.log(`getAthkarByCategory Service : lang: ${lang}`);
    console.log(`getAthkarByCategory Service : athkars: ${athkars}`);
    console.log(`getAthkarByCategory Service : athkars[0]: ${athkars[0]}`);

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

module.exports = athkarServices;
