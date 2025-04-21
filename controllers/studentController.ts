// filepath: c:\Users\SohanSG\Documents\GitHub\student-progress-tracker\controllers\studentController.ts
import { db } from "../db/client";
import { students, users } from "../db/schema/index";
import { Request, Response } from "express";
import { eq } from "drizzle-orm";
export const getAllStudents = async (req: Request, res: Response) => {
  const all = await db.select().from(students);
  res.json(all);
};

export const createStudent = async (req: Request, res: Response) => {
  try {
    const { userId, gradeLevel, enrollmentDate } = req.body;

    // Check if the userId exists in the users table
    const userExists = await db
      .select()
      .from(users)
      .where(eq(users.id, userId)); // Ensure this syntax is correct for Drizzle ORM

    if (userExists.length === 0) {
      return res
        .status(400)
        .json({ error: "Invalid userId. User does not exist." });
    }

    // Insert the student into the database
    const result = await db.insert(students).values({
      userId,
      gradeLevel,
      enrollmentDate,
    });

    res.status(201).json({ message: "Student created successfully", result });
  } catch (error) {
    console.error("Error creating student:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
