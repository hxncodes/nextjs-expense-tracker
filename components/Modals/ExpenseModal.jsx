"use client";

import React, { useState, useContext } from "react";
import { financeContext } from "@/lib/store/financeContext";
import { currencyFormater } from "@/lib/utils";
import { v4 as uuidv4 } from "uuid";

import Modal from "@/components/Modal";

const ExpenseModal = ({ show, onClose }) => {
  const [expenseAmount, setExpenseAmount] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);

  const { expenses } = useContext(financeContext);

  const addExpenseItemHandler = () => {
    const expense = expenses.find((e) => {
      return e.id === selectedCategory;
    });
    const newExpense = {
      color: expense.color,
      title: expense.title,
      total: expense.total + +expenseAmount,
      items: [
        ...expense.items,
        {
          amount: +expenseAmount,
          createdAt: new Date(),
          id: uuidv4(),
        },
      ],
    };

    console.log(newExpense);
    setExpenseAmount("");
    setSelectedCategory(null);
    onClose();
  };
  return (
    <Modal show={show} onClose={onClose}>
      <div className="input-grp">
        <label className="" htmlFor="amount">
          Enter an Amount
        </label>
        <input
          name="amount"
          type="number"
          min={0.01}
          step={0.01}
          placeholder="Enter Expense amount"
          required
          value={expenseAmount}
          onChange={(e) => {
            setExpenseAmount(e.target.value);
          }}
        />
      </div>
      {expenseAmount > 0 && (
        <div className="flex flex-col gap-4 mt-6">
          <h3 className="text-2xl capitalize">Select Expense Category</h3>
          {expenses.map((e) => {
            return (
              <button
                key={e.id}
                onClick={() => {
                  setSelectedCategory(e.id);
                }}
              >
                <div
                  style={{
                    boxShadow:
                      e.id === selectedCategory ? "1px 1px 4px" : "none",
                  }}
                  className="flex items-center justify-between p-4 bg-slate-700 rounded-3xl"
                >
                  <div className="flex items-center gap-2">
                    <div
                      className="w-[25px] h-[25px] rounded-full"
                      style={{ backgroundColor: e.color }}
                    ></div>
                    <h4 className="capitalize">{e.title}</h4>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      )}

      {expenseAmount > 0 && (
        <div className="mt-6">
          <button className="btn btn-primary" onClick={addExpenseItemHandler}>
            Add Expense
          </button>
        </div>
      )}
    </Modal>
  );
};

export default ExpenseModal;
