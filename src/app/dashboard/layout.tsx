'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { BookOpen, Home, Brain, LogOut, User, Users, Bot, Calendar, TestTube2, Settings } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
  SidebarInset,
} from '@/components/ui/sidebar';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Skeleton } from '@/components/ui/skeleton';
import Image from 'next/image';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, profile, loading, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  React.useEffect(() => {
    if (!loading && !user) {
      router.replace('/login');
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return (
      <div className="flex h-screen w-screen items-center justify-center">
        <div className="flex items-center space-x-4">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
        </div>
      </div>
    );
  }

  const navItems = [
    { href: '/dashboard', label: 'Home', icon: Home },
    // { href: '/dashboard/library', label: 'Library', icon: BookOpen },
    // { href: '/dashboard/studies', label: 'My Studies', icon: Brain },
    // { href: '/dashboard/timetable', label: 'Timetable', icon: Calendar },
    // { href: '/dashboard/tests', label: 'Tests', icon: TestTube2 },
    // { href: '/dashboard/ai-chat', label: 'Garden AI', icon: Bot },
  ];

  if (profile?.role === 'teacher') {
    // navItems.push({ href: '/dashboard/teacher-tool', label: 'Teaching Tool', icon: Users });
  }

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  }

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <div className="flex items-center gap-2">
            <Image src="/logo.png" alt="Garden Logo" width={28} height={28} />
            <h2 className="text-xl font-headline font-semibold group-data-[collapsible=icon]:hidden">
              Garden
            </h2>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            {navItems.map(item => (
              <SidebarMenuItem key={item.href}>
                <Link href={item.href}>
                  <SidebarMenuButton
                    isActive={pathname === item.href}
                    tooltip={{ children: item.label, side: 'right' }}
                  >
                    <item.icon />
                    <span>{item.label}</span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
                <SidebarMenuButton onClick={logout} tooltip={{children: 'Logout', side: 'right'}}>
                  <LogOut />
                  <span>Logout</span>
                </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
               <SidebarMenuButton>
                  <Avatar className="h-8 w-8">
                      <AvatarImage src={profile?.profilePicture ?? undefined} alt={profile?.fullName ?? 'User'} />
                      <AvatarFallback>{profile?.fullName ? getInitials(profile.fullName) : <User />}</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col text-left group-data-[collapsible=icon]:hidden">
                      <span className="text-sm font-semibold">{profile?.fullName}</span>
                      <span className="text-xs text-muted-foreground">{profile?.role}</span>
                  </div>
               </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
          <header className="flex h-14 items-center justify-between border-b bg-background/80 px-4 backdrop-blur-sm md:justify-end">
            <SidebarTrigger className="md:hidden" />
            <div className="font-headline text-lg font-semibold">
              {navItems.find(item => pathname.startsWith(item.href))?.label || 'Dashboard'}
            </div>
          </header>
          <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
            {children}
          </main>
        </SidebarInset>
    </SidebarProvider>
  );
}
