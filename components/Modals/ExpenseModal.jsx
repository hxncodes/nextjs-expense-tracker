"use client";

import React, { useRef, useState, useContext } from "react";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";
import { financeContext } from "@/lib/store/financeContext";

import Modal from "@/components/Modal";
import { Input } from "postcss";

const ExpenseModal = ({ show, onClose }) => {
  const [expenseAmount, setExpenseAmount] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showAddCategory, setShowAddCategory] = useState(false);

  const { expenses, addExpenseItem, addCategory } = useContext(financeContext);

  // Ref to take input for adding new expense category
  const titleRef = useRef();
  const colorRef = useRef();

  const addExpenseItemHandler = async () => {
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

    try {
      await addExpenseItem(selectedCategory, newExpense);
      setExpenseAmount("");
      setSelectedCategory(null);
      onClose();
      toast.success(
        `Expense Rupees ${expenseAmount} added in ${expense.title} category`
      );
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  const addCategoryHandler = async (e) => {
    e.preventDefault();
    const title = titleRef.current.value;
    const color = colorRef.current.value;

    try {
      await addCategory({ title, color, total: 0 });
      setShowAddCategory(false);
      toast.success(`${title} Category created`);
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    }
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
          <div className="flex items-center justify-between">
            <h3 className="text-2xl capitalize">Select Expense Category</h3>
            <button
              className="text-lime-400"
              onClick={() => setShowAddCategory(true)}
            >
              + New Category
            </button>
          </div>

          {showAddCategory && (
            <form
              className="flex items-center justify-between"
              onSubmit={addCategoryHandler}
            >
              <input
                type="text"
                placeholder="Enter Title"
                ref={titleRef}
                required
              />
              <label>Pick Color</label>
              <input type="color" ref={colorRef} className="w-24 h-10" />
              <button className="btn btn-primary-outline" type="submit">
                Create
              </button>
              <button
                className="btn btn-danger"
                onClick={() => setShowAddCategory(false)}
              >
                Cancel
              </button>
            </form>
          )}

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
