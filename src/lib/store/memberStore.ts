import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Member } from '@/types/member';
import dummyMembers from '@/data/dummyMembers';

interface MemberState {
  members: Member[];
  isLoading: boolean;
  error: string | null;
  
  // Actions
  fetchMembers: () => Promise<void>;
  addMember: (member: Member) => void;
  updateMember: (id: string, updatedMember: Partial<Member>) => void;
  deleteMember: (id: string) => void;
}

export const useMemberStore = create<MemberState>()(
  persist(
    (set, get) => ({
      members: dummyMembers,
      isLoading: false,
      error: null,

      fetchMembers: async () => {
        set({ isLoading: true, error: null });
        try {
          // In a real app, this would be an API call
          // For now, we'll just use the dummy data
          // const response = await fetch('/api/members');
          // const data = await response.json();
          
          // Simulate API delay
          await new Promise(resolve => setTimeout(resolve, 500));
          
          set({ members: dummyMembers, isLoading: false });
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