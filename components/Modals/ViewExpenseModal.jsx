"use client";

import { useContext } from "react";
import { toast } from "react-toastify";
import { financeContext } from "@/lib/store/financeContext";
import { currencyFormater } from "@/lib/utils";
import Modal from "../Modal";
import { FaRegTrashAlt } from "react-icons/fa";

const ViewExpenseModal = ({ show, onClose, expense }) => {
  const { deleteExpenseItem, deleteExpenseCategory } =
    useContext(financeContext);

  // Delete Expense item
  const deleteItemHandler = async (item) => {
    try {
      const updatedItems = expense.items.filter((i) => i.id !== item.id);
      const updatedExpense = {
        items: [...updatedItems],
        total: expense.total - item.amount,
      };

      await deleteExpenseItem(updatedExpense, expense.id);
      toast.success("Expense item deleted successfull");
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  //   Delete Expense Category
  const deleteExpenseCategoryHandler = async () => {
    if (
      window.confirm(
        `Are you sure you want to delete ${expense.title} category?`
      )
    ) {
      try {
        await deleteExpenseCategory(expense.id);
        toast.success(`Category ${expense.title} deleted`);
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    }
  };

  return (
    <Modal show={show} onClose={onClose}>
      <div className="flex items-center justify-between">
        <h2 className="text-4xl">{expense.title}</h2>
        <button
          className="btn btn-danger"
          onClick={deleteExpenseCategoryHandler}
        >
          Delete
        </button>
      </div>

      <div>
        <h3 className="my-4 text-2xl">Expense History</h3>
        {expense.items.map((item) => {
          return (
            <div key={item.id} className="flex items-center justify-between">
              <small>
                {item.createdAt.toMillis
                  ? new Date(item.createdAt.toMillis()).toISOString()
                  : item.createdAt.toISOString()}
              </small>
              <p className="flex items-center gap-2">
                {currencyFormater(item.amount)}

                <button
                  onClick={() => {
                    deleteItemHandler(item);
                  }}
                >
                  <FaRegTrashAlt />
                </button>
              </p>
            </div>
          );
        })}
      </div>
    </Modal>
  );
};

export default ViewExpenseModal;
