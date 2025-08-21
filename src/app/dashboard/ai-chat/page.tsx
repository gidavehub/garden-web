'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { nanoid } from 'nanoid';

import { askGardenAI, ChatMessage } from '@/ai/flows/garden-ai-flow';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Send, Bot, User, Image as ImageIcon } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import Image from 'next/image';

const chatSchema = z.object({
  prompt: z.string(),
});

type ChatFormValues = z.infer<typeof chatSchema>;

export default function AIChatPage() {
  const { toast } = useToast();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const form = useForm<ChatFormValues>({
    resolver: zodResolver(chatSchema),
    defaultValues: { prompt: '' },
  });

  const scrollToBottom = () => {
    if (scrollAreaRef.current) {
        scrollAreaRef.current.children[1].scrollTop = scrollAreaRef.current.children[1].scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const fileToDataUri = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const onSubmit = async (data: ChatFormValues) => {
    if (!data.prompt.trim() && !imageFile) return;

    setIsProcessing(true);
    const userMessageId = nanoid();
    const aiMessageId = nanoid();

    let imageUrl: string | undefined;
    if (imageFile) {
        imageUrl = await fileToDataUri(imageFile);
    }
    
    const userMessage: ChatMessage = { id: userMessageId, role: 'user', content: data.prompt, image: imageUrl };
    setMessages(prev => [...prev, userMessage]);
    form.reset();
    setImageFile(null);
    setImagePreview(null);
    if (fileInputRef.current) {
        fileInputRef.current.value = '';
    }

    try {
      const aiResponseText = await askGardenAI(userMessage);
      const aiMessage: ChatMessage = { id: aiMessageId, role: 'model', content: aiResponseText };
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error with AI response:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'The AI failed to respond. Please try again.',
      });
      setMessages(prev => prev.filter(m => m.id !== userMessageId));
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-6rem)]">
      <Card className="flex-1 flex flex-col">
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Bot /> Garden AI</CardTitle>
          <CardDescription>Ask me anything about your studies or upload a picture of a problem.</CardDescription>
        </CardHeader>
        <CardContent className="flex-1 flex flex-col min-h-0">
          <ScrollArea className="flex-1 pr-4" ref={scrollAreaRef}>
            <div className="space-y-6">
              {messages.map((message) => (
                <div key={message.id} className={cn('flex items-start gap-3', message.role === 'user' ? 'justify-end' : '')}>
                  {message.role === 'model' && (
                    <Avatar className="h-8 w-8">
                      <AvatarFallback><Bot /></AvatarFallback>
                    </Avatar>
                  )}
                  <div className={cn(
                      "max-w-md rounded-xl px-4 py-3 text-sm shadow-sm",
                      message.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted'
                  )}>
                    {message.image && (
                         <Image src={message.image} alt="Uploaded content" width={200} height={200} className="rounded-lg mb-2" />
                    )}
                    <p className="whitespace-pre-wrap">{message.content}</p>
                  </div>
                  {message.role === 'user' && (
                    <Avatar className="h-8 w-8">
                       <AvatarFallback><User /></AvatarFallback>
                    </Avatar>
                  )}
                </div>
              ))}
               {isProcessing && (
                    <div className="flex items-start gap-3">
                         <Avatar className="h-8 w-8">
                            <AvatarFallback><Bot /></AvatarFallback>
                        </Avatar>
                        <div className="max-w-md rounded-xl px-4 py-3 text-sm shadow-sm bg-muted flex items-center gap-2">
                           <Image src="/logo.png" alt="loading" width={16} height={16} className="animate-spin" />
                           <span>Thinking...</span>
                        </div>
                    </div>
               )}
            </div>
          </ScrollArea>
          <div className="mt-4 border-t pt-4">
             <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="flex items-start gap-2">
                 <Button type="button" variant="outline" size="icon" onClick={() => fileInputRef.current?.click()}>
                    <ImageIcon className="h-4 w-4" />
                 </Button>
                 <input type="file" ref={fileInputRef} onChange={handleImageChange} className="hidden" accept="image/*" />
                <div className="relative w-full">
                    {imagePreview && (
                        <div className="absolute bottom-12 left-2">
                            <div className="relative">
                                <Image src={imagePreview} alt="Preview" width={80} height={80} className="rounded-md border"/>
                                <button type="button" onClick={() => {setImageFile(null); setImagePreview(null); if(fileInputRef.current) fileInputRef.current.value = ''}} className="absolute -top-2 -right-2 bg-muted rounded-full p-0.5">
                                    <X className="h-3 w-3" />
                                </button>
                            </div>
                        </div>
                    )}
                    <FormField
                      control={form.control}
                      name="prompt"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input placeholder="Ask about anything..." {...field} className="pr-12" />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                </div>
                <Button type="submit" size="icon" disabled={isProcessing || (!form.getValues('prompt').trim() && !imageFile)}>
                    {isProcessing ? <Image src="/logo.png" alt="loading" width={16} height={16} className="animate-spin" /> : <Send className="h-4 w-4" />}
                </Button>
              </form>
             </Form>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Dummy X component for the preview close button
const X = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>
)
