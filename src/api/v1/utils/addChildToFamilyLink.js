const axios = require("axios");
const dotenv = require("dotenv");
dotenv.config();

const addChildToFamilyLink = async (
  parentEmail,
  familyMemberEmail,
  relationType
) => {
  console.log("in addChildToFamilyLink Utils");
  console.log(
    `parentEmail : ${parentEmail}, familyMemberEmail : ${familyMemberEmail}, relationType : ${relationType}`
  );
  try {
    const response = await axios.post(
      process.env.BASE_URL + "/family-link/add-child-to-family-link",
      {
        parentEmail: parentEmail.toString(),
        familyMemberEmail: familyMemberEmail.toString(),
        relationType: relationType,
      }
    );

    return response;
  } catch (error) {
    console.log("error");
    console.log(error);
    return error;
  }
};

module.exports = addChildToFamilyLink;
