import express from "express";
import {
  handleGetAll,
  handleGetById,
  handleUpdate,
  handleDelete,
} from "../controllers/imageController.js";
import auth from "../middlewares/authMiddleware.js";

const router = express.Router();
router.use(auth);

router.get("/", handleGetAll);
router.get("/:id", handleGetById);
router.put("/:id", handleUpdate);
router.delete("/:id", handleDelete);

export default router;