import {
  pgTable,
  serial,
  text,
  integer,
  date,
  pgEnum,
  primaryKey,
} from "drizzle-orm/pg-core";
import { ClassTypeEnum } from "../../enums/classType";
import { AttendanceStatusEnum } from "../../enums/attendance";

/* Enums */
export const roleEnum = pgEnum("role", ["ADMIN", "TEACHER", "STUDENT"]);
export const attendanceStatus = pgEnum("attendance_status", [
  "PRESENT",
  "ABSENT",
  "LATE",
]);

/* Institutes */
export const institutes = pgTable("institutes", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  address: text("address"),
  phone: text("phone"),
});

/* Users (generic login system) */
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").unique().notNull(),
  password: text("password").notNull(),
  role: roleEnum("role").notNull(),
});

/* Teachers */
export const teachers = pgTable("teachers", {
  id: serial("id").primaryKey(),
  userId: integer("user_id")
    .references(() => users.id)
    .notNull(),
  registrationNumber: text("registration_number").unique().notNull(),
});

/* Students */
export const students = pgTable("students", {
  id: serial("id").primaryKey(),
  userId: integer("user_id")
    .references(() => users.id)
    .notNull(),
  registrationNumber: text("registration_number").unique().notNull(), // e.g., STD20250001
  gradeLevel: text("grade_level"),
  enrollmentDate: date("enrollment_date"),
});

/* Subjects */
export const subjects = pgTable("subjects", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(), // e.g., Physics
});

/* Classes */
export const classes = pgTable("classes", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(), // e.g., Physics Revision - Damayanthi Miss
  teacherId: integer("teacher_id")
    .references(() => teachers.id)
    .notNull(),
  subjectId: integer("subject_id")
    .references(() => subjects.id)
    .notNull(),
  instituteId: integer("institute_id")
    .references(() => institutes.id)
    .notNull(),
  batchYear: integer("batch_year").notNull(), // e.g., 2025
  type: text("type", {
    enum: Object.values(ClassTypeEnum) as [string, ...string[]],
  })
    .notNull()
    .default(ClassTypeEnum.NONE_OF_ABOVE),
});

/* Student-Class Enrollments */
export const studentClasses = pgTable(
  "student_classes",
  {
    studentId: integer("student_id")
      .references(() => students.id)
      .notNull(),
    classId: integer("class_id")
      .references(() => classes.id)
      .notNull(),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.studentId, table.classId] }),
  })
);

/* Assessments (per class per student) */
export const assignments = pgTable("assignments", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  classId: integer("class_id")
    .references(() => classes.id)
    .notNull(),
  date: date("date").notNull(),
});

export const assignmentResults = pgTable("assignment_results", {
  id: serial("id").primaryKey(),
  assignmentId: integer("assignment_id")
    .references(() => assignments.id)
    .notNull(),
  studentId: integer("student_id")
    .references(() => students.id)
    .notNull(),
  score: integer("score").notNull(),
  total: integer("total").notNull(),
});
/* Attendance (per class per student per date) */
export const attendance = pgTable("attendance", {
  id: serial("id").primaryKey(),
  studentId: integer("student_id")
    .references(() => students.id)
    .notNull(),
  classId: integer("class_id")
    .references(() => classes.id)
    .notNull(),
  date: date("date").notNull(),
  status: text("status", {
    enum: Object.values(AttendanceStatusEnum) as [string, ...string[]],
  })
    .notNull()
    .default(AttendanceStatusEnum.PRESENT),
});
