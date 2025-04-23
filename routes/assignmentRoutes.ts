import express from "express";

import { getAssignmentResults } from "../controllers/assignmentController";
const router = express.Router();
router.get("/:assignmentId/results", getAssignmentResults);

export default router;
