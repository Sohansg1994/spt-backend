import { Router } from "express";
import * as paymentController from "../controllers/paymentController";

const router = Router();

router.post("/", paymentController.createPayment);
router.get("/", paymentController.getAllPayments);
router.get("/:id", paymentController.getPaymentById);

export default router;
