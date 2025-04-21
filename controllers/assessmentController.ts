import { db } from "../db/client";
import { assessments } from "../db/schema/index";
import { Request, Response } from "express";
import { eq } from "drizzle-orm";

// Create a new assessment
export const createAssessment = async (req: Request, res: Response) => {
  try {
    const { studentId, subjectId, score, total, date } = req.body;

    // Validate input
    if (!studentId || !subjectId || !score || !total || !date) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Insert the assessment into the database
    const result = await db.insert(assessments).values({
      studentId,
      subjectId,
      score,
      total,
      date,
    });

    res
      .status(201)
      .json({ message: "Assessment created successfully", result });
  } catch (error) {
    console.error("Error creating assessment:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get all assessments
export const getAllAssessments = async (req: Request, res: Response) => {
  try {
    const allAssessments = await db.select().from(assessments);
    res.json(allAssessments);
  } catch (error) {
    console.error("Error fetching assessments:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get an assessment by ID
export const getAssessmentById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const assessment = await db
      .select()
      .from(assessments)
      .where(eq(assessments.id, Number(id)));

    if (assessment.length === 0) {
      return res.status(404).json({ error: "Assessment not found" });
    }

    res.json(assessment[0]);
  } catch (error) {
    console.error("Error fetching assessment:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
