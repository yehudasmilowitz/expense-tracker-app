"use client";

import addTransaction from "../actions/addTransaction";
import { toast } from "react-toastify";
import { useRef } from "react";

const AddTransaction = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const clientAction = async (formData: FormData) => {
    const result = await addTransaction(formData);

    if (result.error) {
      toast.error(result.error);
      return;
    }

    toast.success("Transaction added");
    formRef.current?.reset();
  };

  return (
    <>
      <h3>Add Transaction</h3>

      <form ref={formRef} action={clientAction}>
        <div className="form-control">
          <label htmlFor="text">Text</label>
          <input
            type="text"
            id="text"
            name="text"
            placeholder="Enter text..."
          />
        </div>
        <div className="form-control">
          <label htmlFor="amount">
            Amount <br /> (negative - expense, positive - income)
          </label>
          <input
            type="number"
            id="amount"
            name="amount"
            placeholder="Enter amount..."
            step="0.01"
          />
        </div>
        <button className="btn">Add transaction</button>
      </form>
    </>
  );
};

export default AddTransaction;
