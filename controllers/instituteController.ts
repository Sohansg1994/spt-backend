import { Request, Response } from "express";
import { institutes } from "../db/schema";
import { db } from "../db/client";
import { eq } from "drizzle-orm";
import { successResponse, errorResponse } from "../utils/response";

// Create a new Institute
export const createInstitute = async (req: Request, res: Response) => {
  try {
    const { name, address, phone } = req.body;

    if (!name || !address || !phone) {
      return res
        .status(400)
        .json(errorResponse("Name, address, and phone are required", 400));
    }

    const result = await db.insert(institutes).values({ name, address, phone });

    res
      .status(201)
      .json(successResponse(result, "Institute created successfully"));
  } catch (error) {
    console.error("Error creating institute:", error);
    res.status(500).json(errorResponse("Internal server error"));
  }
};

// Get all Institutes
export const getAllInstitutes = async (_req: Request, res: Response) => {
  try {
    const result = await db.select().from(institutes);
    res.json(successResponse(result, "Institutes retrieved successfully"));
  } catch (error) {
    console.error("Error fetching institutes:", error);
    res.status(500).json(errorResponse("Internal server error"));
  }
};

// Get Institute by ID
export const getInstituteById = async (req: Request, res: Response) => {
  try {
    const instituteId = parseInt(req.params.id);

    if (isNaN(instituteId)) {
      return res.status(400).json(errorResponse("Invalid institute ID", 400));
    }

    const result = await db
      .select()
      .from(institutes)
      .where(eq(institutes.id, instituteId));

    if (result.length === 0) {
      return res.status(404).json(errorResponse("Institute not found", 404));
    }

    res.json(successResponse(result[0], "Institute found"));
  } catch (error) {
    console.error("Error fetching institute by ID:", error);
    res.status(500).json(errorResponse("Internal server error"));
  }
};
