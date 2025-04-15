"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

interface SKInfo {
  region: string;
  province: string;
  municipality: string;
  officialBarangayName: string;
}

interface UserData {
  email: string | null;
  skInfo: SKInfo;
  role: string;
  createdAt: Date;
}

export function useUserData() {
  const { user } = useAuth();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!user) {
        setUserData(null);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        
        const userDocRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userDocRef);
        
        if (userDoc.exists()) {
          const data = userDoc.data() as Omit<UserData, 'createdAt'> & { createdAt: any };
          
          // Convert Firestore timestamp to Date
          const userData: UserData = {
            ...data,
            email: user.email,
            createdAt: data.createdAt?.toDate() || new Date(),
            // Ensure skInfo has the correct structure
            skInfo: {
              region: data.skInfo?.region || "",
              province: data.skInfo?.province || "",
              municipality: data.skInfo?.municipality || "",
              officialBarangayName: data.skInfo?.officialBarangayName || ""
            }
          };
          
          setUserData(userData);
        } else {
          // If the user document doesn't exist, set basic userData
          setUserData({
            email: user.email,
            skInfo: {
              region: "",
              province: "",
              municipality: "",
              officialBarangayName: ""
            },
            role: "User",
            createdAt: new Date()
          });
        }
      } catch (err) {
        console.error("Error fetching user data:", err);
        setError("Failed to load user data");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [user]);

  return { userData, loading, error };
} 