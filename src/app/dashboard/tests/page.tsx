'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TestTube2, History, Leaf } from 'lucide-react';
import { GT_NAMES } from '@/data/gtConstants';
import Image from 'next/image';

export default function TestsPage() {
  const router = useRouter();
  // We'll add history functionality later
  const testHistory: any[] = []; 

  const nextTestIndex = testHistory.length;
  const isExamSeriesComplete = nextTestIndex >= GT_NAMES.length;

  return (
    <div className="container mx-auto p-4 md:p-6 lg:p-8 space-y-8">
      <header className="flex flex-col items-center justify-center text-center space-y-4">
        <div className="p-4 bg-primary/10 rounded-full">
            <Leaf className="h-12 w-12 text-primary" />
        </div>
        <h1 className="text-4xl font-bold font-headline">Garden Tests (GT)</h1>
        <p className="text-lg text-muted-foreground max-w-2xl">
          Challenge your understanding and deepen your knowledge with the Garden Test series. Each test is designed to reinforce your learning and track your progress.
        </p>
      </header>

      <Card className="bg-primary/5 border-primary/20 animate-in fade-in-50 duration-500">
        <CardHeader>
          <div className="flex items-center gap-4">
            <TestTube2 className="h-8 w-8 text-primary" />
            <div>
              <p className="text-sm font-semibold text-primary">UP NEXT</p>
              <CardTitle className="text-2xl font-headline">
                {isExamSeriesComplete ? 'Series Complete!' : `${GT_NAMES[nextTestIndex]} GT`}
              </CardTitle>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-6">
            {isExamSeriesComplete 
              ? "You've conquered this year's challenges. Well done! 🌳" 
              : `Test #${nextTestIndex + 1} of ${GT_NAMES.length} in the series.`}
          </p>
          {!isExamSeriesComplete && (
            <Button 
              size="lg" 
              className="w-full sm:w-auto" 
              onClick={() => router.push(`/dashboard/tests/select-subjects?testIndex=${nextTestIndex}&testName=${GT_NAMES[nextTestIndex]}`)}
            >
              Begin Test <TestTube2 className="ml-2 h-4 w-4" />
            </Button>
          )}
        </CardContent>
      </Card>
      
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <History className="h-6 w-6 text-muted-foreground" />
          <h2 className="text-2xl font-bold font-headline">Test History</h2>
        </div>
        
        {testHistory.length === 0 ? (
          <div className="text-center py-12 border-2 border-dashed rounded-lg">
            <p className="text-muted-foreground">You haven't completed any tests yet.</p>
            <p className="text-sm text-muted-foreground">Your scores will appear here after you finish a test.</p>
          </div>
        ) : (
          <div className="grid gap-4">
            {/* History items would be mapped here */}
          </div>
        )}
      </div>
    </div>
  );
}
