import express from "express";
import { createAuthor, getAllAuthors } from "../controllers/authorController.js";
import auth from "../middlewares/authMiddleware.js";
import validate from "../middlewares/validateMiddleware.js";
import { authorSchema } from "../utils/zodSchemas.js";

const router = express.Router();

router.use(auth);

router.post("/", validate(authorSchema), createAuthor);

router.get("/", getAllAuthors);

export default router;