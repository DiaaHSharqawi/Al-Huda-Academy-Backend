const express = require("express");

const athkarControllers = require("./../../controllers/athkarControllers/athkarControllers");

const router = express.Router();

router.get("/categories", athkarControllers.getCategorizedAthkars);

router.get("/category/:categoryId", athkarControllers.getAthkarByCategory);

module.exports = router;
