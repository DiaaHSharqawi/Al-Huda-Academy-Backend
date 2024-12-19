const getUserByEmail = require("./../../utils/user/getUserByEmail");

const db = require("./../../../../../models/index");

const getChildsByParentIdService = async (getChildsByUserIdControllerData) => {
  const { parentEmail } = getChildsByUserIdControllerData;

  const getUserByEmailResponse = await getUserByEmail(parentEmail);
  if (getUserByEmailResponse.status !== 200) {
    const error = new Error(
      `failed to get parent by email, ${getUserByEmailResponse?.response?.data?.message}`
    );
    error.statusCode = getUserByEmailResponse.status;
    throw error;
  }

  const child = await db.FamilyLink.findAll({
    where: {
      user_id: getUserByEmailResponse.data.user.id,
    },

    attributes: ["family_member_user_id"],
    include: [
      {
        model: db.User,
        as: "User",
        attributes: ["email"],
      },
    ],
    raw: true,
  });

  if (child.length === 0 || !child) {
    const error = new Error("User does not have any child linked.");
    error.statusCode = 404;
    throw error;
  }

  child.map((item) => {
    item["childEmail"] = item["User.email"];
    delete item["User.email"];
  });

  return child;
  // console.dir(child, { depth: null });

  /*
  console.log(childs);
  if (!childs || childs.length === 0) {
    const error = new Error("User does not have any child linked.");
    error.statusCode = 404;
    throw error;
  }

  return childs;*/
};

module.exports = getChildsByParentIdService;
