import express from "express";
import {
  enrollMultipleStudents,
  enrollStudentInClass,
  getAllEnrollments,
  removeStudentFromClass,
} from "../controllers/studentClassController";

const router = express.Router();

router.post("/", enrollStudentInClass);
router.post("/multiple", enrollMultipleStudents);

router.get("/", getAllEnrollments);

router.delete("/", removeStudentFromClass);
export default router;
