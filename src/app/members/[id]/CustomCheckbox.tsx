"use client";

import React from 'react';
import { Check } from 'lucide-react';

interface CustomCheckboxProps {
  id: string;
  name: string;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;
  className?: string;
}

const CustomCheckbox: React.FC<CustomCheckboxProps> = ({
  id,
  name,
  checked,
  onChange,
  label,
  className = ""
}) => {
  return (
    <div className={`flex items-center ${className}`}>
      <div className="relative">
        <input
          type="checkbox"
          id={id}
          name={name}
          checked={checked}
          onChange={onChange}
          className="appearance-none h-5 w-5 border border-gray-300 rounded 
                    checked:border-[#0B51A6] checked:bg-[#0B51A6]
                    focus:outline-none focus:ring-2 focus:ring-[#0B51A6]/40 
                    transition-colors duration-200 ease-in-out 
                    cursor-pointer"
        />
        
        <div className={`absolute top-0 left-0 h-5 w-5 flex items-center justify-center 
                        transition-opacity duration-200 ease-in-out
                        ${checked ? 'opacity-100' : 'opacity-0'}`}>
          <Check className="h-3.5 w-3.5 text-white stroke-[3]" />
        </div>
      </div>
      
      <label 
        htmlFor={id} 
        className="ml-2 block text-sm text-gray-700 cursor-pointer select-none"
      >
        {label}
      </label>
    </div>
  );
};

export default CustomCheckbox; 