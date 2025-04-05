import React from 'react';

interface StepFourProps {
  formData: any;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
}

const StepFour: React.FC<StepFourProps> = ({ formData, handleChange }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-md p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-3">Work and Education Information</h2>
      <p className="text-sm text-gray-700 mb-6">Please select the appropriate responses.</p>
      
      <div className="space-y-8">
        {/* Work Status */}
        <div className="bg-gray-50 border border-gray-200 rounded-md p-5">
          <h3 className="font-bold text-gray-900 mb-4">Work Status</h3>
          <div className="space-y-3">
            <div className="flex items-center">
              <input
                type="radio"
                id="workStatusEmployed"
                name="workStatus"
                value="Employed"
                checked={formData.workStatus === "Employed"}
                onChange={handleChange}
                className="h-4 w-4 text-[#0B51A6] focus:ring-[#0B51A6] border-gray-300"
              />
              <label htmlFor="workStatusEmployed" className="ml-2 block text-sm text-gray-700">Employed</label>
            </div>
            <div className="flex items-center">
              <input
                type="radio"
                id="workStatusUnemployed"
                name="workStatus"
                value="Unemployed"
                checked={formData.workStatus === "Unemployed"}
                onChange={handleChange}
                className="h-4 w-4 text-[#0B51A6] focus:ring-[#0B51A6] border-gray-300"
              />
              <label htmlFor="workStatusUnemployed" className="ml-2 block text-sm text-gray-700">Unemployed</label>
            </div>
            <div className="flex items-center">
              <input
                type="radio"
                id="workStatusSelfEmployed"
                name="workStatus"
                value="Self-Employed"
                checked={formData.workStatus === "Self-Employed"}
                onChange={handleChange}
                className="h-4 w-4 text-[#0B51A6] focus:ring-[#0B51A6] border-gray-300"
              />
              <label htmlFor="workStatusSelfEmployed" className="ml-2 block text-sm text-gray-700">Self-Employed</label>
            </div>
            <div className="flex items-center">
              <input
                type="radio"
                id="workStatusLookingForJob"
                name="workStatus"
                value="Currently looking for a Job"
                checked={formData.workStatus === "Currently looking for a Job"}
                onChange={handleChange}
                className="h-4 w-4 text-[#0B51A6] focus:ring-[#0B51A6] border-gray-300"
              />
              <label htmlFor="workStatusLookingForJob" className="ml-2 block text-sm text-gray-700">Currently looking for a Job</label>
            </div>
            <div className="flex items-center">
              <input
                type="radio"
                id="workStatusNotInterested"
                name="workStatus"
                value="Not Interested Looking for a Job"
                checked={formData.workStatus === "Not Interested Looking for a Job"}
                onChange={handleChange}
                className="h-4 w-4 text-[#0B51A6] focus:ring-[#0B51A6] border-gray-300"
              />
              <label htmlFor="workStatusNotInterested" className="ml-2 block text-sm text-gray-700">Not Interested Looking for a Job</label>
            </div>
          </div>
        </div>
        
        {/* Educational Background */}
        <div className="bg-gray-50 border border-gray-200 rounded-md p-5">
          <h3 className="font-bold text-gray-900 mb-4">Educational Background</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="flex items-center">
              <input
                type="radio"
                id="educationalAttainmentElementaryLevel"
                name="educationalAttainment"
                value="Elementary Level"
                checked={formData.educationalAttainment === "Elementary Level"}
                onChange={handleChange}
                className="h-4 w-4 text-[#0B51A6] focus:ring-[#0B51A6] border-gray-300"
              />
              <label htmlFor="educationalAttainmentElementaryLevel" className="ml-2 block text-sm text-gray-700">Elementary Level</label>
            </div>
            <div className="flex items-center">
              <input
                type="radio"
                id="educationalAttainmentElementaryGrad"
                name="educationalAttainment"
                value="Elementary Grad"
                checked={formData.educationalAttainment === "Elementary Grad"}
                onChange={handleChange}
                className="h-4 w-4 text-[#0B51A6] focus:ring-[#0B51A6] border-gray-300"
              />
              <label htmlFor="educationalAttainmentElementaryGrad" className="ml-2 block text-sm text-gray-700">Elementary Grad</label>
            </div>
            <div className="flex items-center">
              <input
                type="radio"
                id="educationalAttainmentHighSchoolLevel"
                name="educationalAttainment"
                value="High School Level"
                checked={formData.educationalAttainment === "High School Level"}
                onChange={handleChange}
                className="h-4 w-4 text-[#0B51A6] focus:ring-[#0B51A6] border-gray-300"
              />
              <label htmlFor="educationalAttainmentHighSchoolLevel" className="ml-2 block text-sm text-gray-700">High School Level</label>
            </div>
            <div className="flex items-center">
              <input
                type="radio"
                id="educationalAttainmentHighSchoolGrad"
                name="educationalAttainment"
                value="High School Grad"
                checked={formData.educationalAttainment === "High School Grad"}
                onChange={handleChange}
                className="h-4 w-4 text-[#0B51A6] focus:ring-[#0B51A6] border-gray-300"
              />
              <label htmlFor="educationalAttainmentHighSchoolGrad" className="ml-2 block text-sm text-gray-700">High School Grad</label>
            </div>
            <div className="flex items-center">
              <input
                type="radio"
                id="educationalAttainmentVocationalGrad"
                name="educationalAttainment"
                value="Vocational Grad"
                checked={formData.educationalAttainment === "Vocational Grad"}
                onChange={handleChange}
                className="h-4 w-4 text-[#0B51A6] focus:ring-[#0B51A6] border-gray-300"
              />
              <label htmlFor="educationalAttainmentVocationalGrad" className="ml-2 block text-sm text-gray-700">Vocational Grad</label>
            </div>
            <div className="flex items-center">
              <input
                type="radio"
                id="educationalAttainmentCollegeLevel"
                name="educationalAttainment"
                value="College Level"
                checked={formData.educationalAttainment === "College Level"}
                onChange={handleChange}
                className="h-4 w-4 text-[#0B51A6] focus:ring-[#0B51A6] border-gray-300"
              />
              <label htmlFor="educationalAttainmentCollegeLevel" className="ml-2 block text-sm text-gray-700">College Level</label>
            </div>
            <div className="flex items-center">
              <input
                type="radio"
                id="educationalAttainmentCollegeGrad"
                name="educationalAttainment"
                value="College Grad"
                checked={formData.educationalAttainment === "College Grad"}
                onChange={handleChange}
                className="h-4 w-4 text-[#0B51A6] focus:ring-[#0B51A6] border-gray-300"
              />
              <label htmlFor="educationalAttainmentCollegeGrad" className="ml-2 block text-sm text-gray-700">College Grad</label>
            </div>
            <div className="flex items-center">
              <input
                type="radio"
                id="educationalAttainmentMastersLevel"
                name="educationalAttainment"
                value="Masters Level"
                checked={formData.educationalAttainment === "Masters Level"}
                onChange={handleChange}
                className="h-4 w-4 text-[#0B51A6] focus:ring-[#0B51A6] border-gray-300"
              />
              <label htmlFor="educationalAttainmentMastersLevel" className="ml-2 block text-sm text-gray-700">Masters Level</label>
            </div>
            <div className="flex items-center">
              <input
                type="radio"
                id="educationalAttainmentMastersGrad"
                name="educationalAttainment"
                value="Masters Grad"
                checked={formData.educationalAttainment === "Masters Grad"}
                onChange={handleChange}
                className="h-4 w-4 text-[#0B51A6] focus:ring-[#0B51A6] border-gray-300"
              />
              <label htmlFor="educationalAttainmentMastersGrad" className="ml-2 block text-sm text-gray-700">Masters Grad</label>
            </div>
            <div className="flex items-center">
              <input
                type="radio"
                id="educationalAttainmentDoctorateLevel"
                name="educationalAttainment"
                value="Doctorate Level"
                checked={formData.educationalAttainment === "Doctorate Level"}
                onChange={handleChange}
                className="h-4 w-4 text-[#0B51A6] focus:ring-[#0B51A6] border-gray-300"
              />
              <label htmlFor="educationalAttainmentDoctorateLevel" className="ml-2 block text-sm text-gray-700">Doctorate Level</label>
            </div>
            <div className="flex items-center">
              <input
                type="radio"
                id="educationalAttainmentDoctorateGraduate"
                name="educationalAttainment"
                value="Doctorate Graduate"
                checked={formData.educationalAttainment === "Doctorate Graduate"}
                onChange={handleChange}
                className="h-4 w-4 text-[#0B51A6] focus:ring-[#0B51A6] border-gray-300"
              />
              <label htmlFor="educationalAttainmentDoctorateGraduate" className="ml-2 block text-sm text-gray-700">Doctorate Graduate</label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StepFour; 