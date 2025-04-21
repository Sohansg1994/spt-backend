import {
  pgTable,
  serial,
  text,
  integer,
  date,
  timestamp,
  pgEnum,
  primaryKey,
} from "drizzle-orm/pg-core";

export const roleEnum = pgEnum("role", ["ADMIN", "TEACHER", "STUDENT"]);
// Duplicate declaration removed

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").unique().notNull(),
  password: text("password").notNull(),
  role: roleEnum("role").notNull(),
});

export const students = pgTable("students", {
  id: serial("id").primaryKey(),
  userId: integer("user_id")
    .references(() => users.id)
    .notNull(),
  gradeLevel: text("grade_level"),
  enrollmentDate: date("enrollment_date"),
});

export const subjects = pgTable("subjects", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
});

export const assessments = pgTable("assessments", {
  id: serial("id").primaryKey(),
  studentId: integer("student_id")
    .references(() => students.id)
    .notNull(),
  subjectId: integer("subject_id")
    .references(() => subjects.id)
    .notNull(),
  score: integer("score").notNull(),
  total: integer("total").notNull(),
  date: date("date").notNull(),
});

export const attendanceStatus = pgEnum("status", ["PRESENT", "ABSENT", "LATE"]);

export const attendance = pgTable("attendance", {
  id: serial("id").primaryKey(),
  studentId: integer("student_id")
    .references(() => students.id)
    .notNull(),
  date: date("date").notNull(),
  status: attendanceStatus("status").notNull(),
});
