import express from "express";
import {
  createTeacher,
  getAllTeachers,
  getTeacherById,
  getTeacherByRegistrationNumber,
} from "../controllers/teacherController";

const router = express.Router();
router.post("/", createTeacher);
router.get("/", getAllTeachers);
router.get("/registration/:regNo", getTeacherByRegistrationNumber);
router.get("/:id", getTeacherById);

export default router;
