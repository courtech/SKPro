import { Member, convertToLegacyMember } from "@/types/member";
import {
  getMembersByBarangay,
  getMemberById as getFirestoreMemberById,
  searchMembersByName,
  createMember as createFirestoreMember,
  updateMember as updateFirestoreMember
} from "@/services/firebase/members";
import { CivilStatus, SexAssignedAtBirth, YouthClassification, YouthAgeGroup, EducationalAttainment, WorkStatus, YesNo } from "@/types/firestore";

// Default barangay ID - in a real app, this would come from authentication context
const DEFAULT_BARANGAY_ID = 'default';

// Functions to get member data from Firebase Firestore
export const getAllMembers = async (barangayId: string = DEFAULT_BARANGAY_ID): Promise<Member[]> => {
  const firestoreMembers = await getMembersByBarangay(barangayId);
  return firestoreMembers.map(convertToLegacyMember);
};

export const getMemberById = async (id: string): Promise<Member | undefined> => {
  const firestoreMember = await getFirestoreMemberById(id);
  return firestoreMember ? convertToLegacyMember(firestoreMember) : undefined;
};

export const searchMembers = async (query: string, barangayId: string = DEFAULT_BARANGAY_ID): Promise<Member[]> => {
  // Use Firebase search function
  const firestoreMembers = await searchMembersByName(barangayId, query);
  return firestoreMembers.map(convertToLegacyMember);
};

export const filterMembers = async (
  filters: {
    youthClassification?: string;
    sex?: string;
    barangay?: string;
    ageGroup?: string;
    isRegisteredVoter?: boolean;
    attendedKKAssembly?: boolean;
  },
  barangayId: string = DEFAULT_BARANGAY_ID
): Promise<Member[]> => {
  // For now, we'll fetch all members and filter on the client side
  // In a real app, you might want to use Firestore queries for this
  const allMembers = await getAllMembers(barangayId);
  
  return allMembers.filter(member => {
    let match = true;
    
    if (filters.youthClassification && filters.youthClassification !== "All") {
      match = match && member.youthClassification === filters.youthClassification;
    }
    
    if (filters.sex && filters.sex !== "All") {
      match = match && member.sex === filters.sex;
    }
    
    if (filters.barangay && filters.barangay !== "All") {
      match = match && member.barangay === filters.barangay;
    }
    
    if (filters.ageGroup && filters.ageGroup !== "All") {
      match = match && member.youthAgeGroup === filters.ageGroup;
    }
    
    if (filters.isRegisteredVoter !== undefined) {
      match = match && member.isRegisteredVoter === filters.isRegisteredVoter;
    }
    
    if (filters.attendedKKAssembly !== undefined) {
      match = match && member.attendedKKAssembly === filters.attendedKKAssembly;
    }
    
    return match;
  });
};

export const updateMember = async (updatedMember: Member): Promise<Member> => {
  // Convert from legacy Member to Firestore Member format
  const firestoreMemberData = {
    lastName: updatedMember.name.split(' ').pop() || '',
    firstName: updatedMember.name.split(' ').slice(0, -1).join(' '),
    age: updatedMember.age,
    birthdayMonth: updatedMember.birthday.month,
    birthdayDay: updatedMember.birthday.day,
    birthdayYear: updatedMember.birthday.year,
    sexAssignedAtBirth: updatedMember.sex as SexAssignedAtBirth,
    civilStatus: updatedMember.civilStatus as CivilStatus,
    youthClassification: updatedMember.youthClassification as YouthClassification,
    youthAgeGroup: updatedMember.youthAgeGroup as YouthAgeGroup,
    emailAddress: updatedMember.email,
    contactNumber: updatedMember.contactNumber,
    homeAddress: updatedMember.homeAddress,
    region: updatedMember.region,
    province: updatedMember.province,
    cityMunicipality: updatedMember.cityMunicipality,
    barangay: updatedMember.barangay,
    educationalAttainment: updatedMember.educationalAttainment as EducationalAttainment,
    workStatus: updatedMember.workStatus as WorkStatus,
    registeredSKVoter: updatedMember.isRegisteredVoter ? 'Y' as YesNo : 'N' as YesNo,
    votedLastSKElection: updatedMember.votedLastElection ? 'Y' as YesNo : 'N' as YesNo,
    registeredNationalVoter: 'N' as YesNo, // Default value
    attendedKKAssembly: updatedMember.attendedKKAssembly ? 'Y' as YesNo : 'N' as YesNo,
    assemblyFrequency: updatedMember.assemblyFrequency
  };
  
  await updateFirestoreMember(updatedMember.id, firestoreMemberData);
  
  // Fetch the updated member to return
  const updatedFirestoreMember = await getFirestoreMemberById(updatedMember.id);
  return updatedFirestoreMember ? convertToLegacyMember(updatedFirestoreMember) : updatedMember;
};

export const createMember = async (newMember: Omit<Member, 'id'>, barangayId: string = DEFAULT_BARANGAY_ID): Promise<Member> => {
  // Convert from legacy Member format to Firestore Member format
  const firestoreMemberData = {
    barangayId,
    lastName: newMember.name.split(' ').pop() || '',
    firstName: newMember.name.split(' ').slice(0, -1).join(' '),
    age: newMember.age,
    birthdayMonth: newMember.birthday.month,
    birthdayDay: newMember.birthday.day,
    birthdayYear: newMember.birthday.year,
    sexAssignedAtBirth: newMember.sex as SexAssignedAtBirth,
    civilStatus: newMember.civilStatus as CivilStatus,
    youthClassification: newMember.youthClassification as YouthClassification,
    youthAgeGroup: newMember.youthAgeGroup as YouthAgeGroup,
    emailAddress: newMember.email,
    contactNumber: newMember.contactNumber,
    homeAddress: newMember.homeAddress,
    region: newMember.region,
    province: newMember.province,
    cityMunicipality: newMember.cityMunicipality,
    barangay: newMember.barangay,
    educationalAttainment: newMember.educationalAttainment as EducationalAttainment,
    workStatus: newMember.workStatus as WorkStatus,
    registeredSKVoter: newMember.isRegisteredVoter ? 'Y' as YesNo : 'N' as YesNo,
    votedLastSKElection: newMember.votedLastElection ? 'Y' as YesNo : 'N' as YesNo,
    registeredNationalVoter: 'N' as YesNo, // Default value
    attendedKKAssembly: newMember.attendedKKAssembly ? 'Y' as YesNo : 'N' as YesNo,
    assemblyFrequency: newMember.assemblyFrequency
  };
  
  const createdMember = await createFirestoreMember(firestoreMemberData);
  return convertToLegacyMember(createdMember);
}; 