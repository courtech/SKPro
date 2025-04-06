import { Member } from "@/types/member";
import { MemberData } from "@/app/members/[id]/types";

/**
 * Transform a Member object to MemberData format for the detail page
 */
export const transformMemberToMemberData = (member: Member): MemberData => {
  // Extract first, middle, and last name
  const nameParts = member.name.split(',');
  const lastName = nameParts[0]?.trim() || '';
  
  let firstName = '';
  let middleName = '';
  let suffix = '';
  
  if (nameParts.length > 1) {
    const firstParts = nameParts[1].trim().split(' ');
    firstName = firstParts[0] || '';
    
    // Check for suffix like "JR" or "III" at the end
    const lastPart = firstParts[firstParts.length - 1];
    const suffixPattern = /^(JR|SR|I|II|III|IV|V)$/i;
    
    if (suffixPattern.test(lastPart)) {
      suffix = lastPart;
      // Remove suffix from first parts array
      firstParts.pop();
      // Recalculate firstName
      firstName = firstParts[0] || '';
    }
    
    // If there are more than 2 parts, the middle ones are middle names
    if (firstParts.length > 1) {
      middleName = firstParts.slice(1).join(' ');
    }
  }
  
  // Format birthdate from parts
  const birthdate = `${member.birthday.year}-${String(member.birthday.month).padStart(2, '0')}-${String(member.birthday.day).padStart(2, '0')}`;
  
  // Map assembly frequency to text representation
  let assemblyFrequencyText = 'Never';
  if (member.assemblyFrequency) {
    if (member.assemblyFrequency === 1) assemblyFrequencyText = 'Once';
    else if (member.assemblyFrequency === 2) assemblyFrequencyText = '1-2 Times';
    else if (member.assemblyFrequency === 3) assemblyFrequencyText = '3-4 Times';
    else if (member.assemblyFrequency > 4) assemblyFrequencyText = '5+ Times';
  }
  
  return {
    id: member.id,
    personalInfo: {
      name: member.name,
      fullName: `${firstName} ${middleName ? middleName + ' ' : ''}${lastName}${suffix ? ' ' + suffix : ''}`,
      firstName,
      lastName,
      middleName,
      suffix,
      sex: member.sex,
      birthdate,
      age: member.age,
      civilStatus: member.civilStatus,
      signature: '',
    },
    contactInfo: {
      region: member.region,
      province: member.province,
      cityMunicipality: member.cityMunicipality,
      barangay: member.barangay,
      purokZone: member.homeAddress.split(',')[0].trim(), // Use first part of address as purok/zone
      email: member.email !== 'NA' ? member.email : '',
      contactNumber: member.contactNumber !== 'NA' ? member.contactNumber : '',
    },
    classification: {
      youthClassification: member.youthClassification,
      youthAgeGroup: member.youthAgeGroup,
      educationalAttainment: member.educationalAttainment,
      workStatus: member.workStatus,
      isRegisteredSKVoter: member.isRegisteredVoter,
      isRegisteredNationalVoter: member.isRegisteredVoter,
      votedLastElection: member.votedLastElection,
      isPWD: false, // Default values for fields not in our data
      isSingleParent: false,
      isInConflictWithLaw: false,
      isIndigenous: false,
      attendsAssembly: member.attendedKKAssembly,
      assemblyFrequency: assemblyFrequencyText,
      notAttendedReason: member.attendedKKAssembly ? '' : 'Not specified',
    },
    metadata: {
      dateAdded: new Date().toISOString().split('T')[0], // Today as YYYY-MM-DD
      lastUpdated: new Date().toISOString().split('T')[0],
    }
  };
};

/**
 * Transform MemberData back to Member format
 */
export const transformMemberDataToMember = (memberData: MemberData): Member => {
  // Extract date parts from birthdate
  const dateParts = memberData.personalInfo.birthdate.split('-');
  const year = parseInt(dateParts[0]);
  const month = parseInt(dateParts[1]);
  const day = parseInt(dateParts[2]);
  
  // Map assembly frequency text to number
  let assemblyFrequency = 0;
  switch (memberData.classification.assemblyFrequency) {
    case 'Once':
      assemblyFrequency = 1;
      break;
    case '1-2 Times':
      assemblyFrequency = 2;
      break;
    case '3-4 Times':
      assemblyFrequency = 3;
      break;
    case '5+ Times':
      assemblyFrequency = 5;
      break;
    default:
      assemblyFrequency = 0;
  }
  
  return {
    id: memberData.id,
    region: memberData.contactInfo.region,
    province: memberData.contactInfo.province,
    cityMunicipality: memberData.contactInfo.cityMunicipality,
    barangay: memberData.contactInfo.barangay,
    name: memberData.personalInfo.name,
    age: memberData.personalInfo.age,
    birthday: {
      month,
      day,
      year,
    },
    sex: memberData.personalInfo.sex,
    civilStatus: memberData.personalInfo.civilStatus,
    youthClassification: memberData.classification.youthClassification,
    youthAgeGroup: memberData.classification.youthAgeGroup,
    email: memberData.contactInfo.email || 'NA',
    contactNumber: memberData.contactInfo.contactNumber || 'NA',
    homeAddress: `${memberData.contactInfo.purokZone}, ${memberData.contactInfo.barangay}, ${memberData.contactInfo.cityMunicipality}, ${memberData.contactInfo.province}`,
    educationalAttainment: memberData.classification.educationalAttainment,
    workStatus: memberData.classification.workStatus,
    isRegisteredVoter: memberData.classification.isRegisteredSKVoter,
    votedLastElection: memberData.classification.votedLastElection,
    attendedKKAssembly: memberData.classification.attendsAssembly,
    assemblyFrequency: assemblyFrequency,
  };
}; 