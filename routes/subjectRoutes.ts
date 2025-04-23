import express from "express";
import {
  createSubject,
  getAllSubjects,
  getSubjectById,
} from "../controllers/subjectController";

const router = express.Router();

router.post("/", createSubject);

router.get("/", getAllSubjects);

router.get("/:id", getSubjectById);

export default router;
