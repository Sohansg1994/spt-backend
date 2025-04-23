import express from "express";

import { markStudentAttendance } from "../controllers/attendanceController";
const router = express.Router();
router.post("/", markStudentAttendance);

export default router;
