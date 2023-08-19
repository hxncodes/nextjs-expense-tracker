"use client";

import { useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut, Goughnut } from "react-chartjs-2";
import { currencyFormater } from "@/lib/utils";
import ExpenseItem from "@/components/ExpenseItem";
import IncomeModal from "@/components/Modals/IncomeModal";

ChartJS.register(ArcElement, Tooltip, Legend);
const dummyData = [
  { id: 1, color: "#ffb3ba", title: "Necessaties", expAmount: 200 },
  { id: 2, color: "#baffc9", title: "Dining", expAmount: 250 },
  { id: 3, color: "#ffffba", title: "Entertainment", expAmount: 340 },
  { id: 4, color: "#ccaaff", title: "Mobile", expAmount: 70 },
];

export default function Home() {
  const [showAddIncomeModal, setShowAddIncomeModal] = useState(false);

  return (
    <>
      <IncomeModal show={showAddIncomeModal} onClose={setShowAddIncomeModal} />
      <main className="text-gray-400">
        <p className=" text-md">My Balance</p>
        <section className="text-md py-3">
          <h2 className="text-4xl font-bold">{currencyFormater(100000)}</h2>
        </section>
        <section className="flex items-center gap-2 py-3">
          <button
            onClick={() => setModalOpen(true)}
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
            {dummyData.map((expense) => (
              <ExpenseItem
                key={expense.id}
                color={expense.color}
                title={expense.title}
                amount={expense.expAmount}
              />
            ))}
          </div>
        </section>
        <section className="py-6">
          <h3 className="text-2xl">Stats</h3>
          <div className="w-1/2 mx-auto">
            <Doughnut
              data={{
                labels: dummyData.map((expense) => expense.title),
                datasets: [
                  {
                    label: "Expenses",
                    data: dummyData.map((expense) => expense.expAmount),
                    backgroundColor: dummyData.map((expense) => expense.color),
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
