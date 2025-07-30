import express from "express";
import {
  handleCreate,
  handleGetByEdition,
  handleUpdate,
  handleDelete,
  handleDuplicate,
  handleGetAll,
  handleGetLatest,
  handleGetById
} from "../controllers/exhibitionController.js";
import validate from "../middlewares/validateMiddleware.js";
import auth from "../middlewares/authMiddleware.js";
import { exhibitionSchema } from "../utils/zodSchemas.js";

const router = express.Router();

router.get("/public", handleGetAll);
router.get("/latest", handleGetLatest);

router.use(auth);

router.get("/", handleGetAll);

router.post("/", validate(exhibitionSchema), handleCreate);

router.get("/admin/:edition", handleGetByEdition);

router.get("/:id", handleGetById);

router.put("/:id", handleUpdate);

router.delete("/:id", handleDelete);

router.post("/:id/duplicate", handleDuplicate);

export default router;