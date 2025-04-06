"use client";

import React, { useState, useEffect } from "react";
import { Download, FileText, History, Upload, Plus, ArrowDown, Calendar, CheckCircle, X } from "lucide-react";
import Link from "next/link";
import { useMemberStore } from "@/lib/store/memberStore";
import { Member } from "@/types/member";

export default function ReportsPage() {
  const { members, fetchMembers, isLoading } = useMemberStore();
  const [reportMembers, setReportMembers] = useState<any[]>([]);
  const [showReportHistory, setShowReportHistory] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);
  const [exportData, setExportData] = useState({
    title: "",
    format: "pdf"
  });
  
  // Sample report history data
  const reportHistory = [
    { id: 1, title: "Q1 2024 Youth Profile Report", date: "March 31, 2024", format: "PDF" },
    { id: 2, title: "Q4 2023 Youth Profile Report", date: "December 31, 2023", format: "XLSX" },
    { id: 3, title: "Q3 2023 Youth Profile Report", date: "September 30, 2023", format: "DOCX" },
  ];

  // Load members from store on mount
  useEffect(() => {
    fetchMembers();
  }, [fetchMembers]);

  // Transform members to report format whenever the members change
  useEffect(() => {
    if (members.length > 0) {
      const transformedMembers = members.map(member => {
        return {
          region: member.region,
          province: member.province,
          cityMunicipality: member.cityMunicipality,
          barangay: member.barangay,
          name: member.name,
          age: member.age,
          birthdayMonth: member.birthday.month,
          birthdayDay: member.birthday.day,
          birthdayYear: member.birthday.year,
          sex: member.sex,
          civilStatus: member.civilStatus,
          youthClassification: member.youthClassification,
          youthAgeGroup: member.youthAgeGroup,
          emailAddress: member.email,
          contactNumber: member.contactNumber,
          homeAddress: member.homeAddress,
          educationalAttainment: member.educationalAttainment,
          workStatus: member.workStatus,
          registeredVoter: member.isRegisteredVoter ? "Y" : "N",
          votedLastElection: member.votedLastElection ? "Y" : "N",
          attendedKKAssembly: member.attendedKKAssembly ? "Y" : "N",
          assemblyFrequency: member.assemblyFrequency?.toString() || "0"
        };
      });
      setReportMembers(transformedMembers);
    } else {
      // If no members yet, use empty state
      setReportMembers([createEmptyMember()]);
    }
  }, [members]);

  // Function to create an empty member record
  function createEmptyMember() {
    return {
      region: "",
      province: "",
      cityMunicipality: "",
      barangay: "",
      name: "",
      age: "",
      birthdayMonth: "",
      birthdayDay: "",
      birthdayYear: "",
      sex: "",
      civilStatus: "",
      youthClassification: "", // ISY, OSY, NEET, etc.
      youthAgeGroup: "", // CHILD YOUTH, CORE YOUTH, YOUNG ADULT
      emailAddress: "",
      contactNumber: "",
      homeAddress: "",
      educationalAttainment: "",
      workStatus: "",
      registeredVoter: "",
      votedLastElection: "",
      attendedKKAssembly: "",
      assemblyFrequency: ""
    };
  }

  // Add default data for location fields only once on component mount
  useEffect(() => {
    const defaultRegion = "REGION X";
    const defaultProvince = "MISAMIS ORIENTAL";
    const defaultCity = "CAGAYAN DE ORO CITY";
    const defaultBarangay = "BARANGAY KAUSWAGAN";
    
    if (reportMembers.length === 1 && !reportMembers[0].name) {
      setReportMembers(members => members.map(member => ({
        ...member,
        region: member.region || defaultRegion,
        province: member.province || defaultProvince,
        cityMunicipality: member.cityMunicipality || defaultCity,
        barangay: member.barangay || defaultBarangay
      })));
    }
  }, [reportMembers]);

  // Function to import members from the member store (updates the report with latest data)
  const importFromDatabase = () => {
    if (members.length > 0) {
      const transformedMembers = members.map(member => {
        return {
          region: member.region,
          province: member.province,
          cityMunicipality: member.cityMunicipality,
          barangay: member.barangay,
          name: member.name,
          age: member.age.toString(),
          birthdayMonth: member.birthday.month.toString(),
          birthdayDay: member.birthday.day.toString(),
          birthdayYear: member.birthday.year.toString(),
          sex: member.sex,
          civilStatus: member.civilStatus,
          youthClassification: member.youthClassification,
          youthAgeGroup: member.youthAgeGroup,
          emailAddress: member.email,
          contactNumber: member.contactNumber,
          homeAddress: member.homeAddress,
          educationalAttainment: member.educationalAttainment,
          workStatus: member.workStatus,
          registeredVoter: member.isRegisteredVoter ? "Y" : "N",
          votedLastElection: member.votedLastElection ? "Y" : "N",
          attendedKKAssembly: member.attendedKKAssembly ? "Y" : "N",
          assemblyFrequency: member.assemblyFrequency?.toString() || "0"
        };
      });
      setReportMembers(transformedMembers);
    }
  };

  // Function to update a specific field of a member in the report table
  // (This won't affect the main data store)
  const updateMember = (index: number, field: string, value: string) => {
    const updatedMembers = [...reportMembers];
    updatedMembers[index] = {
      ...updatedMembers[index],
      [field]: value
    };
    setReportMembers(updatedMembers);
  };

  // Function to add a new empty row
  const addRow = () => {
    const lastMember = reportMembers[reportMembers.length - 1];
    const newMember = createEmptyMember();
    
    // Copy location data from last row for convenience
    newMember.region = lastMember.region;
    newMember.province = lastMember.province;
    newMember.cityMunicipality = lastMember.cityMunicipality;
    newMember.barangay = lastMember.barangay;
    
    setReportMembers([...reportMembers, newMember]);
  };

  // Function to handle file import
  const handleFileImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // In a real app, you would process the file here
      // For now, just show an alert
      alert(`File "${file.name}" selected. In a real app, this would be processed.`);
      
      // Reset the input
      e.target.value = '';
    }
  };
  
  // Function to handle export
  const handleExport = () => {
    // Validate export data
    if (!exportData.title.trim()) {
      alert("Please enter a report title");
      return;
    }
    
    // In a real app, you would generate the export file here
    alert(`Report "${exportData.title}" will be exported as ${exportData.format.toUpperCase()}`);
    
    // Close the modal
    setShowExportModal(false);
    
    // Reset the form
    setExportData({
      title: "",
      format: "pdf"
    });
  };

  return (
    <>
      <style jsx global>{`
        @media print {
          /* Minimal print styles for when export produces a PDF */
          @page {
            size: landscape;
            margin: 0.5cm;
          }
          
          body {
            font-size: 10pt;
          }
          
          .print\\:hidden {
            display: none !important;
          }
          
          table {
            font-size: 8pt;
            page-break-inside: auto;
            border-collapse: collapse;
            width: 100%;
          }
          
          tr {
            page-break-inside: avoid;
            page-break-after: auto;
          }
          
          td, th {
            padding: 1mm !important;
            border: 1px solid black;
          }
        }
      `}</style>

      <div className="bg-gray-50 min-h-screen">
        {/* Header */}
        <div className="w-full px-4 sm:px-6 py-4 sm:py-6 bg-white border-b border-gray-200 print:hidden">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
            <div className="mb-4 sm:mb-0">
              <h1 className="text-xl sm:text-2xl font-bold text-[#0B51A6]">Youth Profiling Reports</h1>
              <p className="text-sm text-gray-600 mt-1">Create, manage, and export Annex 4 forms for submission</p>
            </div>
            <div className="flex gap-2">
              {/* Import File Button */}
              <label className="inline-flex items-center px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors font-medium text-sm cursor-pointer">
                <Upload className="h-4 w-4 mr-2" />
                Import File
                <input type="file" className="hidden" onChange={handleFileImport} accept=".xlsx,.docx,.pdf" />
              </label>
              
              {/* Report History Button */}
              <button
                onClick={() => setShowReportHistory(true)}
                className="inline-flex items-center px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors font-medium text-sm"
              >
                <History className="h-4 w-4 mr-2" />
                History
              </button>
              
              {/* Create New Button */}
              <button
                onClick={importFromDatabase}
                className="inline-flex items-center px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors font-medium text-sm"
              >
                <FileText className="h-4 w-4 mr-2" />
                Refresh from Members
              </button>
            </div>
          </div>
        </div>

        {/* Report Content */}
        <div className="p-4 sm:p-6">
          <div className="bg-white border border-gray-200 rounded-md shadow-sm p-4 sm:p-6">
            {/* Annex 4 Header - visible in both screen and print */}
            <div className="annex-header mb-6 text-center">
              <div className="flex justify-center mb-2">
                <img src="/SKOfficial.svg" alt="SK Logo" className="h-24 w-auto" />
              </div>
              <div className="text-center mb-1">
                <h2 className="font-bold text-lg">BARANGAY {reportMembers[0]?.barangay?.replace("BARANGAY ", "") || "SAN MIGUEL"}</h2>
              </div>
              <div className="flex justify-between items-center">
                <div className="w-1/3"></div>
                <div className="w-1/3 text-center">
                  <h1 className="font-bold text-lg uppercase">KATIPUNAN NG KABATAAN YOUTH PROFILE</h1>
                </div>
                <div className="w-1/3 text-right">
                  <span className="font-bold">ANNEX 4</span>
                </div>
              </div>
            </div>
            
            {/* Annex 4 Table */}
            <div className="overflow-x-auto">
              <table className="min-w-full border border-gray-800 text-xs" style={{ borderCollapse: 'collapse' }}>
                <thead>
                  <tr className="bg-gray-100 text-center">
                    <th rowSpan={2} className="border border-gray-800 px-1 py-1 text-center uppercase font-medium">REGION</th>
                    <th rowSpan={2} className="border border-gray-800 px-1 py-1 text-center uppercase font-medium">PROVINCE</th>
                    <th rowSpan={2} className="border border-gray-800 px-1 py-1 text-center uppercase font-medium">CITY/ MUNICIPALITY</th>
                    <th rowSpan={2} className="border border-gray-800 px-1 py-1 text-center uppercase font-medium">BARANGAY</th>
                    <th rowSpan={2} className="border border-gray-800 px-1 py-1 text-center uppercase font-medium">NAME</th>
                    <th rowSpan={2} className="border border-gray-800 px-1 py-1 text-center uppercase font-medium">AGE</th>
                    <th colSpan={3} className="border border-gray-800 px-1 py-1 text-center uppercase font-medium">BIRTHDAY</th>
                    <th rowSpan={2} className="border border-gray-800 px-1 py-1 text-center uppercase font-medium">SEX ASSIGNED AT BIRTH</th>
                    <th rowSpan={2} className="border border-gray-800 px-1 py-1 text-center uppercase font-medium">CIVIL STATUS</th>
                    <th rowSpan={2} className="border border-gray-800 px-1 py-1 text-center uppercase font-medium">YOUTH CLASSIFICATION (ISY/OSY/NEET/WORKING/ PWD)</th>
                    <th rowSpan={2} className="border border-gray-800 px-1 py-1 text-center uppercase font-medium">YOUTH AGE GROUP</th>
                    <th rowSpan={2} className="border border-gray-800 px-1 py-1 text-center uppercase font-medium">EMAIL ADDRESS</th>
                    <th rowSpan={2} className="border border-gray-800 px-1 py-1 text-center uppercase font-medium">CONTACT NUMBER</th>
                    <th rowSpan={2} className="border border-gray-800 px-1 py-1 text-center uppercase font-medium">HOME ADDRESS</th>
                    <th rowSpan={2} className="border border-gray-800 px-1 py-1 text-center uppercase font-medium">HIGHEST EDUCATIONAL ATTAINMENT</th>
                    <th rowSpan={2} className="border border-gray-800 px-1 py-1 text-center uppercase font-medium">WORK STATUS</th>
                    <th rowSpan={2} className="border border-gray-800 px-1 py-1 text-center uppercase font-medium">Registered Voter? Y/N</th>
                    <th rowSpan={2} className="border border-gray-800 px-1 py-1 text-center uppercase font-medium">Voted Last Election Y/N</th>
                    <th rowSpan={2} className="border border-gray-800 px-1 py-1 text-center uppercase font-medium">Attended KK Assembly? Y/N</th>
                    <th rowSpan={2} className="border border-gray-800 px-1 py-1 text-center uppercase font-medium">If yes, how many times?</th>
                  </tr>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-800 px-1 py-1 text-center uppercase font-medium">M</th>
                    <th className="border border-gray-800 px-1 py-1 text-center uppercase font-medium">D</th>
                    <th className="border border-gray-800 px-1 py-1 text-center uppercase font-medium">Y</th>
                  </tr>
                </thead>
                <tbody>
                  {reportMembers.map((member, index) => (
                    <tr key={index}>
                      <td className="border border-gray-800 p-1">
                        <input
                          type="text"
                          className="w-full px-1 py-1 text-xs focus:outline-none"
                          value={member.region}
                          onChange={(e) => updateMember(index, "region", e.target.value)}
                        />
                      </td>
                      <td className="border border-gray-800 p-1">
                        <input
                          type="text"
                          className="w-full px-1 py-1 text-xs focus:outline-none"
                          value={member.province}
                          onChange={(e) => updateMember(index, "province", e.target.value)}
                        />
                      </td>
                      <td className="border border-gray-800 p-1">
                        <input
                          type="text"
                          className="w-full px-1 py-1 text-xs focus:outline-none"
                          value={member.cityMunicipality}
                          onChange={(e) => updateMember(index, "cityMunicipality", e.target.value)}
                        />
                      </td>
                      <td className="border border-gray-800 p-1">
                        <input
                          type="text"
                          className="w-full px-1 py-1 text-xs focus:outline-none"
                          value={member.barangay}
                          onChange={(e) => updateMember(index, "barangay", e.target.value)}
                        />
                      </td>
                      <td className="border border-gray-800 p-1">
                        <input
                          type="text"
                          className="w-full px-1 py-1 text-xs focus:outline-none"
                          value={member.name}
                          onChange={(e) => updateMember(index, "name", e.target.value)}
                        />
                      </td>
                      <td className="border border-gray-800 p-1">
                        <input
                          type="text"
                          className="w-full px-1 py-1 text-xs focus:outline-none text-center"
                          value={member.age}
                          onChange={(e) => updateMember(index, "age", e.target.value)}
                        />
                      </td>
                      <td className="border border-gray-800 p-1">
                        <input
                          type="text"
                          className="w-full px-1 py-1 text-xs focus:outline-none text-center"
                          value={member.birthdayMonth}
                          onChange={(e) => updateMember(index, "birthdayMonth", e.target.value)}
                          placeholder="MM"
                        />
                      </td>
                      <td className="border border-gray-800 p-1">
                        <input
                          type="text"
                          className="w-full px-1 py-1 text-xs focus:outline-none text-center"
                          value={member.birthdayDay}
                          onChange={(e) => updateMember(index, "birthdayDay", e.target.value)}
                          placeholder="DD"
                        />
                      </td>
                      <td className="border border-gray-800 p-1">
                        <input
                          type="text"
                          className="w-full px-1 py-1 text-xs focus:outline-none text-center"
                          value={member.birthdayYear}
                          onChange={(e) => updateMember(index, "birthdayYear", e.target.value)}
                          placeholder="YYYY"
                        />
                      </td>
                      <td className="border border-gray-800 p-1">
                        <input
                          type="text"
                          className="w-full px-1 py-1 text-xs focus:outline-none text-center"
                          value={member.sex}
                          onChange={(e) => updateMember(index, "sex", e.target.value)}
                        />
                      </td>
                      <td className="border border-gray-800 p-1">
                        <input
                          type="text"
                          className="w-full px-1 py-1 text-xs focus:outline-none text-center"
                          value={member.civilStatus}
                          onChange={(e) => updateMember(index, "civilStatus", e.target.value)}
                        />
                      </td>
                      <td className="border border-gray-800 p-1">
                        <input
                          type="text"
                          className="w-full px-1 py-1 text-xs focus:outline-none text-center"
                          value={member.youthClassification}
                          onChange={(e) => updateMember(index, "youthClassification", e.target.value)}
                        />
                      </td>
                      <td className="border border-gray-800 p-1">
                        <input
                          type="text"
                          className="w-full px-1 py-1 text-xs focus:outline-none text-center"
                          value={member.youthAgeGroup}
                          onChange={(e) => updateMember(index, "youthAgeGroup", e.target.value)}
                        />
                      </td>
                      <td className="border border-gray-800 p-1">
                        <input
                          type="text"
                          className="w-full px-1 py-1 text-xs focus:outline-none"
                          value={member.emailAddress}
                          onChange={(e) => updateMember(index, "emailAddress", e.target.value)}
                        />
                      </td>
                      <td className="border border-gray-800 p-1">
                        <input
                          type="text"
                          className="w-full px-1 py-1 text-xs focus:outline-none"
                          value={member.contactNumber}
                          onChange={(e) => updateMember(index, "contactNumber", e.target.value)}
                        />
                      </td>
                      <td className="border border-gray-800 p-1">
                        <input
                          type="text"
                          className="w-full px-1 py-1 text-xs focus:outline-none"
                          value={member.homeAddress}
                          onChange={(e) => updateMember(index, "homeAddress", e.target.value)}
                        />
                      </td>
                      <td className="border border-gray-800 p-1">
                        <input
                          type="text"
                          className="w-full px-1 py-1 text-xs focus:outline-none"
                          value={member.educationalAttainment}
                          onChange={(e) => updateMember(index, "educationalAttainment", e.target.value)}
                        />
                      </td>
                      <td className="border border-gray-800 p-1">
                        <input
                          type="text"
                          className="w-full px-1 py-1 text-xs focus:outline-none"
                          value={member.workStatus}
                          onChange={(e) => updateMember(index, "workStatus", e.target.value)}
                        />
                      </td>
                      <td className="border border-gray-800 p-1">
                        <input
                          type="text"
                          className="w-full px-1 py-1 text-xs focus:outline-none text-center"
                          value={member.registeredVoter}
                          onChange={(e) => updateMember(index, "registeredVoter", e.target.value)}
                          placeholder="Y/N"
                        />
                      </td>
                      <td className="border border-gray-800 p-1">
                        <input
                          type="text"
                          className="w-full px-1 py-1 text-xs focus:outline-none text-center"
                          value={member.votedLastElection}
                          onChange={(e) => updateMember(index, "votedLastElection", e.target.value)}
                          placeholder="Y/N"
                        />
                      </td>
                      <td className="border border-gray-800 p-1">
                        <input
                          type="text"
                          className="w-full px-1 py-1 text-xs focus:outline-none text-center"
                          value={member.attendedKKAssembly}
                          onChange={(e) => updateMember(index, "attendedKKAssembly", e.target.value)}
                          placeholder="Y/N"
                        />
                      </td>
                      <td className="border border-gray-800 p-1">
                        <input
                          type="text"
                          className="w-full px-1 py-1 text-xs focus:outline-none text-center"
                          value={member.assemblyFrequency}
                          onChange={(e) => updateMember(index, "assemblyFrequency", e.target.value)}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {/* Action Buttons */}
            <div className="mt-8 flex justify-between items-center print:hidden">
              <Link 
                href="/members" 
                className="px-4 py-2 text-gray-700 rounded border border-gray-300 hover:bg-gray-100 font-medium text-sm"
              >
                Back to Members
              </Link>
              <div className="flex gap-2">
                <button 
                  onClick={() => setShowExportModal(true)}
                  className="inline-flex items-center px-4 py-2 bg-[#FEC425] text-white rounded-md hover:bg-yellow-500 transition-colors font-medium text-sm"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Report History Modal */}
        {showReportHistory && (
          <div className="fixed inset-0 backdrop-blur-sm bg-gray-700/30 flex items-center justify-center z-50 transition-opacity duration-300">
            <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-2xl border border-gray-200">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-[#0B51A6]">Report History</h3>
                <button 
                  onClick={() => setShowReportHistory(false)}
                  className="text-gray-500 hover:text-gray-700 transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              
              <div className="border rounded-md divide-y max-h-[60vh] overflow-y-auto">
                {reportHistory.map(report => (
                  <div key={report.id} className="p-4 hover:bg-gray-50 flex items-center justify-between">
                    <div>
                      <p className="font-medium text-base">{report.title}</p>
                      <div className="flex items-center text-sm text-gray-500 mt-2">
                        <Calendar className="h-4 w-4 mr-2" />
                        <span>{report.date}</span>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <span className="px-3 py-1 bg-gray-100 text-sm rounded-md mr-3">{report.format}</span>
                      <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                        <Download className="h-5 w-5 text-gray-600 hover:text-[#0B51A6]" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => setShowReportHistory(false)}
                  className="px-5 py-2 bg-gray-100 text-gray-700 rounded-md border border-gray-300 hover:bg-gray-200 text-sm font-medium transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
        
        {/* Export Modal */}
        {showExportModal && (
          <div className="fixed inset-0 backdrop-blur-sm bg-gray-700/30 flex items-center justify-center z-50 transition-opacity duration-300">
            <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-lg border border-gray-200">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-[#0B51A6]">Export Report</h3>
                <button 
                  onClick={() => setShowExportModal(false)}
                  className="text-gray-500 hover:text-gray-700 transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              
              <div>
                <div className="mb-5">
                  <label htmlFor="reportTitle" className="block text-sm font-medium text-gray-700 mb-2">
                    Report Title
                  </label>
                  <input
                    type="text"
                    id="reportTitle"
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#0B51A6]"
                    placeholder="Enter report title"
                    value={exportData.title}
                    onChange={(e) => setExportData({...exportData, title: e.target.value})}
                  />
                </div>
                
                <div className="mb-5">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Export Format
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    <button
                      className={`flex items-center justify-center px-4 py-3 border rounded-md transition-colors ${exportData.format === 'pdf' ? 'bg-[#0B51A6] text-white border-[#0B51A6]' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'}`}
                      onClick={() => setExportData({...exportData, format: 'pdf'})}
                    >
                      PDF
                    </button>
                    <button
                      className={`flex items-center justify-center px-4 py-3 border rounded-md transition-colors ${exportData.format === 'xlsx' ? 'bg-[#0B51A6] text-white border-[#0B51A6]' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'}`}
                      onClick={() => setExportData({...exportData, format: 'xlsx'})}
                    >
                      XLSX
                    </button>
                    <button
                      className={`flex items-center justify-center px-4 py-3 border rounded-md transition-colors ${exportData.format === 'docx' ? 'bg-[#0B51A6] text-white border-[#0B51A6]' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'}`}
                      onClick={() => setExportData({...exportData, format: 'docx'})}
                    >
                      DOCX
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 flex justify-end gap-3">
                <button
                  onClick={() => setShowExportModal(false)}
                  className="px-5 py-2 bg-gray-100 text-gray-700 rounded-md border border-gray-300 hover:bg-gray-200 text-sm font-medium transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleExport}
                  className="px-5 py-2 bg-[#FEC425] text-white rounded-md hover:bg-yellow-500 text-sm font-medium transition-colors flex items-center"
                >
                  <Download className="h-4 w-4 mr-2" /> Export
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Add proper error handling with a fallback */}
      <script dangerouslySetInnerHTML={{
        __html: `
          document.addEventListener('DOMContentLoaded', function() {
            const logo = document.querySelector('img[alt="SK Logo"]');
            if (logo) {
              logo.onerror = function() {
                console.log('Logo failed to load, trying alternate');
                logo.src = '/SKPro-Logo.svg';
              };
            }
          });
        `
      }} />
    </>
  );
} 