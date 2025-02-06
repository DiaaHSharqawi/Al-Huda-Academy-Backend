const db = require("./../../../../../models/index.js");

const getAllUserNotificationsService = async (userDetails, queryParams) => {
  console.log("\n------ getAllUserNotificationsService ------\n");

  console.log("queryParams", queryParams);

  const { userId } = userDetails;

  console.log("userId", userId);

  const page = parseInt(queryParams.page, 10) || 1;
  const limit = parseInt(queryParams.limit, 10) || 10;

  console.log("page", page);
  console.log("limit", limit);

  const offset = (page - 1) * limit;

  console.log("offset", offset);

  const { notificationId } = queryParams;
  console.log("notificationId", notificationId);

  const whereClause = {
    userId,
  };

  if (notificationId) {
    whereClause.id = parseInt(notificationId, 10);
  }

  console.log("whereClause", whereClause);

  const { count, rows: userNotifications } =
    await db.Notification.findAndCountAll({
      where: { ...whereClause },
      attributes: [
        "id",
        "title",
        "createdAt",
        "isRead",
        notificationId ? "message" : null,
      ].filter(Boolean),
      limit,
      offset,
      order: [["createdAt", "DESC"]],
    });

  console.log("userNotifications", userNotifications);

  console.log("count", count);

  const totalPages = Math.ceil(count / limit);

  console.log("totalPages", totalPages);

  if (notificationId) {
    const notification = userNotifications.find(
      (notification) => notification.id === parseInt(notificationId, 10)
    );

    if (notification && !notification.isRead) {
      await db.Notification.update(
        { isRead: true },
        {
          where: {
            id: notificationId,
            userId: userId,
          },
        }
      );
    }
  }

  if (page > totalPages) {
    const error = new Error("Page number exceeds total pages");
    error.statusCode = 404;
    throw error;
  }

  if (!userNotifications.length) {
    const error = new Error("No notifications found for this user");
    error.statusCode = 404;
    throw error;
  }

  return {
    meta: {
      totalPages,
      page,
      limit,
      totalRecords: count,
    },
    userNotifications,
  };
};

module.exports = getAllUserNotificationsService;
