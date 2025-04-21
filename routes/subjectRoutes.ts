import express from "express";
import {
  createSubject,
  getAllSubjects,
  getSubjectById,
} from "../controllers/subjectController";

const router = express.Router();

// POST /api/subjects - Create a new subject
router.post("/", createSubject);

// GET /api/subjects - Get all subjects
router.get("/", getAllSubjects);

// GET /api/subjects/:id - Get a subject by ID
router.get("/:id", getSubjectById);

export default router;
