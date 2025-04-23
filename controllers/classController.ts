import { Request, Response } from "express";
import * as classService from "../services/classService";
import { successResponse, errorResponse } from "../utils/response";

export const createClass = async (req: Request, res: Response) => {
  try {
    const { name, teacherId, subjectId, instituteId, batchYear, type } =
      req.body;

    if (
      !name ||
      !teacherId ||
      !subjectId ||
      !instituteId ||
      !batchYear ||
      !type
    ) {
      return res
        .status(400)
        .json(errorResponse("All fields are required", 400));
    }

    const newClass = await classService.createClass({
      name,
      teacherId,
      subjectId,
      instituteId,
      batchYear,
      type,
    });

    return res
      .status(201)
      .json(successResponse(newClass, "Class created successfully"));
  } catch (error) {
    console.error("Error creating class:", error);
    return res.status(500).json(errorResponse("Internal server error"));
  }
};

export const getAllClasses = async (_req: Request, res: Response) => {
  try {
    const classes = await classService.getAllClasses();
    res
      .status(200)
      .json(successResponse(classes, "Classes fetched successfully"));
  } catch (error) {
    console.error("Error fetching classes:", error);
    res.status(500).json(errorResponse("Internal server error"));
  }
};

export const getClassById = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const cls = await classService.getClassById(id);

    if (!cls) {
      return res.status(404).json(errorResponse("Class not found", 404));
    }

    res.status(200).json(successResponse(cls, "Class fetched successfully"));
  } catch (error) {
    console.error("Error fetching class:", error);
    res.status(500).json(errorResponse("Internal server error"));
  }
};
