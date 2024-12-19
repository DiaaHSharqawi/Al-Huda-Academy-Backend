const db = require("../../../../../models/index.js");

const getPendingGroupCreationRequestsService = async (
  getPendingGroupCreationRequestsData
) => {
  const { supervisorId, groupStatus } = getPendingGroupCreationRequestsData;

  console.log("getPendingGroupCreationRequestsService");
  console.log("getPendingGroupCreationRequestsData :");
  console.dir(getPendingGroupCreationRequestsData, { depth: null });

  const pendingGroupCreationRequests = await db.MemorizationGroup.findAll({
    attributes: ["id", "group_name", "group_status", "group_description"],
    where: {
      supervisor_id: supervisorId,
      group_status: groupStatus,
    },
  });
  console.log("pendingGroupCreationRequests :");
  console.dir(pendingGroupCreationRequests, { depth: null });
  return pendingGroupCreationRequests;
};

module.exports = getPendingGroupCreationRequestsService;
