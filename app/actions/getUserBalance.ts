import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";

const getUserBalance = async () => {
  const { userId } = auth();
  if (!userId) {
    return { error: "User not found" };
  }

  try {
    const balance = await db.transaction.aggregate({
      where: {
        userId,
      },
      _sum: {
        amount: true,
      },
    });
    return {
      balance: balance._sum.amount || 0,
    };
  } catch (error) {
    return { error: "Error fetching balance" };
  }
};

export default getUserBalance;
