import express from "express";
import {
  createStudent,
  getAllStudents,
  getStudentById,
  getStudentByRegistrationNumber,
} from "../controllers/studentController";
import { getClassesForStudent } from "../controllers/studentClassController";
import { getResultsByStudentId } from "../controllers/assignmentResultController";
import { getStudentAttendance } from "../controllers/attendanceController";
const router = express.Router();
//create a student
router.post("/", createStudent);
// Get all students
router.get("/", getAllStudents);
// Get a student by ID
router.get("/:id", getStudentById);
// Get a student by registration number
router.get("/get-by-rn/:regNo", getStudentByRegistrationNumber);
// Get all classes for a student
router.get("/:studentId/classes", getClassesForStudent);
// Get all results for a student
router.get("/:studentId/assignments", getResultsByStudentId);
// Get all attendance for a student
router.get("/:studentId/attendance", getStudentAttendance);
export default router;
