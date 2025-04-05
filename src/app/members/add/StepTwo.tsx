import React from 'react';

interface StepTwoProps {
  formData: any;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
}

const StepTwo: React.FC<StepTwoProps> = ({ formData, handleChange }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-md p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-6">Location Information</h2>
      
      <div className="space-y-8">
        {/* Region */}
        <div>
          <label htmlFor="region" className="block text-gray-700 font-medium mb-3">Region</label>
          <input
            type="text"
            id="region"
            name="region"
            value={formData.region}
            onChange={handleChange}
            required
            placeholder="Enter region"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0B51A6] focus:border-transparent"
          />
        </div>
        
        {/* Province */}
        <div>
          <label htmlFor="province" className="block text-gray-700 font-medium mb-3">Province</label>
          <input
            type="text"
            id="province"
            name="province"
            value={formData.province}
            onChange={handleChange}
            required
            placeholder="Enter province"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0B51A6] focus:border-transparent"
          />
        </div>
        
        {/* City/Municipality */}
        <div>
          <label htmlFor="cityMunicipality" className="block text-gray-700 font-medium mb-3">City/Municipality</label>
          <input
            type="text"
            id="cityMunicipality"
            name="cityMunicipality"
            value={formData.cityMunicipality}
            onChange={handleChange}
            required
            placeholder="Enter city or municipality"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0B51A6] focus:border-transparent"
          />
        </div>
        
        {/* Barangay */}
        <div>
          <label htmlFor="barangay" className="block text-gray-700 font-medium mb-3">Barangay</label>
          <input
            type="text"
            id="barangay"
            name="barangay"
            value={formData.barangay}
            onChange={handleChange}
            required
            placeholder="Enter barangay"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0B51A6] focus:border-transparent"
          />
        </div>
        
        {/* Purok/Zone */}
        <div>
          <label htmlFor="purokZone" className="block text-gray-700 font-medium mb-3">Purok/Zone</label>
          <input
            type="text"
            id="purokZone"
            name="purokZone"
            value={formData.purokZone}
            onChange={handleChange}
            required
            placeholder="Enter purok or zone"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0B51A6] focus:border-transparent"
          />
        </div>
      </div>
    </div>
  );
};

export default StepTwo; 