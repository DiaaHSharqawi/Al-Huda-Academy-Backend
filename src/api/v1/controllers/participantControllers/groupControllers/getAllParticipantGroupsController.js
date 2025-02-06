const asynHandler = require("express-async-handler");

const getAllParticipantGroupsService = require("./../../../services/participantServices/groupServices/getAllParticipantGroupsService");

const getAllParticipantGroupsController = asynHandler(async (req, res) => {
  console.log("\n------ getAllParticipantGroupsController ------\n");

  const { participantDetails } = req.data;

  console.log("participantDetails:", participantDetails);

  const getAllParticipantGroupsDataQuery = req.query;

  const { participantGroups, participantGroupsMetaData } =
    await getAllParticipantGroupsService(
      participantDetails,
      getAllParticipantGroupsDataQuery
    );

  res.status(200).json({
    message: "Participant groups fetched successfully",
    participantGroups: participantGroups,
    participantGroupsMetaData,
  });
});

module.exports = getAllParticipantGroupsController;
