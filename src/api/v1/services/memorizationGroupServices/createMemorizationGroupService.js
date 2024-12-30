const db = require("../../../../../models/index.js");
const getMemorizationGroupByGroupName = require("../../utils/memorizationGroup/getMemorizationGroupByGroupName.js");
const getSupervisorBySupervisorId = require("../../utils/supervisor/getSupervisorBySupervisorId.js");

const teachingMethodsMapping = (teachingMethodId) => {
  const teachingMethods = {
    1: db.SurahMemorizationGroup,
    2: db.JuzaMemorizationGroup,
    3: db.JuzaMemorizationGroup,
    4: db.SurahMemorizationGroup,
    5: db.ExtractsFromQuranMemorizationGroup,
  };

  return teachingMethods[teachingMethodId] || "Unknown Method";
};
const createMemorizationGroupService = async (createMemorizationGroupData) => {
  const transaction = await db.sequelize.transaction();

  try {
    const { groupName } = createMemorizationGroupData;

    console.log("createMemorizationGroupService");
    console.log("createMemorizationGroupData :");
    console.dir(createMemorizationGroupData, { depth: null });

    const getMemorizationGroupByGroupNameResponse =
      await getMemorizationGroupByGroupName(groupName);

    if (getMemorizationGroupByGroupNameResponse.status !== 404) {
      const error = new Error(
        "validations.groupName.group_name_already_exists"
      );
      error.statusCode = 409;
      throw error;
    }

    console.log("createMemorizationGroupData :");
    console.log("createMemorizationGroupData.supervisor_id :");
    console.dir(createMemorizationGroupData.supervisor_id, { depth: null });

    const getSupervisorBySupervisorIdResponse =
      await getSupervisorBySupervisorId(
        createMemorizationGroupData.supervisor_id
      );

    console.log("getSupervisorBySupervisorIdResponse :");
    console.dir(getSupervisorBySupervisorIdResponse, { depth: null });

    if (getSupervisorBySupervisorIdResponse.status !== 200) {
      const error = new Error(
        `failed to find the supervisor id, ${getSupervisorBySupervisorIdResponse?.response?.data?.message}`
      );
      error.statusCode = getSupervisorBySupervisorIdResponse.status;
      throw error;
    }

    console.log({
      group_name: groupName,
      group_description: createMemorizationGroupData.group_description,
      capacity: createMemorizationGroupData.capacity,
      group_status_id: createMemorizationGroupData.group_status_id,
      start_time: createMemorizationGroupData.start_time,
      end_time: createMemorizationGroupData.end_time,
      gender_id: createMemorizationGroupData.participants_gender_id,
      participants_level_id: createMemorizationGroupData.participants_level_id,
      group_goal_id: createMemorizationGroupData.group_goal_id,
      supervisor_id: createMemorizationGroupData.supervisor_id,
    });

    const memorizationGroup = await db.MemorizationGroup.create(
      {
        group_name: groupName,
        group_description: createMemorizationGroupData.group_description,
        capacity: createMemorizationGroupData.capacity,
        group_status_id: createMemorizationGroupData.group_status_id,
        start_time: createMemorizationGroupData.start_time,
        end_time: createMemorizationGroupData.end_time,
        group_status_id: 5,
        group_goal_id: createMemorizationGroupData.group_goal_id,
        teaching_method_id: createMemorizationGroupData.teaching_method_id,
        gender_id: createMemorizationGroupData.participants_gender_id,
        participants_level_id:
          createMemorizationGroupData.participants_level_id,
        supervisor_id: createMemorizationGroupData.supervisor_id,
      },
      { transaction }
    );

    const teachingMethodId = parseInt(
      createMemorizationGroupData.teaching_method_id,
      10
    );
    console.log("teachingMethodId :");
    console.dir(teachingMethodId, { depth: null });

    const teachingMethodModel = teachingMethodsMapping(teachingMethodId);

    if (teachingMethodId === 1 || teachingMethodId === 4) {
      const { surah_ids } = createMemorizationGroupData;
      const surahPromises = surah_ids.map((surah_id) =>
        teachingMethodModel.create(
          {
            surahId: surah_id,
            groupId: memorizationGroup.id,
          },
          { transaction }
        )
      );
      await Promise.all(surahPromises);
    } else if (teachingMethodId === 2 || teachingMethodId === 3) {
      const { juza_ids } = createMemorizationGroupData;
      const juzaPromises = juza_ids.map((juza_id) =>
        teachingMethodModel.create(
          {
            juzaId: juza_id,
            groupId: memorizationGroup.id,
          },
          { transaction }
        )
      );
      await Promise.all(juzaPromises);
    } else if (teachingMethodId === 5) {
      const { extracts } = createMemorizationGroupData;
      const extractPromises = extracts.map((extract) =>
        teachingMethodModel.create(
          {
            surahId: extract.surah_id,
            ayat: extract.ayat,
            groupId: memorizationGroup.id,
          },
          { transaction }
        )
      );
      await Promise.all(extractPromises);
    }
    await transaction.commit();
    return memorizationGroup;
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};

module.exports = createMemorizationGroupService;

module.exports = createMemorizationGroupService;
