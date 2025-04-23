import { Request, Response } from "express";
import * as subjectService from "../services/subjectService";
import { successResponse, errorResponse } from "../utils/response";

export const createSubject = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res
        .status(400)
        .json(errorResponse("Subject name is required", 400));
    }

    const subject = await subjectService.createSubject({ name });

    return res
      .status(201)
      .json(successResponse(subject, "Subject created successfully"));
  } catch (error) {
    console.error("Error creating subject:", error);
    res.status(500).json(errorResponse("Internal server error"));
  }
};

export const getAllSubjects = async (_req: Request, res: Response) => {
  try {
    const subjects = await subjectService.getAllSubjects();
    res
      .status(200)
      .json(successResponse(subjects, "Subjects fetched successfully"));
  } catch (error) {
    console.error("Error fetching subjects:", error);
    res.status(500).json(errorResponse("Internal server error"));
  }
};

export const getSubjectById = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const subject = await subjectService.getSubjectById(id);

    if (!subject) {
      return res.status(404).json(errorResponse("Subject not found", 404));
    }

    res
      .status(200)
      .json(successResponse(subject, "Subject fetched successfully"));
  } catch (error) {
    console.error("Error fetching subject:", error);
    res.status(500).json(errorResponse("Internal server error"));
  }
};
