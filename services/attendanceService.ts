import { db } from "../db/client";
import { attendance } from "../db/schema";
import { eq, and } from "drizzle-orm";
import dayjs from "dayjs";
import { AttendanceStatusEnum } from "../enums/attendance";
// Mark or update attendance
export const markAttendance = async ({
  studentId,
  classId,
  date,
  status,
}: {
  studentId: number;
  classId: number;
  date: string;
  status: AttendanceStatusEnum;
}) => {
  const formattedDate = dayjs(date).format("YYYY-MM-DD");

  const [existing] = await db
    .select()
    .from(attendance)
    .where(
      and(
        eq(attendance.studentId, studentId),
        eq(attendance.classId, classId),
        eq(attendance.date, formattedDate)
      )
    );

  if (existing) {
    const [updated] = await db
      .update(attendance)
      .set({ status })
      .where(eq(attendance.id, existing.id))
      .returning();
    return updated;
  }

  const [created] = await db
    .insert(attendance)
    .values({
      studentId,
      classId,
      date: formattedDate,
      status,
    })
    .returning();
  return created;
};

// Get attendance for a student
export const getAttendanceByStudent = async (studentId: number) => {
  return await db
    .select()
    .from(attendance)
    .where(eq(attendance.studentId, studentId));
};

// Get attendance for a class (optionally filtered by date)
export const getAttendanceByClass = async (classId: number, date?: string) => {
  const conditions = [eq(attendance.classId, classId)];

  if (date) {
    const formattedDate = dayjs(date).format("YYYY-MM-DD");
    conditions.push(eq(attendance.date, formattedDate));
  }

  return await db
    .select()
    .from(attendance)
    .where(and(...conditions));
};
