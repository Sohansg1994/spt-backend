import { db } from "../db/client";
import { users } from "../db/schema/index";
import { eq } from "drizzle-orm";

// Find a user by email
export const findUserByEmail = async (email: string) => {
  try {
    const user = await db.select().from(users).where(eq(users.email, email));

    return user.length > 0 ? user[0] : null;
  } catch (error) {
    console.error("Error finding user by email:", error);
    throw new Error("Internal server error");
  }
};

// Create a new user
export const createUserInDb = async (userData: {
  name: string;
  email: string;
  password: string;
  role: "ADMIN" | "TEACHER" | "STUDENT";
}) => {
  try {
    const result = await db.insert(users).values(userData);
    return result;
  } catch (error) {
    console.error("Error creating user in database:", error);
    throw new Error("Internal server error");
  }
};

// Get all users
export const getAllUsersFromDb = async () => {
  try {
    return await db.select().from(users);
  } catch (error) {
    console.error("Error fetching all users:", error);
    throw new Error("Internal server error");
  }
};

// Get a user by ID
export const getUserByIdFromDb = async (id: number) => {
  try {
    const user = await db.select().from(users).where(eq(users.id, id));

    return user.length > 0 ? user[0] : null;
  } catch (error) {
    console.error("Error fetching user by ID:", error);
    throw new Error("Internal server error");
  }
};
