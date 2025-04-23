import express from "express";
import {
  createUser,
  getAllUsers,
  getAuthenticatedUser,
  getUserById,
} from "../controllers/userController";

const router = express.Router();

// POST /api/users - Create a new user
router.post("/", createUser);

// GET /api/users - Get all users
router.get("/", getAllUsers);
router.get("/me", getAuthenticatedUser);
// GET /api/users/:id - Get a user by ID
router.get("/:id", getUserById);

export default router;
