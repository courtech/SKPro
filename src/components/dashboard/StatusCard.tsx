import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatusCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  iconBgColor: string;
  change?: {
    value: string | number;
    isPositive: boolean;
  };
}

export default function StatusCard({ 
  title, 
  value, 
  icon: Icon, 
  iconBgColor,
  change 
}: StatusCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-5 flex items-start justify-between">
      <div>
        <h3 className="text-gray-500 text-sm font-medium">{title}</h3>
        <p className="text-2xl font-bold mt-1">{value}</p>
        
        {change && (
          <div className="flex items-center mt-2">
            <span className={`text-xs font-medium ${change.isPositive ? 'text-green-600' : 'text-red-600'}`}>
              {change.isPositive ? '+' : ''}{change.value}
            </span>
            <span className="text-xs text-gray-500 ml-1">vs. last period</span>
          </div>
        )}
      </div>
      
      <div className={`${iconBgColor} p-3 rounded-lg`}>
        <Icon className="h-5 w-5 text-white" />
      </div>
    </div>
  );
} 