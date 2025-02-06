const asyncHandler = require("express-async-handler");

const getAllUserNotificationsService = require("../../services/notificationsServices/getAllUserNotificationsService.js");

const getAllUserNotificationsController = asyncHandler(async (req, res) => {
  const { userDetails } = req.data;

  const queryParams = req.query;

  const userNotifications = await getAllUserNotificationsService(
    userDetails,
    queryParams
  );

  res.status(200).json({
    success: true,
    message: "User notifications fetched successfully",
    ...userNotifications,
  });
});

module.exports = getAllUserNotificationsController;
