import React, { useState, useEffect, ChangeEvent } from "react";
import { Upload, X, Save } from "lucide-react";
import Image from "next/image";
import { useSKInfo } from "@/hooks/useSKInfo";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "react-hot-toast";

const OrganizationSettings = () => {
  const { user } = useAuth();
  const { skInfo, loading } = useSKInfo();
  
  const [logo, setLogo] = useState<string | null>(null);
  const [barangayName, setBarangayName] = useState("");
  const [province, setProvince] = useState("");
  const [municipality, setMunicipality] = useState("");
  const [region, setRegion] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [formErrors, setFormErrors] = useState({
    barangayName: "",
    province: "",
    municipality: "",
    region: ""
  });

  // Load the SK info when the component mounts
  useEffect(() => {
    if (!loading && skInfo) {
      setBarangayName(skInfo.officialBarangayName || "");
      setProvince(skInfo.province || "");
      setMunicipality(skInfo.municipality || "");
      setRegion(skInfo.region || "");
    }
  }, [loading, skInfo]);

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
    } else if (name === "region") {
      setRegion(value);
      validateField(name, value);
    }
  };

  // Validate the entire form
  const validateForm = () => {
    let isValid = true;
    
    if (!validateField("barangayName", barangayName)) isValid = false;
    if (!validateField("province", province)) isValid = false;
    if (!validateField("municipality", municipality)) isValid = false;
    if (!validateField("region", region)) isValid = false;
    
    return isValid;
  };

  // Save organization settings
  const handleSave = async () => {
    if (!validateForm()) return;
    if (!user) {
      toast.error("You must be logged in to save settings");
      return;
    }
    
    try {
      setIsSaving(true);
      
      const userDocRef = doc(db, "users", user.uid);
      await updateDoc(userDocRef, {
        "skInfo.officialBarangayName": barangayName,
        "skInfo.province": province,
        "skInfo.municipality": municipality,
        "skInfo.region": region
      });
      
      toast.success("Organization settings updated successfully");
    } catch (error) {
      console.error("Error updating organization settings:", error);
      toast.error("Failed to update organization settings");
    } finally {
      setIsSaving(false);
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
                Official Barangay Name <span className="text-red-500">*</span>
              </label>
              <input
                id="barangayName"
                name="barangayName"
                type="text"
                value={barangayName}
                onChange={handleInputChange}
                onBlur={(e) => validateField("barangayName", e.target.value)}
                className={`w-full px-3 py-2 border ${formErrors.barangayName ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                placeholder="Enter official barangay name"
              />
              {formErrors.barangayName && (
                <p className="mt-1 text-sm text-red-500">{formErrors.barangayName}</p>
              )}
              <p className="mt-1 text-xs text-gray-500">
                This is the official name that will be used throughout the system
              </p>
            </div>
            
            <div>
              <label htmlFor="region" className="block text-sm font-medium text-gray-700 mb-1">
                Region <span className="text-red-500">*</span>
              </label>
              <input
                id="region"
                name="region"
                type="text"
                value={region}
                onChange={handleInputChange}
                onBlur={(e) => validateField("region", e.target.value)}
                className={`w-full px-3 py-2 border ${formErrors.region ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                placeholder="e.g. Region IV-A (CALABARZON)"
              />
              {formErrors.region && (
                <p className="mt-1 text-sm text-red-500">{formErrors.region}</p>
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
        
        {/* Save Button */}
        <div className="flex justify-end">
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="px-4 py-2 bg-[#0B51A6] text-white rounded-md flex items-center hover:bg-blue-700 disabled:opacity-70"
          >
            <Save className="h-4 w-4 mr-2" />
            {isSaving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrganizationSettings; 