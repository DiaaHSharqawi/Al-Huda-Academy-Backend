const axios = require("axios");

const getSupervisorByUserId = async (userId) => {
  try {
    const getSupervisorByUserIdResponse = await axios.post(
      `${process.env.BASE_URL}/supervisor/get-supervisor-by-user-id`,
      {
        userId: userId,
      }
    );

    return getSupervisorByUserIdResponse;
  } catch (error) {
    return error;
  }
};
module.exports = getSupervisorByUserId;
