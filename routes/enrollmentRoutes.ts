import express from "express";
import {
  enrollStudentInClass,
  getAllEnrollments,
  removeStudentFromClass,
} from "../controllers/studentClassController";

const router = express.Router();

router.post("/", enrollStudentInClass);

router.get("/", getAllEnrollments);

router.delete("/", removeStudentFromClass);
export default router;
