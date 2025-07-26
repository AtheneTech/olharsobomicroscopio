import express from "express";
import { register, login, approveUser, listUsers } from "../controllers/UserController.js";
import validate from "../middlewares/validateMiddleware.js";
import auth from "../middlewares/authMiddleware.js";
import { userSchema } from "../utils/zodSchemas.js";

const router = express.Router();

router.post("/register", validate(userSchema), register);

router.post("/login", login);

router.put("/approve/:id", auth, approveUser);

router.get("/", auth, listUsers);

export default router;