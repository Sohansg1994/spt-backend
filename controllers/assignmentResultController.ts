import { Request, Response } from "express";
import * as assignmentService from "../services/assignmentService";
import { successResponse, errorResponse } from "../utils/response";

/**
 * Create a single assignment result (for one student).
 */
export const createAssignmentResult = async (req: Request, res: Response) => {
  try {
    const { assignmentId, studentId, score, total } = req.body;

    if (!assignmentId || !studentId || score == null || total == null) {
      return res
        .status(400)
        .json(errorResponse("All fields are required", 400));
    }

    const result = await assignmentService.createSingleAssignmentResult({
      assignmentId,
      studentId,
      score,
      total,
    });

    res
      .status(201)
      .json(successResponse(result, "Result created successfully"));
  } catch (error) {
    console.error("Error creating result:", error);
    res.status(500).json(errorResponse("Internal server error"));
  }
};

/**
 * Update an assignment result.
 */
export const updateAssignmentResult = async (req: Request, res: Response) => {
  try {
    const resultId = parseInt(req.params.id);
    const { score, total } = req.body;

    if (score == null || total == null) {
      return res
        .status(400)
        .json(errorResponse("Score and total are required", 400));
    }

    const result = await assignmentService.updateAssignmentResult(resultId, {
      score,
      total,
    });

    if (!result) {
      return res.status(404).json(errorResponse("Result not found", 404));
    }

    res
      .status(200)
      .json(successResponse(result, "Result updated successfully"));
  } catch (error) {
    console.error("Error updating result:", error);
    res.status(500).json(errorResponse("Internal server error"));
  }
};

/**
 * Get all results for a specific student.
 */
export const getResultsByStudentId = async (req: Request, res: Response) => {
  try {
    const studentId = parseInt(req.params.studentId);
    const results = await assignmentService.getResultsByStudentId(studentId);
    res
      .status(200)
      .json(successResponse(results, "Results fetched successfully"));
  } catch (error) {
    console.error("Error fetching results:", error);
    res.status(500).json(errorResponse("Internal server error"));
  }
};
