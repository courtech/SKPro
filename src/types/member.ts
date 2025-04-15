// Legacy Member interface - for backward compatibility
// You should use the Firestore Member interface from firestore.ts for new code
import { Member as FirestoreMember } from './firestore';

// Member interface based on the KK Youth Profile fields
export interface Member {
  id: string;
  region: string;
  province: string;
  cityMunicipality: string;
  barangay: string;
  name: string;
  age: number;
  birthday: {
    month: number;
    day: number;
    year: number;
  };
  sex: string;
  civilStatus: string;
  youthClassification: string;
  youthAgeGroup: string;
  email: string;
  contactNumber: string;
  homeAddress: string;
  educationalAttainment: string;
  workStatus: string;
  isRegisteredVoter: boolean;
  votedLastElection: boolean;
  attendedKKAssembly: boolean;
  assemblyFrequency?: number;
}

// Convert from Firestore Member to legacy Member
export const convertToLegacyMember = (member: FirestoreMember): Member => {
  return {
    id: member.id,
    region: member.region,
    province: member.province,
    cityMunicipality: member.cityMunicipality,
    barangay: member.barangay,
    name: `${member.firstName} ${member.lastName}`,
    age: member.age,
    birthday: {
      month: member.birthdayMonth,
      day: member.birthdayDay,
      year: member.birthdayYear
    },
    sex: member.sexAssignedAtBirth,
    civilStatus: member.civilStatus,
    youthClassification: member.youthClassification,
    youthAgeGroup: member.youthAgeGroup,
    email: member.emailAddress || '',
    contactNumber: member.contactNumber || '',
    homeAddress: member.homeAddress,
    educationalAttainment: member.educationalAttainment,
    workStatus: member.workStatus,
    isRegisteredVoter: member.registeredSKVoter === 'Y',
    votedLastElection: member.votedLastSKElection === 'Y',
    attendedKKAssembly: member.attendedKKAssembly === 'Y',
    assemblyFrequency: member.assemblyFrequency
  };
}; 