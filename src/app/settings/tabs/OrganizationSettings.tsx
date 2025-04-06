import React, { useState, ChangeEvent } from "react";
import { Upload, X } from "lucide-react";
import Image from "next/image";

const OrganizationSettings = () => {
  const [logo, setLogo] = useState<string | null>(null);
  const [barangayName, setBarangayName] = useState("");
  const [province, setProvince] = useState("");
  const [municipality, setMunicipality] = useState("");
  const [formErrors, setFormErrors] = useState({
    barangayName: "",
    province: "",
    municipality: ""
  });

  // Handle logo upload
  const handleLogoUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setLogo(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Remove logo
  const handleRemoveLogo = () => {
    setLogo(null);
  };

  // Validate form field
  const validateField = (name: string, value: string) => {
    if (!value.trim()) {
      setFormErrors(prev => ({
        ...prev,
        [name]: `${name.charAt(0).toUpperCase() + name.slice(1).replace(/([A-Z])/g, ' $1')} is required`
      }));
      return false;
    } else {
      setFormErrors(prev => ({
        ...prev,
        [name]: ""
      }));
      return true;
    }
  };

  // Handle input change with validation
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    if (name === "barangayName") {
      setBarangayName(value);
      validateField(name, value);
    } else if (name === "province") {
      setProvince(value);
      validateField(name, value);
    } else if (name === "municipality") {
      setMunicipality(value);
      validateField(name, value);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Organization/Barangay Information</h2>
      
      <div className="space-y-6">
        {/* Logo Upload Section */}
        <div className="space-y-4">
          <h3 className="text-md font-medium">Barangay Logo</h3>
          
          <div className="flex items-start space-x-6">
            {/* Logo Preview */}
            <div className="w-32 h-32 bg-gray-100 rounded-md border border-gray-300 flex items-center justify-center relative overflow-hidden">
              {logo ? (
                <>
                  <Image 
                    src={logo} 
                    alt="Barangay Logo" 
                    fill 
                    sizes="128px"
                    style={{ objectFit: 'contain' }} 
                  />
                  <button 
                    onClick={handleRemoveLogo}
                    className="absolute top-1 right-1 bg-white rounded-full p-1 shadow-sm"
                    aria-label="Remove logo"
                  >
                    <X className="h-4 w-4 text-gray-600" />
                  </button>
                </>
              ) : (
                <span className="text-gray-400 text-sm text-center">No logo uploaded</span>
              )}
            </div>
            
            {/* Upload Controls */}
            <div className="space-y-2">
              <label className="px-4 py-2 bg-[#0B51A6] text-white rounded-md inline-flex items-center text-sm cursor-pointer hover:bg-blue-700 transition">
                <Upload className="h-4 w-4 mr-2" />
                {logo ? "Replace Logo" : "Upload Logo"}
                <input 
                  type="file" 
                  className="hidden" 
                  accept="image/*" 
                  onChange={handleLogoUpload}
                />
              </label>
              <p className="text-xs text-gray-500">
                Recommended size: 200x200px<br />
                Supported formats: PNG, JPG, SVG
              </p>
            </div>
          </div>
        </div>
        
        {/* Barangay Information */}
        <div className="space-y-4">
          <h3 className="text-md font-medium">Barangay Details</h3>
          
          <div className="space-y-4">
            <div>
              <label htmlFor="barangayName" className="block text-sm font-medium text-gray-700 mb-1">
                Barangay Name <span className="text-red-500">*</span>
              </label>
              <input
                id="barangayName"
                name="barangayName"
                type="text"
                value={barangayName}
                onChange={handleInputChange}
                onBlur={(e) => validateField("barangayName", e.target.value)}
                className={`w-full px-3 py-2 border ${formErrors.barangayName ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                placeholder="Enter barangay name"
              />
              {formErrors.barangayName && (
                <p className="mt-1 text-sm text-red-500">{formErrors.barangayName}</p>
              )}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="province" className="block text-sm font-medium text-gray-700 mb-1">
                  Province <span className="text-red-500">*</span>
                </label>
                <input
                  id="province"
                  name="province"
                  type="text"
                  value={province}
                  onChange={handleInputChange}
                  onBlur={(e) => validateField("province", e.target.value)}
                  className={`w-full px-3 py-2 border ${formErrors.province ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  placeholder="Enter province"
                />
                {formErrors.province && (
                  <p className="mt-1 text-sm text-red-500">{formErrors.province}</p>
                )}
              </div>
              
              <div>
                <label htmlFor="municipality" className="block text-sm font-medium text-gray-700 mb-1">
                  Municipality/City <span className="text-red-500">*</span>
                </label>
                <input
                  id="municipality"
                  name="municipality"
                  type="text"
                  value={municipality}
                  onChange={handleInputChange}
                  onBlur={(e) => validateField("municipality", e.target.value)}
                  className={`w-full px-3 py-2 border ${formErrors.municipality ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  placeholder="Enter municipality or city"
                />
                {formErrors.municipality && (
                  <p className="mt-1 text-sm text-red-500">{formErrors.municipality}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrganizationSettings; 