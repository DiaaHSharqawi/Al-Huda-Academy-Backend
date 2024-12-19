const db = require("./../../../../../models/index.js");

const getMemorizationGroupByGroupNameService = async (
  getMemorizationGroupByGroupNameData
) => {
  const { groupName } = getMemorizationGroupByGroupNameData;
  console.log("groupName : ", groupName);

  console.log("getMemorizationGroupByGroupNameService");

  console.log("getMemorizationGroupByGroupNameData :");
  console.dir(getMemorizationGroupByGroupNameData, { depth: null });

  const memorizationGroup = await db.MemorizationGroup.findOne({
    where: { group_name: groupName },
  });

  console.log("memorizationGroup :");
  //console.dir(memorizationGroup, { depth: null });

  if (!memorizationGroup) {
    const error = new Error("Memorization group not found");
    error.statusCode = 404;
    throw error;
  }

  return memorizationGroup;
};

module.exports = getMemorizationGroupByGroupNameService;
