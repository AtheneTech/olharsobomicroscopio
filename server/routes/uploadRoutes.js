import express from "express";
import { uploadImage } from "../controllers/uploadController.js";
import auth from "../middlewares/authMiddleware.js";
import upload from "../middlewares/uploadMiddleware.js";

const router = express.Router();

const uploadFields = upload.fields([
  { name: 'image', maxCount: 1 },
  { name: 'icon', maxCount: 1 }
]);

router.post("/", auth, uploadFields, uploadImage);

export default router;