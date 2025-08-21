'use client';

import React, { useState, useMemo } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, AlertCircle, ArrowRight } from 'lucide-react';
import { ALL_GTS } from '@/data/allGTs';
import { getTextbookById } from '@/data/allTextbooks';
import { EASY_QUESTIONS_PER_TEST, HARD_QUESTIONS_PER_TEST } from '@/data/gtConstants';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

// Basic shuffle function
function shuffle<T>(arr: T[]): T[] {
  let a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function GTSubjectSelectorPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();

  const testIndex = parseInt(searchParams.get('testIndex') || '0', 10);
  const testName = searchParams.get('testName') || 'Test';
  const grade = 10; // Assuming a fixed grade for now

  // Default 'maths' and 'english' to be selected
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>(['maths', 'english']);

  const canStart = useMemo(() => selectedSubjects.includes('maths') && selectedSubjects.includes('english') && selectedSubjects.length >= 5, [selectedSubjects]);
  
  const orderedGts = useMemo(() => [
    ...ALL_GTS.filter(s => s.id === 'maths' || s.id === 'english'),
    ...ALL_GTS.filter(s => s.id !== 'maths' && s.id !== 'english')
  ], []);

  const toggleSubject = (id: string) => {
    if ((id === 'maths' || id === 'english') && selectedSubjects.includes(id)) {
        toast({
            variant: "destructive",
            title: "Required Subject",
            description: "Mathematics and English are mandatory subjects.",
        })
      return;
    }
    setSelectedSubjects(prev => 
      prev.includes(id) 
        ? prev.filter(i => i !== id) 
        : [...prev, id]
    );
  };
  
  const startGT = () => {
    if (!canStart) {
        toast({
            variant: "destructive",
            title: "Selection Required",
            description: "Please choose 5 or more subjects, including Mathematics and English.",
        })
      return;
    }

    const structuredExam = selectedSubjects.map(subjectId => {
      const gtSet = ALL_GTS.find(gt => gt.id === subjectId);
      const textbook = getTextbookById(subjectId);
      if (!gtSet || !textbook) return null;

      const easyStart = testIndex * EASY_QUESTIONS_PER_TEST;
      const hardStart = testIndex * HARD_QUESTIONS_PER_TEST;
      const easyEnd = easyStart + EASY_QUESTIONS_PER_TEST;
      const hardEnd = hardStart + HARD_QUESTIONS_PER_TEST;

      const easyPool = gtSet.easy.filter(q => q.grade === grade);
      const hardPool = gtSet.hard.filter(q => q.grade === grade);

      if (easyPool.length < easyEnd || hardPool.length < hardEnd) {
        toast({
            variant: "destructive",
            title: "Content Error",
            description: `Not enough questions in "${gtSet.name}" for this test.`,
        });
        return 'error';
      }

      return {
        subjectId: gtSet.id,
        subjectName: gtSet.name,
        coverImage: textbook.coverImage, 
        questions: [
            ...shuffle(easyPool.slice(easyStart, easyEnd)),
            ...shuffle(hardPool.slice(hardStart, hardEnd)),
        ],
        sectionType: "Mixed"
      };
    }).filter(item => item !== null);

    if (structuredExam.some(item => item === 'error')) return;

    const totalQuestions = (EASY_QUESTIONS_PER_TEST + HARD_QUESTIONS_PER_TEST) * selectedSubjects.length;
    const examDurationMinutes = Math.round(totalQuestions * 1.5);

    router.push(`/dashboard/tests/live?exam=${encodeURIComponent(JSON.stringify(structuredExam))}&timeLimit=${examDurationMinutes}`);
  };

  return (
    <div className="container mx-auto p-4 md:p-8">
      <header className="text-center mb-8">
        <h1 className="text-3xl font-bold font-headline">{testName} GT</h1>
        <p className="text-muted-foreground">Select 5 or more subjects to begin</p>
      </header>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-8">
        {orderedGts.map(gt => {
          const textbook = getTextbookById(gt.id);
          const isSelected = selectedSubjects.includes(gt.id);
          return (
            <Card
              key={gt.id}
              onClick={() => toggleSubject(gt.id)}
              className={`overflow-hidden cursor-pointer transition-all duration-200 ${isSelected ? 'border-primary ring-2 ring-primary' : 'border-border'}`}
            >
              <div className="relative">
                <Image 
                    src={textbook?.coverImage || ''} 
                    alt={gt.name} 
                    width={200} height={280} 
                    className="aspect-[3/4] w-full object-cover" 
                />
                <div className={`absolute inset-0 bg-black/40 transition-opacity ${isSelected ? 'opacity-100' : 'opacity-0'}`} />
                {isSelected && (
                    <div className="absolute inset-0 flex items-center justify-center">
                        <CheckCircle className="h-12 w-12 text-white/90" />
                    </div>
                )}
                 {(gt.id === 'maths' || gt.id === 'english') && (
                    <div className="absolute top-2 left-2 bg-primary text-primary-foreground text-xs font-bold px-2 py-1 rounded-full">
                        Required
                    </div>
                 )}
              </div>
              <div className="p-3">
                <h3 className="font-semibold text-sm truncate">{gt.name}</h3>
              </div>
            </Card>
          );
        })}
      </div>
      
      {!canStart && (
         <Alert variant="default" className="max-w-xl mx-auto bg-blue-50 border-blue-200 dark:bg-blue-950 dark:border-blue-800">
          <AlertCircle className="h-4 w-4 text-blue-600 dark:text-blue-400" />
          <AlertTitle className="text-blue-800 dark:text-blue-300">Selection Requirement</AlertTitle>
          <AlertDescription className="text-blue-700 dark:text-blue-400">
            You must select at least 5 subjects to start the test. Mathematics and English are compulsory.
          </AlertDescription>
        </Alert>
      )}

      <footer className="fixed bottom-0 left-0 right-0 p-4 bg-background/80 backdrop-blur-sm border-t">
        <div className="container mx-auto flex items-center justify-between">
          <div>
            <p className="font-bold">{selectedSubjects.length} / {ALL_GTS.length} selected</p>
            <p className="text-sm text-muted-foreground">Estimated time: {Math.round(selectedSubjects.length * (EASY_QUESTIONS_PER_TEST + HARD_QUESTIONS_PER_TEST) * 1.5)} mins</p>
          </div>
          <Button size="lg" onClick={startGT} disabled={!canStart}>
            Start Test <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </footer>
    </div>
  );
}
