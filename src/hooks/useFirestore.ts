import { useState } from 'react';
import { 
  createNewBarangay, 
  createNewReport, 
  addSingleMember, 
  importMinimalMembers 
} from '@/services/firebase/examples';
import { 
  getReportsByBarangay, 
  getMembersByBarangay, 
  getMembersByReport,
  updateReportStatus,
  deleteReport,
  deleteMember
} from '@/services/firebase';
import { Barangay, Report, Member } from '@/types/firestore';

type FirestoreHookReturn = {
  isLoading: boolean;
  error: string | null;
  success: string | null;
  
  // Report operations
  reports: Report[];
  createReport: (title: string, quarter: 'Q1' | 'Q2' | 'Q3' | 'Q4', year: string, barangayId: string, userId: string) => Promise<Report>;
  fetchReportsByBarangay: (barangayId: string) => Promise<void>;
  submitReport: (reportId: string) => Promise<void>;
  deleteReport: (reportId: string) => Promise<void>;
  
  // Barangay operations
  createBarangay: (name: string, province: string, municipalityCity: string) => Promise<Barangay>;
  
  // Member operations
  members: Member[];
  addMember: (reportId: string, barangayId: string, firstName: string, lastName: string, additionalData?: any) => Promise<Member>;
  importMembers: (reportId: string, barangayId: string, count?: number) => Promise<string[]>;
  fetchMembersByReport: (reportId: string) => Promise<void>;
  fetchMembersByBarangay: (barangayId: string) => Promise<void>;
  deleteMember: (memberId: string) => Promise<void>;
  
  // State helpers
  clearMessages: () => void;
};

export const useFirestore = (): FirestoreHookReturn => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [reports, setReports] = useState<Report[]>([]);
  const [members, setMembers] = useState<Member[]>([]);

  const clearMessages = () => {
    setError(null);
    setSuccess(null);
  };

  const handleError = (err: unknown, operation: string) => {
    const errorMessage = err instanceof Error ? err.message : String(err);
    setError(`Error during ${operation}: ${errorMessage}`);
    console.error(`Error during ${operation}:`, err);
  };

  // Barangay operations
  const createBarangay = async (name: string, province: string, municipalityCity: string): Promise<Barangay> => {
    clearMessages();
    setIsLoading(true);
    
    try {
      const barangay = await createNewBarangay(name, province, municipalityCity);
      setSuccess(`Barangay "${name}" created successfully!`);
      return barangay;
    } catch (err) {
      handleError(err, 'barangay creation');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Report operations
  const createReport = async (
    title: string, 
    quarter: 'Q1' | 'Q2' | 'Q3' | 'Q4', 
    year: string, 
    barangayId: string, 
    userId: string
  ): Promise<Report> => {
    clearMessages();
    setIsLoading(true);
    
    try {
      const report = await createNewReport(title, quarter, year, barangayId, userId);
      setSuccess(`Report "${title}" created successfully!`);
      return report;
    } catch (err) {
      handleError(err, 'report creation');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const fetchReportsByBarangay = async (barangayId: string): Promise<void> => {
    clearMessages();
    setIsLoading(true);
    
    try {
      const fetchedReports = await getReportsByBarangay(barangayId);
      setReports(fetchedReports);
      if (fetchedReports.length > 0) {
        setSuccess(`Found ${fetchedReports.length} reports`);
      } else {
        setSuccess('No reports found for this barangay');
      }
    } catch (err) {
      handleError(err, 'fetching reports');
    } finally {
      setIsLoading(false);
    }
  };

  const submitReport = async (reportId: string): Promise<void> => {
    clearMessages();
    setIsLoading(true);
    
    try {
      await updateReportStatus(reportId, 'submitted');
      setSuccess('Report submitted successfully!');
      
      // Update local reports state
      setReports(prevReports => 
        prevReports.map(report => 
          report.id === reportId 
            ? { ...report, status: 'submitted' } 
            : report
        )
      );
    } catch (err) {
      handleError(err, 'submitting report');
    } finally {
      setIsLoading(false);
    }
  };

  const removeReport = async (reportId: string): Promise<void> => {
    clearMessages();
    setIsLoading(true);
    
    try {
      await deleteReport(reportId);
      setSuccess('Report deleted successfully!');
      
      // Update local reports state
      setReports(prevReports => 
        prevReports.filter(report => report.id !== reportId)
      );
    } catch (err) {
      handleError(err, 'deleting report');
    } finally {
      setIsLoading(false);
    }
  };

  // Member operations
  const addMember = async (
    reportId: string, 
    barangayId: string, 
    firstName: string, 
    lastName: string, 
    additionalData?: any
  ): Promise<Member> => {
    clearMessages();
    setIsLoading(true);
    
    try {
      const member = await addSingleMember(reportId, barangayId, firstName, lastName, additionalData);
      setSuccess(`Member ${firstName} ${lastName} added successfully!`);
      
      // Update members state
      setMembers(prev => [...prev, member]);
      
      return member;
    } catch (err) {
      handleError(err, 'adding member');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const importMembers = async (
    reportId: string, 
    barangayId: string, 
    count: number = 5
  ): Promise<string[]> => {
    clearMessages();
    setIsLoading(true);
    
    try {
      const memberIds = await importMinimalMembers(reportId, barangayId, count);
      setSuccess(`${memberIds.length} members imported successfully!`);
      
      // Refresh members for the report
      await fetchMembersByReport(reportId);
      
      return memberIds;
    } catch (err) {
      handleError(err, 'bulk importing members');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const fetchMembersByReport = async (reportId: string): Promise<void> => {
    clearMessages();
    setIsLoading(true);
    
    try {
      const fetchedMembers = await getMembersByReport(reportId);
      setMembers(fetchedMembers);
      if (fetchedMembers.length > 0) {
        setSuccess(`Found ${fetchedMembers.length} members for this report`);
      } else {
        setSuccess('No members found for this report');
      }
    } catch (err) {
      handleError(err, 'fetching members by report');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchMembersByBarangay = async (barangayId: string): Promise<void> => {
    clearMessages();
    setIsLoading(true);
    
    try {
      const fetchedMembers = await getMembersByBarangay(barangayId);
      setMembers(fetchedMembers);
      if (fetchedMembers.length > 0) {
        setSuccess(`Found ${fetchedMembers.length} members for this barangay`);
      } else {
        setSuccess('No members found for this barangay');
      }
    } catch (err) {
      handleError(err, 'fetching members by barangay');
    } finally {
      setIsLoading(false);
    }
  };

  const removeMember = async (memberId: string): Promise<void> => {
    clearMessages();
    setIsLoading(true);
    
    try {
      await deleteMember(memberId);
      setSuccess('Member deleted successfully!');
      
      // Update local members state
      setMembers(prevMembers => 
        prevMembers.filter(member => member.id !== memberId)
      );
    } catch (err) {
      handleError(err, 'deleting member');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    error,
    success,
    
    reports,
    createReport,
    fetchReportsByBarangay,
    submitReport,
    deleteReport: removeReport,
    
    createBarangay,
    
    members,
    addMember,
    importMembers,
    fetchMembersByReport,
    fetchMembersByBarangay,
    deleteMember: removeMember,
    
    clearMessages
  };
}; 