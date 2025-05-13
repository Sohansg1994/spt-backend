import { Request, Response } from "express";
import { db } from "../db/client";
import { students, users } from "../db/schema";
import { eq, and, like } from "drizzle-orm";
import dayjs from "dayjs";
import * as studentService from "../services/studentService";
import { errorResponse, successResponse } from "../utils/response";
// Create a new student

export const createStudent = async (req: Request, res: Response) => {
  try {
    const { name, email, password, gradeLevel } = req.body;

    if (!name || !email || !password || !gradeLevel) {
      return res
        .status(400)
        .json(errorResponse("All fields are required", 400));
    }

    const student = await studentService.createStudent({
      name,
      email,
      password,
      gradeLevel,
    });

    return res
      .status(201)
      .json(successResponse(student, "Student created successfully"));
  } catch (error) {
    console.error("Error creating student:", error);
    return res.status(500).json(errorResponse("Internal server error"));
  }
};

export const getAllStudents = async (req: Request, res: Response) => {
  try {
    const students = await studentService.getAllStudents();
    res.json(successResponse(students, "Students fetched successfully"));
  } catch (error) {
    console.error("Error fetching students:", error);
    res.status(500).json(errorResponse("Internal server error"));
  }
};

export const getAllStudentsWithClasses = async (
  req: Request,
  res: Response
) => {
  try {
    const students = await studentService.getAllStudentsWithClasses();
    res.json(successResponse(students, "Students fetched successfully"));
  } catch (error) {
    console.error("Error fetching students:", error);
    res.status(500).json(errorResponse("Internal server error"));
  }
};
export const getStudentById = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json(errorResponse("Invalid student ID", 400));
    }

    const student = await studentService.getStudentById(id);
    if (!student) {
      return res.status(404).json(errorResponse("Student not found", 404));
    }

    res.json(successResponse(student, "Student fetched successfully"));
  } catch (error) {
    console.error("Error fetching student by ID:", error);
    res.status(500).json(errorResponse("Internal server error"));
  }
};

export const getStudentByRegistrationNumber = async (
  req: Request,
  res: Response
) => {
  try {
    const regNo = req.params.regNo;
    if (!regNo) {
      return res
        .status(400)
        .json(errorResponse("Registration number is required", 400));
    }

    const student = await studentService.getStudentByRegistrationNumber(regNo);
    if (!student) {
      return res.status(404).json(errorResponse("Student not found", 404));
    }

    res.json(successResponse(student, "Student fetched successfully"));
  } catch (error) {
    console.error("Error fetching student by registration number:", error);
    res.status(500).json(errorResponse("Internal server error"));
  }
};
