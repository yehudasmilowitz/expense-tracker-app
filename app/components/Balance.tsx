import { formatCurrency } from "@/lib/utils";
import getUserBalance from "../actions/getUserBalance";

const Balance = async () => {
  const { balance } = await getUserBalance();

  return (
    <div>
      <br />
      <div>
        <h4>Your Balance</h4>
        <h1>{formatCurrency(balance ?? 0)}</h1>
      </div>
    </div>
  );
};

export default Balance;
