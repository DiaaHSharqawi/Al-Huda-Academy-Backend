const db = require("./../../../../../models/index.js");

const getAllSupervisorGroupJoinRequestService = async (
  groupId,
  getAllSupervisorGroupJoinRequestData
) => {
  console.log("\n------ getAllSupervisorGroupJoinRequestService ------\n");

  console.log(
    "getAllSupervisorGroupJoinRequestData",
    getAllSupervisorGroupJoinRequestData
  );

  const { supervisorId } = getAllSupervisorGroupJoinRequestData;

  console.log("supervisorId", typeof supervisorId);

  const supervisorDetails = await db.Supervisor.findByPk(supervisorId);

  if (!supervisorDetails) {
    const error = new Error("Supervisor not found");
    error.statusCode = 404;
    throw error;
  }

  console.log("groupId", groupId);

  const groupDetails = await db.Group.findByPk(groupId);
  if (!groupDetails) {
    const error = new Error("Group not found");
    error.statusCode = 404;
    throw error;
  }

  if (groupDetails.supervisor_id !== supervisorId) {
    const error = new Error("Supervisor is not the owner of the group");
    error.statusCode = 403;
    throw error;
  }

  const groupJoinRequests = await db.GroupJoinRequest.findAll({
    where: {
      group_id: groupId,
    },
  });

  if (!groupJoinRequests) {
    const error = new Error("No join requests found");
    error.statusCode = 404;
    throw error;
  }

  return groupJoinRequests;
};

module.exports = getAllSupervisorGroupJoinRequestService;
