/** @format */

import express from "express";
import * as eventController from "../controllers/eventController";
const router = express.Router();

router.post("/save", eventController.createEventController);
router.get("/:id", eventController.findEventByIdController);

export default router;
