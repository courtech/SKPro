import { createUser } from './users';
import { createBarangay } from './barangays';
import { createReport, updateReportStatus } from './reports';
import { createMember, bulkImportMembers } from './members';
import { User, Barangay, Report, Member } from '@/types/firestore';
import { serverTimestamp, Timestamp } from 'firebase/firestore';
import { auth } from '@/lib/firebase';

/**
 * Simple function to create a barangay
 */
export const createNewBarangay = async (
  barangayName: string, 
  province: string, 
  municipalityCity: string
): Promise<Barangay> => {
  const barangayData: Omit<Barangay, 'id' | 'createdAt' | 'updatedAt'> = {
    barangayName,
    province,
    municipalityCity
  };
  
  return await createBarangay(barangayData);
};

/**
 * Create a new user document after Firebase Auth registration
 */
export const createNewUser = async (
  email: string,
  role: 'SK Official' | 'Admin',
  barangayId: string,
  uid: string
): Promise<User> => {
  const userData: Omit<User, 'id' | 'createdAt' | 'updatedAt'> = {
    email,
    role,
    barangayId
  };
  
  return await createUser(userData, uid);
};

/**
 * Create a report with minimal data
 */
export const createNewReport = async (
  title: string,
  quarter: 'Q1' | 'Q2' | 'Q3' | 'Q4',
  year: string,
  barangayId: string,
  createdBy: string
): Promise<Report> => {
  const reportData: Omit<Report, 'id' | 'createdAt' | 'updatedAt' | 'version'> = {
    title,
    quarter,
    year,
    barangayId,
    createdBy,
    status: 'draft',
    memberCount: 0
  };
  
  return await createReport(reportData);
};

/**
 * Add a single member
 */
export const addSingleMember = async (
  reportId: string,
  barangayId: string,
  firstName: string,
  lastName: string,
  data: Partial<Omit<Member, 'id' | 'createdAt' | 'updatedAt' | 'reportId' | 'barangayId' | 'firstName' | 'lastName'>> = {}
): Promise<Member> => {
  // Required fields
  const memberData: Omit<Member, 'id' | 'createdAt' | 'updatedAt'> = {
    reportId,
    barangayId,
    firstName,
    lastName,
    age: data.age || 0,
    birthdayMonth: data.birthdayMonth || 1,
    birthdayDay: data.birthdayDay || 1,
    birthdayYear: data.birthdayYear || 2000,
    sexAssignedAtBirth: data.sexAssignedAtBirth || 'Male',
    civilStatus: data.civilStatus || 'Single',
    youthClassification: data.youthClassification || 'In-School Youth',
    youthAgeGroup: data.youthAgeGroup || 'Core Youth (18-24)',
    homeAddress: data.homeAddress || '',
    region: data.region || '',
    province: data.province || '',
    cityMunicipality: data.cityMunicipality || '',
    barangay: data.barangay || '',
    educationalAttainment: data.educationalAttainment || 'High School Graduate',
    workStatus: data.workStatus || 'Unemployed',
    registeredSKVoter: data.registeredSKVoter || 'N',
    votedLastSKElection: data.votedLastSKElection || 'N',
    registeredNationalVoter: data.registeredNationalVoter || 'N',
    attendedKKAssembly: data.attendedKKAssembly || 'N'
  };
  
  // Add optional fields if provided
  if (data.middleName) memberData.middleName = data.middleName;
  if (data.suffix) memberData.suffix = data.suffix;
  if (data.specialGroup) memberData.specialGroup = data.specialGroup;
  if (data.emailAddress) memberData.emailAddress = data.emailAddress;
  if (data.contactNumber) memberData.contactNumber = data.contactNumber;
  if (data.sitioPurok) memberData.sitioPurok = data.sitioPurok;
  if (data.assemblyFrequency) memberData.assemblyFrequency = data.assemblyFrequency;
  if (data.signatureUrl) memberData.signatureUrl = data.signatureUrl;
  
  return await createMember(memberData);
};

/**
 * Bulk import minimal members for a report
 */
export const importMinimalMembers = async (
  reportId: string,
  barangayId: string,
  count: number = 1
): Promise<string[]> => {
  const members: Omit<Member, 'id' | 'createdAt' | 'updatedAt' | 'reportId' | 'barangayId'>[] = [];
  
  // Create the specified number of minimal members
  for (let i = 1; i <= count; i++) {
    members.push({
      firstName: `User${i}`,
      lastName: `Test${i}`,
      age: 18,
      birthdayMonth: 1,
      birthdayDay: 1,
      birthdayYear: 2000,
      sexAssignedAtBirth: 'Male',
      civilStatus: 'Single',
      youthClassification: 'In-School Youth',
      youthAgeGroup: 'Core Youth (18-24)',
      homeAddress: '',
      region: '',
      province: '',
      cityMunicipality: '',
      barangay: '',
      educationalAttainment: 'High School Graduate',
      workStatus: 'Unemployed',
      registeredSKVoter: 'N',
      votedLastSKElection: 'N',
      registeredNationalVoter: 'N',
      attendedKKAssembly: 'N'
    });
  }
  
  return await bulkImportMembers(reportId, barangayId, members);
}; 