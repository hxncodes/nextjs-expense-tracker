"use client";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Nav from "@/components/Navigation";
import FinanceContextProvider from "@/lib/store/financeContext";
// import AuthContextProvider from "@/lib/store/auth-context";
import AuthContextProvider from "../../lib/store/auth-context";

export default function HomeLayout({ children }) {
  return (
    <AuthContextProvider>
      <FinanceContextProvider>
        <ToastContainer />
        <Nav />
        {children}
      </FinanceContextProvider>
    </AuthContextProvider>
  );
}
