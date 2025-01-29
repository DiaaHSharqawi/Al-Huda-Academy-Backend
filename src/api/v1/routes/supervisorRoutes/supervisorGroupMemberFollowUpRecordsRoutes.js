const express = require("express");

const router = express.Router();

// Controllers imports :

const getGroupMemberFollowUpRecordsController = require("../../controllers/supervisorControllers/groupControllers/groupMembersFollowUpRecordsControllers/getGroupMemberFollowUpRecordsController.js");
const createGroupMembersFollowUpRecordsController = require("../../controllers/supervisorControllers/groupControllers/groupMembersFollowUpRecordsControllers/createGroupMembersFollowUpRecordsController.js");
const updateGroupMembersFollowUpRecordsController = require("../../controllers/supervisorControllers/groupControllers/groupMembersFollowUpRecordsControllers/updateGroupMembersFollowUpRecordsController.js");
const deleteGroupMembersFollowUpRecordsController = require("../../controllers/supervisorControllers/groupControllers/groupMembersFollowUpRecordsControllers/deleteGroupMembersFollowUpRecordsController.js");

// Middlewares imports :
const verifyGroupMemberFollowUpRecordsExistenceMiddleware = require("../../middlewares/supervisor/verifyGroupMemberFollowUpRecordsExistenceMiddleware.js");

// Validation imports :
const createGroupMembersFollowUpRecordsValidation = require("../../validations/supervisorValidations/createGroupMembersFollowUpRecordsValidation.js");
const validateUpdateGroupMembersFollowUpRecords = require("../../validations/supervisorValidations/updateGroupMembersFollowUpRecordsValidation.js");

// SubRoutes imports :

router.get("/", getGroupMemberFollowUpRecordsController);

router.post(
  "/create",
  createGroupMembersFollowUpRecordsValidation,
  createGroupMembersFollowUpRecordsController
);

router.patch(
  "/:recordId/update",
  validateUpdateGroupMembersFollowUpRecords,
  verifyGroupMemberFollowUpRecordsExistenceMiddleware,
  updateGroupMembersFollowUpRecordsController
);

router.delete(
  "/:recordId/delete",
  verifyGroupMemberFollowUpRecordsExistenceMiddleware,
  deleteGroupMembersFollowUpRecordsController
);

module.exports = router;
