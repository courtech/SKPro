// src/app/page.tsx
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function LandingPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-white text-center px-4">
      <h1 className="text-4xl font-bold mb-4">Welcome to <span className="text-[#0B51A6]">SK</span><span className="text-[#E1362C]">Pro</span> ✨</h1>
      <p className="text-lg text-gray-600 max-w-md mb-8">
        A centralized web application to simplify KK Profiling and youth data management for SK Officials.
      </p>

      <div className="flex flex-col sm:flex-row gap-4">
        <Link href="/auth/login">
          <Button className="bg-[#0B51A6] hover:bg-blue-700 px-6 py-2">
            Sign In
          </Button>
        </Link>
        
        <Link href="/auth/signup">
          <Button className="bg-white text-[#0B51A6] hover:bg-gray-100 border border-[#0B51A6] px-6 py-2">
            Create Account <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </div>
    </main>
  );
}
