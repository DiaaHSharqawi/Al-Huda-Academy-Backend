const db = require("./../../../../../models/index.js");

const searchMemorizationGroupService = async (searchParams) => {
  console.log("searchParams:");
  console.dir(searchParams, { depth: null });

  const whereClause = {};

  // Dynamically build the where clause
  if (searchParams.id) {
    whereClause.id = searchParams.id;
  }
  if (searchParams.groupName) {
    whereClause.group_name = {
      [db.Sequelize.Op.like]: `%${searchParams.groupName}%`,
    };
  }
  if (searchParams.group_status) {
    whereClause.group_status = searchParams.group_status;
  }
  if (searchParams.participants_gender) {
    whereClause.participants_gender = searchParams.participants_gender;
  }
  if (searchParams.participants_level) {
    whereClause.participants_level = searchParams.participants_level;
  }
  if (searchParams.start_time) {
    whereClause.start_time = { [db.Sequelize.Op.gte]: searchParams.start_time };
  }
  if (searchParams.end_time) {
    whereClause.end_time = { [db.Sequelize.Op.lte]: searchParams.end_time };
  }
  if (searchParams.capacity) {
    whereClause.capacity = searchParams.capacity;
  }
  if (searchParams.group_goal) {
    whereClause.group_goal = {
      [db.Sequelize.Op.like]: `%${searchParams.group_goal}%`,
    };
  }
  if (searchParams.days) {
    try {
      if (Array.isArray(searchParams.days)) {
        const conditions = searchParams.days.map((day) => {
          return db.Sequelize.where(
            db.Sequelize.fn(
              "JSON_CONTAINS",
              db.Sequelize.col("days"),
              JSON.stringify(day)
            ),
            1
          );
        });

        // Combine conditions with AND operator
        whereClause[db.Sequelize.Op.and] = conditions;
      }
    } catch (err) {
      const error = new Error("Invalid days format. Ensure it's valid JSON.");
      error.statusCode = 400;
      throw error;
    }
  }

  console.log("whereClause:");
  console.dir(whereClause, { depth: null });

  const page = parseInt(searchParams.page) || 1; // Default to 1 if not provided
  const limit = parseInt(searchParams.limit) || 10; // Default to 10 if not provided
  const offset = (page - 1) * limit; // Calculate the offset

  const totalNumberOfMemorizationGroup = await db.MemorizationGroup.count(
    whereClause
  );
  console.log(
    `totalNumberOfMemorizationGroup: ${totalNumberOfMemorizationGroup}`
  );

  const totalPages = Math.ceil(totalNumberOfMemorizationGroup / limit);
  console.log(`totalPages: ${totalPages}`);

  if (page > totalPages) {
    const error = new Error("Page number exceeds total available pages");
    error.status = 404;
    throw error;
  }

  // Execute the query
  const memorizationGroups = await db.MemorizationGroup.findAll({
    where: whereClause,
    limit: limit,
    offset: offset,
  });

  if (memorizationGroups.length === 0) {
    const error = new Error(
      "No memorization groups found matching the criteria"
    );
    error.statusCode = 404;
    throw error;
  }

  return memorizationGroups;
};

module.exports = searchMemorizationGroupService;
