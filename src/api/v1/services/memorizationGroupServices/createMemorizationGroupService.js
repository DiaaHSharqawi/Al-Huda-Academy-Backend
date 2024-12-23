const db = require("../../../../../models/index.js");
const getMemorizationGroupByGroupName = require("../../utils/memorizationGroup/getMemorizationGroupByGroupName.js");
const getSupervisorBySupervisorId = require("../../utils/supervisor/getSupervisorBySupervisorId.js");

const createMemorizationGroupService = async (createMemorizationGroupData) => {
  const { groupName } = createMemorizationGroupData;

  console.log("createMemorizationGroupService");
  console.log("createMemorizationGroupData :");

  console.dir(createMemorizationGroupData, { depth: null });

  const getMemorizationGroupByGroupNameResponse =
    await getMemorizationGroupByGroupName(groupName);

  console.log("getMemorizationGroupByGroupNameResponse :");
  console.dir(getMemorizationGroupByGroupNameResponse, { depth: 3 });

  if (getMemorizationGroupByGroupNameResponse.status !== 404) {
    const error = new Error("validations.groupName.group_name_already_exists");
    error.statusCode = 409;
    throw error;
  }
  console.log("createMemorizationGroupData :");
  console.dir(createMemorizationGroupData, { depth: null });

  const getSupervisorBySupervisorIdResponse = await getSupervisorBySupervisorId(
    createMemorizationGroupData.supervisor_id
  );
  console.log("getSupervisorBySupervisorIdResponse :");
  // console.dir(getSupervisorBySupervisorIdResponse, { depth: null });
  if (getSupervisorBySupervisorIdResponse.status !== 200) {
    const error = new Error(
      `failed to create a memorizationGroup, ${getSupervisorBySupervisorIdResponse?.response?.data?.message}`
    );
    console.log("error :");
    console.log(getSupervisorBySupervisorIdResponse.status);

    error.statusCode = getSupervisorBySupervisorIdResponse.status;
    throw error;
  }

  const memorizationGroup = await db.MemorizationGroup.create({
    group_name: groupName,
    group_description: createMemorizationGroupData.group_description,
    capacity: createMemorizationGroupData.capacity,
    group_status: "pending",
    start_time: createMemorizationGroupData.start_time,
    end_time: createMemorizationGroupData.end_time,
    days: createMemorizationGroupData.days,
    participants_gender: createMemorizationGroupData.participants_gender,
    participants_level: createMemorizationGroupData.participants_level,
    group_goal: createMemorizationGroupData.group_goal,
    supervisor_id: createMemorizationGroupData.supervisor_id,
  });

  return memorizationGroup;
};
module.exports = createMemorizationGroupService;
