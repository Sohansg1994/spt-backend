import { db } from "../db/client";
import { classes, institutes, subjects, teachers } from "../db/schema";
import { eq } from "drizzle-orm";

type CreateClassInput = {
  name: string;
  teacherId: number;
  subjectId: number;
  instituteId: number;
  batchYear: number;
  type: string;
};

export const createClass = async ({
  name,
  teacherId,
  subjectId,
  instituteId,
  batchYear,
  type,
}: CreateClassInput) => {
  const result = await db
    .insert(classes)
    .values({
      name,
      teacherId,
      subjectId,
      instituteId,
      batchYear,
      type,
    })
    .returning();

  return result[0];
};

export const getAllClasses = async () => {
  return await db
    .select({
      id: classes.id,
      name: classes.name,
      type: classes.type,
      batchYear: classes.batchYear,
      teacherId: classes.teacherId,
      subjectId: classes.subjectId,
      instituteId: classes.instituteId,
    })
    .from(classes);
};

export const getClassById = async (id: number) => {
  const result = await db
    .select({
      id: classes.id,
      name: classes.name,
      type: classes.type,
      batchYear: classes.batchYear,
      teacherId: classes.teacherId,
      subjectId: classes.subjectId,
      instituteId: classes.instituteId,
    })
    .from(classes)
    .where(eq(classes.id, id));

  return result[0] ?? null;
};
