import { Request, Response } from "express";
import * as paymentService from "../services/paymentService";
import { successResponse, errorResponse } from "../utils/response";

export const createPayment = async (req: Request, res: Response) => {
  try {
    const { studentId, classId, amount, forMonth, paidAt, isFree } = req.body;

    if (!studentId || !classId || !amount || !forMonth || !paidAt) {
      return res
        .status(400)
        .json(errorResponse("Missing required fields", 400));
    }

    const payment = await paymentService.createPayment({
      studentId,
      classId,
      amount,
      forMonth,
      paidAt: new Date(paidAt),
      isFree: isFree ?? false,
    });

    return res
      .status(201)
      .json(successResponse(payment, "Payment created successfully"));
  } catch (error) {
    console.error("Error creating payment:", error);
    res.status(500).json(errorResponse("Internal server error"));
  }
};

export const getAllPayments = async (_req: Request, res: Response) => {
  try {
    const payments = await paymentService.getAllPayments();
    res
      .status(200)
      .json(successResponse(payments, "Payments fetched successfully"));
  } catch (error) {
    console.error("Error fetching payments:", error);
    res.status(500).json(errorResponse("Internal server error"));
  }
};

export const getPaymentById = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const payment = await paymentService.getPaymentById(id);

    if (!payment) {
      return res.status(404).json(errorResponse("Payment not found", 404));
    }

    res
      .status(200)
      .json(successResponse(payment, "Payment fetched successfully"));
  } catch (error) {
    console.error("Error fetching payment:", error);
    res.status(500).json(errorResponse("Internal server error"));
  }
};
