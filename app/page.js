"use client";

import { useState, useEffect, useRef } from "react";
import ExpenseItem from "@/components/ExpenseItem";
import { currencyFormater } from "@/lib/utils";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut, Goughnut } from "react-chartjs-2";
import Modal from "@/components/Modal";
import { FaRegTrashAlt } from "react-icons/fa";

// Firebase
import { db } from "@/lib/firebase";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  deleteDoc,
} from "firebase/firestore";

ChartJS.register(ArcElement, Tooltip, Legend);
const dummyData = [
  { id: 1, color: "#ffb3ba", title: "Necessaties", expAmount: 200 },
  { id: 2, color: "#baffc9", title: "Dining", expAmount: 250 },
  { id: 3, color: "#ffffba", title: "Entertainment", expAmount: 340 },
  { id: 4, color: "#ccaaff", title: "Mobile", expAmount: 70 },
];

export default function Home() {
  const [income, setIncome] = useState([]);
  const [showAddIncomeModal, setShowAddIncomeModal] = useState(false);
  const amountRef = useRef();
  const descriptionRef = useRef();

  const addIncomeHandler = async (e) => {
    e.preventDefault();
    const newIncome = {
      amount: amountRef.current.value,
      description: descriptionRef.current.value,
      createdAt: new Date(),
    };

    // Saving data in Firebase in collection named income
    const collectionRef = collection(db, "income");
    try {
      const docSnap = await addDoc(collectionRef, newIncome);
      setIncome((prev) => {
        return [
          ...prev,
          {
            id: docSnap,
            ...newIncome,
          },
        ];
      });
      amountRef.current.value = "";
      descriptionRef.current.value = "";
    } catch (error) {
      console.log(error);
    }
  };

  // Delete Income
  const deleteIncomeHandler = async (incomeId) => {
    if (window.confirm("Are you sure?")) {
      const docRef = doc(db, "income", incomeId);
      try {
        await deleteDoc(docRef);
        setIncome((prev) => {
          return prev.filter((i) => i.id !== incomeId);
        });
      } catch (error) {
        console.log(error.message);
      }
    } else {
      console.log("not deleted");
    }
  };

  // Fetching data from firebase
  useEffect(() => {
    const getIncomeData = async () => {
      const collectionRef = collection(db, "income");
      const docsSnap = await getDocs(collectionRef);

      const data = docsSnap.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
          createdAt: new Date(doc.data().createdAt.toMillis()),
        };
      });
      setIncome(data);
      console.log(data);
    };
    getIncomeData();
  }, []);

  return (
    <>
      {/* Income Modal */}
      <Modal show={showAddIncomeModal} onClose={setShowAddIncomeModal}>
        <form onSubmit={addIncomeHandler} className="input-grp">
          <div className="input-grp">
            <label className="" htmlFor="amount">
              Income Amount
            </label>
            <input
              ref={amountRef}
              name="amount"
              type="number"
              min={1}
              step={1}
              placeholder="Enter Income amount"
              required
            />
          </div>
          <div className="input-grp">
            <label className="" htmlFor="description">
              Description
            </label>
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
                expAmount={expense.expAmount}
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
