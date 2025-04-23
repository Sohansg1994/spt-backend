import express from "express";
import {
  createTeacher,
  getAllTeachers,
  getTeacherById,
  getTeacherByRegistrationNumber,
} from "../controllers/teacherController";

const router = express.Router();

// POST /api/users - Create a new user
router.post("/", createTeacher);

// GET /api/users - Get all users
router.get("/", getAllTeachers);
router.get("/registration/:regNo", getTeacherByRegistrationNumber);
// GET /api/users/:id - Get a user by ID
router.get("/:id", getTeacherById);

export default router;
