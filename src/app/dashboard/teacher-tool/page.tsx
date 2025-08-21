'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { BrainCircuit, Sparkles, Book, User } from 'lucide-react';
import Image from 'next/image';

import { getTeachingSuggestions, TeachingSuggestionOutput } from '@/ai/flows/teaching-suggestion-tool';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

const formSchema = z.object({
  courseTopics: z.string().min(10, { message: 'Please describe the course topics in at least 10 characters.' }),
  studentDetails: z.string().min(10, { message: 'Please describe the student in at least 10 characters.' }),
});

type FormValues = z.infer<typeof formSchema>;

export default function TeacherToolPage() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<TeachingSuggestionOutput | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      courseTopics: '',
      studentDetails: '',
    },
  });

  const onSubmit = async (data: FormValues) => {
    setIsLoading(true);
    setSuggestions(null);
    try {
      const result = await getTeachingSuggestions(data);
      setSuggestions(result);
    } catch (error) {
      console.error('Error getting teaching suggestions:', error);
      toast({
        variant: 'destructive',
        title: 'An Error Occurred',
        description: 'Failed to generate suggestions. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto max-w-4xl space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-headline font-bold text-gradient">AI Teaching Assistant</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Get personalized suggestions to enhance your teaching and mentorship.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Provide Context</CardTitle>
          <CardDescription>The more details you provide, the better the suggestions will be.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="courseTopics"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Course Topics</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="e.g., Algebra, calculus, geometry, trigonometry..."
                        className="min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="studentDetails"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Student Details</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="e.g., A visual learner who loves video games but struggles with abstract concepts..."
                        className="min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isLoading} className="w-full sm:w-auto">
                {isLoading ? (
                  <Image src="/logo.png" alt="loading" width={16} height={16} className="mr-2 animate-spin" />
                ) : (
                  <Sparkles className="mr-2 h-4 w-4" />
                )}
                Generate Suggestions
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      {isLoading && (
        <div className="flex h-64 items-center justify-center">
            <Image 
                src="/logo.png" 
                alt="Garden Logo"
                width={64}
                height={64}
                className="animate-spin"
                style={{animationDuration: '3s'}}
            />
        </div>
      )}
      
      {suggestions && (
        <div className="space-y-6 animate-in fade-in-50 duration-500">
            <SuggestionCard 
                icon={BrainCircuit}
                title="Teaching Strategies"
                content={suggestions.teachingStrategies}
            />
             <SuggestionCard 
                icon={Users}
                title="Mentorship Approaches"
                content={suggestions.mentorshipApproaches}
            />
             <SuggestionCard 
                icon={Book}
                title="Relevant Course Topics"
                content={suggestions.relevantCourseTopics}
            />
        </div>
      )}
    </div>
  );
}

function SuggestionCard({ icon: Icon, title, content }: { icon: React.ElementType, title: string, content: string }) {
    return (
        <Card>
            <CardHeader>
                <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                        <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-xl font-headline">{title}</CardTitle>
                </div>
            </CardHeader>
            <CardContent>
                <p className="whitespace-pre-wrap text-muted-foreground">{content}</p>
            </CardContent>
        </Card>
    )
}
