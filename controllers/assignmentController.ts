import { Request, Response } from "express";
import * as assignmentService from "../services/assignmentService";
import { successResponse, errorResponse } from "../utils/response";

export const createAssignmentWithResults = async (
  req: Request,
  res: Response
) => {
  try {
    const { name, classId, date, results } = req.body;

    if (!name || !classId || !date || !Array.isArray(results)) {
      return res.status(400).json(errorResponse("Invalid input", 400));
    }

    const result = await assignmentService.createAssignmentWithResults({
      name,
      classId,
      date,
      results,
    });

    res
      .status(201)
      .json(successResponse(result, "Assignment and results created"));
  } catch (error) {
    console.error("Error creating assignment:", error);
    res.status(500).json(errorResponse("Internal server error"));
  }
};

export const getAssignmentsByClass = async (req: Request, res: Response) => {
  try {
    const classId = parseInt(req.params.classId);
    const data = await assignmentService.getAssignmentsByClass(classId);
    res.status(200).json(successResponse(data, "Assignments fetched"));
  } catch (error) {
    console.error("Error fetching assignments:", error);
    res.status(500).json(errorResponse("Internal server error"));
  }
};

export const getAssignmentResults = async (req: Request, res: Response) => {
  try {
    const assignmentId = parseInt(req.params.assignmentId);
    const results = await assignmentService.getResultsByAssignmentId(
      assignmentId
    );
    res
      .status(200)
      .json(successResponse(results, "Assignment results fetched"));
  } catch (error) {
    console.error("Error fetching assignment results:", error);
    res.status(500).json(errorResponse("Internal server error"));
  }
};
