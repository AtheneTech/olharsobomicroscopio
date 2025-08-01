import express from "express";
import {
  handleGetAll,
  handleGetById,
  handleUpdate,
  handleDelete,
} from "../controllers/imageController.js";
import auth from "../middlewares/authMiddleware.js";
import upload from "../middlewares/uploadMiddleware.js";

const router = express.Router();
router.use(auth);

const uploadFields = upload.fields([
  { name: 'image', maxCount: 1 },
  { name: 'icon', maxCount: 1 }
]);

router.get("/", handleGetAll);
router.get("/:id", handleGetById);
router.put("/:id", uploadFields, handleUpdate);
router.delete("/:id", handleDelete);

export default router;