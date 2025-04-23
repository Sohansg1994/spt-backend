import { db } from "../db/client";
import { subjects } from "../db/schema";
import { eq } from "drizzle-orm";

type CreateSubjectInput = {
  name: string;
};

export const createSubject = async ({ name }: CreateSubjectInput) => {
  const result = await db
    .insert(subjects)
    .values({ name })
    .returning({ id: subjects.id, name: subjects.name });

  return result[0];
};

export const getAllSubjects = async () => {
  return await db
    .select({ id: subjects.id, name: subjects.name })
    .from(subjects);
};

export const getSubjectById = async (id: number) => {
  const result = await db
    .select({ id: subjects.id, name: subjects.name })
    .from(subjects)
    .where(eq(subjects.id, id));

  return result[0] ?? null;
};
