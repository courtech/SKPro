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
  serverTimestamp,
  increment,
  runTransaction
} from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Member } from '@/types/firestore';

const COLLECTION_NAME = 'members';
const REPORTS_COLLECTION = 'reports';

/**
 * Create a new member
 */
export const createMember = async (memberData: Omit<Member, 'id' | 'createdAt' | 'updatedAt'>): Promise<Member> => {
  const membersRef = collection(db, COLLECTION_NAME);
  
  const newMember: Omit<Member, 'id'> = {
    ...memberData,
    createdAt: serverTimestamp() as Timestamp,
    updatedAt: serverTimestamp() as Timestamp,
  };
  
  const docRef = await addDoc(membersRef, newMember);
  
  // Update the member count in the report if a reportId is provided
  if (memberData.reportId) {
    const reportRef = doc(db, REPORTS_COLLECTION, memberData.reportId);
    await updateDoc(reportRef, {
      memberCount: increment(1),
      updatedAt: serverTimestamp()
    });
  }
  
  // Return the member with the id
  return {
    id: docRef.id,
    ...newMember
  };
};

/**
 * Create a new member with a custom ID
 */
export const createMemberWithId = async (memberData: Omit<Member, 'id' | 'createdAt' | 'updatedAt'>, memberId: string): Promise<Member> => {
  const memberRef = doc(db, COLLECTION_NAME, memberId);
  
  const newMember: Omit<Member, 'id'> = {
    ...memberData,
    createdAt: serverTimestamp() as Timestamp,
    updatedAt: serverTimestamp() as Timestamp,
  };
  
  await setDoc(memberRef, newMember);
  
  // Update the member count in the report if a reportId is provided
  if (memberData.reportId) {
    const reportRef = doc(db, REPORTS_COLLECTION, memberData.reportId);
    await updateDoc(reportRef, {
      memberCount: increment(1),
      updatedAt: serverTimestamp()
    });
  }
  
  // Return the member with the id
  return {
    id: memberId,
    ...newMember
  };
};

/**
 * Get a member by ID
 */
export const getMemberById = async (memberId: string): Promise<Member | null> => {
  const memberRef = doc(db, COLLECTION_NAME, memberId);
  const memberSnap = await getDoc(memberRef);
  
  if (memberSnap.exists()) {
    return {
      id: memberSnap.id,
      ...memberSnap.data()
    } as Member;
  }
  
  return null;
};

/**
 * Get all members for a barangay
 */
export const getMembersByBarangay = async (barangayId: string): Promise<Member[]> => {
  const membersQuery = query(
    collection(db, COLLECTION_NAME),
    where('barangayId', '==', barangayId),
    orderBy('lastName'),
    orderBy('firstName')
  );
  
  const querySnapshot = await getDocs(membersQuery);
  const members: Member[] = [];
  
  querySnapshot.forEach((doc) => {
    members.push({
      id: doc.id,
      ...doc.data()
    } as Member);
  });
  
  return members;
};

/**
 * Get all members for a report
 */
export const getMembersByReport = async (reportId: string): Promise<Member[]> => {
  const membersQuery = query(
    collection(db, COLLECTION_NAME),
    where('reportId', '==', reportId),
    orderBy('lastName'),
    orderBy('firstName')
  );
  
  const querySnapshot = await getDocs(membersQuery);
  const members: Member[] = [];
  
  querySnapshot.forEach((doc) => {
    members.push({
      id: doc.id,
      ...doc.data()
    } as Member);
  });
  
  return members;
};

/**
 * Search members by name in a barangay
 */
export const searchMembersByName = async (barangayId: string, name: string): Promise<Member[]> => {
  // Firestore doesn't support case-insensitive or partial string search directly
  // For a real app, consider using a third-party search solution like Algolia
  // This is a simplified implementation that requires exact match with the beginning of lastName
  const membersQuery = query(
    collection(db, COLLECTION_NAME),
    where('barangayId', '==', barangayId),
    // This assumes that the search term starts with the last name
    // A proper implementation would use a search service
    where('lastName', '>=', name),
    where('lastName', '<=', name + '\uf8ff'),
    limit(20)
  );
  
  const querySnapshot = await getDocs(membersQuery);
  const members: Member[] = [];
  
  querySnapshot.forEach((doc) => {
    members.push({
      id: doc.id,
      ...doc.data()
    } as Member);
  });
  
  return members;
};

/**
 * Update a member
 */
export const updateMember = async (memberId: string, memberData: Partial<Omit<Member, 'id' | 'createdAt' | 'updatedAt'>>): Promise<void> => {
  const memberRef = doc(db, COLLECTION_NAME, memberId);
  
  await updateDoc(memberRef, {
    ...memberData,
    updatedAt: serverTimestamp()
  });
};

/**
 * Delete a member
 */
export const deleteMember = async (memberId: string): Promise<void> => {
  await runTransaction(db, async (transaction) => {
    const memberRef = doc(db, COLLECTION_NAME, memberId);
    const memberSnap = await transaction.get(memberRef);
    
    if (!memberSnap.exists()) {
      throw new Error(`Member with ID ${memberId} does not exist`);
    }
    
    const memberData = memberSnap.data() as Member;
    
    // Decrement the report's member count if this member is linked to a report
    if (memberData.reportId) {
      const reportRef = doc(db, REPORTS_COLLECTION, memberData.reportId);
      transaction.update(reportRef, {
        memberCount: increment(-1),
        updatedAt: serverTimestamp()
      });
    }
    
    // Delete the member
    transaction.delete(memberRef);
  });
};

/**
 * Bulk import members for a report
 */
export const bulkImportMembers = async (
  reportId: string,
  barangayId: string,
  members: Omit<Member, 'id' | 'createdAt' | 'updatedAt' | 'reportId' | 'barangayId'>[]
): Promise<string[]> => {
  const memberIds: string[] = [];
  let batch = [];
  
  // Process in batches of up to 100 (Firestore limit)
  for (const member of members) {
    batch.push(member);
    
    if (batch.length === 100) {
      const batchIds = await processMemberBatch(reportId, barangayId, batch);
      memberIds.push(...batchIds);
      batch = [];
    }
  }
  
  // Process any remaining members
  if (batch.length > 0) {
    const batchIds = await processMemberBatch(reportId, barangayId, batch);
    memberIds.push(...batchIds);
  }
  
  // Update the report's member count
  const reportRef = doc(db, REPORTS_COLLECTION, reportId);
  await updateDoc(reportRef, {
    memberCount: members.length,
    updatedAt: serverTimestamp()
  });
  
  return memberIds;
};

/**
 * Process a batch of members for bulk import (helper function)
 */
const processMemberBatch = async (
  reportId: string,
  barangayId: string,
  members: Omit<Member, 'id' | 'createdAt' | 'updatedAt' | 'reportId' | 'barangayId'>[]
): Promise<string[]> => {
  const memberIds: string[] = [];
  
  await runTransaction(db, async (transaction) => {
    for (const member of members) {
      const membersRef = collection(db, COLLECTION_NAME);
      const newMemberRef = doc(membersRef);
      
      const newMember: Omit<Member, 'id'> = {
        ...member,
        reportId,
        barangayId,
        createdAt: serverTimestamp() as Timestamp,
        updatedAt: serverTimestamp() as Timestamp,
      };
      
      transaction.set(newMemberRef, newMember);
      memberIds.push(newMemberRef.id);
    }
  });
  
  return memberIds;
}; 