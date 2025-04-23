import { Request, Response } from "express";
import * as attendanceService from "../services/attendanceService";
import { AttendanceStatusEnum } from "../enums/attendance";
import { successResponse, errorResponse } from "../utils/response";

export const markStudentAttendance = async (req: Request, res: Response) => {
  try {
    const { studentId, classId, date, status } = req.body;

    if (!studentId || !classId || !date || !status) {
      return res
        .status(400)
        .json(errorResponse("Missing required fields", 400));
    }

    if (!Object.values(AttendanceStatusEnum).includes(status)) {
      return res
        .status(400)
        .json(errorResponse("Invalid attendance status", 400));
    }

    const attendance = await attendanceService.markAttendance({
      studentId,
      classId,
      date,
      status,
    });

    res.status(200).json(successResponse(attendance, "Attendance marked"));
  } catch (error) {
    console.error(error);
    res.status(500).json(errorResponse("Internal server error"));
  }
};

export const getStudentAttendance = async (req: Request, res: Response) => {
  try {
    const studentId = parseInt(req.params.studentId);
    const data = await attendanceService.getAttendanceByStudent(studentId);
    res.json(successResponse(data));
  } catch (error) {
    res.status(500).json(errorResponse("Internal server error"));
  }
};

export const getClassAttendance = async (req: Request, res: Response) => {
  try {
    const classId = parseInt(req.params.classId);
    const { date } = req.query;
    const data = await attendanceService.getAttendanceByClass(
      classId,
      date as string
    );
    res.json(successResponse(data));
  } catch (error) {
    res.status(500).json(errorResponse("Internal server error"));
  }
};
