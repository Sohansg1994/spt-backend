import express from "express";
import { loginUser } from "../controllers/authController";

const router = express.Router();

// POST /api/auth/login - User login
router.post("/login", loginUser);

export default router;
