"use server";

import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

interface TransactionData {
  text: string;
  amount: number;
}

interface TransactionResult {
  data?: TransactionData;
  error?: string;
}

const addTransaction = async (
  formData: FormData
): Promise<TransactionResult> => {
  const textValue = formData.get("text");
  const amountValue = formData.get("amount");

  if (!textValue || !amountValue) {
    return { error: "Please enter text and amount" };
  }

  // Get logged in user
  const { userId } = auth();

  if (!userId) {
    return { error: "User not found" };
  }

  try {
    const transactionData: TransactionData = await db.transaction.create({
      data: {
        text: textValue.toString(),
        amount: parseFloat(amountValue.toString()),
        userId,
      },
    });

    revalidatePath("/");

    return { data: transactionData };
  } catch (error) {
    return { error: "Transaction not added" };
  }
};

export default addTransaction;
