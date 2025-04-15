import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { getReportsByBarangay, getReportById } from '@/services/firebase/reports';
import { Report } from '@/types/firestore';

interface ReportState {
  reports: Report[];
  currentReport: Report | null;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  fetchReports: (barangayId: string) => Promise<void>;
  fetchReportById: (reportId: string) => Promise<void>;
  resetCurrentReport: () => void;
}

export const useReportStore = create<ReportState>()(
  persist(
    (set, get) => ({
      reports: [],
      currentReport: null,
      isLoading: false,
      error: null,

      fetchReports: async (barangayId: string) => {
        set({ isLoading: true, error: null });
        try {
          const firestoreReports = await getReportsByBarangay(barangayId);
          set({ reports: firestoreReports, isLoading: false });
        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : 'Failed to fetch reports', 
            isLoading: false 
          });
        }
      },
      
      fetchReportById: async (reportId: string) => {
        set({ isLoading: true, error: null });
        try {
          const report = await getReportById(reportId);
          set({ currentReport: report, isLoading: false });
        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : 'Failed to fetch report', 
            isLoading: false 
          });
        }
      },
      
      resetCurrentReport: () => {
        set({ currentReport: null });
      },
    }),
    {
      name: 'report-storage',
    }
  )
); 