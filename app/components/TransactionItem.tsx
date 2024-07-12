"use client";

import Transaction from "@/types/Transaction";
import { formatCurrency } from "@/lib/utils";
import { toast } from "react-toastify";
import deleteTransaction from "../actions/deleteTransaction";

const TransactionItem = ({ transaction }: { transaction: Transaction }) => {
  const { text, amount, createdAt, id } = transaction;
  const sign = amount < 0 ? "-" : "+";

  const handleDeleteTransaction = async (transactionId: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this transaction?"
    );

    if (!confirmed) {
      return;
    }

    const { message, error } = await deleteTransaction(transactionId);

    if (error) {
      toast.error(error);
      return;
    }

    toast.success(message);
  };

  return (
    <>
      <li className={amount < 0 ? "minus" : "plus"}>
        {text}
        <span>
          {sign}
          {formatCurrency(Math.abs(amount))}
        </span>
        <button
          className="delete-btn"
          onClick={() => handleDeleteTransaction(id)}
        >
          x
        </button>
      </li>
    </>
  );
};

export default TransactionItem;
