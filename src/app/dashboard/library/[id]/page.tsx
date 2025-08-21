'use client';

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { ArrowLeft, BookOpen, ChevronRight, Film, HelpCircle, Lightbulb } from 'lucide-react';

import { getTextbookById } from '@/data/allTextbooks';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Separator } from '@/components/ui/separator';

function EmbeddedVideo({ src }: { src: string }) {
    const videoId = src.split('v=')[1]?.split('&')[0];
    if (!videoId) return <p>Invalid video URL</p>;
    
    return (
        <div className="aspect-video w-full">
            <iframe
                className="h-full w-full rounded-lg"
                src={`https://www.youtube.com/embed/${videoId}`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
            ></iframe>
        </div>
    );
}

export default function TextbookViewerPage() {
    const router = useRouter();
    const params = useParams();
    const { id } = params;
    const textbook = getTextbookById(id as string);

    if (!textbook) {
        return (
            <div className="flex h-full flex-col items-center justify-center text-center">
                <h1 className="text-2xl font-bold">Textbook not found</h1>
                <p className="text-muted-foreground">Could not find a textbook with that ID.</p>
                <Button onClick={() => router.push('/dashboard/library')} className="mt-4">Back to Library</Button>
            </div>
        );
    }
    
    return (
        <div className="container mx-auto p-4 md:p-6 lg:p-8">
            <Button variant="outline" onClick={() => router.back()} className="mb-6">
                <ArrowLeft className="mr-2 h-4 w-4" /> Back
            </Button>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-1">
                    <Card>
                        <CardHeader className="p-0">
                            <Image src={textbook.coverImage} alt={textbook.name} width={400} height={560} className="rounded-t-lg aspect-[3/4] object-cover" />
                        </CardHeader>
                        <CardContent className="p-6">
                            <h1 className="text-2xl font-bold font-headline">{textbook.name}</h1>
                            <p className="text-muted-foreground">{textbook.author}</p>
                        </CardContent>
                    </Card>
                </div>
                
                <div className="md:col-span-2">
                    <Card>
                        <CardHeader>
                            <CardTitle>Chapters</CardTitle>
                            <CardDescription>Browse through the chapters and sections of this textbook.</CardDescription>
                        </CardHeader>
                        <CardContent>
                             <Accordion type="single" collapsible className="w-full">
                                {textbook.chapters.map((chapter, chapIndex) => (
                                    <AccordionItem value={`chapter-${chapIndex}`} key={chapIndex}>
                                        <AccordionTrigger className="text-lg font-semibold hover:no-underline">
                                            {chapter.name}
                                        </AccordionTrigger>
                                        <AccordionContent>
                                            <div className="space-y-6 pl-4 border-l-2 border-primary/20">
                                            {chapter.sections.map((section, secIndex) => (
                                                <div key={secIndex} className="space-y-4">
                                                    <h3 className="font-headline text-xl text-primary">{section.title}</h3>
                                                    <div className="prose prose-sm max-w-none text-muted-foreground whitespace-pre-wrap">
                                                        {section.content}
                                                    </div>

                                                    {Array.isArray(section.video) ? (
                                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                          {section.video.map((v,i) => <EmbeddedVideo key={i} src={v}/>)}
                                                        </div>
                                                    ) : (
                                                        section.video && <EmbeddedVideo src={section.video} />
                                                    )}

                                                    {section.mcq && (Array.isArray(section.mcq) ? section.mcq : [section.mcq]).map((mcq, mcqIndex) => (
                                                        <Card key={mcqIndex} className="bg-muted/50">
                                                            <CardHeader>
                                                                <CardTitle className="text-base flex items-center gap-2"><HelpCircle className="text-primary"/> Multiple Choice Question</CardTitle>
                                                            </CardHeader>
                                                            <CardContent>
                                                                <p className="font-semibold mb-4">{mcq.question}</p>
                                                                <div className="space-y-2">
                                                                    {mcq.options.map((opt, optIndex) => (
                                                                        <div key={optIndex} className={`p-3 rounded-md text-sm ${opt === mcq.correctAnswer ? 'bg-green-100 dark:bg-green-900/50 border border-green-500' : 'bg-background'}`}>
                                                                            {opt}
                                                                            {opt === mcq.correctAnswer && <span className="font-bold text-green-700 dark:text-green-400"> (Correct Answer)</span>}
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                                <Accordion type="single" collapsible className="w-full mt-4">
                                                                    <AccordionItem value="explanation" className="border-none">
                                                                        <AccordionTrigger className="text-sm py-2 hover:no-underline"><Lightbulb className="mr-2 h-4 w-4"/>Show Explanation</AccordionTrigger>
                                                                        <AccordionContent className="text-xs prose-sm text-muted-foreground pt-2">
                                                                            {mcq.explanation}
                                                                        </AccordionContent>
                                                                    </AccordionItem>
                                                                </Accordion>
                                                            </CardContent>
                                                        </Card>
                                                    ))}
                                                    {secIndex < chapter.sections.length -1 && <Separator className="my-6"/>}
                                                </div>
                                            ))}
                                            </div>
                                        </AccordionContent>
                                    </AccordionItem>
                                ))}
                            </Accordion>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}