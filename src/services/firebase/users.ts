import { 
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  Timestamp,
  serverTimestamp
} from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { User } from '@/types/firestore';

const COLLECTION_NAME = 'users';

/**
 * Create a new user in Firestore
 */
export const createUser = async (userData: Omit<User, 'id' | 'createdAt' | 'updatedAt'>, uid: string): Promise<User> => {
  const userRef = doc(db, COLLECTION_NAME, uid);
  
  const newUser: Omit<User, 'id'> = {
    ...userData,
    createdAt: serverTimestamp() as Timestamp,
    updatedAt: serverTimestamp() as Timestamp,
  };
  
  await setDoc(userRef, newUser);
  
  // Return the user with the id
  return {
    id: uid,
    ...newUser
  };
};

/**
 * Get a user by ID
 */
export const getUserById = async (userId: string): Promise<User | null> => {
  const userRef = doc(db, COLLECTION_NAME, userId);
  const userSnap = await getDoc(userRef);
  
  if (userSnap.exists()) {
    return {
      id: userSnap.id,
      ...userSnap.data()
    } as User;
  }
  
  return null;
};

/**
 * Get all users for a specific barangay
 */
export const getUsersByBarangay = async (barangayId: string): Promise<User[]> => {
  const usersQuery = query(
    collection(db, COLLECTION_NAME),
    where('barangayId', '==', barangayId)
  );
  
  const querySnapshot = await getDocs(usersQuery);
  const users: User[] = [];
  
  querySnapshot.forEach((doc) => {
    users.push({
      id: doc.id,
      ...doc.data()
    } as User);
  });
  
  return users;
};

/**
 * Update a user
 */
export const updateUser = async (userId: string, userData: Partial<Omit<User, 'id' | 'createdAt' | 'updatedAt'>>): Promise<void> => {
  const userRef = doc(db, COLLECTION_NAME, userId);
  
  await updateDoc(userRef, {
    ...userData,
    updatedAt: serverTimestamp()
  });
};

/**
 * Delete a user
 */
export const deleteUser = async (userId: string): Promise<void> => {
  const userRef = doc(db, COLLECTION_NAME, userId);
  await deleteDoc(userRef);
}; 