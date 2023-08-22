"use client";

import { useState } from "react";
import { currencyFormater } from "@/lib/utils";
import ViewExpenseModal from "@/components/Modals/ViewExpenseModal";

const ExpenseItem = ({ expense }) => {
  const [showViewExpenseModal, setShowViewExpenseModal] = useState(false);

  return (
    <>
      <ViewExpenseModal
        show={showViewExpenseModal}
        onClose={setShowViewExpenseModal}
        expense={expense}
      />
      <button
        onClick={() => {
          setShowViewExpenseModal(true);
        }}
      >
        <div className="flex justify-between p-4 bg-slate-700 rounded-3xl">
          <div className="flex gap-2">
            <div
              className="w-[25px] h-[25px] rounded-full"
              style={{ backgroundColor: expense.color }}
            />
            <h4 className="capitalize">{expense.title}</h4>
          </div>
          <p>{currencyFormater(expense.total)}</p>
        </div>
      </button>
    </>
  );
};

export default ExpenseItem;
