import { Member } from "@/types/member";
import dummyMembers from "@/data/dummyMembers";

// Functions to get member data (will be replaced with API calls later)
export const getAllMembers = async (): Promise<Member[]> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return dummyMembers;
};

export const getMemberById = async (id: string): Promise<Member | undefined> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 300));
  return dummyMembers.find(member => member.id === id);
};

export const searchMembers = async (query: string): Promise<Member[]> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 400));
  
  const lowercaseQuery = query.toLowerCase();
  return dummyMembers.filter(member => 
    member.name.toLowerCase().includes(lowercaseQuery) ||
    member.id.toLowerCase().includes(lowercaseQuery) ||
    member.homeAddress.toLowerCase().includes(lowercaseQuery)
  );
};

export const filterMembers = async (filters: {
  youthClassification?: string;
  sex?: string;
  barangay?: string;
  ageGroup?: string;
  isRegisteredVoter?: boolean;
  attendedKKAssembly?: boolean;
}): Promise<Member[]> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 400));
  
  return dummyMembers.filter(member => {
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
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 600));
  
  // In a real implementation, this would make an API call to update the member
  // For now, let's just return the updated member
  return {
    ...updatedMember,
    // Update any other fields as needed
  };
};

export const createMember = async (newMember: Omit<Member, 'id'>): Promise<Member> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // In a real implementation, this would make an API call to create the member
  // Generate an ID for the new member (this would be done server-side)
  const id = `KK${Math.floor(1000 + Math.random() * 9000)}`;
  
  return {
    id,
    ...newMember,
  };
}; 