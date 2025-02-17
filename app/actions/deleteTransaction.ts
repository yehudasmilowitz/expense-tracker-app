"use server";

import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

const deleteTransaction = async (transactionId: string) => {
  const { userId } = auth();
  if (!userId) {
    return { error: "User not found" };
  }

  try {
    await db.transaction.delete({
      where: {
        id: transactionId,
        userId,
      },
    });

    revalidatePath("/");

    return { message: "Transaction deleted" };
  } catch (error) {
    return { error: "Transaction not deleted" };
  }
};

export default deleteTransaction;
