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

const router = express.Router();

router.use(auth);

router.post("/", validate(authorSchema), createAuthor);
router.get("/", getAllAuthors);
router.get("/:id", getAuthorByIdController);
router.get("/:id/images", getImagesByAuthorIdController);
router.put("/:id", validate(authorSchema), updateAuthorController);
router.delete("/:id", deleteAuthorController);

export default router;