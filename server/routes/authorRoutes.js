import express from "express";
import {
  createAuthor,
  getAllAuthors,
  getAuthorByIdController,
  updateAuthorController,
  deleteAuthorController,
  getImagesByAuthorIdController
} from "../controllers/authorController.js";
import auth from "../middlewares/authMiddleware.js";
import validate from "../middlewares/validateMiddleware.js";
import { authorSchema } from "../utils/zodSchemas.js";
import upload from "../middlewares/uploadMiddleware.js";

const router = express.Router();

router.use(auth);

router.post("/", upload.single('photo'), validate(authorSchema), createAuthor);
router.put("/:id", upload.single('photo'), validate(authorSchema), updateAuthorController);

router.get("/", getAllAuthors);
router.get("/:id", getAuthorByIdController);
router.get("/:id/images", getImagesByAuthorIdController);
router.delete("/:id", deleteAuthorController);

export default router;