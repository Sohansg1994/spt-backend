import { db } from "../db/client";
import { payments } from "../db/schema";
import { eq } from "drizzle-orm";

type CreatePaymentInput = {
  studentId: number;
  classId: number;
  amount: number;
  forMonth: string;
  paidAt: Date; // updated to Date object
  isFree?: boolean;
};

export const createPayment = async (input: CreatePaymentInput) => {
  const result = await db
    .insert(payments)
    .values({
      ...input,
      amount: input.amount.toString(),
      paidAt: input.paidAt.toISOString(), // 👈 ensure it's ISO string
    })
    .returning();

  return result[0];
};

export const getAllPayments = async () => {
  return await db.select().from(payments);
};

export const getPaymentById = async (id: number) => {
  const result = await db.select().from(payments).where(eq(payments.id, id));

  return result[0] ?? null;
};
