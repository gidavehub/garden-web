
'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { ChevronLeft, ChevronRight, Flag, Loader2, Timer, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

type Question = {
  question: string;
  options: string[];
  answer: string;
  explanation: string;
};

type SubjectSection = {
  subjectId: string;
  subjectName: string;
  coverImage: any;
  questions: Question[];
  sectionType: 'Easy' | 'Hard' | 'Mixed';
};

export default function GTLivePage() {
  const router = useRouter();
  const { toast } = useToast();

  const [examState, setExamState] = useState<'briefing' | 'testing' | 'review'>('briefing');
  const [sessions, setSessions] = useState<SubjectSection[]>([]);
  const [answers, setAnswers] = useState<(string | null)[]>([]);
  const [totalQuestions, setTotalQuestions] = useState(0);

  const [currentSessionIndex, setCurrentSessionIndex] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const [secondsLeft, setSecondsLeft] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const examDataString = sessionStorage.getItem('currentExam');
      const timeLimitString = sessionStorage.getItem('currentExamTimeLimit');

      if (!examDataString || !timeLimitString) {
        throw new Error("Exam data not found in session storage.");
      }

      const examData = JSON.parse(examDataString);
      const timeLimit = parseInt(timeLimitString, 10);
      
      if (!examData || examData.length === 0 || timeLimit === 0) {
        throw new Error("Invalid exam data.");
      }

      const allQuestions = examData.flatMap((s: any) => s.questions);
      setSessions(examData);
      setTotalQuestions(allQuestions.length);
      setAnswers(Array(allQuestions.length).fill(null));
      setSecondsLeft(timeLimit * 60);
      setIsLoading(false);

    } catch (e) {
      console.error(e);
      toast({
        variant: 'destructive',
        title: 'Exam Load Error',
        description: 'There was a problem loading the test data. Please try again.',
      });
      router.replace('/dashboard/tests');
    }
  }, [router, toast]);

  useEffect(() => {
    if (examState === 'testing' && secondsLeft > 0) {
      const timer = setInterval(() => {
        setSecondsLeft(prev => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else if (secondsLeft === 0 && examState === 'testing') {
      handleSubmit();
    }
  }, [examState, secondsLeft]);

  const getGlobalIndex = (sessionIdx: number, questionIdx: number): number => {
    let globalIndex = 0;
    for (let i = 0; i < sessionIdx; i++) {
      globalIndex += sessions[i].questions.length;
    }
    return globalIndex + questionIdx;
  };
  
  const currentSession = sessions[currentSessionIndex];
  const currentQuestion = currentSession?.questions[currentQuestionIndex];
  const globalQuestionIndex = useMemo(() => {
      if (!sessions.length) return 0;
      return getGlobalIndex(currentSessionIndex, currentQuestionIndex);
  }, [sessions, currentSessionIndex, currentQuestionIndex]);

  const handleAnswer = (option: string) => {
    const newAnswers = [...answers];
    newAnswers[globalQuestionIndex] = option;
    setAnswers(newAnswers);
  };
  
  const handleNext = () => {
    const isLastQuestionInSession = currentQuestionIndex === currentSession.questions.length - 1;
    if (!isLastQuestionInSession) {
      setCurrentQuestionIndex(i => i + 1);
    } else {
        setExamState('review');
    }
  };

  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(i => i - 1);
    }
  };
  
  const handleContinueFromReview = () => {
    const isLastSession = currentSessionIndex === sessions.length - 1;
    if (isLastSession) {
      handleSubmit();
    } else {
      setCurrentSessionIndex(i => i + 1);
      setCurrentQuestionIndex(0);
      setExamState('briefing');
    }
  };

  const handleSubmit = () => {
      const score = sessions.flat().flatMap(s => s.questions).reduce((sum, question, idx) => {
          const sessionIndex = sessions.findIndex(s => s.questions.includes(question));
          if (sessionIndex === -1) return sum;
          const questionIndex = sessions[sessionIndex].questions.indexOf(question);
          const globalIdx = getGlobalIndex(sessionIndex, questionIndex);
          return sum + (answers[globalIdx] === question.answer ? 1 : 0);
      }, 0);

      router.replace(`/dashboard/tests/results?score=${score}&total=${totalQuestions}`);
  };

  if (isLoading) {
    return <div className="flex h-screen items-center justify-center"><Loader2 className="h-8 w-8 animate-spin" /></div>;
  }
  
  const TimerDisplay = () => {
      const minutes = Math.floor(secondsLeft / 60);
      const seconds = secondsLeft % 60;
      return <div className="flex items-center gap-2 text-sm font-medium"><Timer className="h-4 w-4"/> {minutes}:{seconds.toString().padStart(2, '0')}</div>
  }

  const BriefingScreen = () => (
    <Card className="w-full max-w-lg mx-auto">
        <CardHeader className="text-center">
            <p className="text-primary font-semibold">Section {currentSessionIndex + 1} of {sessions.length}</p>
            <CardTitle className="text-3xl font-headline">{currentSession.subjectName}</CardTitle>
            <CardDescription>{currentSession.sectionType} Questions</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
             <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Instructions</AlertTitle>
                <AlertDescription>
                   The timer is running. Do not leave this page. Answer all questions to the best of your ability.
                </AlertDescription>
            </Alert>
            <Button size="lg" className="w-full" onClick={() => setExamState('testing')}>
                Begin Section
            </Button>
        </CardContent>
    </Card>
  );

  const TestingScreen = () => (
    <div className="w-full max-w-2xl mx-auto space-y-6">
        <p className="text-center text-muted-foreground font-semibold">Question {globalQuestionIndex + 1} of {totalQuestions}</p>
        <Card>
            <CardHeader>
                <CardTitle className="text-lg md:text-xl">{currentQuestion.question}</CardTitle>
            </CardHeader>
            <CardContent>
                <RadioGroup onValueChange={handleAnswer} value={answers[globalQuestionIndex] || ""}>
                    {currentQuestion.options.map((opt, index) => (
                        <Label key={index} htmlFor={`opt-${index}`} className="flex items-center p-4 rounded-lg border has-[:checked]:bg-primary/10 has-[:checked]:border-primary transition-all mb-2 cursor-pointer">
                            <RadioGroupItem value={opt} id={`opt-${index}`} className="mr-4" />
                            {opt}
                        </Label>
                    ))}
                </RadioGroup>
            </CardContent>
        </Card>
        <div className="flex justify-between">
            <Button variant="outline" onClick={handlePrev} disabled={currentQuestionIndex === 0}>
                <ChevronLeft className="mr-2 h-4 w-4"/> Previous
            </Button>
             <Button onClick={handleNext}>
                {currentQuestionIndex === currentSession.questions.length - 1 ? 'Finish & Review' : 'Next'} <ChevronRight className="ml-2 h-4 w-4"/>
            </Button>
        </div>
    </div>
  );

  const ReviewScreen = () => {
      const correctCount = currentSession.questions.reduce((sum, q, i) => {
        const globalIdx = getGlobalIndex(currentSessionIndex, i);
        return sum + (answers[globalIdx] === q.answer ? 1 : 0);
      }, 0);

      return (
        <Card className="w-full max-w-4xl mx-auto">
            <CardHeader className="text-center">
                <CardTitle className="text-3xl font-headline">Review: {currentSession.subjectName}</CardTitle>
                <CardDescription className="text-lg">You scored {correctCount} / {currentSession.questions.length}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                {currentSession.questions.map((q, i) => {
                     const globalIdx = getGlobalIndex(currentSessionIndex, i);
                     const userAnswer = answers[globalIdx];
                     const isCorrect = userAnswer === q.answer;
                     return (
                        <div key={i} className={`p-4 rounded-lg border ${isCorrect ? 'border-green-500 bg-green-500/10' : 'border-red-500 bg-red-500/10'}`}>
                            <p className="font-semibold">{i + 1}. {q.question}</p>
                            <p className={`mt-2 text-sm ${isCorrect ? 'text-green-700 dark:text-green-400' : 'text-red-700 dark:text-red-400'}`}>
                                Your answer: {userAnswer || 'Not answered'}
                            </p>
                             {!isCorrect && (
                                <p className="mt-1 text-sm text-green-700 dark:text-green-400">Correct answer: {q.answer}</p>
                            )}
                        </div>
                     )
                })}
                 <Button size="lg" className="w-full" onClick={handleContinueFromReview}>
                    {currentSessionIndex === sessions.length - 1 ? 'Finish & See Final Results' : 'Continue to Next Section'}
                    <Flag className="ml-2 h-4 w-4" />
                </Button>
            </CardContent>
        </Card>
      )
  }

  return (
    <div className="min-h-screen bg-muted/40 p-4 md:p-8 flex flex-col">
       <header className="w-full max-w-5xl mx-auto flex justify-between items-center mb-8">
            <div className="font-bold text-lg">{currentSession?.subjectName || 'Garden Test'}</div>
            <div className="flex items-center gap-4">
                <TimerDisplay />
                <Progress value={((globalQuestionIndex + 1) / totalQuestions) * 100} className="w-32" />
            </div>
       </header>
       <main className="flex-1 flex items-center justify-center">
            {examState === 'briefing' && <BriefingScreen />}
            {examState === 'testing' && <TestingScreen />}
            {examState === 'review' && <ReviewScreen />}
       </main>
    </div>
  );
}
