import express from "express";

import athkarControllers from "../../controllers/athkarControllers/athkarControllers.js";

const router = express.Router();

router.get("/categories", athkarControllers.getCategorizedAthkars);

router.get("/category/:categoryId", athkarControllers.getAthkarByCategory);

export default router;
