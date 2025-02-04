const axios = require("axios");
const db = require("./../../../../../models/index.js");

const ONESIGNAL_URL = "https://onesignal.com/api/v1/notifications";
const ONESIGNAL_APP_ID = process.env.ONESIGNAL_APP_ID;
const ONESIGNAL_API_KEY = process.env.ONESIGNAL_API_KEY;

const sendNotificationService = async (notificationData) => {
  const { title, message, externalIds } = notificationData;

  if (!title || !message) {
    const error = new Error("Title and message are required");
    error.statusCode = 400;
    throw error;
  }

  console.log("externalIds", externalIds);
  try {
    const oneSignalResponse = await axios.post(
      ONESIGNAL_URL,
      {
        app_id: ONESIGNAL_APP_ID,
        headings: { en: title },
        contents: { en: message },
        include_aliases: {
          external_id:
            Array.isArray(externalIds) && externalIds.length > 0
              ? externalIds
              : [externalIds],
        },
        target_channel: "push",
      },
      {
        headers: {
          Authorization: `Basic ${ONESIGNAL_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );
    console.log("oneSignalResponse", oneSignalResponse);

    if (Array.isArray(externalIds)) {
      for (const userId of externalIds) {
        console.log("userId", userId);
        await db.Notification.create({
          title,
          message,
          userId,
        });
      }
    } else {
      await db.Notification.create({
        title,
        message,
        userId: externalIds,
      });
    }

    return oneSignalResponse.data;
  } catch (error) {
    console.error("Error sending notification:");
    console.error(error);
    throw new Error("Failed to send notification");
  }
};

module.exports = sendNotificationService;
