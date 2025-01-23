const db = require("../../../../../models/index.js");

const getSupervisorGroupPlanDetailsService = async (groupPlanDetailsData) => {
  console.log("===== getSupervisorGroupPlanDetailsService =====");

  console.log("groupPlanDetailsData", groupPlanDetailsData);

  const groupPlanDetails = await db.GroupPlan.findAll({
    where: {
      id: groupPlanDetailsData.id,
    },
    include: [
      {
        model: db.ContentToMemorize,
      },
      {
        model: db.ContentToReview,
      },
      {
        model: db.GroupPlanStatus,
      },
    ],
  });

  console.log("groupPlanDetails", groupPlanDetails);

  console.log("===== End of getSupervisorGroupPlanDetailsService =====");

  return groupPlanDetails;
};

module.exports = getSupervisorGroupPlanDetailsService;
