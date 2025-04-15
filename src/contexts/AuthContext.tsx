"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { User, onAuthStateChanged, signOut as firebaseSignOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/firebase";
import { getBarangayById } from '@/services/firebase/barangays';
import { Barangay } from '@/types/firestore';

interface AuthContextType {
  user: User | null;
  barangayId: string | null;
  barangay: Barangay | null;
  isLoading: boolean;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  barangayId: null,
  barangay: null,
  isLoading: true,
  logout: async () => {},
});

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [barangayId, setBarangayId] = useState<string | null>(null);
  const [barangay, setBarangay] = useState<Barangay | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Set up the Firebase auth state observer
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      
      // For now, use a default barangay ID
      // In a real implementation, this would come from the user's claims or profile
      if (user) {
        // This is a placeholder - in a real app, you would get this from user metadata
        const userBarangayId = 'default'; 
        setBarangayId(userBarangayId);
        
        try {
          const barangayData = await getBarangayById(userBarangayId);
          setBarangay(barangayData);
        } catch (error) {
          console.error('Error fetching barangay:', error);
        }
      } else {
        setBarangayId(null);
        setBarangay(null);
      }
      
      setIsLoading(false);
    });

    // Clean up observer on unmount
    return () => unsubscribe();
  }, []);

  const logout = async () => {
    try {
      await firebaseSignOut(auth);
      router.push("/auth/login");
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const value = {
    user,
    barangayId,
    barangay,
    isLoading,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
} 