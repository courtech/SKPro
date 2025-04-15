"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  Search, 
  Plus, 
  Filter, 
  Download, 
  ChevronLeft, 
  ChevronRight, 
  Edit, 
  Trash2, 
  Eye,
  ArrowUpDown,
  ArrowRight,
  ChevronDown,
  Users,
  User,
  MapPin,
  ChevronUp
} from "lucide-react";
import { Member } from "@/types/member";
import { useMemberStore } from "@/lib/store/memberStore";

const statusOptions = ["All", "ISY", "OSY", "NEET", "PWD"];
const genderOptions = ["All", "Male", "Female"];
const sitioOptions = ["All", "Commonwealth", "Batasan Hills", "Holy Spirit", "Fairview"];

// Custom Dropdown Component
const CustomDropdown = ({ 
  options, 
  selected, 
  onChange, 
  className = "",
  icon
}: { 
  options: string[], 
  selected: string, 
  onChange: (value: string) => void,
  className?: string,
  icon?: React.ReactNode
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
        className="flex items-center justify-between w-full px-3 py-2 text-sm font-medium bg-white border border-gray-300 rounded-md hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0B51A6] focus:border-transparent"
        type="button"
      >
        <div className="flex items-center">
          {icon && <div className="mr-2 text-gray-500">{icon}</div>}
          <span>{selected}</span>
        </div>
        <ChevronDown className="w-4 h-4 ml-2" />
      </button>
      
      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white rounded-md shadow-lg border border-gray-200">
          <ul className="py-1 overflow-auto max-h-60 text-sm">
            {options.map((option) => (
              <li 
                key={option}
                className={`px-3 py-2 cursor-pointer hover:bg-gray-100 ${
                  selected === option ? 'bg-gray-100 text-[#0B51A6]' : 'text-gray-900'
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

export default function MembersPage() {
  const { members, fetchMembers, isLoading } = useMemberStore();
  const [filteredMembers, setFilteredMembers] = useState<Member[]>([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState<{key: string, direction: 'asc' | 'desc'} | null>(null);
  const router = useRouter();
  
  // Fetch members on component mount
  useEffect(() => {
    const fetchMembersData = async () => {
      try {
        // Import dynamically to avoid circular dependencies
        const { useAuth } = await import('@/contexts/AuthContext');
        // In a real component, this would be used with the useAuth hook at the top level
        // For now, we'll just use a default barangay ID
        const barangayId = 'default';
        await fetchMembers(barangayId);
      } catch (error) {
        console.error('Error fetching members:', error);
      }
    };
    
    fetchMembersData();
  }, [fetchMembers]);
  
  const itemsPerPage = 10;
  
  // Handle search and filtering
  useEffect(() => {
    let result = members;
    
    // Apply search filter
    if (search) {
      result = result.filter(member => 
        member.name.toLowerCase().includes(search.toLowerCase()) ||
        member.id.toLowerCase().includes(search.toLowerCase())
      );
    }
    
    // Apply sorting
    if (sortConfig !== null) {
      result.sort((a, b) => {
        // Handle nested properties like birthday
        if (sortConfig.key === 'birthday') {
          // Safely handle birthday properties
          const aYear = a.birthday ? a.birthday.year : 0;
          const aMonth = a.birthday ? a.birthday.month - 1 : 0;
          const aDay = a.birthday ? a.birthday.day : 1;
          
          const bYear = b.birthday ? b.birthday.year : 0;
          const bMonth = b.birthday ? b.birthday.month - 1 : 0;
          const bDay = b.birthday ? b.birthday.day : 1;
          
          const dateA = new Date(aYear, aMonth, aDay);
          const dateB = new Date(bYear, bMonth, bDay);
          
          return sortConfig.direction === 'asc' ? dateA.getTime() - dateB.getTime() : dateB.getTime() - dateA.getTime();
        }
        
        // Handle other properties
        const aValue = a[sortConfig.key as keyof Member];
        const bValue = b[sortConfig.key as keyof Member];
        
        if (aValue === undefined || bValue === undefined) {
          return 0;
        }
        
        if (aValue < bValue) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }
    
    setFilteredMembers(result);
    setCurrentPage(1);
  }, [search, sortConfig, members]);
  
  // Calculate pagination
  const totalPages = Math.ceil(filteredMembers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = filteredMembers.slice(startIndex, endIndex);
  
  // Request a sort
  const requestSort = (key: string) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };
  
  // Get sort indicator
  const getSortIndicator = (key: string) => {
    if (!sortConfig || sortConfig.key !== key) {
      return <ArrowUpDown className="h-4 w-4 ml-1" />;
    }
    return sortConfig.direction === 'asc' ? 
      <ChevronUp className="h-4 w-4 ml-1" /> : 
      <ChevronDown className="h-4 w-4 ml-1" />;
  };
  
  return (
    <div className="bg-gray-50 min-h-screen p-2 sm:p-4 font-poppins">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#0B51A6] mb-2">Katipunan ng Kabataan Youth Profile</h1>
        <p className="text-gray-600">Manage and view all KK youth members</p>
      </div>
      
      {/* Filters and Actions */}
      <div className="bg-white border border-gray-200 rounded-sm shadow-sm p-4 mb-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 w-full sm:w-auto mb-4 sm:mb-0">
            <div className="relative w-full sm:w-96">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search by name or ID"
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0B51A6] focus:border-transparent"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            
            <button
              onClick={() => requestSort('name')}
              className="flex items-center justify-center gap-1 px-4 py-2 border border-[#D1D5DC] text-[#364153] bg-transparent font-medium rounded-md hover:bg-[#0B51A6]/5 transition duration-300"
            >
              <span>A-Z Sort</span>
              {getSortIndicator('name')}
            </button>
          </div>
          
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Link 
              href="/members/add"
              className="flex items-center justify-center gap-1 px-4 py-2 border border-[#FF6C7D] text-[#E1362C] bg-transparent font-medium rounded-md hover:bg-[#E1362C]/5 transition duration-300 w-full sm:w-auto"
            >
              <Plus className="h-4 w-4" />
              <span>Add Member</span>
            </Link>
          </div>
        </div>
      </div>
      
      {/* Table */}
      <div className="bg-white border border-gray-200 rounded-sm shadow-sm overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th 
                scope="col" 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => requestSort('region')}
              >
                <div className="flex items-center">
                  Region
                  {getSortIndicator('region')}
                </div>
              </th>
              <th 
                scope="col" 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => requestSort('province')}
              >
                <div className="flex items-center">
                  Province
                  {getSortIndicator('province')}
                </div>
              </th>
              <th 
                scope="col" 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => requestSort('cityMunicipality')}
              >
                <div className="flex items-center">
                  City/Municipality
                  {getSortIndicator('cityMunicipality')}
                </div>
              </th>
              <th 
                scope="col" 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => requestSort('barangay')}
              >
                <div className="flex items-center">
                  Barangay
                  {getSortIndicator('barangay')}
                </div>
              </th>
              <th 
                scope="col" 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => requestSort('name')}
              >
                <div className="flex items-center">
                  Name
                  {getSortIndicator('name')}
                </div>
              </th>
              <th 
                scope="col" 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => requestSort('age')}
              >
                <div className="flex items-center">
                  Age
                  {getSortIndicator('age')}
                </div>
              </th>
              <th 
                scope="col" 
                className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                colSpan={3}
              >
                Birthday
              </th>
              <th 
                scope="col" 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => requestSort('sex')}
              >
                <div className="flex items-center">
                  Sex
                  {getSortIndicator('sex')}
                </div>
              </th>
              <th 
                scope="col" 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => requestSort('civilStatus')}
              >
                <div className="flex items-center">
                  Civil Status
                  {getSortIndicator('civilStatus')}
                </div>
              </th>
              <th 
                scope="col" 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => requestSort('youthClassification')}
              >
                <div className="flex items-center">
                  Youth Classification
                  {getSortIndicator('youthClassification')}
                </div>
              </th>
              <th 
                scope="col" 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => requestSort('youthAgeGroup')}
              >
                <div className="flex items-center">
                  Youth Age Group
                  {getSortIndicator('youthAgeGroup')}
                </div>
              </th>
              <th 
                scope="col" 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => requestSort('email')}
              >
                <div className="flex items-center">
                  Email Address
                  {getSortIndicator('email')}
                </div>
              </th>
              <th 
                scope="col" 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => requestSort('contactNumber')}
              >
                <div className="flex items-center">
                  Contact Number
                  {getSortIndicator('contactNumber')}
                </div>
              </th>
              <th 
                scope="col" 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => requestSort('homeAddress')}
              >
                <div className="flex items-center">
                  Home Address
                  {getSortIndicator('homeAddress')}
                </div>
              </th>
              <th 
                scope="col" 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => requestSort('educationalAttainment')}
              >
                <div className="flex items-center">
                  Highest Educational Attainment
                  {getSortIndicator('educationalAttainment')}
                </div>
              </th>
              <th 
                scope="col" 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => requestSort('workStatus')}
              >
                <div className="flex items-center">
                  Work Status
                  {getSortIndicator('workStatus')}
                </div>
              </th>
              <th 
                scope="col" 
                className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Registered Voter?
              </th>
              <th 
                scope="col" 
                className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Voted Last Election?
              </th>
              <th 
                scope="col" 
                className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Attended KK assembly?
              </th>
              <th 
                scope="col" 
                className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                If yes, how many times?
              </th>
            </tr>
            <tr className="bg-gray-50">
              <th colSpan={6} className="px-6 py-1"></th>
              <th className="px-2 py-1 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">M</th>
              <th className="px-2 py-1 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">D</th>
              <th className="px-2 py-1 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Y</th>
              <th colSpan={11} className="px-6 py-1"></th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {isLoading ? (
              <tr>
                <td colSpan={5} className="text-center py-10">
                  <div className="flex flex-col items-center justify-center gap-2">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#0B51A6]"></div>
                    <p className="text-gray-500 mt-2">Loading members...</p>
                  </div>
                </td>
              </tr>
            ) : currentItems.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center py-10">
                  <div className="flex flex-col items-center justify-center gap-2">
                    <Users className="h-10 w-10 text-gray-400" />
                    <p className="text-gray-500 mt-2">No members found</p>
                    <p className="text-gray-400 text-sm">Add members using the "+ New Member" button</p>
                  </div>
                </td>
              </tr>
            ) : (
              currentItems.map((member) => (
                <tr 
                  key={member.id} 
                  className="hover:bg-gray-50 cursor-pointer"
                  onClick={() => router.push(`/members/${member.id}`)}
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{member.region}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{member.province}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{member.cityMunicipality}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{member.barangay}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#0B51A6]">{member.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{member.age}</td>
                  <td className="px-2 py-4 whitespace-nowrap text-sm text-center text-gray-900">{member.birthday.month}</td>
                  <td className="px-2 py-4 whitespace-nowrap text-sm text-center text-gray-900">{member.birthday.day}</td>
                  <td className="px-2 py-4 whitespace-nowrap text-sm text-center text-gray-900">{member.birthday.year}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{member.sex}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{member.civilStatus}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{member.youthClassification}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{member.youthAgeGroup}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{member.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{member.contactNumber}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{member.homeAddress}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{member.educationalAttainment}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{member.workStatus}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-900">
                    {member.isRegisteredVoter ? 'Y' : 'N'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-900">
                    {member.votedLastElection ? 'Y' : 'N'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-900">
                    {member.attendedKKAssembly ? 'Y' : 'N'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-900">
                    {member.assemblyFrequency || '0'}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      
      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between px-4 py-3 bg-white border border-gray-200 mt-4 rounded-sm">
          <div className="flex-1 flex justify-between items-center">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className={`relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md ${
                currentPage === 1 
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              Previous
            </button>
            <div className="hidden md:block">
              <span className="text-sm text-gray-700">
                Page <span className="font-medium">{currentPage}</span> of <span className="font-medium">{totalPages}</span>
              </span>
            </div>
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className={`relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md ${
                currentPage === totalPages 
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              Next
              <ChevronRight className="h-4 w-4 ml-1" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
} 