'use client';

import { useAuth } from '@/context/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Leaf } from 'lucide-react';

export default function DashboardPage() {
  const { profile } = useAuth();

  return (
    <div className="space-y-8">
      <div className="flex flex-col space-y-2">
        <h1 className="text-4xl font-headline font-bold text-gradient animate-in fade-in-50">
          Welcome, {profile?.fullName || 'User'}!
        </h1>
        <p className="text-lg text-muted-foreground animate-in fade-in-50 delay-150">
          This is your starting point for growth and learning.
        </p>
      </div>

      <Card className="animate-in fade-in-50 delay-300">
        <CardHeader>
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
              <Leaf className="h-6 w-6 text-primary" />
            </div>
            <div>
              <CardTitle>Your Journey with EduGrow</CardTitle>
              <CardDescription>
                Nurturing knowledge, one student at a time.
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Whether you are a student eager to learn or a teacher ready to inspire, EduGrow provides the tools and community to help you achieve your goals. Explore your dashboard to find resources, connect with others, and track your progress.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
