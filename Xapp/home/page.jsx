"use client";

import { useState, useContext, useEffect } from "react";
import { financeContext } from "@/lib/store/financeContext";
import { authContext } from "@/lib/store/auth-context";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut, Goughnut } from "react-chartjs-2";
import { currencyFormater } from "@/lib/utils";
import SignIn from "@/components/SignIn";
import ExpenseItem from "@/components/ExpenseItem";
import IncomeModal from "@/components/Modals/IncomeModal";
import ExpenseModal from "@/components/Modals/ExpenseModal";
// import { auth } from "@/lib/firebase/config";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Home() {
  const [showAddIncomeModal, setShowAddIncomeModal] = useState(false);
  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false);

  // state to store balance
  const [balance, setBalance] = useState(0);

  // Destructuring hooks from financeContext
  const { income, expenses } = useContext(financeContext);

  // Destructuring hooks from authContext
  const { user } = useContext(authContext);

  //
  useEffect(() => {
    const newBalance =
      income.reduce((total, i) => {
        return total + i.amount;
      }, 0) -
      expenses.reduce((total, e) => {
        return total + e.total;
      }, 0);

    setBalance(newBalance);
  }, [income, expenses]);

  // Showing Login Page if user is not loggedIn
  if (!user) {
    return <SignIn />;
  }
  return (
    <>
      <IncomeModal show={showAddIncomeModal} onClose={setShowAddIncomeModal} />
      <ExpenseModal
        show={showAddExpenseModal}
        onClose={setShowAddExpenseModal}
      />

      <main className="text-gray-400">
        <p className=" text-md">My Balance</p>
        <section className="text-md py-3">
          <h2 className="text-4xl font-bold">{currencyFormater(balance)}</h2>
        </section>
        <section className="flex items-center gap-2 py-3">
          <button
            onClick={() => setShowAddExpenseModal(true)}
            className="btn btn-primary"
          >
            + Expenses
          </button>
          <button
            onClick={() => setShowAddIncomeModal(true)}
            className="btn btn-primary-outline"
          >
            + Income
          </button>
        </section>
        <section className="py-6">
          <h3 className="text-2xl">My Expenses</h3>
          <div className="flex flex-col gap-4 mt-4">
            {expenses.map((expense) => (
              <ExpenseItem key={expense.id} expense={expense} />
            ))}
          </div>
        </section>
        <section className="py-6">
          <div id="stats" />
          <h3 className="text-2xl">Stats</h3>
          <div className="w-1/2 mx-auto">
            <Doughnut
              data={{
                labels: expenses.map((expense) => expense.title),
                datasets: [
                  {
                    label: "Expenses",
                    data: expenses.map((expense) => expense.total),
                    backgroundColor: expenses.map((expense) => expense.color),
                    borderColor: ["#18181b"],
                    borderWidth: 5,
                  },
                ],
              }}
            />
          </div>
        </section>
      </main>
    </>
  );
}
