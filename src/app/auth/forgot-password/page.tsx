"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { Mail, ArrowLeft } from "lucide-react";
import { toast } from "react-hot-toast";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [error, setError] = useState("");
  const { resetPassword } = useAuth();

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      setError("Email is required");
      return false;
    } else if (!emailRegex.test(email)) {
      setError("Please enter a valid email address");
      return false;
    } else {
      setError("");
      return true;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateEmail(email)) return;

    try {
      setLoading(true);
      await resetPassword(email);
      setSuccessMessage(`Password reset link has been sent to ${email}`);
      toast.success("Password reset email sent!");
    } catch (error: any) {
      let errorMessage = "Failed to send reset email";
      
      if (error.code === 'auth/user-not-found') {
        errorMessage = "No account found with this email";
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = "Invalid email address";
      } else if (error.code === 'auth/too-many-requests') {
        errorMessage = "Too many attempts. Please try again later.";
      }
      
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
        <div className="text-center">
          <h1 className="mt-6 text-2xl font-bold text-[#0B51A6]">Reset Your Password</h1>
          <p className="mt-2 text-sm text-gray-600">
            Enter your email address and we'll send you a link to reset your password
          </p>
        </div>
        
        {successMessage ? (
          <div className="space-y-6">
            <div className="bg-green-50 border border-green-200 p-4 rounded-md">
              <p className="text-green-700 text-sm">{successMessage}</p>
            </div>
            <div className="flex justify-center">
              <Link href="/auth/login" className="inline-flex items-center text-blue-600 hover:text-blue-800">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to login
              </Link>
            </div>
          </div>
        ) : (
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                  className={`appearance-none block w-full px-3 py-2 pl-10 border ${
                    error ? 'border-red-500' : 'border-gray-300'
                  } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                  placeholder="Enter your email"
                />
              </div>
              {error && (
                <p className="mt-2 text-sm text-red-600">{error}</p>
              )}
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#0B51A6] hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-70"
              >
                {loading ? "Sending reset link..." : "Send reset link"}
              </button>
            </div>
            
            <div className="flex justify-center">
              <Link href="/auth/login" className="inline-flex items-center text-blue-600 hover:text-blue-800">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to login
              </Link>
            </div>
          </form>
        )}
      </div>
    </div>
  );
} 