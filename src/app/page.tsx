// src/app/page.tsx
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function LandingPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-white text-center px-4">
      <h1 className="text-4xl font-bold mb-4">Welcome to SKPro ✨</h1>
      <p className="text-lg text-gray-600 max-w-md mb-6">
        A centralized web application to simplify KK Profiling and youth data management for SK Officials.
      </p>

      <Link href="/dashboard">
        <Button>Go to Dashboard</Button>
      </Link>
    </main>
  );
}
