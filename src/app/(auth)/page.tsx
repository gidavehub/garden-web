'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import Image from 'next/image';

export default function Home() {
  const { user, profile, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (user) {
        if (profile) {
          router.replace('/dashboard');
        } else {
          router.replace('/onboarding');
        }
      } else {
        router.replace('/login');
      }
    }
  }, [user, profile, loading, router]);

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-background">
      <Image 
        src="/logo.png" 
        alt="Garden Logo"
        width={96}
        height={96}
        className="animate-spin"
        style={{animationDuration: '3s'}}
      />
    </div>
  );
}
