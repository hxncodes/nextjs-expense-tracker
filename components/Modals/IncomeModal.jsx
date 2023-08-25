import React, { useContext, useRef, useEffect } from "react";
import { toast } from "react-toastify";
import { FaRegTrashAlt } from "react-icons/fa";
import { currencyFormater } from "@/lib/utils";
import Modal from "@/components/Modal";
import { financeContext } from "@/lib/store/financeContext";
import { authContext } from "@/lib/store/auth-context";

const IncomeModal = ({ show, onClose }) => {
  // useRef hook to get data from the form
  const amountRef = useRef();
  const descriptionRef = useRef();

  // callaing financeContext values
  const { income, addIncomeItem, removeIncomeItem } =
    useContext(financeContext);

  const { user } = useContext(authContext);

  // Handler AddIncome
  const addIncomeHandler = async (e) => {
    e.preventDefault();
    const amount = +amountRef.current.value;
    const description = descriptionRef.current.value;
    const newIncome = {
      amount: amount,
      description: description,
      createdAt: new Date(),
      uid: user.uid,
    };

    try {
      await addIncomeItem(newIncome);

      // setting input fields as empty
      amountRef.current.value = "";
      descriptionRef.current.value = "";
      toast.success(`${amount} Rupees added in Income as ${description}`);
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  // Handler DeleteIncome
  const deleteIncomeHandler = async (incomeId) => {
    try {
      await removeIncomeItem(incomeId);
      toast.info("Income item deleted");
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };

  return (
    <Modal show={show} onClose={onClose}>
      <form onSubmit={addIncomeHandler} className="input-grp">
        <div className="input-grp">
          <label className="" htmlFor="amount">
            Income Amount
          </label>
          <input
            ref={amountRef}
            name="amount"
            type="number"
            min={0.01}
            step={0.01}
            placeholder="Enter Income amount"
            required
          />
        </div>
        <div className="input-grp">
          <label htmlFor="description">Description</label>
          <input
            ref={descriptionRef}
            name="description"
            type="text"
            placeholder="Enter Income description"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Add Income
        </button>
      </form>
      <div className="flex flex-col gap-4 mt-6">
        <h3 className="text-2xl font-bold">Income History</h3>
        {income.map((i) => {
          return (
            <div className="flex items-center justify-between" key={i.id}>
              <div>
                <p className="font-semibold">{i.description}</p>
                <small className="text-xs">{i.createdAt.toISOString()}</small>
              </div>
              <p className="flex items-center gap-2">
                {currencyFormater(i.amount)}
                <button
                  onClick={() => {
                    deleteIncomeHandler(i.id);
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

export default IncomeModal;
