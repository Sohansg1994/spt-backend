import express from "express";
import {
  createInstitute,
  getAllInstitutes,
  getInstituteById,
} from "../controllers/instituteController";

const router = express.Router();

router.post("/", createInstitute);

router.get("/", getAllInstitutes);

router.get("/:id", getInstituteById);

export default router;
