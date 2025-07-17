import express from "express";
import {
  createSection,
  getSectionsByExhibition,
  handleGetAll
} from "../controllers/sectionController.js";
import auth from "../middlewares/authMiddleware.js";
import validate from "../middlewares/validateMiddleware.js";
import { sectionSchema } from "../utils/zodSchemas.js";

const router = express.Router();

router.use(auth);

router.get("/", handleGetAll);

router.post("/", validate(sectionSchema), createSection);

router.get("/by-exhibition/:exhibitionId", getSectionsByExhibition);

export default router;