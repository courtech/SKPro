"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // If user is already logged in, redirect to dashboard
    if (!loading && user) {
      router.push("/dashboard");
    }
  }, [user, loading, router]);

  // Show loading state while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // Only render the children (login/signup forms) if the user is not logged in
  if (!user) {
    return <>{children}</>;
  }

  // This return is not strictly necessary since we redirect in the useEffect,
  // but it's good to have it for type checking and to prevent rendering anything
  // while the redirect happens
  return null;
} 