// src/app/dashboard/page.tsx
"use client";

import React, { useState, useEffect, useRef } from "react";
import { Users, Vote, UserCheck, UserX, LucideIcon, ChevronDown, MoreHorizontal, ArrowRight, MapPin } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import Link from "next/link";
import { useSKInfo } from "@/hooks/useSKInfo";

// Color palette - centralized for consistency
const colors = {
  primary: "#0B51A6",
  secondary: "#E1362C",
  accent: "#FEC425",
  success: "#65B08F",
  light: "#FFEBEB",
  grey: {
    100: "#f7f7f7",
    200: "#e9e9e9",
    300: "#d9d9d9",
    400: "#c4c4c4",
    500: "#9d9d9d",
    600: "#6b6b6b",
    700: "#4b4b4b",
    800: "#2d2d2d",
    900: "#1a1a1a"
  },
  chart: {
    blue: "#0B51A6",     // Primary blue
    red: "#E1362C",      // Secondary red
    yellow: "#FEC425",   // Accent yellow
    green: "#65B08F"     // Success green
  }
};

// Type definitions
interface StatusCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  change?: {
    value: string;
    isPositive: boolean;
  };
}

interface PieChartData {
  name: string;
  value: number;
  percentage: string;
  color: string;
}

interface AgeData {
  ageGroup: string;
  count: number;
  percentage: number;
  color: string;
}

interface Member {
  id: string;
  name: string;
  age: number;
  sex: string;
  youthGroup: string;
  sitio: string;
  civilStatus: string;
  dateAdded: string;
}

