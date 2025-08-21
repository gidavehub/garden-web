'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpen, Calendar, Brain, TestTube2, Bot } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export default function GardenScreen() {
  const router = useRouter();
  const { profile } = useAuth();

  return (
    <div className="flex flex-col gap-8">
        <div className="flex flex-col space-y-2">
            <h1 className="text-4xl font-headline font-bold text-gradient animate-in fade-in-50">
                Your Learning Garden
            </h1>
            <p className="text-lg text-muted-foreground animate-in fade-in-50 delay-150">
                All your tools and materials in one place.
            </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Library */}
            <Card className="animate-in fade-in-50 delay-300">
                <CardHeader>
                    <div className="flex items-center gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                            <BookOpen className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                            <CardTitle>Library</CardTitle>
                            <CardDescription>Browse textbooks & materials</CardDescription>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <Button onClick={() => router.push('/dashboard/library')} className="w-full">Go to Library</Button>
                </CardContent>
            </Card>

            {/* Garden Materials */}
            <Card className="animate-in fade-in-50 delay-400">
                 <CardHeader>
                    <div className="flex items-center gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                            <Calendar className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                            <CardTitle>Garden Materials</CardTitle>
                            <CardDescription>Timetable & Study Plans</CardDescription>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="flex flex-col gap-2">
                    <Button variant="outline" onClick={() => router.push('/dashboard/timetable')}>School Timetable</Button>
                    <Button variant="outline" onClick={() => router.push('/dashboard/studies')}>My Studies</Button>
                </CardContent>
            </Card>

            {/* Garden Test */}
            <Card className="animate-in fade-in-50 delay-500">
                <CardHeader>
                     <div className="flex items-center gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                            <TestTube2 className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                            <CardTitle>Garden Test (GT)</CardTitle>
                            <CardDescription>Assess your knowledge</CardDescription>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <Button onClick={() => router.push('/dashboard/tests')} className="w-full">Take a Test</Button>
                </CardContent>
            </Card>
            
            {/* Garden AI */}
             <Card className="animate-in fade-in-50 delay-600">
                <CardHeader>
                    <div className="flex items-center gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                            <Bot className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                            <CardTitle>Garden AI</CardTitle>
                            <CardDescription>Your AI study assistant</CardDescription>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <Button onClick={() => router.push('/dashboard/ai-chat')} className="w-full">Ask GAI</Button>
                </CardContent>
            </Card>
        </div>
    </div>
  );
}
