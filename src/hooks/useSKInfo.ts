"use client";

import { useUserData } from "./useUserData";

interface SKInfo {
  region: string;
  province: string;
  municipality: string;
  officialBarangayName: string;
}

export function useSKInfo() {
  const { userData, loading, error } = useUserData();
  
  // Extract just the SK information from the user data
  const skInfo: SKInfo = userData?.skInfo || {
    region: "",
    province: "",
    municipality: "",
    officialBarangayName: ""
  };
  
  // Function to get a formatted barangay name
  const getFormattedBarangayName = (prefix: boolean = true) => {
    if (!skInfo.officialBarangayName) return "";
    return prefix ? `Brgy. ${skInfo.officialBarangayName}` : skInfo.officialBarangayName;
  };
  
  // Function to get a full location string
  const getFullLocation = () => {
    if (!skInfo.officialBarangayName) return "";
    return `Brgy. ${skInfo.officialBarangayName}, ${skInfo.municipality}, ${skInfo.province}, ${skInfo.region}`;
  };
  
  // Function to get a shortened location (municipality and barangay only)
  const getShortLocation = () => {
    if (!skInfo.officialBarangayName) return "";
    return `Brgy. ${skInfo.officialBarangayName}, ${skInfo.municipality}`;
  };

  return {
    skInfo,
    loading,
    error,
    getFormattedBarangayName,
    getFullLocation,
    getShortLocation
  };
} 