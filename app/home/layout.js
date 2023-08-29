"use client";

import Nav from "@/components/Navigation";

export default function HomeLayout({ children }) {
  return (
    <>
      <Nav />
      {children}
    </>
  );
}
