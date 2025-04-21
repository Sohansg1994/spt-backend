import express from "express";
import {
  createAssessment,
  getAllAssessments,
  getAssessmentById,
} from "../controllers/assessmentController";

const router = express.Router();

// POST /api/assessments - Create a new assessment
router.post("/", createAssessment);

// GET /api/assessments - Get all assessments
router.get("/", getAllAssessments);

// GET /api/assessments/:id - Get an assessment by ID
router.get("/:id", getAssessmentById);

export default router;
