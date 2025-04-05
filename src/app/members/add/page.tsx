"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Save, Upload, Check } from "lucide-react";
import SignatureCanvas from "react-signature-canvas";
import MultiStepForm from "./MultiStepForm";
import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import StepThree from "./StepThree";
import StepFour from "./StepFour";
import StepFive from "./StepFive";
import StepSix from "./StepSix";

export default function AddMemberPage() {
  // Signature pad ref
  const sigPad = useRef<SignatureCanvas>(null);
  
  // State for signature options
  const [signatureMethod, setSignatureMethod] = useState<'draw' | 'upload'>('draw');
  const [uploadedSignature, setUploadedSignature] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // State for form fields
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    // Personal Info
    lastName: "",
    firstName: "",
    middleName: "",
    suffix: "",
    sex: "",
    birthMonth: "",
    birthDay: "",
    birthYear: "",
    age: "",
    email: "",
    contactNumber: "",
    
    // Regional Info
    region: "",
    province: "",
    cityMunicipality: "",
    barangay: "",
    purokZone: "",
    
    // Classification
    civilStatus: "",
    youthClassification: "", // In School Youth, Out of School Youth, etc.
    youthAgeGroup: "", // Child Youth, Core Youth, Young Adult
    isPWD: false,
    isChildrenInConflict: false,
    isIndigenousPeople: false,
    
    // Work and Education
    workStatus: "",
    educationalAttainment: "",
    
    // Voting and Assembly Info
    registeredSKVoter: null,
    registeredNationalVoter: null,
    votedLastElection: null,
    attendedKKAssembly: null,
    assemblyFrequency: "",
    notAttendedReason: "",
    
    // Signature
    signature: null
  });
  
  const steps = [
    "Introduction & Profile",
    "Location",
    "Demographics",
    "Work & Education",
    "Voting Information",
    "Signature"
  ];
  
  // Format today's date for display
  const formatCurrentDate = () => {
    const today = new Date();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const year = today.getFullYear();
    return `${month}/${day}/${year}`;
  };
  
  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    
    // Update form data first
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData({
        ...formData,
        [name]: checked
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
    
    // Then handle special cases
    // Update age when any birthday field changes
    if (name === 'birthYear' || name === 'birthMonth' || name === 'birthDay') {
      // For month and day, we need to update with the current form data plus the new value
      if (name === 'birthYear') {
        calculateAge(value);
      } else {
        // For month and day, we recalculate using the existing year
        if (formData.birthYear) {
          calculateAge(formData.birthYear);
        }
      }
    }
    
    // Show/hide assembly frequency field
    if (name === 'attendedKKAssembly') {
      const checkbox = e.target as HTMLInputElement;
      if (!checkbox.checked) {
        setFormData(prev => ({
          ...prev,
          assemblyFrequency: ""
        }));
      }
    }
  };
  
  // Calculate age from birth year
  const calculateAge = (birthYear: string) => {
    // Clear age if birthYear is empty or invalid
    if (!birthYear || birthYear.trim() === "") {
      setFormData(prevData => ({
        ...prevData,
        age: ""
      }));
      return;
    }
    
    const yearValue = parseInt(birthYear);
    
    // Validate year is a proper number
    if (isNaN(yearValue) || yearValue <= 0) {
      setFormData(prevData => ({
        ...prevData,
        age: ""
      }));
      return;
    }
    
    const today = new Date();
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth() + 1; // JavaScript months are 0-indexed
    const currentDay = today.getDate();
    
    // Validate year is not in the future and is reasonable
    if (yearValue > currentYear) {
      setFormData(prevData => ({
        ...prevData,
        age: ""
      }));
      return;
    }
    
    // Calculate age taking month and day into account
    let age = currentYear - yearValue;
    
    // Get month and day from form data
    const birthMonth = parseInt(formData.birthMonth);
    const birthDay = parseInt(formData.birthDay);
    
    // If birth month and day are valid, adjust age if birthday hasn't occurred yet this year
    if (!isNaN(birthMonth) && !isNaN(birthDay)) {
      // If current month is before birth month, or current month is the same but current day is before birth day
      if (currentMonth < birthMonth || (currentMonth === birthMonth && currentDay < birthDay)) {
        age--;
      }
    }
    
    // Basic validation for reasonable age
    if (age < 0 || age > 120) {
      setFormData(prevData => ({
        ...prevData,
        age: ""
      }));
      return;
    }
    
    // Update the age field
    setFormData(prevData => ({
      ...prevData,
      age: age.toString()
    }));
  };
  
  // Clear signature pad
  const clearSignature = () => {
    if (sigPad.current) {
      sigPad.current.clear();
    }
    setUploadedSignature(null);
  };
  
  // Get signature data as base64 string
  const getSignatureData = () => {
    if (signatureMethod === 'draw' && sigPad.current) {
      return sigPad.current.getTrimmedCanvas().toDataURL('image/png');
    } else if (signatureMethod === 'upload' && uploadedSignature) {
      return uploadedSignature;
    }
    return null;
  };
  
  // Handle signature upload
  const handleSignatureUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        setUploadedSignature(event.target.result as string);
      }
    };
    reader.readAsDataURL(file);
  };
  
  // Trigger file input click
  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  
  // Handle form submission
  const handleSubmit = async () => {
    // Validate required fields
    const requiredFields = ['firstName', 'lastName', 'birthDay', 'birthMonth', 'birthYear', 'sex'] as const;
    const missingFields = requiredFields.filter(field => !formData[field as keyof typeof formData]);
    
    // Validate birthday fields
    let hasBirthdayError = false;
    
    // Check if birth month is valid
    if (formData.birthMonth) {
      const monthNum = parseInt(formData.birthMonth);
      if (isNaN(monthNum) || monthNum < 1 || monthNum > 12) {
        hasBirthdayError = true;
      }
    }
    
    // Check if birth day is valid
    if (formData.birthDay && !hasBirthdayError) {
      const dayNum = parseInt(formData.birthDay);
      if (isNaN(dayNum) || dayNum < 1 || dayNum > 31) {
        hasBirthdayError = true;
      }
      
      // More specific day validation based on month
      if (formData.birthMonth) {
        const monthNum = parseInt(formData.birthMonth);
        const dayNum = parseInt(formData.birthDay);
        
        // Check days in month
        if (monthNum === 2) { // February
          const yearNum = parseInt(formData.birthYear) || new Date().getFullYear();
          const isLeapYear = (yearNum % 4 === 0 && yearNum % 100 !== 0) || (yearNum % 400 === 0);
          const maxDays = isLeapYear ? 29 : 28;
          
          if (dayNum > maxDays) {
            hasBirthdayError = true;
          }
        } else if ([4, 6, 9, 11].includes(monthNum) && dayNum > 30) { // April, June, September, November
          hasBirthdayError = true;
        }
      }
    }
    
    // Check if birth year is valid
    if (formData.birthYear) {
      const yearNum = parseInt(formData.birthYear);
      const currentYear = new Date().getFullYear();
      
      if (isNaN(yearNum) || yearNum < 1900 || yearNum > currentYear) {
        hasBirthdayError = true;
      }
    }
    
    if (missingFields.length > 0 || hasBirthdayError) {
      alert(`Please fill in all required fields and fix any validation errors before submitting.`);
      return;
    }
    
    // Get signature data
    const signatureData = getSignatureData();
    
    // Construct the full member data
    const memberData = {
      ...formData,
      name: `${formData.lastName}, ${formData.firstName}${formData.middleName ? ' ' + formData.middleName : ''}${formData.suffix ? ' ' + formData.suffix : ''}`,
      birthday: {
        month: parseInt(formData.birthMonth) || 0,
        day: parseInt(formData.birthDay) || 0,
        year: parseInt(formData.birthYear) || 0
      },
      signature: signatureData
    };
    console.log('Form submitted:', memberData);
    
    // Add logic to save the member data
    // Redirect to members list or show success message
    alert('Form submitted successfully!');
  };
  
  // Determine which step component to render
  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return <StepOne formData={formData} handleChange={handleChange} setFormData={setFormData} />;
      case 1:
        return <StepTwo formData={formData} handleChange={handleChange} />;
      case 2:
        return <StepThree formData={formData} handleChange={handleChange} setFormData={setFormData} />;
      case 3:
        return <StepFour formData={formData} handleChange={handleChange} />;
      case 4:
        return <StepFive formData={formData} handleChange={handleChange} setFormData={setFormData} />;
      case 5:
        return <StepSix formData={formData} setFormData={setFormData} />;
      default:
        return <StepOne formData={formData} handleChange={handleChange} setFormData={setFormData} />;
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen p-4 sm:p-6">
      <div className="max-w-5xl mx-auto">
        {/* Header with Back Button */}
        <div className="flex items-center mb-6">
          <Link href="/members" className="text-gray-500 hover:text-gray-700 mr-4">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">KK Survey Questionnaire</h1>
        </div>
        
        {/* Multi-step form */}
        <MultiStepForm
          currentStep={currentStep}
          steps={steps}
          onStepChange={setCurrentStep}
        >
          <div className="bg-white border border-gray-200 rounded-md p-6">
            {renderStepContent()}
            
            {/* Navigation Buttons - Desktop */}
            <div className="hidden md:flex justify-between mt-8">
              <button
                type="button"
                onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
                disabled={currentStep === 0}
                className={`px-4 py-2 border border-gray-300 rounded-md text-sm font-medium ${
                  currentStep === 0
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                Previous
              </button>
              
              {currentStep < steps.length - 1 ? (
                <button
                  type="button"
                  onClick={() => setCurrentStep(Math.min(steps.length - 1, currentStep + 1))}
                  className="px-4 py-2 bg-[#0B51A6] text-white rounded-md text-sm font-medium hover:bg-blue-700"
                >
                  Next
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="px-4 py-2 bg-red-600 text-white rounded-md text-sm font-medium hover:bg-red-700"
                >
                  Submit
                </button>
              )}
            </div>
          </div>
        </MultiStepForm>
      </div>
    </div>
  );
} 