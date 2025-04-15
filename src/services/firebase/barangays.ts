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
  Timestamp,
  serverTimestamp
} from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Barangay } from '@/types/firestore';

const COLLECTION_NAME = 'barangays';

/**
 * Create a new barangay
 */
export const createBarangay = async (barangayData: Omit<Barangay, 'id' | 'createdAt' | 'updatedAt'>): Promise<Barangay> => {
  const barangayRef = collection(db, COLLECTION_NAME);
  
  const newBarangay: Omit<Barangay, 'id'> = {
    ...barangayData,
    createdAt: serverTimestamp() as Timestamp,
    updatedAt: serverTimestamp() as Timestamp,
  };
  
  const docRef = await addDoc(barangayRef, newBarangay);
  
  // Return the barangay with the id
  return {
    id: docRef.id,
    ...newBarangay
  };
};

/**
 * Create a new barangay with a custom ID
 */
export const createBarangayWithId = async (barangayData: Omit<Barangay, 'id' | 'createdAt' | 'updatedAt'>, barangayId: string): Promise<Barangay> => {
  const barangayRef = doc(db, COLLECTION_NAME, barangayId);
  
  const newBarangay: Omit<Barangay, 'id'> = {
    ...barangayData,
    createdAt: serverTimestamp() as Timestamp,
    updatedAt: serverTimestamp() as Timestamp,
  };
  
  await setDoc(barangayRef, newBarangay);
  
  // Return the barangay with the id
  return {
    id: barangayId,
    ...newBarangay
  };
};

/**
 * Get a barangay by ID
 */
export const getBarangayById = async (barangayId: string): Promise<Barangay | null> => {
  const barangayRef = doc(db, COLLECTION_NAME, barangayId);
  const barangaySnap = await getDoc(barangayRef);
  
  if (barangaySnap.exists()) {
    return {
      id: barangaySnap.id,
      ...barangaySnap.data()
    } as Barangay;
  }
  
  return null;
};

/**
 * Get all barangays
 */
export const getAllBarangays = async (): Promise<Barangay[]> => {
  const barangaysSnapshot = await getDocs(collection(db, COLLECTION_NAME));
  const barangays: Barangay[] = [];
  
  barangaysSnapshot.forEach((doc) => {
    barangays.push({
      id: doc.id,
      ...doc.data()
    } as Barangay);
  });
  
  return barangays;
};

/**
 * Get barangays by province
 */
export const getBarangaysByProvince = async (province: string): Promise<Barangay[]> => {
  const barangaysQuery = query(
    collection(db, COLLECTION_NAME),
    where('province', '==', province)
  );
  
  const querySnapshot = await getDocs(barangaysQuery);
  const barangays: Barangay[] = [];
  
  querySnapshot.forEach((doc) => {
    barangays.push({
      id: doc.id,
      ...doc.data()
    } as Barangay);
  });
  
  return barangays;
};

/**
 * Update a barangay
 */
export const updateBarangay = async (barangayId: string, barangayData: Partial<Omit<Barangay, 'id' | 'createdAt' | 'updatedAt'>>): Promise<void> => {
  const barangayRef = doc(db, COLLECTION_NAME, barangayId);
  
  await updateDoc(barangayRef, {
    ...barangayData,
    updatedAt: serverTimestamp()
  });
};

/**
 * Delete a barangay
 */
export const deleteBarangay = async (barangayId: string): Promise<void> => {
  const barangayRef = doc(db, COLLECTION_NAME, barangayId);
  await deleteDoc(barangayRef);
}; 