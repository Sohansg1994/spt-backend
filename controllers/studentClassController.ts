import { Request, Response } from "express";
import * as studentClassService from "../services/studentClassService";
import { successResponse, errorResponse } from "../utils/response";

export const enrollStudentInClass = async (req: Request, res: Response) => {
  try {
    const { studentId, classId } = req.body;

    if (!studentId || !classId) {
      return res
        .status(400)
        .json(errorResponse("studentId and classId are required", 400));
    }

    const result = await studentClassService.enrollStudentInClass({
      studentId,
      classId,
    });

    res
      .status(201)
      .json(successResponse(result, "Student enrolled successfully"));
  } catch (error) {
    console.error("Error enrolling student:", error);
    res.status(500).json(errorResponse("Internal server error"));
  }
};

export const enrollMultipleStudents = async (req: Request, res: Response) => {
  try {
    const { studentIds, classId } = req.body;

    if (!Array.isArray(studentIds) || studentIds.length === 0 || !classId) {
      return res
        .status(400)
        .json(
          errorResponse("studentIds (array) and classId are required", 400)
        );
    }

    const result = await studentClassService.enrollMultipleStudentsInClass({
      studentIds,
      classId,
    });

    res
      .status(201)
      .json(successResponse(result, "Students enrolled successfully"));
  } catch (error) {
    console.error("Error enrolling multiple students:", error);
    res.status(500).json(errorResponse("Internal server error"));
  }
};

export const getAllEnrollments = async (_req: Request, res: Response) => {
  try {
    const enrollments = await studentClassService.getAllEnrollments();
    res
      .status(200)
      .json(successResponse(enrollments, "Enrollments fetched successfully"));
  } catch (error) {
    console.error("Error fetching enrollments:", error);
    res.status(500).json(errorResponse("Internal server error"));
  }
};

export const getClassesForStudent = async (req: Request, res: Response) => {
  try {
    const studentId = parseInt(req.params.studentId);
    const classes = await studentClassService.getClassesForStudent(studentId);
    res
      .status(200)
      .json(successResponse(classes, "Classes fetched successfully"));
  } catch (error) {
    console.error("Error fetching classes:", error);
    res.status(500).json(errorResponse("Internal server error"));
  }
};

export const getStudentsForClass = async (req: Request, res: Response) => {
  try {
    const classId = parseInt(req.params.classId);
    const students = await studentClassService.getStudentsForClass(classId);
    res
      .status(200)
      .json(successResponse(students, "Students fetched successfully"));
  } catch (error) {
    console.error("Error fetching students:", error);
    res.status(500).json(errorResponse("Internal server error"));
  }
};

export const removeStudentFromClass = async (req: Request, res: Response) => {
  try {
    const studentId = parseInt(req.body.studentId);
    const classId = parseInt(req.body.classId);

    if (!studentId || !classId) {
      return res
        .status(400)
        .json(errorResponse("studentId and classId are required", 400));
    }

    const result = await studentClassService.removeStudentFromClass(
      studentId,
      classId
    );
    res
      .status(200)
      .json(successResponse(result, "Student unenrolled successfully"));
  } catch (error) {
    console.error("Error removing student from class:", error);
    res.status(500).json(errorResponse("Internal server error"));
  }
};
