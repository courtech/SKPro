import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Member, convertToLegacyMember } from '@/types/member';
import { getMembersByBarangay } from '@/services/firebase/members';

interface MemberState {
  members: Member[];
  isLoading: boolean;
  error: string | null;
  
  // Actions
  fetchMembers: (barangayId: string) => Promise<void>;
  addMember: (member: Member) => void;
  updateMember: (id: string, updatedMember: Partial<Member>) => void;
  deleteMember: (id: string) => void;
}

export const useMemberStore = create<MemberState>()(
  persist(
    (set, get) => ({
      members: [], // Initialize with empty array instead of mock data
      isLoading: false,
      error: null,

      fetchMembers: async (barangayId: string) => {
        set({ isLoading: true, error: null });
        try {
          // Use the Firebase service to fetch members from Firestore
          // using the provided barangayId
          if (!barangayId) {
            throw new Error('No barangay ID provided');
          }
          
          const firestoreMembers = await getMembersByBarangay(barangayId);
          
          // Convert Firestore members to the legacy format expected by the UI
          const legacyMembers = firestoreMembers.map(convertToLegacyMember);
          
          set({ members: legacyMembers, isLoading: false });
        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : 'Failed to fetch members', 
            isLoading: false 
          });
        }
      },
      
      addMember: (member: Member) => {
        set((state) => ({
          members: [...state.members, member]
        }));
      },
      
      updateMember: (id: string, updatedMember: Partial<Member>) => {
        set((state) => ({
          members: state.members.map((member) => 
            member.id === id ? { ...member, ...updatedMember } : member
          )
        }));
      },
      
      deleteMember: (id: string) => {
        set((state) => ({
          members: state.members.filter((member) => member.id !== id)
        }));
      },
    }),
    {
      name: 'member-storage', // Name for the persisted state in localStorage
    }
  )
); 