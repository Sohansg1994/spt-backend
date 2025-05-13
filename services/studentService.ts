import dayjs from "dayjs";
import { db } from "../db/client";
import { students, users, studentClasses, classes } from "../db/schema";
import { eq, like } from "drizzle-orm";

export const getAllStudents = async () => {
  return await db
    .select({
      id: students.id,
      registrationNumber: students.registrationNumber,
      name: users.name,
      email: users.email,
      gradeLevel: students.gradeLevel,
    })
    .from(students)
    .innerJoin(users, eq(students.userId, users.id));
};

export const getStudentById = async (id: number) => {
  const result = await db.select().from(students).where(eq(students.id, id));

  return result[0] || null;
};
export const getAllStudentsWithClasses = async () => {
  // First, fetch all students with their basic info
  const studentsWithUser = await db
    .select({
      id: students.id,
      registrationNumber: students.registrationNumber,
      name: users.name,
      email: users.email,
    })
    .from(students)
    .innerJoin(users, eq(students.userId, users.id));

  // Then, for each student, fetch their class enrollments
  const result = await Promise.all(
    studentsWithUser.map(async (student) => {
      const enrolledClasses = await db
        .select({
          classId: classes.id,
          name: classes.name,
        })
        .from(studentClasses)
        .innerJoin(classes, eq(studentClasses.classId, classes.id))
        .where(eq(studentClasses.studentId, student.id));

      return {
        ...student,
        classes: enrolledClasses,
      };
    })
  );

  return result;
};
export const getStudentByRegistrationNumber = async (regNo: string) => {
  const result = await db
    .select()
    .from(students)
    .where(eq(students.registrationNumber, regNo));

  return result[0] || null;
};

type CreateStudentInput = {
  name: string;
  email: string;
  password: string;
  gradeLevel: string;
};

export const createStudent = async ({
  name,
  email,
  password,
  gradeLevel,
}: CreateStudentInput) => {
  const year = dayjs().year();

  // Count existing students for this year
  const existingStudents = await db
    .select()
    .from(students)
    .where(like(students.registrationNumber, `STD${year}%`));

  const sequence = existingStudents.length + 1;
  const formattedSeq = sequence.toString().padStart(4, "0");
  const registrationNumber = `STD${year}${formattedSeq}`;

  // Create user
  const userResult = await db
    .insert(users)
    .values({
      name,
      email,
      password,
      role: "STUDENT",
    })
    .returning({ id: users.id });

  const userId = userResult[0].id;

  // Create student
  await db.insert(students).values({
    userId,
    registrationNumber,
    gradeLevel,
    enrollmentDate: new Date().toISOString(), // ensure string
  });

  return { registrationNumber, userId };
};
