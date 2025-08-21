'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Leaf } from 'lucide-react';

export default function StudiesPage() {
  return (
    <div className="space-y-8">
      <Card className="animate-in fade-in-50 delay-300">
        <CardHeader>
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
              <Leaf className="h-6 w-6 text-primary" />
            </div>
            <div>
              <CardTitle>My Studies</CardTitle>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            This is where the study planner content will go.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
