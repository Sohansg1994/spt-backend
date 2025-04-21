import { db } from "../db/client";
import { subjects } from "../db/schema/index";
import { Request, Response } from "express";
import { eq } from "drizzle-orm";

// Create a new subject
export const createSubject = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;

    // Validate input
    if (!name) {
      return res.status(400).json({ error: "Subject name is required" });
    }

    // Insert the subject into the database
    const result = await db.insert(subjects).values({ name });

    res.status(201).json({ message: "Subject created successfully", result });
  } catch (error) {
    console.error("Error creating subject:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get all subjects
export const getAllSubjects = async (req: Request, res: Response) => {
  try {
    const allSubjects = await db.select().from(subjects);
    res.json(allSubjects);
  } catch (error) {
    console.error("Error fetching subjects:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get a subject by ID
export const getSubjectById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const subject = await db
      .select()
      .from(subjects)
      .where(eq(subjects.id, Number(id)));

    if (subject.length === 0) {
      return res.status(404).json({ error: "Subject not found" });
    }

    res.json(subject[0]);
  } catch (error) {
    console.error("Error fetching subject:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
