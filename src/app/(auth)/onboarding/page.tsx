'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { doc, setDoc } from 'firebase/firestore';
import { firestore } from '@/lib/firebase';
import { useToast } from '@/hooks/use-toast';

import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Loader2, User, Camera } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';

const steps = {
  student: ['name-picture', 'school', 'role', 'class-level', 'interests', 'complete'],
  teacher: ['name-picture', 'school', 'role', 'teaching-style', 'subjects', 'complete'],
};

export default function OnboardingPage() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const { toast } = useToast();
  const [stepIndex, setStepIndex] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    profilePicture: null as string | null,
    school: '',
    country: '',
    curriculum: '',
    role: '' as 'student' | 'teacher' | '',
    classLevel: '',
    interests: '',
    teachingStyle: '',
    subjects: '',
  });

  useEffect(() => {
    if (!authLoading && !user) {
      router.replace('/login');
    }
  }, [user, authLoading, router]);

  const currentRole = formData.role || 'student'; // Default to student path until role is chosen
  const currentSteps = formData.role ? steps[formData.role] : steps.student;
  const currentStepId = currentSteps[stepIndex];
  const progress = ((stepIndex + 1) / currentSteps.length) * 100;

  const handleNext = () => {
    // Add validation logic here if needed
    if (stepIndex < currentSteps.length - 1) {
      setStepIndex(stepIndex + 1);
    }
  };

  const handleBack = () => {
    if (stepIndex > 0) {
      setStepIndex(stepIndex - 1);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, profilePicture: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handleRoleChange = (role: 'student' | 'teacher') => {
    const oldRole = formData.role;
    if (oldRole !== role) {
      setFormData(prev => ({ ...prev, role }));
      // If role changes, reset step to role selection + 1 to avoid being on an invalid step
      const roleStepIndex = steps.student.indexOf('role');
      setStepIndex(roleStepIndex + 1);
    }
  }

  const handleSubmit = async () => {
    if (!user || !user.email) {
        toast({ variant: 'destructive', title: 'Error', description: 'You are not logged in.'});
        return;
    }
    setIsSubmitting(true);
    try {
        const { role, ...restData } = formData;
        const profileData = {
            ...restData,
            role,
            createdAt: new Date().toISOString(),
        };

        const profileRef = doc(firestore, 'users', user.email, 'profile', 'details');
        await setDoc(profileRef, profileData);
        
        toast({ title: 'Profile Complete!', description: 'Welcome to EduGrow!' });
        router.push('/dashboard');
    } catch (error) {
        console.error('Failed to save profile:', error);
        toast({ variant: 'destructive', title: 'Submission Failed', description: 'Could not save your profile. Please try again.' });
    } finally {
        setIsSubmitting(false);
    }
  };

  if (authLoading || !user) {
    return <div className="flex h-screen items-center justify-center"><Loader2 className="h-8 w-8 animate-spin" /></div>;
  }
  
  const renderStep = () => {
    switch(currentStepId) {
      case 'name-picture':
        return (
          <>
            <CardTitle className="font-headline">Your Profile</CardTitle>
            <CardDescription>Let's start with your name and a photo.</CardDescription>
            <div className="space-y-4 pt-4">
              <div className="flex justify-center">
                 <label htmlFor="profilePictureInput" className="cursor-pointer">
                    <Avatar className="h-24 w-24 border-2 border-dashed border-primary">
                        <AvatarImage src={formData.profilePicture ?? undefined} />
                        <AvatarFallback className="bg-muted">
                            <Camera className="h-8 w-8 text-muted-foreground" />
                        </AvatarFallback>
                    </Avatar>
                </label>
                <input id="profilePictureInput" type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
              </div>
              <div>
                <Label htmlFor="fullName">Full Name</Label>
                <Input id="fullName" name="fullName" value={formData.fullName} onChange={handleChange} placeholder="e.g., Jane Doe" />
              </div>
            </div>
          </>
        );
      case 'school':
        return (
            <>
                <CardTitle className="font-headline">Your School</CardTitle>
                <CardDescription>Where are you currently studying or teaching?</CardDescription>
                <div className="space-y-4 pt-4">
                    <div>
                        <Label htmlFor="school">School Name</Label>
                        <Input id="school" name="school" value={formData.school} onChange={handleChange} placeholder="e.g., Redwood High" />
                    </div>
                    <div>
                        <Label htmlFor="country">Country</Label>
                        <Input id="country" name="country" value={formData.country} onChange={handleChange} placeholder="e.g., United States" />
                    </div>
                    <div>
                        <Label htmlFor="curriculum">Curriculum</Label>
                        <Input id="curriculum" name="curriculum" value={formData.curriculum} onChange={handleChange} placeholder="e.g., IB, A-Levels" />
                    </div>
                </div>
            </>
        );
      case 'role':
        return (
            <>
                <CardTitle className="font-headline">Your Role</CardTitle>
                <CardDescription>Are you here to learn or to teach?</CardDescription>
                 <RadioGroup value={formData.role} onValueChange={(val) => handleRoleChange(val as 'student' | 'teacher')} className="grid grid-cols-2 gap-4 pt-4">
                    <div>
                      <RadioGroupItem value="student" id="student" className="peer sr-only" />
                      <Label htmlFor="student" className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary">
                        Student
                      </Label>
                    </div>
                    <div>
                      <RadioGroupItem value="teacher" id="teacher" className="peer sr-only" />
                      <Label htmlFor="teacher" className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary">
                        Teacher
                      </Label>
                    </div>
                 </RadioGroup>
            </>
        );
      case 'class-level': // Student only
        return (
            <>
                <CardTitle className="font-headline">Your Class Level</CardTitle>
                <CardDescription>What grade are you in?</CardDescription>
                <div className="pt-4">
                    <Label htmlFor="classLevel">Class Level</Label>
                    <Input id="classLevel" name="classLevel" value={formData.classLevel} onChange={handleChange} placeholder="e.g., 10th Grade" />
                </div>
            </>
        );
      case 'interests': // Student only
        return (
            <>
                <CardTitle className="font-headline">Your Interests</CardTitle>
                <CardDescription>What do you enjoy learning about? (comma-separated)</CardDescription>
                <div className="pt-4">
                    <Label htmlFor="interests">Interests</Label>
                    <Textarea id="interests" name="interests" value={formData.interests} onChange={handleChange} placeholder="e.g., Space, coding, history" />
                </div>
            </>
        );
      case 'teaching-style': // Teacher only
        return (
             <>
                <CardTitle className="font-headline">Your Teaching Style</CardTitle>
                <CardDescription>Briefly describe how you like to teach.</CardDescription>
                <div className="pt-4">
                    <Label htmlFor="teachingStyle">Teaching Style</Label>
                    <Textarea id="teachingStyle" name="teachingStyle" value={formData.teachingStyle} onChange={handleChange} placeholder="e.g., I use project-based learning and encourage collaboration..." />
                </div>
            </>
        );
      case 'subjects': // Teacher only
        return (
             <>
                <CardTitle className="font-headline">Your Subjects</CardTitle>
                <CardDescription>What subjects do you teach? (comma-separated)</CardDescription>
                <div className="pt-4">
                    <Label htmlFor="subjects">Subjects</Label>
                    <Textarea id="subjects" name="subjects" value={formData.subjects} onChange={handleChange} placeholder="e.g., Mathematics, Physics, Computer Science" />
                </div>
            </>
        );
      case 'complete':
        return (
            <>
                <CardTitle className="font-headline">Ready to Grow?</CardTitle>
                <CardDescription>Review your details and complete your profile to join the EduGrow community.</CardDescription>
                <div className="pt-4 text-center">
                    <p>You're all set! Click finish to start your journey.</p>
                </div>
            </>
        );
      default:
        return <p>Unknown step.</p>;
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-muted/40 p-4">
      <Card className="w-full max-w-lg animate-in fade-in-50 duration-500">
        <CardHeader>
          <Progress value={progress} className="mb-4" />
          {renderStep()}
        </CardHeader>
        <CardContent>
          <div className="flex justify-between">
            <Button variant="outline" onClick={handleBack} disabled={stepIndex === 0}>
              Back
            </Button>
            {currentStepId === 'complete' ? (
                <Button onClick={handleSubmit} disabled={isSubmitting}>
                    {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Finish
                </Button>
            ) : (
                <Button onClick={handleNext}>Next</Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
