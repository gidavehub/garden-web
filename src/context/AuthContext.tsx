'use client';

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User, onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, getDoc, onSnapshot } from 'firebase/firestore';
import { auth, firestore } from '@/lib/firebase';
import { useRouter } from 'next/navigation';

interface Profile {
  role: 'student' | 'teacher';
  fullName: string;
  profilePicture?: string;
  [key: string]: any;
}

interface AuthContextType {
  user: User | null;
  profile: Profile | null;
  loading: boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  profile: null,
  loading: true,
  logout: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user && user.email) {
        setUser(user);
        const profileRef = doc(firestore, 'users', user.email, 'profile', 'details');
        const unsubProfile = onSnapshot(profileRef, (docSnap) => {
            if (docSnap.exists()) {
                setProfile(docSnap.data() as Profile);
            } else {
                setProfile(null);
            }
            setLoading(false);
        });
        return () => unsubProfile();
      } else {
        setUser(null);
        setProfile(null);
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const logout = async () => {
    await signOut(auth);
    router.push('/login');
  };

  const value = { user, profile, loading, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
