'use client';

import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Home, Trophy } from 'lucide-react';
import { CircularProgress } from '@/components/ui/circular-progress';

export default function TestResultsPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const score = parseInt(searchParams.get('score') || '0', 10);
    const total = parseInt(searchParams.get('total') || '0', 10);

    const percentage = total > 0 ? (score / total) * 100 : 0;
    
    const getFeedback = () => {
        if (percentage >= 90) return { title: 'Excellent Work!', message: 'You have a strong grasp of the material.', icon: <Trophy className="h-16 w-16 text-yellow-500" />};
        if (percentage >= 70) return { title: 'Great Job!', message: 'You are doing well. Keep up the good work!', icon: <CheckCircle className="h-16 w-16 text-green-500" />};
        return { title: 'Keep Practicing', message: "Don't give up! Review the material and try again.", icon: <CheckCircle className="h-16 w-16 text-blue-500" />};
    }
    
    const feedback = getFeedback();

    return (
        <div className="flex min-h-screen items-center justify-center bg-muted/40 p-4">
            <Card className="w-full max-w-md text-center animate-in fade-in-50 duration-500">
                <CardHeader>
                    <div className="mx-auto mb-4">{feedback.icon}</div>
                    <CardTitle className="text-3xl font-headline">{feedback.title}</CardTitle>
                    <CardDescription className="text-lg">{feedback.message}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="flex items-center justify-center space-x-4">
                         <CircularProgress value={percentage} size={120} strokeWidth={10} />
                         <div className="text-left">
                            <p className="text-4xl font-bold">{score}<span className="text-2xl text-muted-foreground">/{total}</span></p>
                            <p className="text-muted-foreground">Correct Answers</p>
                         </div>
                    </div>
                    <Button onClick={() => router.replace('/dashboard')} className="w-full" size="lg">
                        <Home className="mr-2 h-4 w-4" /> Go to Dashboard
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}
