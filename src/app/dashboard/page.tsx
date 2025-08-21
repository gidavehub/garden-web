'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpen, Calendar, Brain, TestTube2, Bot, Leaf, Settings } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import Image from 'next/image';

export default function DashboardPage() {
  const router = useRouter();
  const { profile } = useAuth();

  const libraryData = [
    { id: '1', title: 'Financial Accounting', cover: 'https://placehold.co/200x280.png', hint: 'accounting book' },
    { id: '2', title: 'Calculus I', cover: 'https://placehold.co/200x280.png', hint: 'calculus textbook' },
    { id: '3', title: 'Intro to Physics', cover: 'https://placehold.co/200x280.png', hint: 'physics textbook' },
    { id: '4', title: 'World History', cover: 'https://placehold.co/200x280.png', hint: 'history book' },
  ]

  return (
    <div className="space-y-8">
      <header className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Leaf className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-headline font-bold text-foreground">Dashboard</h1>
        </div>
        <Button variant="ghost" size="icon">
          <Settings className="h-6 w-6" />
        </Button>
      </header>
      
      {/* Performance Section Placeholder */}
      <Card className="animate-in fade-in-50 delay-150">
        <CardHeader>
            <CardTitle>Your Performance</CardTitle>
            <CardDescription>A brief overview of your recent progress.</CardDescription>
        </CardHeader>
        <CardContent>
            <div className="text-center text-muted-foreground">Performance chart will be displayed here.</div>
        </CardContent>
      </Card>

      <div className="space-y-6">
        {/* Library Section */}
        <section>
          <div className="flex items-center gap-4 mb-4">
             <BookOpen className="h-7 w-7 text-primary" />
             <h2 className="text-2xl font-headline font-bold">Library</h2>
          </div>
          <Card>
            <CardContent className="pt-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {libraryData.map(item => (
                  <div key={item.id} className="group cursor-pointer" onClick={() => router.push('/dashboard/library')}>
                    <div className="overflow-hidden rounded-lg">
                      <Image src={item.cover} alt={item.title} width={200} height={280} data-ai-hint={item.hint} className="w-full aspect-[2/3] object-cover transition-transform group-hover:scale-105" />
                    </div>
                    <h3 className="mt-2 font-semibold text-sm truncate">{item.title}</h3>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Garden Materials Section */}
        <section>
           <div className="flex items-center gap-4 mb-4">
             <Leaf className="h-7 w-7 text-primary" />
             <h2 className="text-2xl font-headline font-bold">Garden Materials</h2>
          </div>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="hover:border-primary transition-colors cursor-pointer" onClick={() => router.push('/dashboard/timetable')}>
                <CardHeader className="flex-row items-center gap-4">
                  <div className="bg-primary/10 p-3 rounded-full"><Calendar className="h-6 w-6 text-primary" /></div>
                  <div>
                    <CardTitle>School Timetable</CardTitle>
                    <CardDescription>View your weekly schedule.</CardDescription>
                  </div>
                </CardHeader>
              </Card>
              <Card className="hover:border-primary transition-colors cursor-pointer" onClick={() => router.push('/dashboard/studies')}>
                 <CardHeader className="flex-row items-center gap-4">
                  <div className="bg-primary/10 p-3 rounded-full"><Brain className="h-6 w-6 text-primary" /></div>
                  <div>
                    <CardTitle>My Studies</CardTitle>
                    <CardDescription>Manage your study plans.</CardDescription>
                  </div>
                </CardHeader>
              </Card>
            </div>
        </section>
        
        {/* Garden Test & AI Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
                <CardHeader>
                    <div className="flex items-center gap-4 mb-2">
                        <TestTube2 className="h-7 w-7 text-primary" />
                        <CardTitle>Garden Test (GT)</CardTitle>
                    </div>
                    <CardDescription>Test your knowledge to deepen your roots.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Button onClick={() => router.push('/dashboard/tests')} className="w-full">
                        <TestTube2 className="mr-2" /> Take a Test
                    </Button>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <div className="flex items-center gap-4 mb-2">
                       <Bot className="h-7 w-7 text-primary" />
                        <CardTitle>Garden AI</CardTitle>
                    </div>
                    <CardDescription>Get instant answers and explanations.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Button onClick={() => router.push('/dashboard/ai-chat')} className="w-full">
                        <Bot className="mr-2" /> Ask GAI
                    </Button>
                </CardContent>
            </Card>
        </div>

      </div>
    </div>
  );
}
