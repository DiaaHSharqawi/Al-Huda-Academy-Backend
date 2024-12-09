const getUserByEmail = require("./../../utils/getUserByEmail");
const db = require("./../../../../../models/index");

const addChildToFamilyLinkService = async (addChildToFamilyLinkData) => {
  const { parentEmail, familyMemberEmail, relationType } =
    addChildToFamilyLinkData;

  console.log(`parentEmail : ${parentEmail}`);
  console.log(`familyMemberEmail : ${familyMemberEmail}`);

  const getParentByEmailResponse = await getUserByEmail(parentEmail);

  if (getParentByEmailResponse.status !== 200) {
    const error = new Error(
      `failed to get parent by email, ${getParentByEmailResponse?.response?.data?.message}`
    );
    error.statusCode = getParentByEmailResponse.status;
    throw error;
  }

  const getFamilyMemberByEmailResponse = await getUserByEmail(
    familyMemberEmail
  );
  if (getFamilyMemberByEmailResponse.status !== 200) {
    const error = new Error(
      `failed to get child by email, ${getFamilyMemberByEmailResponse?.response?.data?.message}`
    );
    error.statusCode = getFamilyMemberByEmailResponse.status;
    throw error;
  }

  const familyLink = await db.FamilyLink.findOne({
    where: {
      user_id: getParentByEmailResponse.data.user.id,
      family_member_user_id: getFamilyMemberByEmailResponse.data.user.id,
    },
  });

  if (familyLink) {
    const error = new Error("Child is already linked to this participant.");
    error.statusCode = 409;
    throw error;
  }

  await db.FamilyLink.create({
    user_id: getParentByEmailResponse.data.user.id,
    family_member_user_id: getFamilyMemberByEmailResponse.data.user.id,
    relationship_type: relationType,
    linked_at: new Date(),
  });

  return;
};

module.exports = addChildToFamilyLinkService;
