import express from "express";
import {
  createAttendance,
  getAllAttendance,
  getAttendanceById,
} from "../controllers/attendanceController";

const router = express.Router();

// POST /api/attendance - Create a new attendance record
router.post("/", createAttendance);

// GET /api/attendance - Get all attendance records
router.get("/", getAllAttendance);

// GET /api/attendance/:id - Get an attendance record by ID
router.get("/:id", getAttendanceById);

export default router;
