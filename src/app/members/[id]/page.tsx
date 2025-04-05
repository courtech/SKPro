"use client";

import React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, Edit, Trash2, Download } from "lucide-react";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

// Sample member data - in a real app, you would fetch this based on the ID
const memberData = {
  id: "KK1001",
  personalInfo: {
    name: "Viola, Courtney",
    fullName: "Courtney D. Viola",
    firstName: "Courtney",
    lastName: "Viola",
    middleName: "D.",
    suffix: "",
    sex: "Female",
    birthdate: "2001-06-15",
    age: 22,
    civilStatus: "Single",
  },
  contactInfo: {
    region: "NCR",
    province: "Metro Manila",
    cityMunicipality: "Quezon City",
    barangay: "San Roque",
    purokZone: "Proper",
    email: "courtney.viola@example.com",
    contactNumber: "09123456789",
  },
  classification: {
    youthClassification: "Working Youth",
    youthAgeGroup: "Core Youth (18-24 yrs old)",
    educationalAttainment: "College Level",
    workStatus: "Self-Employed",
    isRegisteredSKVoter: true,
    isRegisteredNationalVoter: true,
    votedLastElection: true,
    isPWD: false,
    isSingleParent: false,
    isInConflictWithLaw: false,
    isIndigenous: false,
    attendsAssembly: true,
    assemblyFrequency: "3-4 Times",
    notAttendedReason: "",
  },
  metadata: {
    dateAdded: "2023-12-28",
    lastUpdated: "2024-01-15",
  }
};

