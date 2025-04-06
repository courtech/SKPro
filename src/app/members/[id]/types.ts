// Define types for member data structure
export interface PersonalInfo {
  name: string;
  fullName: string;
  firstName: string;
  lastName: string;
  middleName: string;
  suffix: string;
  sex: string;
  birthdate: string;
  age: number;
  civilStatus: string;
  signature?: string; // Optional signature as base64 string or URL
}

export interface ContactInfo {
  region: string;
  province: string;
  cityMunicipality: string;
  barangay: string;
  purokZone: string;
  email: string;
  contactNumber: string;
}

export interface Classification {
  youthClassification: string;
  youthAgeGroup: string;
  educationalAttainment: string;
  workStatus: string;
  isRegisteredSKVoter: boolean;
  isRegisteredNationalVoter: boolean;
  votedLastElection: boolean;
  isPWD: boolean;
  isSingleParent: boolean;
  isInConflictWithLaw: boolean;
  isIndigenous: boolean;
  attendsAssembly: boolean;
  assemblyFrequency: string;
  notAttendedReason: string;
}

export interface Metadata {
  dateAdded: string;
  lastUpdated: string;
}

export interface MemberData {
  id: string;
  personalInfo: PersonalInfo;
  contactInfo: ContactInfo;
  classification: Classification;
  metadata: Metadata;
} 