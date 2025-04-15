"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { Eye, EyeOff, Mail, Lock, User, MapPin } from "lucide-react";
import { toast } from "react-hot-toast";
import Image from "next/image";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  // Location information
  const [region, setRegion] = useState("");
  const [province, setProvince] = useState("");
  const [municipality, setMunicipality] = useState("");
  const [barangay, setBarangay] = useState("");
  
  const [errors, setErrors] = useState({ 
    email: "", 
    password: "", 
    confirmPassword: "",
    region: "",
    province: "",
    municipality: "",
    barangay: ""
  });
  
  const { signUp } = useAuth();

  // Password requirements
  const passwordRequirements = [
    { id: 1, text: "At least 8 characters", test: (p: string) => p.length >= 8 },
    { id: 2, text: "Contains at least one uppercase letter", test: (p: string) => /[A-Z]/.test(p) },
    { id: 3, text: "Contains at least one number", test: (p: string) => /[0-9]/.test(p) },
    { id: 4, text: "Contains at least one special character", test: (p: string) => /[!@#$%^&*(),.?":{}|<>]/.test(p) }
  ];
  
  const validatePassword = (password: string) => {
    return (
      passwordRequirements[0].test(password) &&
      passwordRequirements[1].test(password) &&
      passwordRequirements[2].test(password) &&
      passwordRequirements[3].test(password)
    );
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = { 
      email: "", 
      password: "", 
      confirmPassword: "",
      region: "",
      province: "",
      municipality: "",
      barangay: ""
    };

    // Email validation
    if (!email.trim()) {
      newErrors.email = "Email is required";
      valid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Please enter a valid email address";
      valid = false;
    }

    // Password validation
    if (!password.trim()) {
      newErrors.password = "Password is required";
      valid = false;
    } else if (!validatePassword(password)) {
      newErrors.password = "Password doesn't meet requirements";
      valid = false;
    }

    // Confirm password validation
    if (!confirmPassword.trim()) {
      newErrors.confirmPassword = "Please confirm your password";
      valid = false;
    } else if (confirmPassword !== password) {
      newErrors.confirmPassword = "Passwords do not match";
      valid = false;
    }
    
    // Location validations
    if (!region.trim()) {
      newErrors.region = "Region is required";
      valid = false;
    }
    
    if (!province.trim()) {
      newErrors.province = "Province is required";
      valid = false;
    }
    
    if (!municipality.trim()) {
      newErrors.municipality = "Municipality/City is required";
      valid = false;
    }
    
    if (!barangay.trim()) {
      newErrors.barangay = "Barangay is required";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    try {
      setLoading(true);
      
      // Pass location info to the signUp function
      await signUp(email, password, {
        region,
        province,
        municipality,
        barangay
      });
      
      toast.success("Account created successfully!");
    } catch (error: any) {
      let errorMessage = "Failed to create account";
      
      if (error.code === 'auth/email-already-in-use') {
        errorMessage = "Email already in use";
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = "Invalid email address";
      } else if (error.code === 'auth/weak-password') {
        errorMessage = "Password is too weak";
      }
      
      toast.error(errorMessage);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-6 bg-white p-8 rounded-lg shadow-md">
        <div className="text-center">
          <h1 className="mt-6 text-3xl font-bold text-[#0B51A6]">Create an <span className="text-[#E1362C]">Account</span></h1>
          <p className="mt-2 text-sm text-gray-600">
            Create your SKPro account to manage your barangay's youth profiles
          </p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {/* Account Information */}
          <div>
            <h2 className="text-lg font-medium text-gray-900 mb-4">Account Information</h2>
            <div className="space-y-4">
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
                      errors.email ? 'border-red-500' : 'border-gray-300'
                    } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                    placeholder="Enter your email"
                  />
                </div>
                {errors.email && (
                  <p className="mt-2 text-sm text-red-600">{errors.email}</p>
                )}
              </div>
              
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Password <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="new-password"
                    className={`appearance-none block w-full px-3 py-2 pl-10 pr-10 border ${
                      errors.password ? 'border-red-500' : 'border-gray-300'
                    } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                    placeholder="Create a password"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowPassword(!showPassword)}
                    tabIndex={-1}
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5 text-gray-400" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-400" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="mt-2 text-sm text-red-600">{errors.password}</p>
                )}
                
                {/* Password strength indicators */}
                <div className="mt-2 space-y-2">
                  <p className="text-xs text-gray-500 font-medium">Password requirements:</p>
                  <ul className="space-y-1">
                    {passwordRequirements.map((req) => (
                      <li key={req.id} className="text-xs flex items-center">
                        <span className={`inline-block w-4 h-4 mr-2 rounded-full ${
                          password && req.test(password) ? 'bg-green-500' : 'bg-gray-300'
                        }`}></span>
                        {req.text}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                  Confirm Password <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    autoComplete="new-password"
                    className={`appearance-none block w-full px-3 py-2 pl-10 pr-10 border ${
                      errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
                    } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                    placeholder="Confirm your password"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    tabIndex={-1}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-5 w-5 text-gray-400" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-400" />
                    )}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="mt-2 text-sm text-red-600">{errors.confirmPassword}</p>
                )}
              </div>
            </div>
          </div>
          
          {/* Location Information */}
          <div>
            <h2 className="text-lg font-medium text-gray-900 mb-4">SK Location Information</h2>
            <div className="space-y-4">
              <div>
                <label htmlFor="region" className="block text-sm font-medium text-gray-700 mb-1">
                  Region <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <MapPin className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="region"
                    name="region"
                    type="text"
                    value={region}
                    onChange={(e) => setRegion(e.target.value)}
                    className={`appearance-none block w-full px-3 py-2 pl-10 border ${
                      errors.region ? 'border-red-500' : 'border-gray-300'
                    } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                    placeholder="e.g. Region IV-A (CALABARZON)"
                  />
                </div>
                {errors.region && (
                  <p className="mt-2 text-sm text-red-600">{errors.region}</p>
                )}
              </div>
              
              <div>
                <label htmlFor="province" className="block text-sm font-medium text-gray-700 mb-1">
                  Province <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <MapPin className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="province"
                    name="province"
                    type="text"
                    value={province}
                    onChange={(e) => setProvince(e.target.value)}
                    className={`appearance-none block w-full px-3 py-2 pl-10 border ${
                      errors.province ? 'border-red-500' : 'border-gray-300'
                    } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                    placeholder="e.g. Laguna"
                  />
                </div>
                {errors.province && (
                  <p className="mt-2 text-sm text-red-600">{errors.province}</p>
                )}
              </div>
              
              <div>
                <label htmlFor="municipality" className="block text-sm font-medium text-gray-700 mb-1">
                  Municipality/City <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <MapPin className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="municipality"
                    name="municipality"
                    type="text"
                    value={municipality}
                    onChange={(e) => setMunicipality(e.target.value)}
                    className={`appearance-none block w-full px-3 py-2 pl-10 border ${
                      errors.municipality ? 'border-red-500' : 'border-gray-300'
                    } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                    placeholder="e.g. Santa Rosa City"
                  />
                </div>
                {errors.municipality && (
                  <p className="mt-2 text-sm text-red-600">{errors.municipality}</p>
                )}
              </div>
              
              <div>
                <label htmlFor="barangay" className="block text-sm font-medium text-gray-700 mb-1">
                  Barangay <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <MapPin className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="barangay"
                    name="barangay"
                    type="text"
                    value={barangay}
                    onChange={(e) => setBarangay(e.target.value)}
                    className={`appearance-none block w-full px-3 py-2 pl-10 border ${
                      errors.barangay ? 'border-red-500' : 'border-gray-300'
                    } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                    placeholder="e.g. Barangay Dila"
                  />
                </div>
                {errors.barangay && (
                  <p className="mt-2 text-sm text-red-600">{errors.barangay}</p>
                )}
              </div>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#0B51A6] hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-70"
            >
              {loading ? "Creating account..." : "Create account"}
            </button>
          </div>
          
          <p className="mt-2 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link href="/auth/login" className="font-medium text-blue-600 hover:text-blue-500">
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
} 