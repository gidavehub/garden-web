'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ALL_TEXTBOOKS } from '@/data/allTextbooks';
import { BookOpen } from 'lucide-react';

export default function LibraryPage() {
  const router = useRouter();

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
              <BookOpen className="h-6 w-6 text-primary" />
            </div>
            <div>
              <CardTitle>Library</CardTitle>
              <p className="text-muted-foreground">Browse your collection of textbooks.</p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {ALL_TEXTBOOKS.map(item => (
              <div 
                key={item.id} 
                className="group cursor-pointer space-y-2" 
                onClick={() => router.push(`/dashboard/library/${item.id}`)}
              >
                <div className="overflow-hidden rounded-lg border shadow-sm transition-shadow duration-300 group-hover:shadow-lg">
                  <Image 
                    src={item.coverImage} 
                    alt={item.name} 
                    width={200} 
                    height={280}
                    data-ai-hint={`${item.name} textbook`}
                    className="aspect-[3/4] w-full object-cover transition-transform duration-300 group-hover:scale-105" 
                  />
                </div>
                <div className="px-1">
                  <h3 className="font-semibold text-sm truncate group-hover:text-primary">{item.name}</h3>
                  <p className="text-xs text-muted-foreground">{item.author}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
