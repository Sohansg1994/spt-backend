import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import {
  createUserInDb,
  findUserByEmail,
  getAllUsersFromDb,
  getUserByIdFromDb,
} from "../services/userService";
import { roleEnum } from "../db/schema/index";

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";
export const createUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password, role } = req.body;

    // Validate input
    if (!name || !email || !password || !role) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Check if email already exists
    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ error: "Email already exists" });
    }

    // Validate that the role is a valid enum value
    const validRoles = roleEnum.enumValues;
    if (!validRoles.includes(role)) {
      return res.status(400).json({
        error: `Invalid role. Allowed values are: ${validRoles.join(", ")}`,
      });
    }

    // Hash the password before storing it
    const saltRounds = 10; // Cost factor for bcrypt
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Insert the user into the database with the hashed password
    const result = await createUserInDb({
      name,
      email,
      password: hashedPassword, // Store the hashed password
      role,
    });

    res.status(201).json({ message: "User created successfully", result });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get all users
export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const allUsers = await getAllUsersFromDb();
    res.json(allUsers);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get a user by ID
export const getUserById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const user = await getUserByIdFromDb(Number(id));

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getAuthenticatedUser = async (req: Request, res: Response) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ error: "Authorization header missing or invalid" });
    }

    const token = authHeader.split(" ")[1];

    // Decode and verify token
    const decoded: any = jwt.verify(token, JWT_SECRET);

    const { email, id } = decoded;

    let user;

    if (email) {
      user = await findUserByEmail(email);
    } else if (id) {
      user = await getUserByIdFromDb(Number(id));
    } else {
      return res.status(400).json({ error: "Token missing email or id" });
    }

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(user);
  } catch (error) {
    console.error("Error fetching user from token:", error);
    return res.status(401).json({ error: "Invalid or expired token" });
  }
};
