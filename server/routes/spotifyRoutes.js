import express from "express";
import { handleSearch } from "../controllers/spotifyController.js";
import auth from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/search", auth, handleSearch);

export default router;