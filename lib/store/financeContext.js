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
} from "firebase/firestore";

// Context to use income state globally
export const financeContext = createContext({
  income: [],
  addIncomeItem: async () => {},
  removeIncomeItem: async () => {},
});

export default function FinanceContextProvider({ children }) {
  // useState hook to save Income data
  const [income, setIncome] = useState([]);

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
    addIncomeItem,
    removeIncomeItem,
  };

  // Fetching data from firebase
  useEffect(() => {
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
    getIncomeData();
  }, []);
  return (
    <financeContext.Provider value={values}>{children}</financeContext.Provider>
  );
}
