"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, Eye, Save, X } from "lucide-react";
import AnnexPreviewModal from "./AnnexPreviewModal";
import { MemberData } from "./types";
import CustomDropdown from "./CustomDropdown";
import CustomCheckbox from "./CustomCheckbox";
import SignatureCanvas from 'react-signature-canvas';
import { getMemberById } from "@/lib/services/memberService";
import { transformMemberToMemberData } from "@/lib/utils/memberDataTransformer";

// Default empty member data
const emptyMemberData: MemberData = {
  id: "",
  personalInfo: {
    name: "",
    fullName: "",
    firstName: "",
    lastName: "",
    middleName: "",
    suffix: "",
    sex: "",
    birthdate: "",
    age: 0,
    civilStatus: "",
    signature: "",
  },
  contactInfo: {
    region: "",
    province: "",
    cityMunicipality: "",
    barangay: "",
    purokZone: "",
    email: "",
    contactNumber: "",
  },
  classification: {
    youthClassification: "",
    youthAgeGroup: "",
    educationalAttainment: "",
    workStatus: "",
    isRegisteredSKVoter: false,
    isRegisteredNationalVoter: false,
    votedLastElection: false,
    isPWD: false,
    isSingleParent: false,
    isInConflictWithLaw: false,
    isIndigenous: false,
    attendsAssembly: false,
    assemblyFrequency: "",
    notAttendedReason: "",
  },
  metadata: {
    dateAdded: new Date().toISOString().split('T')[0],
    lastUpdated: new Date().toISOString().split('T')[0],
  }
};

