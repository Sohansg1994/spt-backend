// services/teacherService.ts
import { db } from "../db/client";
import { teachers, users } from "../db/schema";
import { like } from "drizzle-orm";
import dayjs from "dayjs";
import { eq } from "drizzle-orm";
type CreateTeacherInput = {
  name: string;
  email: string;
  password: string;
};

export const createTeacher = async ({
  name,
  email,
  password,
}: CreateTeacherInput) => {
  const year = dayjs().year();

  // Count existing teachers for the year
  const existingTeachers = await db
    .select()
    .from(teachers)
    .where(like(teachers.registrationNumber, `TCH${year}%`));

  const sequence = existingTeachers.length + 1;
  const formattedSeq = sequence.toString().padStart(4, "0");
  const registrationNumber = `TCH${year}${formattedSeq}`;

  // Create user
  const userResult = await db
    .insert(users)
    .values({
      name,
      email,
      password,
      role: "TEACHER",
    })
    .returning({ id: users.id });

  const userId = userResult[0].id;

  // Create teacher
  await db.insert(teachers).values({
    userId,
    registrationNumber,
  });

  return { registrationNumber, userId };
};

export const getAllTeachers = async () => {
  return await db
    .select({
      id: teachers.id,
      registrationNumber: teachers.registrationNumber,
      name: users.name,
      email: users.email,
    })
    .from(teachers)
    .innerJoin(users, eq(teachers.userId, users.id));
};

// Get teacher by ID
export const getTeacherById = async (id: number) => {
  const result = await db
    .select({
      id: teachers.id,
      registrationNumber: teachers.registrationNumber,
      name: users.name,
      email: users.email,
    })
    .from(teachers)
    .innerJoin(users, eq(teachers.userId, users.id))
    .where(eq(teachers.id, id));

  return result[0] ?? null;
};

// Get teacher by registration number
export const getTeacherByRegistrationNumber = async (regNo: string) => {
  const result = await db
    .select({
      id: teachers.id,
      registrationNumber: teachers.registrationNumber,
      name: users.name,
      email: users.email,
    })
    .from(teachers)
    .innerJoin(users, eq(teachers.userId, users.id))
    .where(eq(teachers.registrationNumber, regNo));

  return result[0] ?? null;
};
