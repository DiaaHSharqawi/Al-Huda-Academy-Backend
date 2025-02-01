const db = require("./../../../../../../models/index.js");

const getParticipantGroupDashboardService = async (
  participantDetails,
  groupDetails
) => {
  console.log("\n------ getParticipantGroupDashboardService ------\n");

  const groupDashboard = {
    groupDetails,
    participantDetails,
  };

  return groupDashboard;
};

module.exports = getParticipantGroupDashboardService;