// Status card component with line design
const StatusCard = ({ title, value, icon: Icon, change }: StatusCardProps) => {
  return (
    <div className="flex flex-col py-4 px-4 font-poppins border-l-4" style={{ borderLeftColor: title === "Active Profile" || title === "Total KK" ? colors.primary : title === "Registered Voters" || title === "Incomplete Profile" ? colors.secondary : colors.accent }}>
      <div className="flex items-center justify-between mb-2">
        <span className="text-gray-500 text-xs sm:text-sm font-poppins">{title}</span>
        <div className="p-1.5 rounded-md bg-gray-100">
          <Icon className={`h-4 w-4 sm:h-5 sm:w-5 text-[${colors.primary}]`} />
        </div>
      </div>
      <div className="flex flex-col">
        <p className="text-gray-800 text-2xl sm:text-3xl font-bold font-poppins">{value}</p>
        {change && (
          <div className="flex items-center mt-1">
            <span className={`text-xs font-medium font-poppins ${change.isPositive ? 'text-green-500' : 'text-red-500'}`}>
              {change.isPositive ? '↑' : '↓'} {change.value} Since last week
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

// Custom Dropdown Component
const CustomDropdown = ({ 
  options, 
  selected, 
  onChange, 
  className = "" 
}: { 
  options: string[], 
  selected: string, 
  onChange: (value: string) => void,
  className?: string
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

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center justify-between w-full px-2 sm:px-3 py-1 sm:py-2 text-xs sm:text-sm font-medium bg-white border border-gray-200 rounded-md hover:border-[${colors.light}] focus:outline-none focus:ring-1 focus:ring-[${colors.secondary}] focus:border-[${colors.secondary}]`}
        type="button"
      >
        <span>{selected}</span>
        <ChevronDown className="w-3 h-3 sm:w-4 sm:h-4 ml-1 sm:ml-2" />
      </button>
      
      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white rounded-md shadow-lg border border-gray-200">
          <ul className="py-1 overflow-auto max-h-60 text-xs sm:text-sm">
            {options.map((option) => (
              <li 
                key={option}
                className={`px-2 sm:px-3 py-1.5 sm:py-2 cursor-pointer hover:bg-[${colors.light}] ${
                  selected === option ? `bg-[${colors.light}] text-[${colors.secondary}]` : 'text-gray-900'
                }`}
                onClick={() => {
                  onChange(option);
                  setIsOpen(false);
                }}
              >
                {option}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

// Sample data
const ageData: AgeData[] = [
  { ageGroup: "16-17 years", count: 160, percentage: 35, color: colors.primary },
  { ageGroup: "18-21 years", count: 192, percentage: 42, color: "#3373B5" },
  { ageGroup: "22-24 years", count: 82, percentage: 18, color: "#5C95C4" },
  { ageGroup: "25-30 years", count: 24, percentage: 5, color: "#84B7D3" },
];

// Youth classification data with updated colors
const youthClassificationData: PieChartData[] = [
  { name: "In-School Youth", value: 20, percentage: "20%", color: colors.chart.blue },
  { name: "Out-of-School Youth", value: 30, percentage: "30%", color: colors.chart.green },
  { name: "Working Youth", value: 25, percentage: "25%", color: colors.chart.red },
  { name: "Others", value: 25, percentage: "25%", color: colors.chart.yellow },
];

// Recently added members data with more samples
const recentMembers: Member[] = [
  {
    id: "1",
    name: "Viola, Courtney",
    age: 22,
    sex: "Female",
    youthGroup: "Working Youth",
    sitio: "Proper",
    civilStatus: "Single",
    dateAdded: "12/28/2023"
  },
  {
    id: "2",
    name: "Santos, Miguel",
    age: 19,
    sex: "Male",
    youthGroup: "In School Youth",
    sitio: "Barangay 76",
    civilStatus: "Single",
    dateAdded: "12/27/2023"
  },
  {
    id: "3",
    name: "Reyes, Maria",
    age: 24,
    sex: "Female",
    youthGroup: "Working Youth",
    sitio: "Zone 1",
    civilStatus: "Married",
    dateAdded: "12/26/2023"
  },
  {
    id: "4",
    name: "Garcia, Juan",
    age: 17,
    sex: "Male",
    youthGroup: "In School Youth",
    sitio: "Purok 3",
    civilStatus: "Single",
    dateAdded: "12/25/2023"
  },
  {
    id: "5",
    name: "Lim, Anna",
    age: 21,
    sex: "Female",
    youthGroup: "Out-of-School Youth",
    sitio: "Sitio Malaya",
    civilStatus: "Single",
    dateAdded: "12/24/2023"
  }
];

// Custom Legend Component with better styling
const CustomLegend = ({ data }: { data: PieChartData[] }) => {
  return (
    <div className="flex flex-col space-y-2 sm:space-y-3 pl-4 sm:pl-6 text-xs sm:text-sm">
      {data.map((entry, index) => (
        <div key={`legend-${index}`} className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-full mr-2 sm:mr-3" style={{ backgroundColor: entry.color }}></div>
            <span className="text-gray-700 font-medium truncate">{entry.name}</span>
          </div>
          <div className="font-bold text-sm sm:text-base ml-2 sm:ml-4" style={{ color: entry.color }}>{entry.percentage}</div>
        </div>
      ))}
    </div>
  );
};

export default function DashboardPage() {
  const [selectedYouthClass, setSelectedYouthClass] = useState("Youth Classification");
  const [selectedAgeGroup, setSelectedAgeGroup] = useState("All Ages");
  const { skInfo, getFormattedBarangayName, getFullLocation } = useSKInfo();
  
  // Options for dropdowns
  const ageGroupOptions = ["All Ages", "15-17 years", "18-21 years", "22+ years"];
  const youthClassOptions = ["Youth Classification", "School Status", "Employment Status"];
  
  return (
    <div className="bg-gray-50 min-h-screen font-poppins">
      {/* Header */}
      <div className="w-full px-4 sm:px-6 py-4 sm:py-6 bg-white border-b border-gray-200">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
          <div className="mb-4 sm:mb-0">
            <h1 className="text-xl sm:text-2xl font-bold text-[#0B51A6] font-poppins">Welcome Back, <span className="text-[#E1362C]">SK Official!</span></h1>
            <p className="text-sm text-gray-600 mt-1 font-poppins">Here's what's happening with your KK members today.</p>
            
            {skInfo.officialBarangayName && (
              <div className="flex items-center mt-2 text-gray-600">
                <MapPin className="h-4 w-4 mr-1 text-[#E1362C]" />
                <p className="text-sm font-medium">{getFormattedBarangayName()}, {skInfo.municipality}</p>
              </div>
            )}
          </div>
          <Link 
            href="/members/add" 
            className="inline-flex items-center px-4 sm:px-5 py-2 sm:py-2.5 bg-[#E1362C] text-white rounded-md hover:bg-red-700 transition-colors font-medium text-sm sm:text-base font-poppins"
          >
            <UserCheck className="h-4 w-4 sm:h-5 sm:w-5 mr-1.5 sm:mr-2" />
            Add Member
          </Link>
        </div>
      </div>
      
      {/* Row 1: Status Cards */}
      <div className="p-4 sm:p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <div className="bg-white border border-gray-200 rounded-sm shadow-sm">
          <StatusCard 
              title="Active Profile" 
            value="458" 
            icon={Users} 
            change={{ value: "12", isPositive: true }}
          />
          </div>
          <div className="bg-white border border-gray-200 rounded-sm shadow-sm">
          <StatusCard 
            title="Registered Voters" 
              value="380" 
            icon={Vote} 
              change={{ value: "12", isPositive: true }}
          />
          </div>
          <div className="bg-white border border-gray-200 rounded-sm shadow-sm">
          <StatusCard 
            title="Total KK" 
              value="458" 
              icon={UserCheck}
              change={{ value: "12", isPositive: true }}
            />
          </div>
          <div className="bg-white border border-gray-200 rounded-sm shadow-sm">
            <StatusCard 
              title="Incomplete Profile" 
              value="30" 
              icon={UserX}
              change={{ value: "12", isPositive: true }}
            />
          </div>
        </div>
      </div>
      
      {/* Row 2: Charts Section */}
      <div className="px-4 sm:px-6 pb-4 sm:pb-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          {/* Age Distribution Chart */}
          <div className="bg-white border border-gray-200 rounded-sm shadow-sm p-4 sm:p-6">
            <div className="flex justify-between items-center mb-4 sm:mb-5">
              <div>
                <h2 className="text-lg sm:text-xl font-bold text-gray-800">Age Distribution</h2>
                <p className="text-xs sm:text-sm text-gray-500">Distribution of members by age range</p>
              </div>
              <div className="flex items-center">
                <CustomDropdown
                  options={ageGroupOptions}
                  selected={selectedAgeGroup}
                  onChange={setSelectedAgeGroup}
                  className="w-32 sm:w-40"
                />
              </div>
            </div>
            
            <div className="h-60 sm:h-70">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  layout="vertical"
                  data={ageData}
                  margin={{ top: 20, right: 30, left: 40, bottom: 20 }}
                >
                  <CartesianGrid 
                    strokeDasharray="3 3" 
                    horizontal={false} 
                    stroke="#e0e0e0" 
                  />
                  <XAxis 
                    type="number" 
                    domain={[0, 'dataMax']} 
                    tick={{ fontFamily: 'Poppins, sans-serif', fontSize: 10 }}
                    tickCount={6}
                    axisLine={{ stroke: '#ccc' }}
                    tickLine={{ stroke: '#ccc' }}
                    label={{ 
                      value: 'Number of Members', 
                      position: 'insideBottom', 
                      offset: -10,
                      style: { 
                        fontFamily: 'Poppins, sans-serif', 
                        fontSize: '0.7rem'
                      } 
                    }}
                  />
                  <YAxis 
                    dataKey="ageGroup" 
                    type="category" 
                    scale="band" 
                    tick={{ fontSize: 10, fontFamily: 'Poppins, sans-serif' }}
                    width={70}
                    axisLine={{ stroke: '#ccc' }}
                    tickLine={{ stroke: '#ccc' }}
                  />
                  <Tooltip
                    formatter={(value: number, name: string, props: any) => {
                      const item = ageData.find(item => item.count === value);
                      return [`${value} members (${item?.percentage}%)`, 'Count'];
                    }}
                    contentStyle={{ 
                      fontFamily: 'Poppins, sans-serif',
                      borderRadius: '4px',
                      border: 'none',
                      boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                      fontSize: '0.75rem'
                    }}
                    cursor={{ fill: 'rgba(11, 81, 166, 0.1)' }}
                  />
                  <Bar 
                    dataKey="count" 
                    radius={[0, 4, 4, 0]} 
                    barSize={20}
                  >
                    {ageData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            
            <div className="flex flex-wrap justify-center mt-2 sm:mt-4 gap-2 sm:gap-4 text-xs sm:text-sm">
              {ageData.map((entry, index) => (
                <div key={`legend-${index}`} className="flex items-center">
                  <div 
                    className="h-2 w-2 sm:h-3 sm:w-3 rounded-sm mr-1 sm:mr-2" 
                    style={{ backgroundColor: entry.color }}
                  ></div>
                  <span className="text-xs sm:text-sm text-gray-600">
                    {entry.ageGroup} ({entry.percentage}%)
                  </span>
                </div>
              ))}
            </div>
          </div>
          
          {/* Youth Classification Pie Chart */}
          <div className="bg-white border border-gray-200 rounded-sm shadow-sm p-4 sm:p-6">
            <div className="flex justify-between items-center mb-4 sm:mb-5">
              <div>
                <h2 className="text-lg sm:text-xl font-bold text-gray-800">Youth Classification</h2>
                <p className="text-xs sm:text-sm text-gray-500">Distribution by educational status</p>
              </div>
              <div className="flex items-center">
                <CustomDropdown
                  options={youthClassOptions}
                  selected={selectedYouthClass}
                  onChange={setSelectedYouthClass}
                  className="w-36 sm:w-56"
                />
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row justify-between items-center h-60 sm:h-70">
              <div className="w-full sm:w-3/5">
                <ResponsiveContainer width="100%" height={200}>
                  <RechartsPieChart>
                    <Pie
                      data={youthClassificationData}
                      cx="50%"
                      cy="50%"
                      innerRadius={55}
                      outerRadius={85}
                      paddingAngle={2}
                      dataKey="value"
                    >
                      {youthClassificationData.map((entry, index) => (
                        <Cell 
                          key={`cell-${index}`} 
                          fill={entry.color} 
                          stroke="#ffffff"
                          strokeWidth={2}
                        />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(value: number) => [`${value}%`, 'Percentage']}
                      contentStyle={{ 
                        fontFamily: 'Poppins, sans-serif',
                        borderRadius: '4px',
                        border: 'none',
                        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                        fontSize: '0.75rem'
                      }}
                    />
                  </RechartsPieChart>
                </ResponsiveContainer>
        </div>
        
              <div className="w-full sm:w-2/5 pt-4 sm:pt-0">
                <CustomLegend data={youthClassificationData} />
              </div>
            </div>
            </div>
          </div>
        </div>
        
      {/* Row 3: Member List */}
      <div className="px-4 sm:px-6 pb-6 sm:pb-8">
        <div className="bg-white border border-gray-200 rounded-sm shadow-sm">
          <div className="p-4 sm:p-6">
            <div className="flex justify-between items-center mb-4 sm:mb-5">
              <h2 className="text-lg sm:text-xl font-bold text-gray-800">Recently Added Members</h2>
              <Link 
                href="/members" 
                className="flex items-center text-xs sm:text-sm text-[#0B51A6] font-medium hover:text-blue-800 font-poppins"
              >
                View all
                <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4 ml-1" />
              </Link>
        </div>
        
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 text-xs sm:text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-3 py-3 text-left text-xxs sm:text-xs font-medium text-gray-500 uppercase tracking-wider font-poppins">Name</th>
                    <th scope="col" className="px-3 py-3 text-left text-xxs sm:text-xs font-medium text-gray-500 uppercase tracking-wider font-poppins">Age</th>
                    <th scope="col" className="px-3 py-3 text-left text-xxs sm:text-xs font-medium text-gray-500 uppercase tracking-wider font-poppins">Sex</th>
                    <th scope="col" className="px-3 py-3 text-left text-xxs sm:text-xs font-medium text-gray-500 uppercase tracking-wider font-poppins hidden md:table-cell">Youth Group</th>
                    <th scope="col" className="px-3 py-3 text-left text-xxs sm:text-xs font-medium text-gray-500 uppercase tracking-wider font-poppins hidden sm:table-cell">Sitio</th>
                    <th scope="col" className="px-3 py-3 text-left text-xxs sm:text-xs font-medium text-gray-500 uppercase tracking-wider font-poppins hidden sm:table-cell">Civil Status</th>
                    <th scope="col" className="px-3 py-3 text-left text-xxs sm:text-xs font-medium text-gray-500 uppercase tracking-wider font-poppins">Date Added</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {recentMembers.map((member) => (
                    <tr key={member.id} className="hover:bg-gray-50">
                      <td className="px-3 py-4 whitespace-nowrap text-xs sm:text-sm font-medium text-gray-900 font-poppins">{member.name}</td>
                      <td className="px-3 py-4 whitespace-nowrap text-xs sm:text-sm text-gray-500 font-poppins">{member.age}</td>
                      <td className="px-3 py-4 whitespace-nowrap text-xs sm:text-sm text-gray-500 font-poppins">{member.sex}</td>
                      <td className="px-3 py-4 whitespace-nowrap text-xs sm:text-sm text-gray-500 font-poppins hidden md:table-cell">{member.youthGroup}</td>
                      <td className="px-3 py-4 whitespace-nowrap text-xs sm:text-sm text-gray-500 font-poppins hidden sm:table-cell">{member.sitio}</td>
                      <td className="px-3 py-4 whitespace-nowrap text-xs sm:text-sm text-gray-500 font-poppins hidden sm:table-cell">{member.civilStatus}</td>
                      <td className="px-3 py-4 whitespace-nowrap text-xs sm:text-sm text-gray-500 font-poppins">{member.dateAdded}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