export default function MemberDetailPage() {
  const params = useParams();
  const memberId = params.id;
  
  // In a real app, fetch member data based on memberId
  
  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' });
  };
  
  // Export to PDF
  const exportToPDF = async () => {
    const questionnaireElement = document.getElementById('member-questionnaire');
    if (!questionnaireElement) return;
    
    try {
      const canvas = await html2canvas(questionnaireElement, {
        scale: 2,
        useCORS: true,
        logging: false
      });
      
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const imgX = (pdfWidth - imgWidth * ratio) / 2;
      
      pdf.addImage(imgData, 'PNG', imgX, 0, imgWidth * ratio, imgHeight * ratio);
      pdf.save(`KK_Questionnaire_${memberData.personalInfo.lastName}_${memberData.personalInfo.firstName}.pdf`);
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("There was an error generating the PDF. Please try again.");
    }
  };
  
  return (
    <div className="bg-white min-h-screen font-poppins">
      {/* Simple Header - aligned with screenshot */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 border-b border-gray-200">
        <div className="flex items-center">
          <Link href="/members" className="text-gray-500 hover:text-gray-700">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <h1 className="text-xl font-semibold text-[#0B51A6] mx-auto">Member Details</h1>
          <button 
            onClick={exportToPDF}
            className="inline-flex items-center px-3 py-1.5 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            <Download className="h-4 w-4 mr-2" />
            Export
          </button>
        </div>
      </div>
      
      {/* Main Content - Questionnaire */}
      <div className="max-w-5xl mx-auto p-4 sm:p-6">
        <div 
          id="member-questionnaire" 
          className="bg-white border border-gray-300 rounded-md overflow-hidden shadow-sm p-8 mx-auto"
          style={{ maxWidth: "800px", minHeight: "1123px" }}
        >
          {/* Questionnaire Header */}
          <div className="text-right mb-6">
            <h2 className="text-lg font-bold">ANNEX 3</h2>
            <h2 className="text-lg font-bold mb-4">KK Survey Questionnaire</h2>
            <div className="flex justify-end mb-6">
              <div>
                <label className="block text-xs text-gray-500">Date:</label>
                <div className="border-b border-gray-400 w-40 text-center">
                  {formatDate(memberData.metadata.dateAdded)}
                </div>
              </div>
            </div>
          </div>
          
          {/* Respondent Information Box */}
          <div className="border border-gray-400 p-4 mb-6">
            <p className="mb-2 font-bold">TO THE RESPONDENT:</p>
            <p className="mb-2">Good day!</p>
            <p className="text-sm mb-4">
              We are currently conducting a study that focuses on assessing the demographic information of the Katipunan 
              ng Kabataan. We would like to ask your participation by taking your time to answer this questionnaire. Please 
              read the questions carefully and answer them accurately.
            </p>
            <p className="text-xs font-bold">REST ASSURED THAT ALL INFORMATION GATHERED FROM THIS STUDY WILL BE TREATED WITH UTMOST CONFIDENTIALITY.</p>
          </div>
          
          {/* Profile Section */}
          <div className="mb-6">
            <h3 className="text-base font-bold border-b-2 border-gray-800 mb-4">I. PROFILE</h3>
            
            {/* Name */}
            <div className="mb-4">
              <label className="block text-sm mb-1">Name of Respondent</label>
              <div className="flex flex-col sm:flex-row mb-1">
                <div className="flex-1 border-b border-gray-400 mx-1 py-1">
                  {memberData.personalInfo.lastName}
                </div>
                <div className="flex-1 border-b border-gray-400 mx-1 py-1">
                  {memberData.personalInfo.firstName}
                </div>
                <div className="flex-1 border-b border-gray-400 mx-1 py-1">
                  {memberData.personalInfo.middleName}
                </div>
                <div className="flex-1 border-b border-gray-400 mx-1 py-1">
                  {memberData.personalInfo.suffix}
                </div>
              </div>
              <div className="flex flex-col sm:flex-row text-xs text-center">
                <div className="flex-1 mx-1">Last Name</div>
                <div className="flex-1 mx-1">First Name</div>
                <div className="flex-1 mx-1">Middle Name</div>
                <div className="flex-1 mx-1">Suffix</div>
              </div>
            </div>
            
            {/* Location */}
            <div className="mb-4">
              <label className="block text-sm mb-1">Location:</label>
              <div className="flex flex-col sm:flex-row mb-1">
                <div className="flex-1 border-b border-gray-400 mx-1 py-1">
                  {memberData.contactInfo.region}
                </div>
                <div className="flex-1 border-b border-gray-400 mx-1 py-1">
                  {memberData.contactInfo.province}
                </div>
                <div className="flex-1 border-b border-gray-400 mx-1 py-1">
                  {memberData.contactInfo.cityMunicipality}
                </div>
                <div className="flex-1 border-b border-gray-400 mx-1 py-1">
                  {memberData.contactInfo.barangay}
                </div>
                <div className="flex-1 border-b border-gray-400 mx-1 py-1">
                  {memberData.contactInfo.purokZone}
                </div>
              </div>
              <div className="flex flex-col sm:flex-row text-xs text-center">
                <div className="flex-1 mx-1">Region</div>
                <div className="flex-1 mx-1">Province</div>
                <div className="flex-1 mx-1">City/Municipality</div>
                <div className="flex-1 mx-1">Barangay</div>
                <div className="flex-1 mx-1">Purok/Zone</div>
              </div>
            </div>
            
            {/* Sex, Age, Contact */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
              <div>
                <label className="block text-sm mb-1">Sex Assigned at Birth:</label>
                <div className="flex items-center mb-2">
                  <div className="mr-4 flex items-center">
                    <div className={`w-4 h-4 border border-gray-400 ${memberData.personalInfo.sex === 'Male' ? 'bg-gray-800' : 'bg-white'}`}></div>
                    <span className="ml-2 text-sm">Male</span>
                  </div>
                  <div className="flex items-center">
                    <div className={`w-4 h-4 border border-gray-400 ${memberData.personalInfo.sex === 'Female' ? 'bg-gray-800' : 'bg-white'}`}></div>
                    <span className="ml-2 text-sm">Female</span>
                  </div>
                </div>
              </div>
              
              <div>
                <label className="block text-sm mb-1">Age:</label>
                <div className="border-b border-gray-400 py-1">
                  {memberData.personalInfo.age}
                </div>
              </div>
              
              <div>
                <label className="block text-sm mb-1">E-mail address:</label>
                <div className="border-b border-gray-400 py-1">
                  {memberData.contactInfo.email}
                </div>
              </div>
            </div>
            
            {/* Birthday and Contact */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm mb-1">Birthday:</label>
                <div className="border-b border-gray-400 py-1">
                  {formatDate(memberData.personalInfo.birthdate)}
                </div>
                <div className="text-xs text-center">(MM/DD/YY)</div>
              </div>
              
              <div>
                <label className="block text-sm mb-1">Contact #:</label>
                <div className="border-b border-gray-400 py-1">
                  {memberData.contactInfo.contactNumber}
                </div>
              </div>
            </div>
          </div>
          
          {/* Demographic Characteristics */}
          <div className="mb-6">
            <h3 className="text-base font-bold border-b-2 border-gray-800 mb-4">II. DEMOGRAPHIC CHARACTERISTICS</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
              {/* Civil Status */}
              <div className="border border-gray-400 p-2">
                <div className="font-medium mb-2">Civil Status</div>
                <div className="grid grid-cols-1 gap-1">
                  {['Single', 'Married', 'Widowed', 'Divorced', 'Separated', 'Annulled', 'Unknown', 'Live-in'].map(status => (
                    <div key={status} className="flex items-center">
                      <div className={`w-4 h-4 border border-gray-400 ${memberData.personalInfo.civilStatus === status ? 'bg-gray-800' : 'bg-white'}`}></div>
                      <span className="ml-2 text-sm">{status}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Youth Classification */}
              <div className="border border-gray-400 p-2">
                <div className="font-medium mb-2">Youth Classification</div>
                <div className="grid grid-cols-1 gap-1">
                  {['In School Youth', 'Out of School Youth', 'Working Youth', 'Youth w/ Disability', 'Children in Conflict w/ Law', 'Indigenous People'].map(classification => (
                    <div key={classification} className="flex items-center">
                      <div className={`w-4 h-4 border border-gray-400 ${memberData.classification.youthClassification === classification ? 'bg-gray-800' : 'bg-white'}`}></div>
                      <span className="ml-2 text-sm">{classification}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Youth Age Group */}
              <div className="border border-gray-400 p-2">
                <div className="font-medium mb-2">Youth Age Group</div>
                <div className="grid grid-cols-1 gap-1">
                  {['Child Youth (13-17 yrs old)', 'Core Youth (18-24 yrs old)', 'Young Adult (15-30 yrs old)'].map(group => (
                    <div key={group} className="flex items-center">
                      <div className={`w-4 h-4 border border-gray-400 ${memberData.classification.youthAgeGroup === group ? 'bg-gray-800' : 'bg-white'}`}></div>
                      <span className="ml-2 text-sm">{group}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              {/* Educational Background */}
              <div className="border border-gray-400 p-2">
                <div className="font-medium mb-2">Educational Background</div>
                <div className="grid grid-cols-1 gap-1">
                  {[
                    'Elementary Level', 'Elementary Grad',
                    'High School Level', 'High School Grad',
                    'Vocational Grad', 'College Level',
                    'College Grad', 'Masters Level',
                    'Masters Grad', 'Doctorate Level',
                    'Doctorate Graduate'
                  ].map(level => (
                    <div key={level} className="flex items-center">
                      <div className={`w-4 h-4 border border-gray-400 ${memberData.classification.educationalAttainment === level ? 'bg-gray-800' : 'bg-white'}`}></div>
                      <span className="ml-2 text-sm">{level}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Work Status */}
              <div className="border border-gray-400 p-2">
                <div className="font-medium mb-2">Work Status</div>
                <div className="grid grid-cols-1 gap-1">
                  {[
                    'Employed', 'Unemployed', 'Self-Employed',
                    'Currently looking for a Job', 'Not interested Looking for a Job'
                  ].map(status => (
                    <div key={status} className="flex items-center">
                      <div className={`w-4 h-4 border border-gray-400 ${memberData.classification.workStatus === status ? 'bg-gray-800' : 'bg-white'}`}></div>
                      <span className="ml-2 text-sm">{status}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Registered Voters */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
              <div>
                <div className="font-medium mb-2">Registered SK Voter?</div>
                <div className="flex items-center">
                  <div className="mr-4 flex items-center">
                    <div className={`w-4 h-4 border border-gray-400 ${memberData.classification.isRegisteredSKVoter ? 'bg-gray-800' : 'bg-white'}`}></div>
                    <span className="ml-2 text-sm">Yes</span>
                  </div>
                  <div className="flex items-center">
                    <div className={`w-4 h-4 border border-gray-400 ${!memberData.classification.isRegisteredSKVoter ? 'bg-gray-800' : 'bg-white'}`}></div>
                    <span className="ml-2 text-sm">No</span>
                  </div>
                </div>
              </div>
              
              <div>
                <div className="font-medium mb-2">Registered National Voter?</div>
                <div className="flex items-center">
                  <div className="mr-4 flex items-center">
                    <div className={`w-4 h-4 border border-gray-400 ${memberData.classification.isRegisteredNationalVoter ? 'bg-gray-800' : 'bg-white'}`}></div>
                    <span className="ml-2 text-sm">Yes</span>
                  </div>
                  <div className="flex items-center">
                    <div className={`w-4 h-4 border border-gray-400 ${!memberData.classification.isRegisteredNationalVoter ? 'bg-gray-800' : 'bg-white'}`}></div>
                    <span className="ml-2 text-sm">No</span>
                  </div>
                </div>
              </div>
              
              <div>
                <div className="font-medium mb-2">Did you vote last SK Election?</div>
                <div className="flex items-center">
                  <div className="mr-4 flex items-center">
                    <div className={`w-4 h-4 border border-gray-400 ${memberData.classification.votedLastElection ? 'bg-gray-800' : 'bg-white'}`}></div>
                    <span className="ml-2 text-sm">Yes</span>
                  </div>
                  <div className="flex items-center">
                    <div className={`w-4 h-4 border border-gray-400 ${!memberData.classification.votedLastElection ? 'bg-gray-800' : 'bg-white'}`}></div>
                    <span className="ml-2 text-sm">No</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Assembly Attendance */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <div className="font-medium mb-2">Have you already attended SK Assembly?</div>
                <div className="flex items-center">
                  <div className="mr-4 flex items-center">
                    <div className={`w-4 h-4 border border-gray-400 ${memberData.classification.attendsAssembly ? 'bg-gray-800' : 'bg-white'}`}></div>
                    <span className="ml-2 text-sm">Yes</span>
                  </div>
                  <div className="flex items-center">
                    <div className={`w-4 h-4 border border-gray-400 ${!memberData.classification.attendsAssembly ? 'bg-gray-800' : 'bg-white'}`}></div>
                    <span className="ml-2 text-sm">No</span>
                  </div>
                </div>
                
                {memberData.classification.attendsAssembly && (
                  <div className="mt-2">
                    <div className="font-medium mb-1">If Yes, How many times?</div>
                    <div className="flex items-center">
                      {['1-2 Times', '3-4 Times', '5 and above'].map(frequency => (
                        <div key={frequency} className="mr-4 flex items-center">
                          <div className={`w-4 h-4 border border-gray-400 ${memberData.classification.assemblyFrequency === frequency ? 'bg-gray-800' : 'bg-white'}`}></div>
                          <span className="ml-2 text-sm">{frequency}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {!memberData.classification.attendsAssembly && memberData.classification.notAttendedReason && (
                  <div className="mt-2">
                    <div className="font-medium mb-1">If No, Why?</div>
                    <div className="flex items-center">
                      {['There was no SK Assembly Meeting', 'Not Interested to Attend'].map(reason => (
                        <div key={reason} className="mr-4 flex items-center">
                          <div className={`w-4 h-4 border border-gray-400 ${memberData.classification.notAttendedReason === reason ? 'bg-gray-800' : 'bg-white'}`}></div>
                          <span className="ml-2 text-sm">{reason}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Signature */}
          <div className="mt-10 text-center">
            <p className="mb-6">Thank you for your participation!</p>
            <div className="flex flex-col items-center">
              <div className="border-b border-gray-800 w-64 h-16 mb-2"></div>
              <p className="text-sm">Name and Signature of Participant</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 