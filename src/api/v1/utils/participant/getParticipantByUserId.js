const axios = require("axios");

const dotenv = require("dotenv");
dotenv.config();

const getParticipantByUserId = async (userId) => {
  try {
    const getParticipantByUserIdResponse = await axios.post(
      `${process.env.BASE_URL}/participant/get-participant-by-user-id`,
      {
        userId: userId,
      }
    );
    return getParticipantByUserIdResponse;
  } catch (error) {
    return error;
  }
};

module.exports = getParticipantByUserId;
