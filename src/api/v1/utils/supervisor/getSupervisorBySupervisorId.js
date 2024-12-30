const axios = require("axios");

const dotenv = require("dotenv");
dotenv.config();

const getSupervisorBySupervisorId = async (supervisorId) => {
  try {
    const response = await axios.post(
      `${process.env.BASE_URL}/supervisor/get-supervisor-by-supervisor-id`,
      {
        supervisorId: supervisorId,
      }
    );
    return response;
  } catch (error) {
    console.error(error);
    return error;
  }
};

module.exports = getSupervisorBySupervisorId;
