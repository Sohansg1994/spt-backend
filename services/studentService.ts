import dayjs from "dayjs";
import { db } from "../db/client";
import { students, users } from "../db/schema";
import { eq, like } from "drizzle-orm";

export const getAllStudents = async () => {
  return db.select().from(students);
};

export const getStudentById = async (id: number) => {
  const result = await db.select().from(students).where(eq(students.id, id));

  return result[0] || null;
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
