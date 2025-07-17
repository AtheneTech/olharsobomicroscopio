import express from "express";
import { handleGetStats } from "../controllers/dashboardController.js";
import auth from "../middlewares/authMiddleware.js";

const router = express.Router();

router.use(auth);

router.get("/stats", handleGetStats);

export default router;