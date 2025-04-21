import { db } from "../db/client";
import { attendance, attendanceStatus } from "../db/schema/index";
import { Request, Response } from "express";
import { eq } from "drizzle-orm";

// Create a new attendance record
export const createAttendance = async (req: Request, res: Response) => {
  try {
    const { studentId, date, status } = req.body;

    // Validate input
    if (!studentId || !date || !status) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Validate that the status is a valid enum value
    const validStatuses = attendanceStatus.enumValues;
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        error: `Invalid status. Allowed values are: ${validStatuses.join(
          ", "
        )}`,
      });
    }

    // Insert the attendance record into the database
    const result = await db.insert(attendance).values({
      studentId,
      date,
      status,
    });

    res
      .status(201)
      .json({ message: "Attendance record created successfully", result });
  } catch (error) {
    console.error("Error creating attendance record:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get all attendance records
export const getAllAttendance = async (req: Request, res: Response) => {
  try {
    const allAttendance = await db.select().from(attendance);
    res.json(allAttendance);
  } catch (error) {
    console.error("Error fetching attendance records:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get an attendance record by ID
export const getAttendanceById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const attendanceRecord = await db
      .select()
      .from(attendance)
      .where(eq(attendance.id, Number(id)));

    if (attendanceRecord.length === 0) {
      return res.status(404).json({ error: "Attendance record not found" });
    }

    res.json(attendanceRecord[0]);
  } catch (error) {
    console.error("Error fetching attendance record:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
