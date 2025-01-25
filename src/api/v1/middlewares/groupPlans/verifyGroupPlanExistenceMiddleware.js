const asyncHandler = require("express-async-handler");

const db = require("../../../../../models/index.js");

const verifyGroupPlanExistenceMiddleware = asyncHandler(
  async (req, res, next) => {
    const { planId } = req.params;

    const groupPlanDetails = await db.GroupPlan.findByPk(planId);

    if (!groupPlanDetails) {
      const error = new Error("Group Plan not found");
      error.statusCode = 404;
      throw error;
    }

    req.data = req.data || {};

    req.data.groupPlanDetails = {
      groupPlanId: groupPlanDetails.id,
    };

    next();
  }
);

module.exports = verifyGroupPlanExistenceMiddleware;
