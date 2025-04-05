"use client";

import React, { useState, useEffect } from "react";
import { Printer, Download, FileText, RefreshCw, History, Upload, Plus, ArrowDown, Calendar, CheckCircle, X } from "lucide-react";
import Link from "next/link";

export default function ReportsPage() {
  const [members, setMembers] = useState([
    createEmptyMember(), // Start with one empty row
  ]);
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

  // Function to create an empty member record
  function createEmptyMember() {
    return {
      region: "",
      province: "",
      cityMunicipality: "",
      barangay: "",
      name: "",
      age: "",
      birthday: "",
      sex: "",
      civilStatus: "",
      youthClassification: "",
      educationalAttainment: "",
      emailAddress: "",
      contactNumber: "",
      homeAddress: "",
      workStatus: "",
      registeredVoter: "",
      attendsGatherings: "",
      skills: "",
      ifEmployed: ""
    };
  }

  // Add default data for location fields only once on component mount
  useEffect(() => {
    const defaultRegion = "REGION X";
    const defaultProvince = "MISAMIS ORIENTAL";
    const defaultCity = "CAGAYAN DE ORO CITY";
    const defaultBarangay = "BARANGAY KAUSWAGAN";
    
    setMembers(members => members.map(member => ({
      ...member,
      region: member.region || defaultRegion,
      province: member.province || defaultProvince,
      cityMunicipality: member.cityMunicipality || defaultCity,
      barangay: member.barangay || defaultBarangay
    })));
  }, []);

  // Function to add a new empty row
  const addRow = () => {
    const lastMember = members[members.length - 1];
    const newMember = createEmptyMember();
    
    // Copy location data from last row for convenience
    newMember.region = lastMember.region;
    newMember.province = lastMember.province;
    newMember.cityMunicipality = lastMember.cityMunicipality;
    newMember.barangay = lastMember.barangay;
    
    setMembers([...members, newMember]);
  };

  // Function to update a specific field of a member
  const updateMember = (index: number, field: string, value: string) => {
    const updatedMembers = [...members];
    updatedMembers[index] = {
      ...updatedMembers[index],
      [field]: value
    };
    setMembers(updatedMembers);
  };

  // Function to handle print
  const handlePrint = () => {
    window.print();
  };

  // Function to add members from the member database
  const importFromDatabase = () => {
    // This would normally fetch data from your API
    // For now, we'll just add some sample data
    const sampleData = [
      {
        region: "REGION X",
        province: "MISAMIS ORIENTAL",
        cityMunicipality: "CAGAYAN DE ORO CITY",
        barangay: "BARANGAY KAUSWAGAN",
        name: "Viola, Courtney",
        age: "22",
        birthday: "06/15/2001",
        sex: "Female",
        civilStatus: "Single",
        youthClassification: "Working Youth",
        educationalAttainment: "College Graduate",
        emailAddress: "courtney@example.com",
        contactNumber: "09123456789",
        homeAddress: "123 Main St, Proper",
        workStatus: "Employed",
        registeredVoter: "Y",
        attendsGatherings: "Y",
        skills: "Photography, Writing",
        ifEmployed: "Web Developer"
      },
      {
        region: "REGION X",
        province: "MISAMIS ORIENTAL",
        cityMunicipality: "CAGAYAN DE ORO CITY",
        barangay: "BARANGAY KAUSWAGAN",
        name: "Santos, Miguel",
        age: "19",
        birthday: "03/22/2004",
        sex: "Male",
        civilStatus: "Single",
        youthClassification: "In School Youth",
        educationalAttainment: "College Undergraduate",
        emailAddress: "miguel@example.com",
        contactNumber: "09987654321",
        homeAddress: "456 Secondary St, Barangay 76",
        workStatus: "Student",
        registeredVoter: "Y",
        attendsGatherings: "N",
        skills: "Basketball, Singing",
        ifEmployed: ""
      }
    ];
    
    setMembers([...members, ...sampleData]);
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
      {/* Print Styles */}
      <style jsx global>{`
        @media print {
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
          
          .print\\:block {
            display: block !important;
          }
          
          table {
            font-size: 8pt;
            page-break-inside: auto;
          }
          
          tr {
            page-break-inside: avoid;
            page-break-after: auto;
          }
          
          td, th {
            padding: 1mm !important;
          }
          
          input {
            border: none;
            background: transparent;
            padding: 0;
            font-family: inherit;
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
                <Plus className="h-4 w-4 mr-2" />
                Create New
              </button>
              
              {/* Print Button */}
              <button
                onClick={handlePrint}
                className="inline-flex items-center px-4 py-2 bg-[#0B51A6] text-white rounded-md hover:bg-blue-700 transition-colors font-medium text-sm"
              >
                <Printer className="h-4 w-4 mr-2" />
                Print
              </button>
            </div>
          </div>
        </div>

        {/* Report Content */}
        <div className="p-4 sm:p-6">
          <div className="bg-white border border-gray-200 rounded-sm shadow-sm p-4 sm:p-6 mb-6">
            {/* Form Title and Instruction Section */}
            <div className="print:block">
              <div className="text-right mb-2">
                <h3 className="text-lg font-bold">ANNEX 4</h3>
              </div>
              <div className="mb-8">
                <h3 className="font-bold mb-2">Instructions:</h3>
                <p className="mb-2">Dear SK Officials,</p>
                <p className="mb-2">Congratulations for being elected as primary movers in youth development in your locality.</p>
                <p className="mb-2">The fundamental purpose of youth profiling is to be able to come up with a complete list of all youth ages 15-30 years old in your respective barangay. The said data gathering also aim to come up with relevant interventions through programs and projects based on the profiles of the youth in the area and identified issues and recommendations.</p>
                <p className="mb-2">Please ensure that all youth in the barangay including yourselves are part of the list.</p>
                <p className="mb-2 italic">Mabuhay ang Kabataang Pilipino!</p>
              </div>
              
              <div className="text-center mb-6">
                <h2 className="text-xl font-bold uppercase">KATIPUNAN NG KABATAAN YOUTH PROFILE</h2>
              </div>
            </div>

            {/* Table with all the fields */}
            <div className="overflow-x-auto">
              <table className="min-w-full border border-gray-300 text-xs">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-300 px-1 py-1 text-center uppercase font-medium w-1/16">REGION</th>
                    <th className="border border-gray-300 px-1 py-1 text-center uppercase font-medium w-1/16">PROVINCE</th>
                    <th className="border border-gray-300 px-1 py-1 text-center uppercase font-medium w-1/16">CITY/ MUNICIPALITY</th>
                    <th className="border border-gray-300 px-1 py-1 text-center uppercase font-medium w-1/16">BARANGAY</th>
                    <th className="border border-gray-300 px-1 py-1 text-center uppercase font-medium w-1/16">NAME</th>
                    <th className="border border-gray-300 px-1 py-1 text-center uppercase font-medium w-1/16">AGE</th>
                    <th className="border border-gray-300 px-1 py-1 text-center uppercase font-medium w-1/16">BIRTHDAY</th>
                    <th className="border border-gray-300 px-1 py-1 text-center uppercase font-medium w-1/16">SEX ASSIGNED AT BIRTH</th>
                    <th className="border border-gray-300 px-1 py-1 text-center uppercase font-medium w-1/16">CIVIL STATUS</th>
                    <th className="border border-gray-300 px-1 py-1 text-center uppercase font-medium w-1/16">YOUTH CLASSIFICATION (IN SCHOOL/OSY/WORKING)</th>
                    <th className="border border-gray-300 px-1 py-1 text-center uppercase font-medium w-1/16">EDUCATIONAL ATTAINMENT</th>
                    <th className="border border-gray-300 px-1 py-1 text-center uppercase font-medium w-1/16">EMAIL ADDRESS</th>
                    <th className="border border-gray-300 px-1 py-1 text-center uppercase font-medium w-1/16">CONTACT NUMBER</th>
                    <th className="border border-gray-300 px-1 py-1 text-center uppercase font-medium w-1/16">HOME ADDRESS</th>
                    <th className="border border-gray-300 px-1 py-1 text-center uppercase font-medium w-1/16">WORK STATUS</th>
                    <th className="border border-gray-300 px-1 py-1 text-center uppercase font-medium w-1/16">REGISTERED VOTER? (Y/N)</th>
                    <th className="border border-gray-300 px-1 py-1 text-center uppercase font-medium w-1/16">ATTENDS SK/KK GATHERINGS? (Y/N)</th>
                    <th className="border border-gray-300 px-1 py-1 text-center uppercase font-medium w-1/16">SKILLS/ TALENTS</th>
                    <th className="border border-gray-300 px-1 py-1 text-center uppercase font-medium w-1/16">IF EMPLOYED, POSITION</th>
                  </tr>
                </thead>
                <tbody>
                  {members.map((member, index) => (
                    <tr key={index}>
                      <td className="border border-gray-300 p-1">
                        <input
                          type="text"
                          className="w-full px-1 py-1 text-xs focus:outline-none"
                          value={member.region}
                          onChange={(e) => updateMember(index, "region", e.target.value)}
                        />
                      </td>
                      <td className="border border-gray-300 p-1">
                        <input
                          type="text"
                          className="w-full px-1 py-1 text-xs focus:outline-none"
                          value={member.province}
                          onChange={(e) => updateMember(index, "province", e.target.value)}
                        />
                      </td>
                      <td className="border border-gray-300 p-1">
                        <input
                          type="text"
                          className="w-full px-1 py-1 text-xs focus:outline-none"
                          value={member.cityMunicipality}
                          onChange={(e) => updateMember(index, "cityMunicipality", e.target.value)}
                        />
                      </td>
                      <td className="border border-gray-300 p-1">
                        <input
                          type="text"
                          className="w-full px-1 py-1 text-xs focus:outline-none"
                          value={member.barangay}
                          onChange={(e) => updateMember(index, "barangay", e.target.value)}
                        />
                      </td>
                      <td className="border border-gray-300 p-1">
                        <input
                          type="text"
                          className="w-full px-1 py-1 text-xs focus:outline-none"
                          value={member.name}
                          onChange={(e) => updateMember(index, "name", e.target.value)}
                        />
                      </td>
                      <td className="border border-gray-300 p-1">
                        <input
                          type="text"
                          className="w-full px-1 py-1 text-xs focus:outline-none"
                          value={member.age}
                          onChange={(e) => updateMember(index, "age", e.target.value)}
                        />
                      </td>
                      <td className="border border-gray-300 p-1">
                        <input
                          type="text"
                          className="w-full px-1 py-1 text-xs focus:outline-none"
                          value={member.birthday}
                          onChange={(e) => updateMember(index, "birthday", e.target.value)}
                        />
                      </td>
                      <td className="border border-gray-300 p-1">
                        <input
                          type="text"
                          className="w-full px-1 py-1 text-xs focus:outline-none"
                          value={member.sex}
                          onChange={(e) => updateMember(index, "sex", e.target.value)}
                        />
                      </td>
                      <td className="border border-gray-300 p-1">
                        <input
                          type="text"
                          className="w-full px-1 py-1 text-xs focus:outline-none"
                          value={member.civilStatus}
                          onChange={(e) => updateMember(index, "civilStatus", e.target.value)}
                        />
                      </td>
                      <td className="border border-gray-300 p-1">
                        <input
                          type="text"
                          className="w-full px-1 py-1 text-xs focus:outline-none"
                          value={member.youthClassification}
                          onChange={(e) => updateMember(index, "youthClassification", e.target.value)}
                        />
                      </td>
                      <td className="border border-gray-300 p-1">
                        <input
                          type="text"
                          className="w-full px-1 py-1 text-xs focus:outline-none"
                          value={member.educationalAttainment}
                          onChange={(e) => updateMember(index, "educationalAttainment", e.target.value)}
                        />
                      </td>
                      <td className="border border-gray-300 p-1">
                        <input
                          type="text"
                          className="w-full px-1 py-1 text-xs focus:outline-none"
                          value={member.emailAddress}
                          onChange={(e) => updateMember(index, "emailAddress", e.target.value)}
                        />
                      </td>
                      <td className="border border-gray-300 p-1">
                        <input
                          type="text"
                          className="w-full px-1 py-1 text-xs focus:outline-none"
                          value={member.contactNumber}
                          onChange={(e) => updateMember(index, "contactNumber", e.target.value)}
                        />
                      </td>
                      <td className="border border-gray-300 p-1">
                        <input
                          type="text"
                          className="w-full px-1 py-1 text-xs focus:outline-none"
                          value={member.homeAddress}
                          onChange={(e) => updateMember(index, "homeAddress", e.target.value)}
                        />
                      </td>
                      <td className="border border-gray-300 p-1">
                        <input
                          type="text"
                          className="w-full px-1 py-1 text-xs focus:outline-none"
                          value={member.workStatus}
                          onChange={(e) => updateMember(index, "workStatus", e.target.value)}
                        />
                      </td>
                      <td className="border border-gray-300 p-1">
                        <input
                          type="text"
                          className="w-full px-1 py-1 text-xs focus:outline-none"
                          value={member.registeredVoter}
                          onChange={(e) => updateMember(index, "registeredVoter", e.target.value)}
                        />
                      </td>
                      <td className="border border-gray-300 p-1">
                        <input
                          type="text"
                          className="w-full px-1 py-1 text-xs focus:outline-none"
                          value={member.attendsGatherings}
                          onChange={(e) => updateMember(index, "attendsGatherings", e.target.value)}
                        />
                      </td>
                      <td className="border border-gray-300 p-1">
                        <input
                          type="text"
                          className="w-full px-1 py-1 text-xs focus:outline-none"
                          value={member.skills}
                          onChange={(e) => updateMember(index, "skills", e.target.value)}
                        />
                      </td>
                      <td className="border border-gray-300 p-1">
                        <input
                          type="text"
                          className="w-full px-1 py-1 text-xs focus:outline-none"
                          value={member.ifEmployed}
                          onChange={(e) => updateMember(index, "ifEmployed", e.target.value)}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {/* Add Row Button - hidden when printing */}
            <div className="mt-4 print:hidden">
              <button
                onClick={addRow}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded border border-gray-300 hover:bg-gray-200 inline-flex items-center text-xs font-medium"
              >
                <RefreshCw className="h-3 w-3 mr-1" />
                Add Row
              </button>
            </div>
            
            {/* Form Actions - hidden when printing */}
            <div className="mt-8 flex justify-between items-center print:hidden">
              <Link 
                href="/members" 
                className="px-4 py-2 text-gray-700 rounded border border-gray-300 hover:bg-gray-100 font-medium text-sm"
              >
                Back to Members
              </Link>
              <div className="flex gap-2">
                <button
                  onClick={handlePrint}
                  className="inline-flex items-center px-4 py-2 bg-[#0B51A6] text-white rounded-md hover:bg-blue-700 transition-colors font-medium text-sm"
                >
                  <Printer className="h-4 w-4 mr-2" />
                  Print
                </button>
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
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-[#0B51A6]">Report History</h3>
                <button 
                  onClick={() => setShowReportHistory(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              
              <div className="border rounded-md divide-y">
                {reportHistory.map(report => (
                  <div key={report.id} className="p-3 hover:bg-gray-50 flex items-center justify-between">
                    <div>
                      <p className="font-medium">{report.title}</p>
                      <div className="flex items-center text-sm text-gray-500 mt-1">
                        <Calendar className="h-3 w-3 mr-1" />
                        <span>{report.date}</span>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <span className="px-2 py-1 bg-gray-100 text-xs rounded-md mr-2">{report.format}</span>
                      <Download className="h-4 w-4 text-gray-500 hover:text-[#0B51A6] cursor-pointer" />
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-4 flex justify-end">
                <button
                  onClick={() => setShowReportHistory(false)}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded border border-gray-300 hover:bg-gray-200 text-sm"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
        
        {/* Export Modal */}
        {showExportModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-[#0B51A6]">Export Report</h3>
                <button 
                  onClick={() => setShowExportModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              
              <div>
                <div className="mb-4">
                  <label htmlFor="reportTitle" className="block text-sm font-medium text-gray-700 mb-1">
                    Report Title
                  </label>
                  <input
                    type="text"
                    id="reportTitle"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#0B51A6]"
                    placeholder="Enter report title"
                    value={exportData.title}
                    onChange={(e) => setExportData({...exportData, title: e.target.value})}
                  />
                </div>
                
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Export Format
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      className={`flex items-center justify-center px-3 py-2 border rounded-md ${exportData.format === 'pdf' ? 'bg-[#0B51A6] text-white border-[#0B51A6]' : 'bg-white text-gray-700 border-gray-300'}`}
                      onClick={() => setExportData({...exportData, format: 'pdf'})}
                    >
                      PDF
                    </button>
                    <button
                      className={`flex items-center justify-center px-3 py-2 border rounded-md ${exportData.format === 'xlsx' ? 'bg-[#0B51A6] text-white border-[#0B51A6]' : 'bg-white text-gray-700 border-gray-300'}`}
                      onClick={() => setExportData({...exportData, format: 'xlsx'})}
                    >
                      XLSX
                    </button>
                    <button
                      className={`flex items-center justify-center px-3 py-2 border rounded-md ${exportData.format === 'docx' ? 'bg-[#0B51A6] text-white border-[#0B51A6]' : 'bg-white text-gray-700 border-gray-300'}`}
                      onClick={() => setExportData({...exportData, format: 'docx'})}
                    >
                      DOCX
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 flex justify-end gap-2">
                <button
                  onClick={() => setShowExportModal(false)}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded border border-gray-300 hover:bg-gray-200 text-sm"
                >
                  Cancel
                </button>
                <button
                  onClick={handleExport}
                  className="px-4 py-2 bg-[#FEC425] text-white rounded-md hover:bg-yellow-500 text-sm"
                >
                  Export
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
} 