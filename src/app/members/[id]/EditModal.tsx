"use client";

import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

interface EditModalProps {
  isOpen: boolean;
  onClose: () => void;
  memberData: any;
  onSave: (updatedData: any) => void;
}

const EditModal: React.FC<EditModalProps> = ({
  isOpen,
  onClose,
  memberData,
  onSave
}) => {
  const [formData, setFormData] = useState({
    // Personal Info
    lastName: '',
    firstName: '',
    middleName: '',
    suffix: '',
    sex: '',
    birthdate: '',
    age: 0,
    email: '',
    contactNumber: '',
    
    // Location Info
    region: '',
    province: '',
    cityMunicipality: '',
    barangay: '',
    purokZone: '',
    
    // Classification
    civilStatus: '',
    youthClassification: '',
    youthAgeGroup: '',
    educationalAttainment: '',
    workStatus: '',
    
    // Voting Info
    isRegisteredSKVoter: false,
    isRegisteredNationalVoter: false,
    votedLastElection: false,
    
    // Assembly Info
    attendsAssembly: false,
    assemblyFrequency: '',
    notAttendedReason: ''
  });

  // Initialize form with member data when modal opens
  useEffect(() => {
    if (memberData && isOpen) {
      setFormData({
        lastName: memberData.personalInfo.lastName,
        firstName: memberData.personalInfo.firstName,
        middleName: memberData.personalInfo.middleName || '',
        suffix: memberData.personalInfo.suffix || '',
        sex: memberData.personalInfo.sex,
        birthdate: memberData.personalInfo.birthdate,
        age: memberData.personalInfo.age,
        email: memberData.contactInfo.email,
        contactNumber: memberData.contactInfo.contactNumber,
        
        region: memberData.contactInfo.region,
        province: memberData.contactInfo.province,
        cityMunicipality: memberData.contactInfo.cityMunicipality,
        barangay: memberData.contactInfo.barangay,
        purokZone: memberData.contactInfo.purokZone,
        
        civilStatus: memberData.personalInfo.civilStatus,
        youthClassification: memberData.classification.youthClassification,
        youthAgeGroup: memberData.classification.youthAgeGroup,
        educationalAttainment: memberData.classification.educationalAttainment,
        workStatus: memberData.classification.workStatus,
        
        isRegisteredSKVoter: memberData.classification.isRegisteredSKVoter,
        isRegisteredNationalVoter: memberData.classification.isRegisteredNationalVoter,
        votedLastElection: memberData.classification.votedLastElection,
        
        attendsAssembly: memberData.classification.attendsAssembly,
        assemblyFrequency: memberData.classification.assemblyFrequency,
        notAttendedReason: memberData.classification.notAttendedReason
      });
    }
  }, [memberData, isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({
        ...prev,
        [name]: checked
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Transform the form data back to the structure expected by the parent component
    const updatedMemberData = {
      id: memberData.id,
      personalInfo: {
        name: `${formData.lastName}, ${formData.firstName}`,
        fullName: `${formData.firstName} ${formData.middleName ? formData.middleName + ' ' : ''}${formData.lastName}${formData.suffix ? ' ' + formData.suffix : ''}`,
        firstName: formData.firstName,
        lastName: formData.lastName,
        middleName: formData.middleName,
        suffix: formData.suffix,
        sex: formData.sex,
        birthdate: formData.birthdate,
        age: formData.age,
        civilStatus: formData.civilStatus
      },
      contactInfo: {
        region: formData.region,
        province: formData.province,
        cityMunicipality: formData.cityMunicipality,
        barangay: formData.barangay,
        purokZone: formData.purokZone,
        email: formData.email,
        contactNumber: formData.contactNumber
      },
      classification: {
        youthClassification: formData.youthClassification,
        youthAgeGroup: formData.youthAgeGroup,
        educationalAttainment: formData.educationalAttainment,
        workStatus: formData.workStatus,
        isRegisteredSKVoter: formData.isRegisteredSKVoter,
        isRegisteredNationalVoter: formData.isRegisteredNationalVoter,
        votedLastElection: formData.votedLastElection,
        isPWD: memberData.classification.isPWD,
        isSingleParent: memberData.classification.isSingleParent,
        isInConflictWithLaw: memberData.classification.isInConflictWithLaw,
        isIndigenous: memberData.classification.isIndigenous,
        attendsAssembly: formData.attendsAssembly,
        assemblyFrequency: formData.assemblyFrequency,
        notAttendedReason: formData.notAttendedReason
      },
      metadata: {
        ...memberData.metadata,
        lastUpdated: new Date().toISOString().split('T')[0]
      }
    };
    
    onSave(updatedMemberData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden">
      {/* Blurred background overlay with a slight animation */}
      <div 
        className="fixed inset-0 backdrop-blur-sm bg-gray-700/30 transition-opacity duration-300" 
        onClick={onClose}
        style={{ animation: 'fadeIn 0.2s ease-out' }}
      ></div>
      
      {/* Modal content with animation */}
      <div 
        className="bg-white rounded-lg max-w-4xl w-full mx-4 my-6 relative flex flex-col max-h-[90vh] shadow-xl z-10"
        style={{ animation: 'scaleIn 0.3s ease-out' }}
      >
        <div className="sticky top-0 bg-white px-6 py-4 border-b flex justify-between items-center z-10 shadow-sm">
          <h2 className="text-xl font-bold text-[#0B51A6]">
            Edit Profile: {memberData.personalInfo.firstName} {memberData.personalInfo.lastName}
          </h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 focus:outline-none p-1 rounded-full hover:bg-gray-100 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        
        <style jsx global>{`
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          
          @keyframes scaleIn {
            from { transform: scale(0.95); opacity: 0; }
            to { transform: scale(1); opacity: 1; }
          }
          
          .focus-ring {
            transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
          }
          
          .focus-ring:focus {
            border-color: #0B51A6;
            box-shadow: 0 0 0 3px rgba(11, 81, 166, 0.25);
          }
        `}</style>
        
        <div className="overflow-y-auto">
          <form onSubmit={handleSubmit} className="p-6">
            {/* Personal Information */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold border-b border-gray-200 pb-2 mb-4">Personal Information</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus-ring"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus-ring"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Middle Name</label>
                  <input
                    type="text"
                    name="middleName"
                    value={formData.middleName}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#0B51A6] focus:border-[#0B51A6]"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Suffix</label>
                  <input
                    type="text"
                    name="suffix"
                    value={formData.suffix}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#0B51A6] focus:border-[#0B51A6]"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Sex</label>
                  <select
                    name="sex"
                    value={formData.sex}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#0B51A6] focus:border-[#0B51A6]"
                    required
                  >
                    <option value="">Select</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Birthdate</label>
                  <input
                    type="date"
                    name="birthdate"
                    value={formData.birthdate}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#0B51A6] focus:border-[#0B51A6]"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
                  <input
                    type="number"
                    name="age"
                    value={formData.age}
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
            <div className="mb-6">
              <h3 className="text-lg font-semibold border-b border-gray-200 pb-2 mb-4">Contact Information</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#0B51A6] focus:border-[#0B51A6]"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Contact Number</label>
                  <input
                    type="text"
                    name="contactNumber"
                    value={formData.contactNumber}
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
                    name="region"
                    value={formData.region}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#0B51A6] focus:border-[#0B51A6]"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Province</label>
                  <input
                    type="text"
                    name="province"
                    value={formData.province}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#0B51A6] focus:border-[#0B51A6]"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">City/Municipality</label>
                  <input
                    type="text"
                    name="cityMunicipality"
                    value={formData.cityMunicipality}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#0B51A6] focus:border-[#0B51A6]"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Barangay</label>
                  <input
                    type="text"
                    name="barangay"
                    value={formData.barangay}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#0B51A6] focus:border-[#0B51A6]"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Purok/Zone</label>
                  <input
                    type="text"
                    name="purokZone"
                    value={formData.purokZone}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#0B51A6] focus:border-[#0B51A6]"
                  />
                </div>
              </div>
            </div>
            
            {/* Classifications */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold border-b border-gray-200 pb-2 mb-4">Classifications</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Civil Status</label>
                  <select
                    name="civilStatus"
                    value={formData.civilStatus}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#0B51A6] focus:border-[#0B51A6]"
                    required
                  >
                    <option value="">Select</option>
                    <option value="Single">Single</option>
                    <option value="Married">Married</option>
                    <option value="Widowed">Widowed</option>
                    <option value="Divorced">Divorced</option>
                    <option value="Separated">Separated</option>
                    <option value="Annulled">Annulled</option>
                    <option value="Live-in">Live-in</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Youth Classification</label>
                  <select
                    name="youthClassification"
                    value={formData.youthClassification}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#0B51A6] focus:border-[#0B51A6]"
                    required
                  >
                    <option value="">Select</option>
                    <option value="In School Youth">In School Youth</option>
                    <option value="Out of School Youth">Out of School Youth</option>
                    <option value="Working Youth">Working Youth</option>
                    <option value="Youth w/ Disability">Youth w/ Disability</option>
                    <option value="Children in Conflict w/ Law">Children in Conflict w/ Law</option>
                    <option value="Indigenous People">Indigenous People</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Youth Age Group</label>
                  <select
                    name="youthAgeGroup"
                    value={formData.youthAgeGroup}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#0B51A6] focus:border-[#0B51A6]"
                    required
                  >
                    <option value="">Select</option>
                    <option value="Child Youth (13-17 yrs old)">Child Youth (13-17 yrs old)</option>
                    <option value="Core Youth (18-24 yrs old)">Core Youth (18-24 yrs old)</option>
                    <option value="Young Adult (15-30 yrs old)">Young Adult (15-30 yrs old)</option>
                  </select>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Educational Attainment</label>
                  <select
                    name="educationalAttainment"
                    value={formData.educationalAttainment}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#0B51A6] focus:border-[#0B51A6]"
                    required
                  >
                    <option value="">Select</option>
                    <option value="Elementary Level">Elementary Level</option>
                    <option value="Elementary Grad">Elementary Grad</option>
                    <option value="High School Level">High School Level</option>
                    <option value="High School Grad">High School Grad</option>
                    <option value="Vocational Grad">Vocational Grad</option>
                    <option value="College Level">College Level</option>
                    <option value="College Grad">College Grad</option>
                    <option value="Masters Level">Masters Level</option>
                    <option value="Masters Grad">Masters Grad</option>
                    <option value="Doctorate Level">Doctorate Level</option>
                    <option value="Doctorate Graduate">Doctorate Graduate</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Work Status</label>
                  <select
                    name="workStatus"
                    value={formData.workStatus}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#0B51A6] focus:border-[#0B51A6]"
                    required
                  >
                    <option value="">Select</option>
                    <option value="Employed">Employed</option>
                    <option value="Unemployed">Unemployed</option>
                    <option value="Self-Employed">Self-Employed</option>
                    <option value="Currently looking for a Job">Currently looking for a Job</option>
                    <option value="Not interested Looking for a Job">Not interested Looking for a Job</option>
                  </select>
                </div>
              </div>
            </div>
            
            {/* Registration and Assembly */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold border-b border-gray-200 pb-2 mb-4">Registration & Assembly</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <div className="flex items-center h-12">
                    <input
                      type="checkbox"
                      id="isRegisteredSKVoter"
                      name="isRegisteredSKVoter"
                      checked={formData.isRegisteredSKVoter}
                      onChange={handleChange}
                      className="h-5 w-5 text-[#0B51A6] focus:ring-[#0B51A6] border-gray-300 rounded"
                    />
                    <label htmlFor="isRegisteredSKVoter" className="ml-2 block text-sm text-gray-700">
                      Registered SK Voter
                    </label>
                  </div>
                </div>
                
                <div>
                  <div className="flex items-center h-12">
                    <input
                      type="checkbox"
                      id="isRegisteredNationalVoter"
                      name="isRegisteredNationalVoter"
                      checked={formData.isRegisteredNationalVoter}
                      onChange={handleChange}
                      className="h-5 w-5 text-[#0B51A6] focus:ring-[#0B51A6] border-gray-300 rounded"
                    />
                    <label htmlFor="isRegisteredNationalVoter" className="ml-2 block text-sm text-gray-700">
                      Registered National Voter
                    </label>
                  </div>
                </div>
                
                <div>
                  <div className="flex items-center h-12">
                    <input
                      type="checkbox"
                      id="votedLastElection"
                      name="votedLastElection"
                      checked={formData.votedLastElection}
                      onChange={handleChange}
                      className="h-5 w-5 text-[#0B51A6] focus:ring-[#0B51A6] border-gray-300 rounded"
                    />
                    <label htmlFor="votedLastElection" className="ml-2 block text-sm text-gray-700">
                      Voted in Last SK Election
                    </label>
                  </div>
                </div>
              </div>
              
              <div className="mb-4">
                <div className="flex items-center mb-2">
                  <input
                    type="checkbox"
                    id="attendsAssembly"
                    name="attendsAssembly"
                    checked={formData.attendsAssembly}
                    onChange={handleChange}
                    className="h-5 w-5 text-[#0B51A6] focus:ring-[#0B51A6] border-gray-300 rounded"
                  />
                  <label htmlFor="attendsAssembly" className="ml-2 block text-sm text-gray-700">
                    Has Attended SK Assembly
                  </label>
                </div>
                
                {formData.attendsAssembly && (
                  <div className="ml-7 mt-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">How many times?</label>
                    <select
                      name="assemblyFrequency"
                      value={formData.assemblyFrequency}
                      onChange={handleChange}
                      className="w-full max-w-xs px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#0B51A6] focus:border-[#0B51A6]"
                      required={formData.attendsAssembly}
                    >
                      <option value="">Select</option>
                      <option value="1-2 Times">1-2 Times</option>
                      <option value="3-4 Times">3-4 Times</option>
                      <option value="5 and above">5 and above</option>
                    </select>
                  </div>
                )}
                
                {!formData.attendsAssembly && (
                  <div className="ml-7 mt-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Reason for not attending</label>
                    <select
                      name="notAttendedReason"
                      value={formData.notAttendedReason}
                      onChange={handleChange}
                      className="w-full max-w-xs px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#0B51A6] focus:border-[#0B51A6]"
                    >
                      <option value="">Select</option>
                      <option value="There was no SK Assembly Meeting">There was no SK Assembly Meeting</option>
                      <option value="Not Interested to Attend">Not Interested to Attend</option>
                    </select>
                  </div>
                )}
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="sticky bottom-0 bg-white pb-4 pt-2 flex justify-end space-x-3 border-t mt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors focus:outline-none focus-ring"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-[#0B51A6] text-white rounded-md hover:bg-blue-700 transition-colors focus:outline-none focus-ring"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditModal; 