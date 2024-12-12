const db = require("./../../../../../models/index.js");
const getMemorizationGroupByGroupName = require("./../../utils/getMemorizationGroupByGroupName.js");
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
    error.status = 409;
    throw error;
  }
  console.log("createMemorizationGroupData :");
  console.dir(createMemorizationGroupData, { depth: null });

  const memorizationGroup = await db.MemorizationGroup.create({
    group_name: groupName,
    group_description: createMemorizationGroupData.group_description,
    capacity: createMemorizationGroupData.capacity,
    group_status: "pending",
    start_time: createMemorizationGroupData.start_time,
    end_time: createMemorizationGroupData.end_time,
    days: createMemorizationGroupData.days,
    supervisor_id: createMemorizationGroupData.supervisor_id,
  });

  return memorizationGroup;
};
module.exports = createMemorizationGroupService;
