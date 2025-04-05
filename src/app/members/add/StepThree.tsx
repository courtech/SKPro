import React from 'react';

interface StepThreeProps {
  formData: any;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
  setFormData: React.Dispatch<React.SetStateAction<any>>;
}

const StepThree: React.FC<StepThreeProps> = ({ formData, handleChange, setFormData }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-md p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-3">Demographic Characteristics</h2>
      <p className="text-sm text-gray-700 mb-6">Please select the appropriate responses.</p>
      
      <div className="space-y-8">
        {/* Civil Status */}
        <div className="bg-gray-50 border border-gray-200 rounded-md p-5">
          <h3 className="font-bold text-gray-900 mb-4">Civil Status</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="flex items-center">
              <input
                type="radio"
                id="civilStatusSingle"
                name="civilStatus"
                value="Single"
                checked={formData.civilStatus === "Single"}
                onChange={handleChange}
                className="h-4 w-4 text-[#0B51A6] focus:ring-[#0B51A6] border-gray-300"
              />
              <label htmlFor="civilStatusSingle" className="ml-2 block text-sm text-gray-700">Single</label>
            </div>
            <div className="flex items-center">
              <input
                type="radio"
                id="civilStatusMarried"
                name="civilStatus"
                value="Married"
                checked={formData.civilStatus === "Married"}
                onChange={handleChange}
                className="h-4 w-4 text-[#0B51A6] focus:ring-[#0B51A6] border-gray-300"
              />
              <label htmlFor="civilStatusMarried" className="ml-2 block text-sm text-gray-700">Married</label>
            </div>
            <div className="flex items-center">
              <input
                type="radio"
                id="civilStatusWidowed"
                name="civilStatus"
                value="Widowed"
                checked={formData.civilStatus === "Widowed"}
                onChange={handleChange}
                className="h-4 w-4 text-[#0B51A6] focus:ring-[#0B51A6] border-gray-300"
              />
              <label htmlFor="civilStatusWidowed" className="ml-2 block text-sm text-gray-700">Widowed</label>
            </div>
            <div className="flex items-center">
              <input
                type="radio"
                id="civilStatusDivorced"
                name="civilStatus"
                value="Divorced"
                checked={formData.civilStatus === "Divorced"}
                onChange={handleChange}
                className="h-4 w-4 text-[#0B51A6] focus:ring-[#0B51A6] border-gray-300"
              />
              <label htmlFor="civilStatusDivorced" className="ml-2 block text-sm text-gray-700">Divorced</label>
            </div>
            <div className="flex items-center">
              <input
                type="radio"
                id="civilStatusSeparated"
                name="civilStatus"
                value="Separated"
                checked={formData.civilStatus === "Separated"}
                onChange={handleChange}
                className="h-4 w-4 text-[#0B51A6] focus:ring-[#0B51A6] border-gray-300"
              />
              <label htmlFor="civilStatusSeparated" className="ml-2 block text-sm text-gray-700">Separated</label>
            </div>
            <div className="flex items-center">
              <input
                type="radio"
                id="civilStatusAnnulled"
                name="civilStatus"
                value="Annulled"
                checked={formData.civilStatus === "Annulled"}
                onChange={handleChange}
                className="h-4 w-4 text-[#0B51A6] focus:ring-[#0B51A6] border-gray-300"
              />
              <label htmlFor="civilStatusAnnulled" className="ml-2 block text-sm text-gray-700">Annulled</label>
            </div>
            <div className="flex items-center">
              <input
                type="radio"
                id="civilStatusUnknown"
                name="civilStatus"
                value="Unknown"
                checked={formData.civilStatus === "Unknown"}
                onChange={handleChange}
                className="h-4 w-4 text-[#0B51A6] focus:ring-[#0B51A6] border-gray-300"
              />
              <label htmlFor="civilStatusUnknown" className="ml-2 block text-sm text-gray-700">Unknown</label>
            </div>
            <div className="flex items-center">
              <input
                type="radio"
                id="civilStatusLiveIn"
                name="civilStatus"
                value="Live-in"
                checked={formData.civilStatus === "Live-in"}
                onChange={handleChange}
                className="h-4 w-4 text-[#0B51A6] focus:ring-[#0B51A6] border-gray-300"
              />
              <label htmlFor="civilStatusLiveIn" className="ml-2 block text-sm text-gray-700">Live-in</label>
            </div>
          </div>
        </div>
        
        {/* Youth Classification */}
        <div className="bg-gray-50 border border-gray-200 rounded-md p-5">
          <h3 className="font-bold text-gray-900 mb-4">Youth Classification</h3>
          <div className="space-y-3">
            <div className="flex items-center">
              <input
                type="radio"
                id="youthClassificationISY"
                name="youthClassification"
                value="In School Youth"
                checked={formData.youthClassification === "In School Youth"}
                onChange={handleChange}
                className="h-4 w-4 text-[#0B51A6] focus:ring-[#0B51A6] border-gray-300"
              />
              <label htmlFor="youthClassificationISY" className="ml-2 block text-sm text-gray-700">In School Youth</label>
            </div>
            <div className="flex items-center">
              <input
                type="radio"
                id="youthClassificationOSY"
                name="youthClassification"
                value="Out of School Youth"
                checked={formData.youthClassification === "Out of School Youth"}
                onChange={handleChange}
                className="h-4 w-4 text-[#0B51A6] focus:ring-[#0B51A6] border-gray-300"
              />
              <label htmlFor="youthClassificationOSY" className="ml-2 block text-sm text-gray-700">Out of School Youth</label>
            </div>
            <div className="flex items-center">
              <input
                type="radio"
                id="youthClassificationWorking"
                name="youthClassification"
                value="Working Youth"
                checked={formData.youthClassification === "Working Youth"}
                onChange={handleChange}
                className="h-4 w-4 text-[#0B51A6] focus:ring-[#0B51A6] border-gray-300"
              />
              <label htmlFor="youthClassificationWorking" className="ml-2 block text-sm text-gray-700">Working Youth</label>
            </div>
            <div className="flex items-center">
              <input
                type="radio"
                id="youthClassificationSpecific"
                name="youthClassification"
                value="Youth w/ Specific needs"
                checked={formData.youthClassification === "Youth w/ Specific needs"}
                onChange={handleChange}
                className="h-4 w-4 text-[#0B51A6] focus:ring-[#0B51A6] border-gray-300"
              />
              <label htmlFor="youthClassificationSpecific" className="ml-2 block text-sm text-gray-700">Youth w/ Specific needs</label>
            </div>
          </div>
        </div>
        
        {/* Special Group */}
        <div className="bg-gray-50 border border-gray-200 rounded-md p-5">
          <h3 className="font-bold text-gray-900 mb-4">Special Group (if applicable)</h3>
          <div className="space-y-3">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="isPWD"
                name="isPWD"
                checked={formData.isPWD}
                onChange={handleChange}
                className="h-4 w-4 text-[#0B51A6] focus:ring-[#0B51A6] border-gray-300 rounded"
              />
              <label htmlFor="isPWD" className="ml-2 block text-sm text-gray-700">Person w/ Disability</label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="isChildrenInConflict"
                name="isChildrenInConflict"
                checked={formData.isChildrenInConflict}
                onChange={handleChange}
                className="h-4 w-4 text-[#0B51A6] focus:ring-[#0B51A6] border-gray-300 rounded"
              />
              <label htmlFor="isChildrenInConflict" className="ml-2 block text-sm text-gray-700">Children In Conflict w/ Law</label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="isIndigenousPeople"
                name="isIndigenousPeople"
                checked={formData.isIndigenousPeople}
                onChange={handleChange}
                className="h-4 w-4 text-[#0B51A6] focus:ring-[#0B51A6] border-gray-300 rounded"
              />
              <label htmlFor="isIndigenousPeople" className="ml-2 block text-sm text-gray-700">Indigenous People</label>
            </div>
          </div>
        </div>
        
        {/* Youth Age Group */}
        <div className="bg-gray-50 border border-gray-200 rounded-md p-5">
          <h3 className="font-bold text-gray-900 mb-4">Youth Age Group</h3>
          <div className="space-y-3">
            <div className="flex items-center">
              <input
                type="radio"
                id="youthAgeGroupChild"
                name="youthAgeGroup"
                value="Child Youth (15-17 yrs old)"
                checked={formData.youthAgeGroup === "Child Youth (15-17 yrs old)"}
                onChange={handleChange}
                className="h-4 w-4 text-[#0B51A6] focus:ring-[#0B51A6] border-gray-300"
              />
              <label htmlFor="youthAgeGroupChild" className="ml-2 block text-sm text-gray-700">Child Youth (15-17 yrs old)</label>
            </div>
            <div className="flex items-center">
              <input
                type="radio"
                id="youthAgeGroupCore"
                name="youthAgeGroup"
                value="Core Youth (18-24 yrs old)"
                checked={formData.youthAgeGroup === "Core Youth (18-24 yrs old)"}
                onChange={handleChange}
                className="h-4 w-4 text-[#0B51A6] focus:ring-[#0B51A6] border-gray-300"
              />
              <label htmlFor="youthAgeGroupCore" className="ml-2 block text-sm text-gray-700">Core Youth (18-24 yrs old)</label>
            </div>
            <div className="flex items-center">
              <input
                type="radio"
                id="youthAgeGroupYoungAdult"
                name="youthAgeGroup"
                value="Young Adult (15-30 yrs old)"
                checked={formData.youthAgeGroup === "Young Adult (15-30 yrs old)"}
                onChange={handleChange}
                className="h-4 w-4 text-[#0B51A6] focus:ring-[#0B51A6] border-gray-300"
              />
              <label htmlFor="youthAgeGroupYoungAdult" className="ml-2 block text-sm text-gray-700">Young Adult (15-30 yrs old)</label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StepThree; 