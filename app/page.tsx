import { currentUser } from "@clerk/nextjs/server";
import Guest from "@/app/components/Guest";
import AddTransaction from "@/app/components/AddTransaction";
import Balance from "@/app/components/Balance";
import IncomeExpense from "@/app/components/IncomeExpense";

const HomePage = async () => {
  const user = await currentUser();
  if (!user) {
    return <Guest />;
  }

  return (
    <main>
      <h1>Welcome, {user.firstName}</h1>
      <Balance />
      <IncomeExpense />
      <AddTransaction />
    </main>
  );
};

export default HomePage;
