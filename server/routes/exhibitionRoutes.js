import express from "express";
import {
  handleCreate,
  handleGetByEdition,
  handleUpdate,
  handleDelete,
  handleDuplicate,
} from "../controllers/exhibitionController.js";
import validate from "../middlewares/validateMiddleware.js";
import auth from "../middlewares/authMiddleware.js";
import { exhibitionSchema } from "../utils/zodSchemas.js";

const router = express.Router();

router.use(auth);

router.post("/", validate(exhibitionSchema), handleCreate);

router.get("/admin/:edition", handleGetByEdition);

router.put("/:id", handleUpdate);

router.delete("/:id", handleDelete);

router.post("/:id/duplicate", handleDuplicate);

export default router;