export default function MemberDetailPage() {
  const params = useParams();
  const memberId = params.id as string;
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);
  const [formData, setFormData] = useState<MemberData>(emptyMemberData);
  const [isEdited, setIsEdited] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSignatureModalOpen, setIsSignatureModalOpen] = useState(false);
  const signatureRef = useRef<SignatureCanvas>(null);
  
  // Fetch member data based on ID
  useEffect(() => {
    const fetchMemberData = async () => {
      try {
        setIsLoading(true);
        const member = await getMemberById(memberId);
        
        if (member) {
          const transformedData = transformMemberToMemberData(member);
          setFormData(transformedData);
        } else {
          setError('Member not found');
        }
      } catch (err) {
        setError('Error loading member data');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchMemberData();
  }, [memberId]);
  
  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' });
  };
  
  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    
    // Split the name into sections (e.g., "personalInfo.firstName")
    const nameParts = name.split('.');
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      
      setFormData(prev => {
        if (nameParts.length === 2) {
          const [section, field] = nameParts;
          
          if (section === 'personalInfo') {
            return {
              ...prev,
              personalInfo: {
                ...prev.personalInfo,
                [field]: checked
              }
            };
          } else if (section === 'contactInfo') {
            return {
              ...prev,
              contactInfo: {
                ...prev.contactInfo,
                [field]: checked
              }
            };
          } else if (section === 'classification') {
            return {
              ...prev,
              classification: {
                ...prev.classification,
                [field]: checked
              }
            };
          }
        }
        
        return prev;
      });
    } else {
      setFormData(prev => {
        if (nameParts.length === 2) {
          const [section, field] = nameParts;
          
          if (section === 'personalInfo') {
            return {
              ...prev,
              personalInfo: {
                ...prev.personalInfo,
                [field]: value
              }
            };
          } else if (section === 'contactInfo') {
            return {
              ...prev,
              contactInfo: {
                ...prev.contactInfo,
                [field]: value
              }
            };
          } else if (section === 'classification') {
            return {
              ...prev,
              classification: {
                ...prev.classification,
                [field]: value
              }
            };
          }
        }
        
        return prev;
      });
    }
    
    setIsEdited(true);
  };
  
  // Custom dropdown change handler
  const handleDropdownChange = (name: string, value: string) => {
    const nameParts = name.split('.');
    
    if (nameParts.length === 2) {
      const [section, field] = nameParts;
      
      setFormData(prev => {
        if (section === 'personalInfo') {
          return {
            ...prev,
            personalInfo: {
              ...prev.personalInfo,
              [field]: value
            }
          };
        } else if (section === 'contactInfo') {
          return {
            ...prev,
            contactInfo: {
              ...prev.contactInfo,
              [field]: value
            }
          };
        } else if (section === 'classification') {
          return {
            ...prev,
            classification: {
              ...prev.classification,
              [field]: value
            }
          };
        }
        return prev;
      });
    }
    
    setIsEdited(true);
  };
  
  // Show the Annex 3 preview modal
  const handleShowPreview = () => {
    setIsPreviewModalOpen(true);
  };
  
  // Handle save changes
  const handleSaveChanges = () => {
    // Update the lastUpdated metadata
    setFormData(prev => ({
      ...prev,
      metadata: {
        ...prev.metadata,
        lastUpdated: new Date().toISOString().split('T')[0]
      }
    }));
    
    // In a real app, you would send the updated data to your API
    console.log('Saving updated data:', formData);
    
    // Reset the edited flag
    setIsEdited(false);
  };
  
  // Handle discard changes
  const handleDiscardChanges = () => {
    // Reset form data to original member data by refetching it
    const fetchMemberData = async () => {
      try {
        setIsLoading(true);
        const member = await getMemberById(memberId);
        
        if (member) {
          const transformedData = transformMemberToMemberData(member);
          setFormData(transformedData);
        } else {
          setError('Member not found');
        }
      } catch (err) {
        setError('Error loading member data');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchMemberData();
    setIsEdited(false);
  };

  // Add this function near your other handler functions
  const handleSignatureSave = () => {
    if (signatureRef.current && !signatureRef.current.isEmpty()) {
      const signatureData = signatureRef.current.getTrimmedCanvas().toDataURL('image/png');
      setFormData(prev => ({
        ...prev,
        personalInfo: {
          ...prev.personalInfo,
          signature: signatureData
        }
      }));
      setIsEdited(true);
      setIsSignatureModalOpen(false);
    }
  };
  
  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-6xl mx-auto bg-white rounded-lg shadow p-8">
          <div className="animate-pulse flex flex-col space-y-4">
            <div className="h-8 bg-gray-200 rounded w-1/4"></div>
            <div className="h-60 bg-gray-200 rounded"></div>
            <div className="h-40 bg-gray-200 rounded"></div>
            <div className="h-40 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }
  
  // Show error state
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-6xl mx-auto bg-white rounded-lg shadow p-8">
          <div className="flex items-center mb-6">
            <Link href="/members" className="inline-flex items-center text-blue-600 hover:text-blue-800">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Members
            </Link>
          </div>
          <div className="text-center py-10">
            <div className="text-red-500 text-5xl mb-4">⚠️</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Error Loading Member</h2>
            <p className="text-gray-600 mb-6">{error}</p>
            <Link href="/members" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
              Return to Members List
            </Link>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="bg-white min-h-screen font-poppins">
      {/* Simple Header - aligned with screenshot */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 border-b border-gray-200">
        <div className="flex items-center">
          <Link href="/members" className="text-gray-500 hover:text-gray-700">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <h1 className="text-xl font-semibold text-[#0B51A6] mx-auto">Member Details</h1>
          <div className="flex space-x-2">
            {isEdited ? (
              <>
                <button 
                  onClick={handleDiscardChanges}
                  className="inline-flex items-center px-3 py-1.5 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                >
                  <X className="h-4 w-4 mr-2" />
                  Cancel
                </button>
                <button 
                  onClick={handleSaveChanges}
                  className="inline-flex items-center px-3 py-1.5 border border-[#0B51A6] rounded-md text-sm font-medium text-white bg-[#0B51A6] hover:bg-blue-700"
                >
                  <Save className="h-4 w-4 mr-2" />
                  Save
                </button>
              </>
            ) : (
              <button 
                onClick={handleShowPreview}
                className="inline-flex items-center px-3 py-1.5 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                <Eye className="h-4 w-4 mr-2" />
                View Annex 3
              </button>
            )}
          </div>
        </div>
      </div>
      
      {/* Main Content - Editable Form */}
      <div className="max-w-5xl mx-auto p-4 sm:p-6">
        {/* Metadata - subtle information outside the main box */}
        <div className="flex justify-between items-center mb-3 px-1">
          <div className="text-sm text-gray-500 font-medium">
            <span className="text-gray-400">ID:</span> {formData.id}
          </div>
          <div className="flex space-x-4">
            <div className="text-sm text-gray-500">
              <span className="text-gray-400">Added:</span> {formatDate(formData.metadata.dateAdded)}
            </div>
            <div className="text-sm text-gray-500">
              <span className="text-gray-400">Updated:</span> {formatDate(formData.metadata.lastUpdated)}
            </div>
          </div>
        </div>
        
        <div className="bg-white border border-gray-300 rounded-md shadow-sm p-6 mx-auto">
          {/* Personal Information */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold border-b border-gray-200 pb-2 mb-4">Personal Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                <input
                  type="text"
                  name="personalInfo.firstName"
                  value={formData.personalInfo.firstName}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#0B51A6] focus:border-[#0B51A6]"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                <input
                  type="text"
                  name="personalInfo.lastName"
                  value={formData.personalInfo.lastName}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#0B51A6] focus:border-[#0B51A6]"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Middle Name</label>
                <input
                  type="text"
                  name="personalInfo.middleName"
                  value={formData.personalInfo.middleName}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#0B51A6] focus:border-[#0B51A6]"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Suffix</label>
                <input
                  type="text"
                  name="personalInfo.suffix"
                  value={formData.personalInfo.suffix}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#0B51A6] focus:border-[#0B51A6]"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Sex</label>
                <CustomDropdown
                  options={["Male", "Female"]}
                  value={formData.personalInfo.sex}
                  onChange={(value) => handleDropdownChange("personalInfo.sex", value)}
                  name="personalInfo.sex"
                  placeholder="Select gender"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Birthdate</label>
                <input
                  type="date"
                  name="personalInfo.birthdate"
                  value={formData.personalInfo.birthdate}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#0B51A6] focus:border-[#0B51A6]"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
                <input
                  type="number"
                  name="personalInfo.age"
                  value={formData.personalInfo.age}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#0B51A6] focus:border-[#0B51A6]"
                  required
                  min="1"
                  max="120"
                />
              </div>
            </div>
          </div>
          
          {/* Contact Information */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold border-b border-gray-200 pb-2 mb-4">Contact Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  name="contactInfo.email"
                  value={formData.contactInfo.email}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#0B51A6] focus:border-[#0B51A6]"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Contact Number</label>
                <input
                  type="text"
                  name="contactInfo.contactNumber"
                  value={formData.contactInfo.contactNumber}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#0B51A6] focus:border-[#0B51A6]"
                  required
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Region</label>
                <input
                  type="text"
                  name="contactInfo.region"
                  value={formData.contactInfo.region}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#0B51A6] focus:border-[#0B51A6]"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Province</label>
                <input
                  type="text"
                  name="contactInfo.province"
                  value={formData.contactInfo.province}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#0B51A6] focus:border-[#0B51A6]"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">City/Municipality</label>
                <input
                  type="text"
                  name="contactInfo.cityMunicipality"
                  value={formData.contactInfo.cityMunicipality}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#0B51A6] focus:border-[#0B51A6]"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Barangay</label>
                <input
                  type="text"
                  name="contactInfo.barangay"
                  value={formData.contactInfo.barangay}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#0B51A6] focus:border-[#0B51A6]"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Purok/Zone</label>
                <input
                  type="text"
                  name="contactInfo.purokZone"
                  value={formData.contactInfo.purokZone}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#0B51A6] focus:border-[#0B51A6]"
                />
              </div>
            </div>
          </div>
          
          {/* Classifications */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold border-b border-gray-200 pb-2 mb-4">Classifications</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Civil Status</label>
                <CustomDropdown
                  options={["Single", "Married", "Widowed", "Divorced", "Separated", "Annulled", "Live-in"]}
                  value={formData.personalInfo.civilStatus}
                  onChange={(value) => handleDropdownChange("personalInfo.civilStatus", value)}
                  name="personalInfo.civilStatus"
                  placeholder="Select civil status"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Youth Classification</label>
                <CustomDropdown
                  options={[
                    "In School Youth", 
                    "Out of School Youth", 
                    "Working Youth", 
                    "Youth w/ Disability", 
                    "Children in Conflict w/ Law", 
                    "Indigenous People"
                  ]}
                  value={formData.classification.youthClassification}
                  onChange={(value) => handleDropdownChange("classification.youthClassification", value)}
                  name="classification.youthClassification"
                  placeholder="Select youth classification"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Youth Age Group</label>
                <CustomDropdown
                  options={[
                    "Child Youth (13-17 yrs old)",
                    "Core Youth (18-24 yrs old)",
                    "Young Adult (15-30 yrs old)"
                  ]}
                  value={formData.classification.youthAgeGroup}
                  onChange={(value) => handleDropdownChange("classification.youthAgeGroup", value)}
                  name="classification.youthAgeGroup"
                  placeholder="Select age group"
                  required
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Educational Attainment</label>
                <CustomDropdown
                  options={[
                    "Elementary Level",
                    "Elementary Grad",
                    "High School Level",
                    "High School Grad",
                    "Vocational Grad",
                    "College Level",
                    "College Grad",
                    "Masters Level",
                    "Masters Grad",
                    "Doctorate Level",
                    "Doctorate Graduate"
                  ]}
                  value={formData.classification.educationalAttainment}
                  onChange={(value) => handleDropdownChange("classification.educationalAttainment", value)}
                  name="classification.educationalAttainment"
                  placeholder="Select educational attainment"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Work Status</label>
                <CustomDropdown
                  options={[
                    "Employed",
                    "Unemployed",
                    "Self-Employed",
                    "Currently looking for a Job",
                    "Not interested Looking for a Job"
                  ]}
                  value={formData.classification.workStatus}
                  onChange={(value) => handleDropdownChange("classification.workStatus", value)}
                  name="classification.workStatus"
                  placeholder="Select work status"
                  required
                />
              </div>
            </div>
          </div>
          
          {/* Registration and Assembly */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold border-b border-gray-200 pb-2 mb-4">Registration & Assembly</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div>
                <CustomCheckbox
                  id="isRegisteredSKVoter"
                  name="classification.isRegisteredSKVoter"
                  checked={formData.classification.isRegisteredSKVoter}
                  onChange={handleChange}
                  label="Registered SK Voter"
                  className="h-12"
                />
              </div>
              
              <div>
                <CustomCheckbox
                  id="isRegisteredNationalVoter"
                  name="classification.isRegisteredNationalVoter"
                  checked={formData.classification.isRegisteredNationalVoter}
                  onChange={handleChange}
                  label="Registered National Voter"
                  className="h-12"
                />
              </div>
              
              <div>
                <CustomCheckbox
                  id="votedLastElection"
                  name="classification.votedLastElection"
                  checked={formData.classification.votedLastElection}
                  onChange={handleChange}
                  label="Voted in Last SK Election"
                  className="h-12"
                />
              </div>
            </div>
            
            <div className="mb-4">
              <CustomCheckbox
                id="attendsAssembly"
                name="classification.attendsAssembly"
                checked={formData.classification.attendsAssembly}
                onChange={handleChange}
                label="Has Attended SK Assembly"
                className="mb-2"
              />
              
              {formData.classification.attendsAssembly && (
                <div className="ml-7 mt-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">How many times?</label>
                  <CustomDropdown
                    options={[
                      "1-2 Times",
                      "3-4 Times",
                      "5 and above"
                    ]}
                    value={formData.classification.assemblyFrequency}
                    onChange={(value) => handleDropdownChange("classification.assemblyFrequency", value)}
                    name="classification.assemblyFrequency"
                    placeholder="Select frequency"
                    required={formData.classification.attendsAssembly}
                    className="max-w-xs"
                  />
                </div>
              )}
              
              {!formData.classification.attendsAssembly && (
                <div className="ml-7 mt-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Reason for not attending</label>
                  <CustomDropdown
                    options={[
                      "There was no SK Assembly Meeting",
                      "Not Interested to Attend"
                    ]}
                    value={formData.classification.notAttendedReason}
                    onChange={(value) => handleDropdownChange("classification.notAttendedReason", value)}
                    name="classification.notAttendedReason"
                    placeholder="Select reason"
                    className="max-w-xs"
                  />
                </div>
              )}
            </div>
          </div>
          
          {/* Signature Section */}
          <div>
            <h3 className="text-lg font-semibold border-b border-gray-200 pb-2 mb-4">Signature</h3>
            
            <div className="flex flex-col items-center mb-4">
              <div className="w-full max-w-md border border-gray-300 border-dashed rounded-md p-4 mb-2">
                {formData.personalInfo?.signature ? (
                  <div className="relative">
                    <img 
                      src={formData.personalInfo.signature} 
                      alt="Signature" 
                      className="w-full h-24 object-contain"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setFormData(prev => ({
                          ...prev,
                          personalInfo: {
                            ...prev.personalInfo,
                            signature: ''
                          }
                        }));
                        setIsEdited(true);
                      }}
                      className="absolute top-1 right-1 bg-white rounded-full p-1 shadow-sm hover:bg-gray-100"
                    >
                      <X className="h-4 w-4 text-gray-500" />
                    </button>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-sm text-gray-500">No signature available</p>
                  </div>
                )}
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3 mt-2">
                <label className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 cursor-pointer">
                  <input
                    type="file"
                    accept="image/*"
                    className="sr-only"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onload = (event) => {
                          setFormData(prev => ({
                            ...prev,
                            personalInfo: {
                              ...prev.personalInfo,
                              signature: event.target?.result as string
                            }
                          }));
                          setIsEdited(true);
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                  />
                  Upload Signature
                </label>
                
                <button
                  type="button"
                  className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                  onClick={() => setIsSignatureModalOpen(true)}
                >
                  Draw Signature
                </button>
              </div>
              
              <p className="text-sm text-gray-500 mt-3 text-center">
                I certify that all information provided is true and correct to the best of my knowledge.
              </p>
              
              <div className="mt-3 text-center">
                <div className="text-sm font-medium">
                  {formData.personalInfo.firstName} {formData.personalInfo.middleName} {formData.personalInfo.lastName}
                </div>
                <div className="text-xs text-gray-500">Name of Participant</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Annex Preview Modal */}
      <AnnexPreviewModal 
        isOpen={isPreviewModalOpen}
        onClose={() => setIsPreviewModalOpen(false)}
        memberData={formData}
      />
      
      {/* Signature Modal */}
      {isSignatureModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm bg-gray-700/30 transition-opacity duration-300 ease-in-out" 
             style={{ animation: 'fadeIn 0.3s ease-in-out' }}>
          <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl max-h-4xl overflow-hidden border border-gray-200" 
               style={{ animation: 'scaleIn 0.3s ease-in-out' }}>
            <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between shadow-sm">
              <h3 className="text-lg font-medium text-gray-900">Draw Signature</h3>
              <button 
                type="button" 
                onClick={() => setIsSignatureModalOpen(false)}
                className="text-gray-400 hover:text-gray-500 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="p-6">
              <div className="border border-gray-300 border-dashed rounded-md mb-4 bg-gray-50">
                <SignatureCanvas
                  ref={signatureRef}
                  canvasProps={{
                    className: 'w-full h-64',
                    style: { borderRadius: '0.375rem' }
                  }}
                  backgroundColor="rgb(255, 255, 255)"
                  penColor="rgb(0, 0, 0)"
                />
              </div>
              
              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={() => signatureRef.current?.clear()}
                  className="px-6 py-4 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
                >
                  Clear
                </button>
                <button
                  type="button"
                  onClick={handleSignatureSave}
                  className="px-6 py-4 bg-gray-900 text-white rounded-md hover:bg-gray-800 transition-colors flex items-center"
                >
                  <Save className="h-4 w-4 mr-1" /> Save Signature
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Add keyframes for animations */}
      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes scaleIn {
          from { transform: scale(0.95); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
} 