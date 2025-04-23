import express from "express";

import {
  createAssignmentResult,
  updateAssignmentResult,
} from "../controllers/assignmentResultController";
const router = express.Router();
router.post("/", createAssignmentResult);
router.post("/:id", updateAssignmentResult);
export default router;
