import { db } from "../db/client";
import { assignments, assignmentResults } from "../db/schema";
import { eq } from "drizzle-orm";

interface CreateAssignmentInput {
  name: string;
  classId: number;
  date: string;
  results: {
    studentId: number;
    score: number;
    total: number;
  }[];
}

export const createAssignmentWithResults = async (
  input: CreateAssignmentInput
) => {
  const [assignment] = await db
    .insert(assignments)
    .values({ name: input.name, classId: input.classId, date: input.date })
    .returning();

  const resultsToInsert = input.results.map((result) => ({
    assignmentId: assignment.id,
    studentId: result.studentId,
    score: result.score,
    total: result.total,
  }));

  const insertedResults = await db
    .insert(assignmentResults)
    .values(resultsToInsert)
    .returning();

  return { assignment, results: insertedResults };
};

export const getAssignmentsByClass = async (classId: number) => {
  return await db
    .select()
    .from(assignments)
    .where(eq(assignments.classId, classId));
};

export const getResultsByAssignmentId = async (assignmentId: number) => {
  return await db
    .select()
    .from(assignmentResults)
    .where(eq(assignmentResults.assignmentId, assignmentId));
};

export const createSingleAssignmentResult = async (input: {
  assignmentId: number;
  studentId: number;
  score: number;
  total: number;
}) => {
  const [result] = await db.insert(assignmentResults).values(input).returning();
  return result;
};

export const updateAssignmentResult = async (
  resultId: number,
  input: { score: number; total: number }
) => {
  const [updated] = await db
    .update(assignmentResults)
    .set(input)
    .where(eq(assignmentResults.id, resultId))
    .returning();

  return updated;
};

export const getResultsByStudentId = async (studentId: number) => {
  return await db
    .select()
    .from(assignmentResults)
    .where(eq(assignmentResults.studentId, studentId));
};
