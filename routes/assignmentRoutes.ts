import express from "express";

import {
  createAssignment,
  getAssignmentResults,
  getAssignmentsByClass,
} from "../controllers/assignmentController";
const router = express.Router();
router.post("/", createAssignment);
router.get("/:assignmentId/results", getAssignmentResults);
router.get("/class/:classId", getAssignmentsByClass);
export default router;
