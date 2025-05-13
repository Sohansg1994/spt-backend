import { db } from "../db/client";
import {
  classes,
  subjects,
  teachers,
  users,
  studentClasses,
} from "../db/schema";
import { eq, sql } from "drizzle-orm";

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
      subjectName: subjects.name,
      teacherName: users.name,
    })
    .from(classes)
    .innerJoin(subjects, eq(classes.subjectId, subjects.id))
    .innerJoin(teachers, eq(classes.teacherId, teachers.id))
    .innerJoin(users, eq(teachers.userId, users.id));
};
export const getClassesSummary = async () => {
  return await db
    .select({
      id: classes.id,
      name: classes.name,
      teacherName: users.name,
      totalEnrolled: sql<number>`COUNT(${studentClasses.studentId})`.as(
        "totalEnrolled"
      ),
    })
    .from(classes)
    .leftJoin(studentClasses, eq(classes.id, studentClasses.classId))
    .innerJoin(teachers, eq(classes.teacherId, teachers.id))
    .innerJoin(users, eq(teachers.userId, users.id))
    .groupBy(classes.id, classes.name, users.name);
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
