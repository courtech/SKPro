import { 
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  Timestamp,
  serverTimestamp
} from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Report } from '@/types/firestore';

const COLLECTION_NAME = 'reports';

/**
 * Create a new report
 */
export const createReport = async (reportData: Omit<Report, 'id' | 'createdAt' | 'updatedAt' | 'version'>): Promise<Report> => {
  const reportsRef = collection(db, COLLECTION_NAME);
  
  const newReport: Omit<Report, 'id'> = {
    ...reportData,
    version: 1,
    createdAt: serverTimestamp() as Timestamp,
    updatedAt: serverTimestamp() as Timestamp,
  };
  
  const docRef = await addDoc(reportsRef, newReport);
  
  // Return the report with the id
  return {
    id: docRef.id,
    ...newReport
  };
};

/**
 * Create a new report with a custom ID
 */
export const createReportWithId = async (reportData: Omit<Report, 'id' | 'createdAt' | 'updatedAt' | 'version'>, reportId: string): Promise<Report> => {
  const reportRef = doc(db, COLLECTION_NAME, reportId);
  
  const newReport: Omit<Report, 'id'> = {
    ...reportData,
    version: 1,
    createdAt: serverTimestamp() as Timestamp,
    updatedAt: serverTimestamp() as Timestamp,
  };
  
  await setDoc(reportRef, newReport);
  
  // Return the report with the id
  return {
    id: reportId,
    ...newReport
  };
};

/**
 * Get a report by ID
 */
export const getReportById = async (reportId: string): Promise<Report | null> => {
  const reportRef = doc(db, COLLECTION_NAME, reportId);
  const reportSnap = await getDoc(reportRef);
  
  if (reportSnap.exists()) {
    return {
      id: reportSnap.id,
      ...reportSnap.data()
    } as Report;
  }
  
  return null;
};

/**
 * Get all reports for a barangay
 */
export const getReportsByBarangay = async (barangayId: string): Promise<Report[]> => {
  const reportsQuery = query(
    collection(db, COLLECTION_NAME),
    where('barangayId', '==', barangayId),
    orderBy('createdAt', 'desc')
  );
  
  const querySnapshot = await getDocs(reportsQuery);
  const reports: Report[] = [];
  
  querySnapshot.forEach((doc) => {
    reports.push({
      id: doc.id,
      ...doc.data()
    } as Report);
  });
  
  return reports;
};

/**
 * Get reports by year and barangay
 */
export const getReportsByYearAndBarangay = async (year: string, barangayId: string): Promise<Report[]> => {
  const reportsQuery = query(
    collection(db, COLLECTION_NAME),
    where('year', '==', year),
    where('barangayId', '==', barangayId)
  );
  
  const querySnapshot = await getDocs(reportsQuery);
  const reports: Report[] = [];
  
  querySnapshot.forEach((doc) => {
    reports.push({
      id: doc.id,
      ...doc.data()
    } as Report);
  });
  
  return reports;
};

/**
 * Get reports by quarter, year and barangay
 */
export const getReportByQuarterYearAndBarangay = async (quarter: string, year: string, barangayId: string): Promise<Report | null> => {
  const reportsQuery = query(
    collection(db, COLLECTION_NAME),
    where('quarter', '==', quarter),
    where('year', '==', year),
    where('barangayId', '==', barangayId),
    limit(1)
  );
  
  const querySnapshot = await getDocs(reportsQuery);
  
  if (!querySnapshot.empty) {
    const doc = querySnapshot.docs[0];
    return {
      id: doc.id,
      ...doc.data()
    } as Report;
  }
  
  return null;
};

/**
 * Update a report
 */
export const updateReport = async (reportId: string, reportData: Partial<Omit<Report, 'id' | 'createdAt' | 'updatedAt' | 'version'>>): Promise<void> => {
  const reportRef = doc(db, COLLECTION_NAME, reportId);
  
  // First get the current report to update the version
  const reportSnap = await getDoc(reportRef);
  if (!reportSnap.exists()) {
    throw new Error(`Report with ID ${reportId} does not exist`);
  }
  
  const currentReport = reportSnap.data() as Report;
  
  await updateDoc(reportRef, {
    ...reportData,
    version: currentReport.version + 1,
    updatedAt: serverTimestamp()
  });
};

/**
 * Update report status
 */
export const updateReportStatus = async (reportId: string, status: Report['status']): Promise<void> => {
  const reportRef = doc(db, COLLECTION_NAME, reportId);
  
  await updateDoc(reportRef, {
    status,
    updatedAt: serverTimestamp()
  });
};

/**
 * Delete a report
 */
export const deleteReport = async (reportId: string): Promise<void> => {
  const reportRef = doc(db, COLLECTION_NAME, reportId);
  await deleteDoc(reportRef);
}; 