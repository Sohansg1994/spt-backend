// controllers/teacherController.ts
import { Request, Response } from "express";
import * as teacherService from "../services/teacherService";
import { successResponse, errorResponse } from "../utils/response";

export const createTeacher = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res
        .status(400)
        .json(errorResponse("All fields are required", 400));
    }

    const teacher = await teacherService.createTeacher({
      name,
      email,
      password,
    });

    return res
      .status(201)
      .json(successResponse(teacher, "Teacher created successfully"));
  } catch (error) {
    console.error("Error creating teacher:", error);
    return res.status(500).json(errorResponse("Internal server error"));
  }
};
export const getAllTeachers = async (_req: Request, res: Response) => {
  try {
    const teachers = await teacherService.getAllTeachers();
    res
      .status(200)
      .json(successResponse(teachers, "Teachers fetched successfully"));
  } catch (error) {
    console.error("Error fetching teachers:", error);
    res.status(500).json(errorResponse("Internal server error"));
  }
};

export const getTeacherById = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const teacher = await teacherService.getTeacherById(id);

    if (!teacher) {
      return res.status(404).json(errorResponse("Teacher not found", 404));
    }

    res
      .status(200)
      .json(successResponse(teacher, "Teacher fetched successfully"));
  } catch (error) {
    console.error("Error fetching teacher:", error);
    res.status(500).json(errorResponse("Internal server error"));
  }
};

export const getTeacherByRegistrationNumber = async (
  req: Request,
  res: Response
) => {
  try {
    const regNo = req.params.regNo;
    const teacher = await teacherService.getTeacherByRegistrationNumber(regNo);

    if (!teacher) {
      return res.status(404).json(errorResponse("Teacher not found", 404));
    }

    res
      .status(200)
      .json(successResponse(teacher, "Teacher fetched successfully"));
  } catch (error) {
    console.error("Error fetching teacher:", error);
    res.status(500).json(errorResponse("Internal server error"));
  }
};
