const db = require("./../../../../../models/index.js");

const userServices = {
  getUserByEmail: async (userEmail) => {
    console.log(`userEmail: ${userEmail}`);

    const user = await db.User.findOne({
      where: { email: userEmail },
      include: [
        {
          model: db.AccountStatus,
        },
        {
          model: db.Role,
        },
      ],
    });

    if (!user) {
      const error = new Error("user.user_not_found");
      error.statusCode = 404;
      throw error;
    }

    return user;
  },
};

module.exports = userServices;
