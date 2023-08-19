"use client";

import "./globals.css";
import { Inter } from "next/font/google";
import Nav from "@/components/Navigation";
import FinanceContextProvider from "@/lib/store/financeContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Expense Tracker App",
  description: "This is app is made to track expenses",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <FinanceContextProvider>
          <Nav />
          {children}
        </FinanceContextProvider>
      </body>
    </html>
  );
}
