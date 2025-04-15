import { Timestamp } from 'firebase/firestore';

export interface User {
  id: string;
  email: string;
  passwordHash?: string; // Firebase Auth manages password
  role: 'SK Official' | 'Admin';
  barangayId: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface Barangay {
  id: string;
  barangayName: string;
  province: string;
  municipalityCity: string;
  logoUrl?: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface Report {
  id: string;
  title: string;
  quarter: 'Q1' | 'Q2' | 'Q3' | 'Q4';
  year: string;
  barangayId: string;
  createdBy: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  status: 'draft' | 'generated' | 'submitted';
  memberCount: number;
  fileUrl?: string;
  version: number;
}

export type SexAssignedAtBirth = 'Male' | 'Female';
export type CivilStatus = 'Single' | 'Married' | 'Widowed' | 'Divorced' | 'Separated';
export type YouthClassification = 
  'In-School Youth' | 
  'Out-of-School Youth' | 
  'Working Youth' | 
  'Others';
export type YouthAgeGroup = 
  'Child Youth (15-17)' | 
  'Core Youth (18-24)' | 
  'Young Adult (25-30)';
export type EducationalAttainment = 
  'Elementary Undergraduate' | 
  'Elementary Graduate' | 
  'High School Undergraduate' | 
  'High School Graduate' | 
  'College Undergraduate' | 
  'College Graduate' | 
  'Post Graduate';
export type WorkStatus = 'Employed' | 'Unemployed' | 'Self-Employed';
export type YesNo = 'Y' | 'N';

export interface Member {
  id: string;
  reportId?: string;
  barangayId: string;

  lastName: string;
  firstName: string;
  middleName?: string;
  suffix?: string;

  age: number;
  birthdayMonth: number;
  birthdayDay: number;
  birthdayYear: number;

  sexAssignedAtBirth: SexAssignedAtBirth;
  civilStatus: CivilStatus;

  youthClassification: YouthClassification;
  specialGroup?: string[];
  youthAgeGroup: YouthAgeGroup;

  emailAddress?: string;
  contactNumber?: string;
  homeAddress: string;

  region: string;
  province: string;
  cityMunicipality: string;
  barangay: string;
  sitioPurok?: string;

  educationalAttainment: EducationalAttainment;
  workStatus: WorkStatus;

  registeredSKVoter: YesNo;
  votedLastSKElection: YesNo;
  registeredNationalVoter: YesNo;
  attendedKKAssembly: YesNo;
  assemblyFrequency?: number;

  signatureUrl?: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
} 