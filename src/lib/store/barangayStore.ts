import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { getBarangayById } from '@/services/firebase/barangays';
import { Barangay } from '@/types/firestore';

interface BarangayState {
  currentBarangay: Barangay | null;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  fetchBarangay: (barangayId: string) => Promise<void>;
  clearBarangay: () => void;
}

export const useBarangayStore = create<BarangayState>()(
  persist(
    (set) => ({
      currentBarangay: null,
      isLoading: false,
      error: null,

      fetchBarangay: async (barangayId: string) => {
        set({ isLoading: true, error: null });
        try {
          const barangay = await getBarangayById(barangayId);
          set({ currentBarangay: barangay, isLoading: false });
        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : 'Failed to fetch barangay', 
            isLoading: false 
          });
        }
      },
      
      clearBarangay: () => {
        set({ currentBarangay: null });
      },
    }),
    {
      name: 'barangay-storage',
    }
  )
); 