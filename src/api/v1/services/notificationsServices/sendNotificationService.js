const db = require("../../../../../models/index.js");

const axios = require("axios");

const ONESIGNAL_URL = "https://onesignal.com/api/v1/notifications";

const ONESIGNAL_APP_ID = process.env.ONESIGNAL_APP_ID;

const ONESIGNAL_API_KEY = process.env.ONESIGNAL_API_KEY;

const sendNotificationService = async (notificationData) => {
  const { title, message, filters } = notificationData;

  if (!title || !message) {
    const error = new Error("Title and message are required");
    error.statusCode = 400;
    throw error;
  }

  const oneSignalResponse = await axios.post(
    ONESIGNAL_URL,
    {
      app_id: ONESIGNAL_APP_ID,
      headings: { en: title },
      contents: { en: message },
      filters: filters,
    },
    {
      headers: {
        Authorization: `Basic ${ONESIGNAL_API_KEY}`,
        "Content-Type": "application/json",
      },
    }
  );

  return oneSignalResponse.data;
};

module.exports = sendNotificationService;
