import React from "react";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-white shadow-sm px-6 py-4">
      <div className="flex justify-between items-center">
        <Link href="/" className="font-bold text-xl">SKPro</Link>
        <div className="space-x-4">
          <Link href="/dashboard" className="hover:text-blue-600">Dashboard</Link>
          <Link href="/profile" className="hover:text-blue-600">Profile</Link>
        </div>
      </div>
    </nav>
  );
} 