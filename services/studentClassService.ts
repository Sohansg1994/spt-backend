import { db } from "../db/client";
import { studentClasses, students, classes, users } from "../db/schema";
import { eq, and } from "drizzle-orm";

type EnrollStudentInput = {
  studentId: number;
  classId: number;
};

export const enrollStudentInClass = async ({
  studentId,
  classId,
}: EnrollStudentInput) => {
  await db.insert(studentClasses).values({ studentId, classId });
  return { studentId, classId };
};

export const getAllEnrollments = async () => {
  return await db
    .select({
      studentId: studentClasses.studentId,
      classId: studentClasses.classId,
    })
    .from(studentClasses);
};

export const getClassesForStudent = async (studentId: number) => {
  return await db
    .select({
      classId: studentClasses.classId,
      className: classes.name,
    })
    .from(studentClasses)
    .innerJoin(classes, eq(studentClasses.classId, classes.id))
    .where(eq(studentClasses.studentId, studentId));
};

export const getStudentsForClass = async (classId: number) => {
  return await db
    .select({
      studentId: studentClasses.studentId,
      studentName: users.name,
    })
    .from(studentClasses)
    .innerJoin(students, eq(studentClasses.studentId, students.id))
    .innerJoin(users, eq(students.userId, users.id))
    .where(eq(studentClasses.classId, classId));
};

export const removeStudentFromClass = async (
  studentId: number,
  classId: number
) => {
  await db
    .delete(studentClasses)
    .where(
      and(
        eq(studentClasses.studentId, studentId),
        eq(studentClasses.classId, classId)
      )
    );

  return { message: "Student unenrolled successfully" };
};
