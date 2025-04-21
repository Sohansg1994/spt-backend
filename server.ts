import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import studentRoutes from "./routes/studentRoutes";
import userRoutes from "./routes/userRoutes";
import subjectRoutes from "./routes/subjectRoutes";
import authRoutes from "./routes/authRoutes";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/students", studentRoutes);
app.use("/api/users", userRoutes);
app.use("/api/subjects", subjectRoutes);
app.use("/api/auth", authRoutes);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));
