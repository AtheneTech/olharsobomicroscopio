import express from "express";
import { handleSearch, handleGetTrackDetails } from "../controllers/spotifyController.js";
import auth from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/search", auth, handleSearch);

router.get("/track/:id", handleGetTrackDetails);

export default router;