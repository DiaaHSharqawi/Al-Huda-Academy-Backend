const express = require("express");

const router = express.Router();

// Controllers imports :

const getAllGroupMembersController = require("../../controllers/supervisorControllers/getAllGroupMembersController.js");
const getGroupMemberFollowUpRecordsController = require("../../controllers/groupMembersFollowUpRecordsControllers/getGroupMemberFollowUpRecordsController.js");

// Middlewares imports :
const verifyGroupMemberExistenceMiddleware = require("./../../middlewares/supervisor/verifyGroupMemberExistenceMiddleware.js");

// Validation imports :

// SubRoutes imports :

// Supervisor groups member Routes /supervisor/groups/:groupId/members

router.get("/", getAllGroupMembersController);

router.get(
  "/:memberId/follow-up-records",
  verifyGroupMemberExistenceMiddleware,
  getGroupMemberFollowUpRecordsController
);

module.exports = router;
