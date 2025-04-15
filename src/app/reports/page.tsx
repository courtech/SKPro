"use client";

import React, { useState, useEffect } from "react";
import { Download, FileText, History, Upload, Plus, ArrowDown, Calendar, CheckCircle, X, RefreshCw, Eye, ChevronDown, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useMemberStore } from "@/lib/store/memberStore";
import { Member } from "@/types/member";
import FirebaseTest from "./FirebaseTest";

export default function ReportsPage() {
  const { members, fetchMembers, isLoading } = useMemberStore();
  const [reportMembers, setReportMembers] = useState<any[]>([]);
  const [showImportModal, setShowImportModal] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);
  const [showNewReportModal, setShowNewReportModal] = useState(false);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [selectedReport, setSelectedReport] = useState<any>(null);
  const [exportData, setExportData] = useState({
    title: "",
    format: "pdf"
  });
  const [newReportData, setNewReportData] = useState({
    quarter: "Q1",
    year: new Date().getFullYear().toString(),
    title: `Q1 ${new Date().getFullYear()} Youth Profile Report`
  });
  
  // Empty report history
  const reportHistory: any[] = [];

  // Load members from store on mount
  useEffect(() => {
    const fetchMembersData = async () => {
      try {
        // In a real implementation, get barangayId from auth context
        const barangayId = 'default';
        await fetchMembers(barangayId);
      } catch (error) {
        console.error('Error fetching members:', error);
      }
    };
    
    fetchMembersData();
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

  // Update new report title when quarter or year changes
  useEffect(() => {
    setNewReportData(prev => ({
      ...prev,
      title: `${prev.quarter} ${prev.year} Youth Profile Report`
    }));
  }, [newReportData.quarter, newReportData.year]);

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
    const defaultRegion = "";
    const defaultProvince = "";
    const defaultCity = "";
    const defaultBarangay = "";
    
    // Only run this effect once on mount
    if (reportMembers.length === 1 && !reportMembers[0].name) {
      setReportMembers(members => members.map(member => ({
        ...member,
        region: member.region || defaultRegion,
        province: member.province || defaultProvince,
        cityMunicipality: member.cityMunicipality || defaultCity,
        barangay: member.barangay || defaultBarangay
      })));
    }
  }, []);  // Empty dependency array to ensure it only runs once on mount

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

  // Function to open the preview modal
  const openPreview = (report: any) => {
    setSelectedReport(report);
    setShowPreviewModal(true);
  };

  // Function to handle creating a new report
  const handleCreateNewReport = () => {
    // Validate the report data
    if (!newReportData.quarter || !newReportData.year || !newReportData.title.trim()) {
      alert("Please fill in all fields for the new report");
      return;
    }
    
    try {
      // Instead of just closing the modal, we would save to Firebase here
      // This would be implemented with a call to the Firebase service
      import('@/services/firebase/reports').then(async ({ createReport }) => {
        // In a real implementation, get barangayId and userId from auth context
        const barangayId = 'default'; 
        const userId = 'default';
        
        await createReport({
          title: newReportData.title,
          quarter: newReportData.quarter as 'Q1' | 'Q2' | 'Q3' | 'Q4',
          year: newReportData.year,
          barangayId: barangayId,
          createdBy: userId,
          status: 'draft',
          memberCount: 0
        });
        
        // Close the modal after successful creation
        setShowNewReportModal(false);
        
        // Reset the form
        setNewReportData({
          quarter: "Q1",
          year: new Date().getFullYear().toString(),
          title: `Q1 ${new Date().getFullYear()} Youth Profile Report`
        });
        
        // Optionally, you could refresh the reports list or navigate to the new report
      });
    } catch (error) {
      console.error("Error creating report:", error);
      alert("Failed to create report. Please try again.");
    }
  };

  // Update handlers for the import functionality
  const openImportModal = () => {
    setShowImportModal(true);
  };

  const closeImportModal = () => {
    setShowImportModal(false);
  };

  // Function to handle importing a report
  const handleImportReport = (report: any) => {
    // Here you would implement the logic to import the selected report
    alert(`Importing report: ${report.title}`);
    // Close the modal after import
    closeImportModal();
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
              <p className="text-sm text-gray-600 mt-1">Annex 4 - Barangay Youth Inventory Form</p>
            </div>
            <div className="flex gap-2">
              {/* Single Primary Report Creation Button */}
              <button
                onClick={() => setShowNewReportModal(true)}
                className="inline-flex items-center px-4 py-2 bg-[#FFB937] text-white rounded-md hover:bg-yellow-500 transition-colors font-medium text-sm"
              >
                <Plus className="h-4 w-4 mr-2" />
                Generate Quarterly Report
              </button>
              
              {/* Import Report Button (replacing View All Reports) */}
              <button
                onClick={openImportModal}
                className="inline-flex items-center px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors font-medium text-sm"
              >
                <Upload className="h-4 w-4 mr-2" />
                Import Report
              </button>
              
              {/* Refresh Members Button */}
              <button
                onClick={importFromDatabase}
                className="inline-flex items-center justify-center w-10 h-10 bg-[#0B51A6] text-white rounded-md hover:bg-[#0B51A6]/90 transition-colors"
                title="Refresh from Members database"
              >
                <RefreshCw className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Page Content Container */}
        <div className="p-4 sm:p-6">
          {/* Descriptive Context Section */}
          <div className="mb-6">
            <p className="text-gray-600 text-sm leading-relaxed">
              Generate quarterly youth profile reports from your current member database, or access previously created reports.
              The table below displays your current youth data that will be included in any new reports.
            </p>
          </div>
          
          {/* Recent Reports Section */}
          <div className="bg-white border border-gray-200 rounded-md shadow-sm p-4 sm:p-6 mb-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-800">Recent Reports</h2>
              <button 
                onClick={openImportModal}
                className="inline-flex items-center text-[#0B51A6] hover:text-[#0B51A6]/80 text-sm font-medium"
              >
                View Available Reports
                <ChevronRight className="h-4 w-4 ml-1" />
              </button>
            </div>
            
            {/* Reports Table */}
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Report Title</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date Generated</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Format</th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {reportHistory.slice(0, 3).map((report) => (
                    <tr key={report.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <FileText className="h-5 w-5 text-gray-400 mr-3" />
                          <span className="text-sm font-medium text-gray-900">{report.title}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{report.date}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                          {report.format}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button 
                          onClick={() => openPreview(report)}
                          className="text-indigo-600 hover:text-indigo-900 mr-4"
                          title="View a preview of this report"
                        >
                          Preview
                        </button>
                        <button 
                          className="text-[#0B51A6] hover:text-[#0B51A6]/70"
                          title="Download this report file"
                        >
                          Download
                        </button>
                      </td>
                    </tr>
                  ))}
                  {reportHistory.length === 0 && (
                    <tr>
                      <td colSpan={4} className="px-6 py-8 text-center text-gray-500">
                        No reports have been generated yet. Create your first quarterly report using the "Generate Quarterly Report" button above.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
          
          {/* Current Annex 4 Data Section - with visual separation */}
          <div className="mb-2">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-800">Current Annex 4 Data</h2>
              <div className="flex items-center">
                <span className="text-sm text-gray-500 mr-3">Data will be included in your next report</span>
                <button
                  onClick={importFromDatabase}
                  className="inline-flex items-center px-3 py-1.5 text-xs bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
                  title="Refresh data from member database"
                >
                  <RefreshCw className="h-3.5 w-3.5 mr-1" />
                  Refresh Data
                </button>
              </div>
            </div>
            <p className="text-sm text-gray-500 mb-3">
              This is the current youth data that will be included in any new reports you generate.
            </p>
          </div>

          <div className="bg-white border border-gray-200 rounded-md shadow-sm p-4 sm:p-6">
            {/* Annex 4 Header */}
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
                  Export Current View
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* New Report Modal - improved context and labeling */}
        {showNewReportModal && (
          <div className="fixed inset-0 backdrop-blur-sm bg-gray-700/30 flex items-center justify-center z-50 transition-opacity duration-300">
            <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-lg border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-[#0B51A6]">Generate Quarterly Report</h3>
                <button 
                  onClick={() => setShowNewReportModal(false)}
                  className="text-gray-500 hover:text-gray-700 transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              
              <p className="text-sm text-gray-600 mb-6">
                Create a new quarterly youth profile report using data from your current member database. 
                This will generate an official Annex 4 document for submission.
              </p>
              
              <div>
                <div className="mb-5 grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="reportQuarter" className="block text-sm font-medium text-gray-700 mb-2">
                      Quarter <span className="text-gray-500">(Required)</span>
                    </label>
                    <select
                      id="reportQuarter"
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#0B51A6]"
                      value={newReportData.quarter}
                      onChange={(e) => setNewReportData({...newReportData, quarter: e.target.value})}
                    >
                      <option value="Q1">Q1 (Jan-Mar)</option>
                      <option value="Q2">Q2 (Apr-Jun)</option>
                      <option value="Q3">Q3 (Jul-Sep)</option>
                      <option value="Q4">Q4 (Oct-Dec)</option>
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="reportYear" className="block text-sm font-medium text-gray-700 mb-2">
                      Year <span className="text-gray-500">(Required)</span>
                    </label>
                    <select
                      id="reportYear"
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#0B51A6]"
                      value={newReportData.year}
                      onChange={(e) => setNewReportData({...newReportData, year: e.target.value})}
                    >
                      <option value="2024">2024</option>
                      <option value="2023">2023</option>
                      <option value="2022">2022</option>
                    </select>
                  </div>
                </div>
                
                <div className="mb-5">
                  <label htmlFor="reportTitle" className="block text-sm font-medium text-gray-700 mb-2">
                    Report Title <span className="text-gray-500">(Auto-generated, you can modify)</span>
                  </label>
                  <input
                    type="text"
                    id="reportTitle"
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#0B51A6]"
                    value={newReportData.title}
                    onChange={(e) => setNewReportData({...newReportData, title: e.target.value})}
                  />
                </div>
                
                <div className="p-4 bg-blue-50 border border-blue-100 rounded-md mb-5">
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <CheckCircle className="h-5 w-5 text-blue-500" />
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-blue-800">Ready to generate</h3>
                      <div className="mt-2 text-sm text-blue-700">
                        <p>This report will include all {members.length} member(s) from your current database. You can preview and download the report after it's generated.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 flex justify-end gap-3">
                <button
                  onClick={() => setShowNewReportModal(false)}
                  className="px-5 py-2 bg-gray-100 text-gray-700 rounded-md border border-gray-300 hover:bg-gray-200 text-sm font-medium transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreateNewReport}
                  className="px-5 py-2 bg-[#FEC425] text-white rounded-md hover:bg-yellow-500 text-sm font-medium transition-colors flex items-center"
                >
                  <Plus className="h-4 w-4 mr-2" /> Generate Report
                </button>
              </div>
            </div>
          </div>
        )}
        
        {/* Import Report Modal (renamed from All Reports) */}
        {showImportModal && (
          <div className="fixed inset-0 backdrop-blur-sm bg-gray-700/30 flex items-center justify-center z-50 transition-opacity duration-300">
            <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-4xl border border-gray-200">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-[#0B51A6]">Import Existing Report</h3>
                <div className="flex items-center">
                  <label className="inline-flex items-center px-3 py-1.5 bg-[#0B51A6] text-white rounded-md hover:bg-[#0B51A6]/90 transition-colors text-sm mr-4 cursor-pointer">
                    <Upload className="h-4 w-4 mr-1.5" />
                    Upload New File
                    <input type="file" className="hidden" onChange={handleFileImport} accept=".xlsx,.pdf,.docx" />
                  </label>
                  <button 
                    onClick={closeImportModal}
                    className="text-gray-500 hover:text-gray-700 transition-colors"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              </div>
              
              {/* Table view showing available reports to import */}
              <div className="overflow-x-auto mb-6 border rounded-md">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Report Title</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date Generated</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Format</th>
                      <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {reportHistory.map((report) => (
                      <tr key={report.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-14 bg-gray-100 rounded overflow-hidden mr-3">
                              <img 
                                src={report.preview || `/placeholder-${report.format.toLowerCase()}.png`} 
                                alt={`Preview of ${report.title}`}
                                className="h-full w-full object-cover"
                                onError={(e) => {
                                  const target = e.target as HTMLImageElement;
                                  target.src = `/icons/${report.format.toLowerCase()}-icon.svg`;
                                  target.onerror = null;
                                }}
                              />
                            </div>
                            <span className="text-sm font-medium text-gray-900">{report.title}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center text-sm text-gray-500">
                            <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                            <span>{report.date}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                            {report.format}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button 
                            onClick={() => openPreview(report)}
                            className="text-indigo-600 hover:text-indigo-900 mr-4"
                            title="View a preview of this report"
                          >
                            Preview
                          </button>
                          <button 
                            onClick={() => handleImportReport(report)}
                            className="text-[#0B51A6] hover:text-[#0B51A6]/70"
                            title="Import this report"
                          >
                            Import
                          </button>
                        </td>
                      </tr>
                    ))}
                    {reportHistory.length === 0 && (
                      <tr>
                        <td colSpan={4} className="px-6 py-8 text-center text-gray-500">
                          No reports available for import. Upload a report file using the "Upload New File" button above.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
              
              <div className="mt-6 flex justify-end">
                <button
                  onClick={closeImportModal}
                  className="px-5 py-2 bg-gray-100 text-gray-700 rounded-md border border-gray-300 hover:bg-gray-200 text-sm font-medium transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
        
        {/* Export Modal - clarified purpose and consistent styling */}
        {showExportModal && (
          <div className="fixed inset-0 backdrop-blur-sm bg-gray-700/30 flex items-center justify-center z-50 transition-opacity duration-300">
            <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-lg border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-[#0B51A6]">Export Current Data View</h3>
                <button 
                  onClick={() => setShowExportModal(false)}
                  className="text-gray-500 hover:text-gray-700 transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              
              <p className="text-sm text-gray-600 mb-6">
                Export your current Annex 4 data view to a file format of your choice. 
                This exports only the data currently displayed in the table and is not an official quarterly report.
              </p>
              
              <div>
                <div className="mb-5">
                  <label htmlFor="exportTitle" className="block text-sm font-medium text-gray-700 mb-2">
                    Export Title <span className="text-gray-500">(Required)</span>
                  </label>
                  <input
                    type="text"
                    id="exportTitle"
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#0B51A6]"
                    placeholder="Annex 4 - Youth Data Export"
                    value={exportData.title}
                    onChange={(e) => setExportData({...exportData, title: e.target.value})}
                  />
                </div>
                
                <div className="mb-5">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Export Format <span className="text-gray-500">(Required)</span>
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    <button
                      className={`flex items-center justify-center px-4 py-3 border rounded-md transition-colors ${exportData.format === 'pdf' ? 'bg-[#0B51A6] text-white border-[#0B51A6]' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'}`}
                      onClick={() => setExportData({...exportData, format: 'pdf'})}
                      title="Export as PDF document"
                    >
                      <FileText className="h-4 w-4 mr-2" />
                      PDF
                    </button>
                    <button
                      className={`flex items-center justify-center px-4 py-3 border rounded-md transition-colors ${exportData.format === 'xlsx' ? 'bg-[#0B51A6] text-white border-[#0B51A6]' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'}`}
                      onClick={() => setExportData({...exportData, format: 'xlsx'})}
                      title="Export as Excel spreadsheet"
                    >
                      <FileText className="h-4 w-4 mr-2" />
                      Excel
                    </button>
                    <button
                      className={`flex items-center justify-center px-4 py-3 border rounded-md transition-colors ${exportData.format === 'docx' ? 'bg-[#0B51A6] text-white border-[#0B51A6]' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'}`}
                      onClick={() => setExportData({...exportData, format: 'docx'})}
                      title="Export as Word document"
                    >
                      <FileText className="h-4 w-4 mr-2" />
                      Word
                    </button>
                  </div>
                </div>
                
                <div className="p-4 bg-gray-50 border border-gray-200 rounded-md">
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <CheckCircle className="h-5 w-5 text-gray-500" />
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-gray-700">What's included in this export?</h3>
                      <div className="mt-2 text-sm text-gray-500">
                        <p>This export will include all {reportMembers.length} member(s) currently displayed in the table.</p>
                      </div>
                    </div>
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
        
        {/* Document Preview Modal */}
        {showPreviewModal && selectedReport && (
          <div className="fixed inset-0 backdrop-blur-sm bg-gray-800/50 flex items-center justify-center z-50 transition-opacity duration-300">
            <div className="bg-white rounded-lg shadow-xl p-2 w-[90%] max-w-5xl border border-gray-200 flex flex-col h-[90vh]">
              <div className="flex items-center justify-between p-4 border-b border-gray-200">
                <div>
                  <h3 className="text-xl font-bold text-gray-800">{selectedReport.title}</h3>
                  <p className="text-sm text-gray-500 mt-1">{selectedReport.date} • {selectedReport.format}</p>
                </div>
                <button 
                  onClick={() => setShowPreviewModal(false)}
                  className="text-gray-500 hover:text-gray-700 transition-colors p-1 rounded-full hover:bg-gray-100"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              
              <div className="flex-grow p-3 bg-gray-100 overflow-auto flex items-center justify-center">
                <div className="bg-white shadow-lg border border-gray-300 mx-auto p-2 max-h-full overflow-hidden" style={{ width: '80%', aspectRatio: '8.5/11' }}>
                  {/* This would be the document preview - for demo we'll just show a large version of the preview */}
                  <img 
                    src={selectedReport.preview || `/placeholder-${selectedReport.format.toLowerCase()}.png`}
                    alt={`Full preview of ${selectedReport.title}`}
                    className="w-full h-full object-contain"
                    onError={(e) => {
                      // Fallback to a mock document
                      const target = e.target as HTMLImageElement;
                      target.src = "/mockup-report.png";
                    }}
                  />
                </div>
              </div>
              
              <div className="p-4 border-t border-gray-200 flex justify-between items-center">
                <button
                  onClick={() => setShowPreviewModal(false)}
                  className="px-5 py-2 bg-gray-100 text-gray-700 rounded-md border border-gray-300 hover:bg-gray-200 text-sm font-medium transition-colors"
                >
                  Close
                </button>
                <button
                  className="px-5 py-2 bg-[#0B51A6] text-white rounded-md hover:bg-[#0B51A6]/90 text-sm font-medium transition-colors flex items-center"
                >
                  <Download className="h-4 w-4 mr-2" /> Download {selectedReport.format}
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

      {/* Firebase Test Component */}
      <div className="mb-8">
        <FirebaseTest />
      </div>
    </>
  );
} 