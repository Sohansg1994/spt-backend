import express from "express";
import {
  createClass,
  getAllClasses,
  getClassById,
  getClassesSummary,
} from "../controllers/classController";
import { getStudentsForClass } from "../controllers/studentClassController";
import { getClassAttendance } from "../controllers/attendanceController";
import {
  createAssignmentWithResults,
  getAssignmentsByClass,
} from "../controllers/assignmentController";
const router = express.Router();

router.post("/", createClass);

router.get("/", getAllClasses);
router.get("/summary", getClassesSummary);

router.get("/:id", getClassById);

router.post("/:classId/assignments", createAssignmentWithResults);

router.get("/:classId/assignments", getAssignmentsByClass);

router.get("/:classId/students", getStudentsForClass);

router.get("/:classId/attendance", getClassAttendance);
export default router;
