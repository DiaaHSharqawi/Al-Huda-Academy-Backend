const axios = require("axios");

const dotenv = require("dotenv");
dotenv.config();

const getMemorizationGroupByGroupName = async (groupName) => {
  console.log("getMemorizationGroupByGroupName utils");
  console.log("groupName : ", groupName);

  try {
    const getMemorizationGroupByGroupNameResponse = await axios.post(
      `${process.env.BASE_URL}/memorization-group/get-by-name`,
      {
        groupName: groupName,
      }
    );

    return getMemorizationGroupByGroupNameResponse;
  } catch (error) {
    return error;
  }
};

module.exports = getMemorizationGroupByGroupName;
