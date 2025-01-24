const { raw } = require("express");
const db = require("../../../../../../../models/index.js");

const getSupervisorGroupPlanDetailsService = async (groupPlanDetailsData) => {
  console.log("===== getSupervisorGroupPlanDetailsService =====");

  console.log("groupPlanDetailsData", groupPlanDetailsData);

  const groupPlanDetails = await db.GroupPlan.findOne({
    where: {
      id: groupPlanDetailsData.groupPlanId,
    },
    include: [
      {
        model: db.ContentToMemorize,
        include: [
          {
            model: db.Surah,
          },
        ],
      },
      {
        model: db.ContentToReview,
        include: [
          {
            model: db.Surah,
          },
        ],
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
