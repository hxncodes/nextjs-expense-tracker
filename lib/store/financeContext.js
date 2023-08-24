"use client";

import { useState, useEffect, useContext, createContext } from "react";
import { authContext } from "./auth-context";

// Firebase
import { db } from "@/lib/firebase/config.js";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  deleteDoc,
  updateDoc,
  query,
  where,
} from "firebase/firestore";

// Context to use income state globally
export const financeContext = createContext({
  income: [],
  expenses: [],
  addIncomeItem: async () => {},
  removeIncomeItem: async () => {},
  addExpenseItem: async () => {},
  addCategory: async () => {},
  deleteExpenseItem: async () => {},
  deleteExpenseCategory: async () => {},
});

export default function FinanceContextProvider({ children }) {
  // useState hook to save Income data
  const [income, setIncome] = useState([]);

  // useState hook to save Expenses data
  const [expenses, setExpenses] = useState([]);

  // getting userId
  const { user } = useContext(authContext);

  // Creating new expense category in Firebase
  const addCategory = async (category) => {
    try {
      const collectionRef = collection(db, "expenses");
      const docSnap = await addDoc(collectionRef, {
        uid: user.uid,
        ...category,
        items: [],
      });

      setExpenses((prevExpenses) => {
        return [
          ...prevExpenses,
          {
            id: docSnap.id,
            uid: user.uid,
            items: [],
            ...category,
          },
        ];
      });
    } catch (error) {
      throw error;
    }
  };

  // Creating new expense in Firebase
  const addExpenseItem = async (expenseCategoryId, newExpense) => {
    const docRef = doc(db, "expenses", expenseCategoryId);

    try {
      await updateDoc(docRef, { ...newExpense });

      setExpenses((prevState) => {
        const updatedExpenses = [...prevState];

        const foundIndex = updatedExpenses.findIndex((expense) => {
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

  // Delete Expense Item
  const deleteExpenseItem = async (updatedExpense, expenseCategoryId) => {
    try {
      const docRef = doc(db, "expenses", expenseCategoryId);
      await updateDoc(docRef, {
        ...updatedExpense,
      });
      setExpenses((prevExpenses) => {
        const updatedExpenses = [...prevExpenses];
        const pos = updatedExpenses.findIndex(
          (ex) => ex.id === expenseCategoryId
        );
        updatedExpenses[pos].items = [...updatedExpense.items];
        updatedExpenses[pos].total = updatedExpense.total;

        return updatedExpenses;
      });
    } catch (error) {
      throw error;
    }
  };

  // Delete Expense Category
  const deleteExpenseCategory = async (expenseCategoryId) => {
    try {
      const docRef = doc(db, "expenses", expenseCategoryId);
      await deleteDoc(docRef);
      setExpenses((prevExpenses) => {
        const updatedExpenses = prevExpenses.filter(
          (expense) => expense.id !== expenseCategoryId
        );
        return [...updatedExpenses];
      });
    } catch (error) {
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
    addCategory,
    deleteExpenseItem,
    deleteExpenseCategory,
  };

  // Fetching data from firebase
  useEffect(() => {
    if (!user) return;

    // Fetching Income data from firebase
    const getIncomeData = async () => {
      const collectionRef = collection(db, "income"); // pass db and collection name to collection
      const q = query(collectionRef, where("uid", "==", user.uid)); //query depending userId

      const docsSnap = await getDocs(q); // pass above query getDoc
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
      const q = query(collectionRef, where("uid", "==", user.uid));
      const docsSnap = await getDocs(q);
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
  }, [user]);

  return (
    <financeContext.Provider value={values}>{children}</financeContext.Provider>
  );
}
