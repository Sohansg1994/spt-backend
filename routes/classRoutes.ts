import express from "express";
import {
  createClass,
  getAllClasses,
  getClassById,
} from "../controllers/classController";
import { getStudentsForClass } from "../controllers/studentClassController";
import { getClassAttendance } from "../controllers/attendanceController";
import {
  createAssignmentWithResults,
  getAssignmentsByClass,
} from "../controllers/assignmentController";
const router = express.Router();
// Create a new class
router.post("/", createClass);
// List all classes
router.get("/", getAllClasses);
// Get a class by ID
router.get("/:id", getClassById);
//Create assignment and record results
router.post("/:classId/assignments", createAssignmentWithResults);
//	List all assignments for a class
router.get("/:classId/assignments", getAssignmentsByClass);
// List all students for a class
router.get("/:classId/students", getStudentsForClass);
// List all attendance for a class
router.get("/:classId/attendance", getClassAttendance);
export default router;
