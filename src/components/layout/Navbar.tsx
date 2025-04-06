"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Bell } from "lucide-react";
// Import Image directly from public directory
// import SKProLogo from "@/assets/SKPro-Long.svg";

export default function Navbar() {
  const pathname = usePathname();
  
  // Get current date
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });
  
  // Check if a path is active
  const isActive = (path: string) => {
    if (path === '/dashboard') {
      return pathname === '/dashboard';
    }
    return pathname.startsWith(path);
  };
  
  return (
    <nav className="bg-white shadow-sm px-6 py-3 pt-4 pb-4 border-b border-gray-200">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image src="/SKPro-Long.svg" alt="SKPro Logo" width={120} height={40} />
          </Link>
          
          {/* Navigation Links */}
          <div className="flex space-x-8 ml-6">
            <Link 
              href="/dashboard" 
              className={`${isActive('/dashboard') 
                ? 'text-blue-600 border-b-2 border-blue-600' 
                : 'text-gray-600 hover:text-blue-600'} pb-1 font-medium`}
            >
              Dashboard
            </Link>
            <Link 
              href="/members" 
              className={`${isActive('/members') 
                ? 'text-blue-600 border-b-2 border-blue-600' 
                : 'text-gray-600 hover:text-blue-600'} pb-1 font-medium`}
            >
              Members
            </Link>
            <Link 
              href="/reports" 
              className={`${isActive('/reports') 
                ? 'text-blue-600 border-b-2 border-blue-600' 
                : 'text-gray-600 hover:text-blue-600'} pb-1 font-medium`}
            >
              Reports
            </Link>
            <Link 
              href="/settings" 
              className={`${isActive('/settings') 
                ? 'text-blue-600 border-b-2 border-blue-600' 
                : 'text-gray-600 hover:text-blue-600'} pb-1 font-medium`}
            >
              Settings
            </Link>
          </div>
        </div>
        
        {/* Right Side - Date, Notifications, Profile */}
        <div className="flex items-center gap-6">
          <span className="text-gray-600">{formattedDate}</span>
          <button className="relative p-1 hover:bg-gray-100 rounded-full">
            <Bell className="h-5 w-5 text-gray-600" />
            <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
              3
            </span>
          </button>
          <div className="w-9 h-9 bg-orange-400 rounded-full flex items-center justify-center text-white cursor-pointer">
            C
          </div>
        </div>
      </div>
    </nav>
  );
} 