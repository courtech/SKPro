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
              {change.isPositive ? '↑' : '↓'} {change.value} 
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
  const [currentPeriod, setCurrentPeriod] = useState("This Quarter");
  const [currentClassification, setCurrentClassification] = useState("All Youth");
  const [selectedYouthClass, setSelectedYouthClass] = useState("Youth Classification");
  const [selectedAgeGroup, setSelectedAgeGroup] = useState("All Ages");
  const [isLoading, setIsLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState({
    totalMembers: 0,
    activeProfiles: 0,
    incompleteProfiles: 0,
    registeredVoters: 0,
    youthClassification: [] as PieChartData[],
    ageDistribution: [] as AgeData[],
    recentMembers: [] as Member[]
  });
  const { skInfo, getFormattedBarangayName, getFullLocation } = useSKInfo();
  
  // Options for dropdowns
  const ageGroupOptions = ["All Ages", "15-17 years", "18-21 years", "22+ years"];
  const youthClassOptions = ["Youth Classification", "School Status", "Employment Status"];
  
  // Fetch dashboard data from Firestore
  useEffect(() => {
    const fetchDashboardData = async () => {
      setIsLoading(true);
      
      try {
        // In a real implementation, get barangayId from auth context
        const barangayId = 'default';
        
        // Import the firebase services
        const { getMembersByBarangay } = await import('@/services/firebase/members');
        
        // Fetch members for the current barangay
        const members = await getMembersByBarangay(barangayId);
        
        if (members.length === 0) {
          // If no members, set empty dashboard
          setDashboardData({
            totalMembers: 0,
            activeProfiles: 0,
            incompleteProfiles: 0,
            registeredVoters: 0,
            youthClassification: [],
            ageDistribution: [],
            recentMembers: []
          });
        } else {
          // Process members to generate statistics
          const totalMembers = members.length;
          const activeProfiles = members.filter(m => m.firstName && m.lastName).length;
          const incompleteProfiles = totalMembers - activeProfiles;
          const registeredVoters = members.filter(m => m.registeredSKVoter === 'Y').length;
          
          // Calculate youth classification distribution
          const classificationCount = {
            'In-School Youth': 0,
            'Out-of-School Youth': 0,
            'Working Youth': 0,
            'Others': 0
          };
          
          members.forEach(member => {
            if (member.youthClassification in classificationCount) {
              classificationCount[member.youthClassification as keyof typeof classificationCount]++;
            } else {
              classificationCount['Others']++;
            }
          });
          
          const youthClassification = [
            { 
              name: "In-School Youth", 
              value: classificationCount['In-School Youth'], 
              percentage: `${Math.round((classificationCount['In-School Youth'] / totalMembers) * 100)}%`, 
              color: colors.chart.blue 
            },
            { 
              name: "Out-of-School Youth", 
              value: classificationCount['Out-of-School Youth'], 
              percentage: `${Math.round((classificationCount['Out-of-School Youth'] / totalMembers) * 100)}%`, 
              color: colors.chart.green 
            },
            { 
              name: "Working Youth", 
              value: classificationCount['Working Youth'], 
              percentage: `${Math.round((classificationCount['Working Youth'] / totalMembers) * 100)}%`, 
              color: colors.chart.red 
            },
            { 
              name: "Others", 
              value: classificationCount['Others'], 
              percentage: `${Math.round((classificationCount['Others'] / totalMembers) * 100)}%`, 
              color: colors.chart.yellow 
            }
          ];
          
          // Calculate age distribution
          const ageGroups = {
            '16-17 years': { count: 0, color: colors.primary },
            '18-21 years': { count: 0, color: "#3373B5" },
            '22-24 years': { count: 0, color: "#5C95C4" },
            '25-30 years': { count: 0, color: "#84B7D3" }
          };
          
          members.forEach(member => {
            const age = member.age;
            if (age >= 16 && age <= 17) ageGroups['16-17 years'].count++;
            else if (age >= 18 && age <= 21) ageGroups['18-21 years'].count++;
            else if (age >= 22 && age <= 24) ageGroups['22-24 years'].count++;
            else if (age >= 25 && age <= 30) ageGroups['25-30 years'].count++;
          });
          
          const ageDistribution = Object.entries(ageGroups).map(([ageGroup, data]) => ({
            ageGroup,
            count: data.count,
            percentage: Math.round((data.count / totalMembers) * 100),
            color: data.color
          }));
          
          // Get recent members
          const recentMembers = members
            .sort((a, b) => {
              // Sort by createdAt timestamp (newest first)
              return b.createdAt.toMillis() - a.createdAt.toMillis();
            })
            .slice(0, 5)
            .map(member => ({
              id: member.id,
              name: `${member.lastName}, ${member.firstName}`,
              age: member.age,
              sex: member.sexAssignedAtBirth,
              youthGroup: member.youthClassification,
              sitio: member.sitioPurok || "N/A",
              civilStatus: member.civilStatus,
              dateAdded: member.createdAt.toDate().toLocaleDateString()
            }));
          
          setDashboardData({
            totalMembers,
            activeProfiles,
            incompleteProfiles,
            registeredVoters,
            youthClassification,
            ageDistribution,
            recentMembers
          });
        }
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        // Set empty data on error
        setDashboardData({
          totalMembers: 0,
          activeProfiles: 0,
          incompleteProfiles: 0,
          registeredVoters: 0,
          youthClassification: [],
          ageDistribution: [],
          recentMembers: []
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchDashboardData();
  }, [currentPeriod, currentClassification]);

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
            value={dashboardData.activeProfiles.toString()} 
            icon={Users} 
            
          />
          </div>
          <div className="bg-white border border-gray-200 rounded-sm shadow-sm">
          <StatusCard 
            title="Registered Voters" 
              value={dashboardData.registeredVoters.toString()} 
            icon={Vote} 
              
          />
          </div>
          <div className="bg-white border border-gray-200 rounded-sm shadow-sm">
          <StatusCard 
            title="Total KK" 
              value={dashboardData.totalMembers.toString()} 
              icon={UserCheck}
              
            />
          </div>
          <div className="bg-white border border-gray-200 rounded-sm shadow-sm">
            <StatusCard 
              title="Incomplete Profile" 
              value={dashboardData.incompleteProfiles.toString()} 
              icon={UserX}
              
            />
          </div>
        </div>
      </div>
      
      {/* Row 2: Charts Section */}
      <div className="px-4 sm:px-6 pb-4 sm:pb-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          {/* Age Distribution Chart */}
          <div className="bg-white p-4 border border-gray-200 rounded-lg shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base sm:text-lg font-semibold text-gray-800">Age Distribution</h3>
              <CustomDropdown
                options={ageGroupOptions}
                selected={selectedAgeGroup}
                onChange={setSelectedAgeGroup}
              />
            </div>
            
            {isLoading ? (
              <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#0B51A6]"></div>
              </div>
            ) : dashboardData.ageDistribution.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-64 text-gray-500">
                <Users className="h-10 w-10 mb-2 opacity-50" />
                <p>No data available</p>
              </div>
            ) : (
              <ResponsiveContainer width="100%" height={250}>
                <BarChart
                  data={dashboardData.ageDistribution}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="ageGroup" 
                    tick={{ fontSize: 12 }} 
                  />
                  <YAxis 
                    tick={{ fontSize: 12 }}
                    tickFormatter={(value) => `${value}%`}
                  />
                  <Tooltip 
                    formatter={(value, name, props) => [`${value}%`, 'Percentage']}
                    labelFormatter={(value) => `Age Group: ${value}`}
                  />
                  <Bar 
                    dataKey="percentage" 
                    name="Percentage" 
                    radius={[4, 4, 0, 0]}
                  >
                    {dashboardData.ageDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
          
          {/* Youth Classification Chart */}
          <div className="bg-white p-4 border border-gray-200 rounded-lg shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base sm:text-lg font-semibold text-gray-800">Youth Classification</h3>
              <CustomDropdown
                options={youthClassOptions}
                selected={selectedYouthClass}
                onChange={setSelectedYouthClass}
              />
            </div>
            
            {isLoading ? (
              <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#0B51A6]"></div>
              </div>
            ) : dashboardData.youthClassification.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-64 text-gray-500">
                <Users className="h-10 w-10 mb-2 opacity-50" />
                <p>No data available</p>
              </div>
            ) : (
              <div className="flex flex-col sm:flex-row items-center justify-center">
                {/* Pie Chart */}
                <div className="w-full sm:w-1/2">
                  <ResponsiveContainer width="100%" height={200}>
                    <RechartsPieChart>
                      <Pie
                        data={dashboardData.youthClassification}
                        cx="50%"
                        cy="50%"
                        innerRadius={45}
                        outerRadius={80}
                        dataKey="value"
                        label={false}
                      >
                        {dashboardData.youthClassification.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                    </RechartsPieChart>
                  </ResponsiveContainer>
                </div>
                
                {/* Legend */}
                <div className="w-full sm:w-1/2 flex justify-center">
                  <CustomLegend data={dashboardData.youthClassification} />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Row 3: Member List */}
      <div className="px-4 sm:px-6 pb-6 sm:pb-8">
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-4 overflow-hidden">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h2 className="text-base sm:text-lg font-semibold text-gray-800">Recently Added Members</h2>
              <p className="text-xs text-gray-500 mt-1">View the most recently added KK profile members</p>
            </div>
            <Link href="/members" className="flex items-center text-xs sm:text-sm text-[#0B51A6] hover:text-[#083b7a] font-medium">
              View All
              <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4 ml-1" />
            </Link>
          </div>
          
          {isLoading ? (
            <div className="flex items-center justify-center h-48">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#0B51A6]"></div>
            </div>
          ) : dashboardData.recentMembers.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-48 text-gray-500">
              <Users className="h-10 w-10 mb-2 opacity-50" />
              <p>No members added yet</p>
              <Link href="/members/new" className="mt-2 text-sm text-[#0B51A6] hover:underline">
                Add your first member
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto -mx-4 sm:-mx-6">
              <div className="inline-block min-w-full align-middle">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-3 py-2 text-left text-xs sm:text-sm font-semibold text-gray-500 uppercase tracking-wider font-poppins">Name</th>
                      <th scope="col" className="px-3 py-2 text-left text-xs sm:text-sm font-semibold text-gray-500 uppercase tracking-wider font-poppins">Age/Sex</th>
                      <th scope="col" className="px-3 py-2 text-left text-xs sm:text-sm font-semibold text-gray-500 uppercase tracking-wider font-poppins hidden sm:table-cell">Status</th>
                      <th scope="col" className="px-3 py-2 text-left text-xs sm:text-sm font-semibold text-gray-500 uppercase tracking-wider font-poppins hidden md:table-cell">Sitio</th>
                      <th scope="col" className="px-3 py-2 text-left text-xs sm:text-sm font-semibold text-gray-500 uppercase tracking-wider font-poppins">Date Added</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {dashboardData.recentMembers.map((member) => (
                      <tr key={member.id} className="hover:bg-gray-50">
                        <td className="px-3 py-4 whitespace-nowrap text-xs sm:text-sm font-medium text-gray-900 font-poppins">{member.name}</td>
                        <td className="px-3 py-4 whitespace-nowrap text-xs sm:text-sm text-gray-500 font-poppins">{member.age} / {member.sex}</td>
                        <td className="px-3 py-4 whitespace-nowrap text-xs sm:text-sm text-gray-500 font-poppins hidden sm:table-cell">
                          <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            member.youthGroup === "In-School Youth" 
                              ? "bg-blue-100 text-blue-800" 
                              : member.youthGroup === "Out-of-School Youth"
                              ? "bg-amber-100 text-amber-800"
                              : member.youthGroup === "Working Youth"
                              ? "bg-green-100 text-green-800"
                              : "bg-gray-100 text-gray-800"
                          }`}>
                            {member.youthGroup}
                          </span>
                        </td>
                        <td className="px-3 py-4 whitespace-nowrap text-xs sm:text-sm text-gray-500 font-poppins hidden md:table-cell">
                          <div className="flex items-center">
                            <MapPin className="h-3 w-3 text-gray-400 mr-1" />
                            <span>{member.sitio}</span>
                          </div>
                        </td>
                        <td className="px-3 py-4 whitespace-nowrap text-xs sm:text-sm text-gray-500 font-poppins">{member.dateAdded}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
