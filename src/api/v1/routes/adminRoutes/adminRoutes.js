const express = require("express");

// Controllers imports :
const getRequestsForCreatingGroupsController = require("../../controllers/adminControllers/getRequestsForCreatingGroupsController.js");

const router = express.Router();

router.get("/groups/requests/pending", getRequestsForCreatingGroupsController);

module.exports = router;
