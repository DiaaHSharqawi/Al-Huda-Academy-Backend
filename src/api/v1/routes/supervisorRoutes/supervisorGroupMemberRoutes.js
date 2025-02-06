const express = require("express");

const router = express.Router();

// Controllers imports :

const getAllGroupMembersController = require("../../controllers/supervisorControllers/groupControllers/groupMembersControllers/getAllGroupMembersController.js");
const getGroupMemberFollowUpRecordsController = require("../../controllers/supervisorControllers/groupControllers/groupMembersFollowUpRecordsControllers/getGroupMemberFollowUpRecordsController.js");

// Middlewares imports :
const verifyGroupMemberExistenceMiddleware = require("./../../middlewares/supervisor/verifyGroupMemberExistenceMiddleware.js");

// Validation imports :

// SubRoutes imports :
const supervisorGroupMemberFollowUpRecordsRoutes = require("./supervisorGroupMemberFollowUpRecordsRoutes.js");

// Supervisor groups member Routes /supervisor/groups/:groupId/members

router.get("/", getAllGroupMembersController);

router.use(
  "/:memberId/follow-up-records",
  verifyGroupMemberExistenceMiddleware,
  supervisorGroupMemberFollowUpRecordsRoutes
);

module.exports = router;
