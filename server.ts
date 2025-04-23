import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import instituteRoutes from "./routes/instituteRoutes";
import userRoutes from "./routes/userRoutes";
import studentRoutes from "./routes/studentRoutes";
import teachersRoutes from "./routes/teacherRoutes";
import classRoutes from "./routes/classRoutes";
import enrollmentRoutes from "./routes/enrollmentRoutes";
import subjectRoutes from "./routes/subjectRoutes";
import assignmentResultRoutes from "./routes/assignmentResultRoutes";
import assignmentRoutes from "./routes/assignmentRoutes";
import attendanceRoutes from "./routes/attendanceRoutes";
import paymentRoutes from "./routes/paymentRoutes";
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/user", userRoutes);
app.use("/api/institute", instituteRoutes);
app.use("/api/students", studentRoutes);
app.use("/api/teachers", teachersRoutes);
app.use("/api/classes", classRoutes);
app.use("/api/enrollments", enrollmentRoutes);
app.use("/api/subjects", subjectRoutes);
app.use("/api/assignmentResults", assignmentResultRoutes);
app.use("/api/assignments", assignmentRoutes);
app.use("/api/attendance", attendanceRoutes);
app.use("/api/payments", paymentRoutes);
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));
