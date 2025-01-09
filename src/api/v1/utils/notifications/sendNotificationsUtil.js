const axios = require("axios");
const BASE_URL = process.env.BASE_URL;

const sendNotificationsUtil = async (notificationMessage) => {
  try {
    const sendNotificationsResponse = await axios.post(
      `${BASE_URL}/notifications`,
      notificationMessage
    );

    return sendNotificationsResponse;
  } catch (error) {
    console.error("Error sending notification:", error);
    return error;
  }
};

module.exports = sendNotificationsUtil;
