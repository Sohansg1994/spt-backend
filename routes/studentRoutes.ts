import express from "express";
import {
  createStudent,
  getAllStudents,
  getAllStudentsWithClasses,
  getStudentById,
  getStudentByRegistrationNumber,
} from "../controllers/studentController";
import { getClassesForStudent } from "../controllers/studentClassController";
import { getResultsByStudentId } from "../controllers/assignmentResultController";
import { getStudentAttendance } from "../controllers/attendanceController";
const router = express.Router();

router.post("/", createStudent);

router.get("/", getAllStudents);
router.get("/classes", getAllStudentsWithClasses);

router.get("/:id", getStudentById);

router.get("/get-by-rn/:regNo", getStudentByRegistrationNumber);

router.get("/:studentId/classes", getClassesForStudent);

router.get("/:studentId/assignments", getResultsByStudentId);

router.get("/:studentId/attendance", getStudentAttendance);
export default router;
