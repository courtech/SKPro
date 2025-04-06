"use client";

import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, Check } from 'lucide-react';

interface CustomDropdownProps {
  options: string[];
  value: string;
  onChange: (value: string) => void;
  name: string;
  placeholder?: string;
  required?: boolean;
  className?: string;
}

const CustomDropdown: React.FC<CustomDropdownProps> = ({
  options,
  value,
  onChange,
  name,
  placeholder = "Select an option",
  required = false,
  className = ""
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Handle selecting an option
  const handleSelect = (option: string) => {
    onChange(option);
    setIsOpen(false);
  };

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <div
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full px-3 py-2 bg-white border border-gray-300 rounded-md 
                   flex items-center justify-between cursor-pointer
                   hover:border-gray-400 transition-all duration-200
                   ${isOpen ? 'border-[#0B51A6] ring-2 ring-[#0B51A6]/20' : ''}
                   focus:outline-none focus:ring-2 focus:ring-[#0B51A6] focus:border-[#0B51A6]`}
      >
        <span className={value ? "text-gray-900" : "text-gray-500"}>
          {value || placeholder}
        </span>
        <ChevronDown className={`h-4 w-4 text-gray-500 transition-transform duration-200 ${isOpen ? 'transform rotate-180' : ''}`} />
      </div>
      
      {isOpen && (
        <div className="absolute z-10 mt-1 w-full bg-white rounded-md shadow-lg border border-gray-200 max-h-60 overflow-auto animate-dropdown">
          <ul className="py-1">
            {options.map((option) => (
              <li
                key={option}
                className={`px-3 py-2 text-sm cursor-pointer flex items-center justify-between
                          transition-colors duration-150
                          ${value === option 
                            ? 'bg-[#0B51A6]/10 text-[#0B51A6] font-medium' 
                            : 'text-gray-900 hover:bg-gray-100'}`}
                onClick={() => handleSelect(option)}
              >
                <span>{option}</span>
                {value === option && <Check className="h-4 w-4 text-[#0B51A6]" />}
              </li>
            ))}
          </ul>
        </div>
      )}
      
      {/* Hidden input for form submission */}
      <input
        type="hidden"
        name={name}
        value={value}
        required={required}
      />
      
      <style jsx global>{`
        @keyframes dropdownAppear {
          from {
            opacity: 0;
            transform: translateY(-8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-dropdown {
          animation: dropdownAppear 0.2s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default CustomDropdown; 