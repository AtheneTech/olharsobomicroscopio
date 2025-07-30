import express from "express";
import { uploadImage } from "../controllers/uploadController.js";
import auth from "../middlewares/authMiddleware.js";
import upload from "../middlewares/uploadMiddleware.js";

const router = express.Router();

router.post("/", auth, upload.single("image"), uploadImage);

export default router;