const asyncHandler = require("express-async-handler");

const db = require("../../../../../models/index.js");

const verifyGroupPlanExistenceMiddleware = asyncHandler(
  async (req, res, next) => {
    const { planId } = req.params;

    const groupPlan = await db.GroupPlan.findByPk(planId);

    if (!groupPlan) {
      const error = new Error("Group Plan not found");
      error.statusCode = 404;
      throw error;
    }

    req.data = req.data || {};

    req.data.groupPlan = groupPlan;

    next();
  }
);

module.exports = verifyGroupPlanExistenceMiddleware;
