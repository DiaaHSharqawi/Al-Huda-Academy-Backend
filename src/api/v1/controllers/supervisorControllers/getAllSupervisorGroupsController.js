const asyncHandler = require("express-async-handler");

const getAllSupervisorGroupsService = require("./../../services/supervisorServices/getAllSupervisorGroupsService.js");

const getAllSupervisorGroupsController = asyncHandler(async (req, res) => {
  const getAllSupervisorGroupsData = req.body;

  const getAllSupervisorGroupsDataQuery = req.query;

  console.log("getAllSupervisorGroupsData", getAllSupervisorGroupsData);
  console.log(
    "getAllSupervisorGroupsDataQuery",
    getAllSupervisorGroupsDataQuery
  );

  const { supervisorGroups, supervisorGroupsMetaData } =
    await getAllSupervisorGroupsService(
      getAllSupervisorGroupsData,
      getAllSupervisorGroupsDataQuery
    );

  res.status(200).json({
    success: true,
    message: "Supervisor groups retrieved successfully",
    supervisorGroups: supervisorGroups,
    supervisorGroupsMetaData: supervisorGroupsMetaData,
  });
});

module.exports = getAllSupervisorGroupsController;
