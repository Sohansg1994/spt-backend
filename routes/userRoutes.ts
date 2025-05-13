import express from "express";
import {
  createUser,
  getAllUsers,
  getAuthenticatedUser,
  getUserById,
  loginUser,
} from "../controllers/userController";

const router = express.Router();
router.post("/", createUser);
router.post("/login", loginUser);
router.get("/", getAllUsers);
router.get("/me", getAuthenticatedUser);
router.get("/:id", getUserById);

export default router;
