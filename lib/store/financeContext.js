"use client";

import { useState, useEffect, createContext } from "react";

// Firebase
import { db } from "@/lib/firebase/config.js";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";

// Context to use income state globally
export const financeContext = createContext({
  income: [],
  expenses: [],
  addIncomeItem: async () => {},
  removeIncomeItem: async () => {},
  addExpenseItem: async () => {},
});

export default function FinanceContextProvider({ children }) {
  // useState hook to save Income data
  const [income, setIncome] = useState([]);

  // useState hook to save Expenses data
  const [expenses, setExpenses] = useState([]);

  // Creating new expense category in Firebase
  const addExpenseItem = async (expenseCategoryId, newExpense) => {
    const docRef = doc(db, "expenses", expenseCategoryId);

    try {
      await updateDoc(docRef, { ...newExpense });

      setExpenses((prevState) => {
        const updatedExpenses = [...prevState];

        const foundIndex = updatedExpenses.find((expense) => {
          return expense.id === expenseCategoryId;
        });
        updatedExpenses[foundIndex] = { id: expenseCategoryId, ...newExpense };
        return updatedExpenses;
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  // Saving data in Firebase in collection named income
  const addIncomeItem = async (newIncome) => {
    const collectionRef = collection(db, "income"); //pass db and collection name to collection
    try {
      const docSnap = await addDoc(collectionRef, newIncome); //pass above function and data to addDoc
      setIncome((prev) => {
        return [
          ...prev,
          {
            id: docSnap,
            ...newIncome,
          },
        ];
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  // Deleting data from Firebase in collection named income
  const removeIncomeItem = async (incomeId) => {
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
      throw error;
    }
  };

  const values = {
    income,
    expenses,
    addIncomeItem,
    removeIncomeItem,
    addExpenseItem,
  };

  // Fetching data from firebase
  useEffect(() => {
    // Fetching Income data from firebase
    const getIncomeData = async () => {
      const collectionRef = collection(db, "income"); // pass db and collection name to collection
      const docsSnap = await getDocs(collectionRef); // pass above function to getDoc
      // console.log(docSnap.docs);
      const data = docsSnap.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
          createdAt: new Date(doc.data().createdAt.toMillis()),
        };
      });
      setIncome(data);
    };

    // Fetching Expenses data from firebase
    const getExpensesData = async () => {
      const collectionRef = collection(db, "expenses");
      const docsSnap = await getDocs(collectionRef);
      const data = docsSnap.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });
      setExpenses(data);
    };
    getIncomeData();
    getExpensesData();
  }, []);

  return (
    <financeContext.Provider value={values}>{children}</financeContext.Provider>
  );
}
