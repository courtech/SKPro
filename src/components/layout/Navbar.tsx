"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { Bell, Settings, LogOut } from "lucide-react";
// Import Image directly from public directory
// import SKProLogo from "@/assets/SKPro-Long.svg";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const profileMenuRef = useRef<HTMLDivElement>(null);
  
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

  // Close profile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target as Node)) {
        setShowProfileMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Handle logout
  const handleLogout = () => {
    // Add actual logout logic here
    console.log("Logging out...");
    // Redirect to login page or home page after logout
    // router.push('/login');
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
          
          {/* Profile Menu */}
          <div className="relative" ref={profileMenuRef}>
            <div 
              className="w-9 h-9 bg-orange-400 rounded-full flex items-center justify-center text-white cursor-pointer"
              onClick={() => setShowProfileMenu(!showProfileMenu)}
            >
              C
            </div>
            
            {/* Profile Dropdown Menu */}
            {showProfileMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 border border-gray-200 dropdown-animation">
                <div className="px-4 py-2 border-b border-gray-100 flex items-center">
                  <div className="w-8 h-8 bg-orange-400 rounded-full flex items-center justify-center text-white mr-3">
                    C
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Courtney Smith</p>
                    <p className="text-xs text-gray-500">admin@skpro.org</p>
                  </div>
                </div>
                
                <Link 
                  href="/settings" 
                  className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => setShowProfileMenu(false)}
                >
                  <Settings className="h-4 w-4 mr-2 text-gray-500" />
                  Settings
                </Link>
                
                <button 
                  className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={handleLogout}
                >
                  <LogOut className="h-4 w-4 mr-2 text-gray-500" />
                  Log out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <style jsx>{`
        @keyframes dropdownAppear {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .dropdown-animation {
          animation: dropdownAppear 0.2s ease-out forwards;
        }
      `}</style>
    </nav>
  );
} 