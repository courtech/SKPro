import React, { useState, useEffect } from 'react';

interface StepOneProps {
  formData: any;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
  setFormData: React.Dispatch<React.SetStateAction<any>>;
}

const StepOne: React.FC<StepOneProps> = ({ formData, handleChange, setFormData }) => {
  // Format today's date for display
  const formatCurrentDate = () => {
    const today = new Date();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const year = today.getFullYear();
    return `${month}/${day}/${year}`;
  };

  // Validation state
  const [errors, setErrors] = useState({
    birthMonth: '',
    birthDay: '',
    birthYear: ''
  });

  // Validate birthday fields
  useEffect(() => {
    const newErrors = {
      birthMonth: '',
      birthDay: '',
      birthYear: ''
    };
    
    // Validate month
    if (formData.birthMonth) {
      const monthNum = parseInt(formData.birthMonth);
      if (isNaN(monthNum) || monthNum < 1 || monthNum > 12) {
        newErrors.birthMonth = 'Month must be between 1-12';
      }
    }
    
    // Validate day
    if (formData.birthDay) {
      const dayNum = parseInt(formData.birthDay);
      if (isNaN(dayNum) || dayNum < 1 || dayNum > 31) {
        newErrors.birthDay = 'Day must be between 1-31';
      }
      
      // More specific day validation based on month
      if (formData.birthMonth && !newErrors.birthDay) {
        const monthNum = parseInt(formData.birthMonth);
        const dayNum = parseInt(formData.birthDay);
        
        // Check days in month
        if (monthNum === 2) { // February
          const yearNum = parseInt(formData.birthYear) || new Date().getFullYear();
          const isLeapYear = (yearNum % 4 === 0 && yearNum % 100 !== 0) || (yearNum % 400 === 0);
          const maxDays = isLeapYear ? 29 : 28;
          
          if (dayNum > maxDays) {
            newErrors.birthDay = `February ${yearNum} has only ${maxDays} days`;
          }
        } else if ([4, 6, 9, 11].includes(monthNum) && dayNum > 30) { // April, June, September, November
          newErrors.birthDay = 'This month has only 30 days';
        }
      }
    }
    
    // Validate year
    if (formData.birthYear) {
      const yearNum = parseInt(formData.birthYear);
      const currentYear = new Date().getFullYear();
      
      if (isNaN(yearNum)) {
        newErrors.birthYear = 'Year must be a number';
      } else if (yearNum < 1900) {
        newErrors.birthYear = 'Year must be after 1900';
      } else if (yearNum > currentYear) {
        newErrors.birthYear = 'Year cannot be in the future';
      }
    }
    
    setErrors(newErrors);
  }, [formData.birthMonth, formData.birthDay, formData.birthYear]);
  
  return (
    <div className="space-y-6">
      {/* Form Header */}
      <div className="bg-white border border-gray-200 rounded-md p-6 mb-6">
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-6">
          <div className="lg:w-2/3">
            <p className="text-lg font-medium mb-4">Good day!</p>
            <p className="text-gray-700 mb-3">
              We are currently conducting a study that focuses on assessing the demographic information of the Katipunan ng Kabataan. 
              We would like to ask your participation by taking your time to answer this questionnaire. Please read the questions carefully and answer them accurately.
            </p>
            <p className="text-gray-700 font-medium">
              REST ASSURED THAT ALL INFORMATION GATHERED FROM THIS STUDY WILL BE TREATED WITH UTMOST CONFIDENTIALITY.
            </p>
          </div>
          <div className="lg:w-1/3">
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-1">Respondent #</label>
              <div className="border border-gray-300 rounded-md px-3 py-2 bg-gray-50 text-gray-500 text-sm">
                To be assigned
              </div>
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">Date:</label>
              <div className="border border-gray-300 rounded-md px-3 py-2 bg-gray-50">
                {formatCurrentDate()}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Profile Information */}
      <div className="bg-white border border-gray-200 rounded-md p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Personal Information</h2>
        
        {/* Name */}
        <div className="mb-8">
          <label className="block text-gray-700 font-medium mb-3">Name of Respondent</label>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
                placeholder="Last Name"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0B51A6] focus:border-transparent"
              />
              <label className="block text-xs text-gray-500 mt-1">Last Name</label>
            </div>
            <div>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
                placeholder="First Name"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0B51A6] focus:border-transparent"
              />
              <label className="block text-xs text-gray-500 mt-1">First Name</label>
            </div>
            <div>
              <input
                type="text"
                id="middleName"
                name="middleName"
                value={formData.middleName}
                onChange={handleChange}
                placeholder="Middle Name (optional)"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0B51A6] focus:border-transparent"
              />
              <label className="block text-xs text-gray-500 mt-1">Middle Name</label>
            </div>
            <div>
              <input
                type="text"
                id="suffix"
                name="suffix"
                value={formData.suffix}
                onChange={handleChange}
                placeholder="Suffix (optional)"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0B51A6] focus:border-transparent"
              />
              <label className="block text-xs text-gray-500 mt-1">Suffix</label>
            </div>
          </div>
        </div>
        
        {/* Contact Information */}
        <div className="mb-8">
          <label className="block text-gray-700 font-medium mb-3">Contact Information</label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email Address"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0B51A6] focus:border-transparent"
              />
              <label className="block text-xs text-gray-500 mt-1">Email Address</label>
            </div>
            <div>
              <input
                type="text"
                id="contactNumber"
                name="contactNumber"
                value={formData.contactNumber}
                onChange={handleChange}
                required
                placeholder="Contact Number"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0B51A6] focus:border-transparent"
              />
              <label className="block text-xs text-gray-500 mt-1">Contact Number</label>
            </div>
          </div>
        </div>
        
        {/* Sex and Birthday */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-0">
          <div className="bg-gray-50 border border-gray-200 rounded-md p-4">
            <label className="block text-gray-700 font-medium mb-3">Sex Assigned at Birth</label>
            <div className="space-y-2">
              <div className="flex items-center">
                <input
                  type="radio"
                  id="sexMale"
                  name="sex"
                  value="Male"
                  checked={formData.sex === "Male"}
                  onChange={handleChange}
                  className="h-4 w-4 text-[#0B51A6] focus:ring-[#0B51A6] border-gray-300"
                />
                <label htmlFor="sexMale" className="ml-2 block text-sm text-gray-700">Male</label>
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  id="sexFemale"
                  name="sex"
                  value="Female"
                  checked={formData.sex === "Female"}
                  onChange={handleChange}
                  className="h-4 w-4 text-[#0B51A6] focus:ring-[#0B51A6] border-gray-300"
                />
                <label htmlFor="sexFemale" className="ml-2 block text-sm text-gray-700">Female</label>
              </div>
            </div>
          </div>
          
          <div>
            <label htmlFor="birthday" className="block text-gray-700 font-medium mb-3">Birthday</label>
            <div className="grid grid-cols-3 gap-2">
              <div>
                <input
                  type="number"
                  id="birthMonth"
                  name="birthMonth"
                  placeholder="MM"
                  maxLength={2}
                  min="1"
                  max="12"
                  value={formData.birthMonth}
                  onChange={handleChange}
                  required
                  className={`w-full px-3 py-2 border ${errors.birthMonth ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-[#0B51A6] focus:border-transparent`}
                />
                <label className="block text-xs text-gray-500 mt-1 text-center">Month</label>
                {errors.birthMonth && <p className="text-red-500 text-xs mt-1">{errors.birthMonth}</p>}
              </div>
              <div>
                <input
                  type="number"
                  id="birthDay"
                  name="birthDay"
                  placeholder="DD"
                  maxLength={2}
                  min="1"
                  max="31"
                  value={formData.birthDay}
                  onChange={handleChange}
                  required
                  className={`w-full px-3 py-2 border ${errors.birthDay ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-[#0B51A6] focus:border-transparent`}
                />
                <label className="block text-xs text-gray-500 mt-1 text-center">Day</label>
                {errors.birthDay && <p className="text-red-500 text-xs mt-1">{errors.birthDay}</p>}
              </div>
              <div>
                <input
                  type="text"
                  id="birthYear"
                  name="birthYear"
                  placeholder="YYYY"
                  maxLength={4}
                  pattern="[0-9]{4}"
                  value={formData.birthYear}
                  onChange={handleChange}
                  required
                  className={`w-full px-3 py-2 border ${errors.birthYear ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-[#0B51A6] focus:border-transparent`}
                />
                <label className="block text-xs text-gray-500 mt-1 text-center">Year</label>
                {errors.birthYear && <p className="text-red-500 text-xs mt-1">{errors.birthYear}</p>}
              </div>
            </div>
            <div className="mt-2">
              <label htmlFor="age" className="block text-gray-700 text-sm mb-1">Age:</label>
              <input
                type="text"
                id="age"
                name="age"
                value={formData.age}
                readOnly
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StepOne; 