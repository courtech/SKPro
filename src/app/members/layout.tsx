import React from "react";
import Navbar from "@/components/layout/Navbar";

export default function MembersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
} 