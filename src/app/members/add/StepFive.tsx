import React from 'react';

interface StepFiveProps {
  formData: any;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
  setFormData: React.Dispatch<React.SetStateAction<any>>;
}

const StepFive: React.FC<StepFiveProps> = ({ formData, handleChange, setFormData }) => {
  // Special handler for boolean radio button values
  const handleBooleanChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value === "true" ? true : false
    });
  };

  return (
    <div className="bg-white border border-gray-200 rounded-md p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-3">Electoral and KK Assembly Information</h2>
      <p className="text-sm text-gray-700 mb-6">Please select the appropriate responses.</p>
      
      <div className="space-y-8">
        {/* Registered SK Voter */}
        <div className="bg-gray-50 border border-gray-200 rounded-md p-5">
          <h3 className="font-bold text-gray-900 mb-4">Registered SK Voter?</h3>
          <div className="space-y-3">
            <div className="flex items-center">
              <input
                type="radio"
                id="registeredSKVoterYes"
                name="registeredSKVoter"
                value="true"
                checked={formData.registeredSKVoter === true}
                onChange={(e) => handleBooleanChange("registeredSKVoter", e.target.value)}
                className="h-4 w-4 text-[#0B51A6] focus:ring-[#0B51A6] border-gray-300"
              />
              <label htmlFor="registeredSKVoterYes" className="ml-2 block text-sm text-gray-700">Yes</label>
            </div>
            <div className="flex items-center">
              <input
                type="radio"
                id="registeredSKVoterNo"
                name="registeredSKVoter"
                value="false"
                checked={formData.registeredSKVoter === false}
                onChange={(e) => handleBooleanChange("registeredSKVoter", e.target.value)}
                className="h-4 w-4 text-[#0B51A6] focus:ring-[#0B51A6] border-gray-300"
              />
              <label htmlFor="registeredSKVoterNo" className="ml-2 block text-sm text-gray-700">No</label>
            </div>
          </div>
        </div>
        
        {/* Did you vote last SK election */}
        <div className="bg-gray-50 border border-gray-200 rounded-md p-5">
          <h3 className="font-bold text-gray-900 mb-4">Did you vote last SK election?</h3>
          <div className="space-y-3">
            <div className="flex items-center">
              <input
                type="radio"
                id="votedLastElectionYes"
                name="votedLastElection"
                value="true"
                checked={formData.votedLastElection === true}
                onChange={(e) => handleBooleanChange("votedLastElection", e.target.value)}
                className="h-4 w-4 text-[#0B51A6] focus:ring-[#0B51A6] border-gray-300"
              />
              <label htmlFor="votedLastElectionYes" className="ml-2 block text-sm text-gray-700">Yes</label>
            </div>
            <div className="flex items-center">
              <input
                type="radio"
                id="votedLastElectionNo"
                name="votedLastElection"
                value="false"
                checked={formData.votedLastElection === false}
                onChange={(e) => handleBooleanChange("votedLastElection", e.target.value)}
                className="h-4 w-4 text-[#0B51A6] focus:ring-[#0B51A6] border-gray-300"
              />
              <label htmlFor="votedLastElectionNo" className="ml-2 block text-sm text-gray-700">No</label>
            </div>
          </div>
        </div>
        
        {/* Registered National Voter */}
        <div className="bg-gray-50 border border-gray-200 rounded-md p-5">
          <h3 className="font-bold text-gray-900 mb-4">Registered National Voter?</h3>
          <div className="space-y-3">
            <div className="flex items-center">
              <input
                type="radio"
                id="registeredNationalVoterYes"
                name="registeredNationalVoter"
                value="true"
                checked={formData.registeredNationalVoter === true}
                onChange={(e) => handleBooleanChange("registeredNationalVoter", e.target.value)}
                className="h-4 w-4 text-[#0B51A6] focus:ring-[#0B51A6] border-gray-300"
              />
              <label htmlFor="registeredNationalVoterYes" className="ml-2 block text-sm text-gray-700">Yes</label>
            </div>
            <div className="flex items-center">
              <input
                type="radio"
                id="registeredNationalVoterNo"
                name="registeredNationalVoter"
                value="false"
                checked={formData.registeredNationalVoter === false}
                onChange={(e) => handleBooleanChange("registeredNationalVoter", e.target.value)}
                className="h-4 w-4 text-[#0B51A6] focus:ring-[#0B51A6] border-gray-300"
              />
              <label htmlFor="registeredNationalVoterNo" className="ml-2 block text-sm text-gray-700">No</label>
            </div>
          </div>
        </div>
        
        {/* KK Assembly attendance */}
        <div className="bg-gray-50 border border-gray-200 rounded-md p-5">
          <h3 className="font-bold text-gray-900 mb-4">Have you already attended a KK Assembly?</h3>
          <div className="space-y-3">
            <div className="flex items-center">
              <input
                type="radio"
                id="attendedKKAssemblyYes"
                name="attendedKKAssembly"
                value="true"
                checked={formData.attendedKKAssembly === true}
                onChange={(e) => handleBooleanChange("attendedKKAssembly", e.target.value)}
                className="h-4 w-4 text-[#0B51A6] focus:ring-[#0B51A6] border-gray-300"
              />
              <label htmlFor="attendedKKAssemblyYes" className="ml-2 block text-sm text-gray-700">Yes</label>
            </div>
            <div className="flex items-center">
              <input
                type="radio"
                id="attendedKKAssemblyNo"
                name="attendedKKAssembly"
                value="false"
                checked={formData.attendedKKAssembly === false}
                onChange={(e) => handleBooleanChange("attendedKKAssembly", e.target.value)}
                className="h-4 w-4 text-[#0B51A6] focus:ring-[#0B51A6] border-gray-300"
              />
              <label htmlFor="attendedKKAssemblyNo" className="ml-2 block text-sm text-gray-700">No</label>
            </div>
          </div>
        </div>
        
        {/* Assembly Frequency - conditional */}
        {formData.attendedKKAssembly === true && (
          <div className="bg-gray-50 border border-gray-200 rounded-md p-5 ml-5 border-l-4 border-l-[#0B51A6]">
            <h3 className="font-bold text-gray-900 mb-4">If Yes, How many times?</h3>
            <div className="space-y-3">
              <div className="flex items-center">
                <input
                  type="radio"
                  id="assemblyFrequency1-2"
                  name="assemblyFrequency"
                  value="1-2 Times"
                  checked={formData.assemblyFrequency === "1-2 Times"}
                  onChange={handleChange}
                  className="h-4 w-4 text-[#0B51A6] focus:ring-[#0B51A6] border-gray-300"
                />
                <label htmlFor="assemblyFrequency1-2" className="ml-2 block text-sm text-gray-700">1-2 Times</label>
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  id="assemblyFrequency3-4"
                  name="assemblyFrequency"
                  value="3-4 Times"
                  checked={formData.assemblyFrequency === "3-4 Times"}
                  onChange={handleChange}
                  className="h-4 w-4 text-[#0B51A6] focus:ring-[#0B51A6] border-gray-300"
                />
                <label htmlFor="assemblyFrequency3-4" className="ml-2 block text-sm text-gray-700">3-4 Times</label>
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  id="assemblyFrequency5Plus"
                  name="assemblyFrequency"
                  value="5 and above"
                  checked={formData.assemblyFrequency === "5 and above"}
                  onChange={handleChange}
                  className="h-4 w-4 text-[#0B51A6] focus:ring-[#0B51A6] border-gray-300"
                />
                <label htmlFor="assemblyFrequency5Plus" className="ml-2 block text-sm text-gray-700">5 and above</label>
              </div>
            </div>
          </div>
        )}
        
        {/* Why not attended - conditional */}
        {formData.attendedKKAssembly === false && (
          <div className="bg-gray-50 border border-gray-200 rounded-md p-5 ml-5 border-l-4 border-l-[#0B51A6]">
            <h3 className="font-bold text-gray-900 mb-4">If No, Why?</h3>
            <div className="space-y-3">
              <div className="flex items-center">
                <input
                  type="radio"
                  id="notAttendedReasonNoMeeting"
                  name="notAttendedReason"
                  value="There was no KK Assembly Meeting"
                  checked={formData.notAttendedReason === "There was no KK Assembly Meeting"}
                  onChange={handleChange}
                  className="h-4 w-4 text-[#0B51A6] focus:ring-[#0B51A6] border-gray-300"
                />
                <label htmlFor="notAttendedReasonNoMeeting" className="ml-2 block text-sm text-gray-700">There was no KK Assembly Meeting</label>
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  id="notAttendedReasonNotInterested"
                  name="notAttendedReason"
                  value="Not Interested to Attend"
                  checked={formData.notAttendedReason === "Not Interested to Attend"}
                  onChange={handleChange}
                  className="h-4 w-4 text-[#0B51A6] focus:ring-[#0B51A6] border-gray-300"
                />
                <label htmlFor="notAttendedReasonNotInterested" className="ml-2 block text-sm text-gray-700">Not Interested to Attend</label>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StepFive; 