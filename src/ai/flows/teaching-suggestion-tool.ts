'use server';

/**
 * @fileOverview AI-powered teaching suggestion tool.
 *
 * - `getTeachingSuggestions` - A function that takes course topics and student details as input and returns suggestions for teaching strategies, mentorship approaches, and relevant course topics.
 * - `TeachingSuggestionInput` - The input type for the `getTeachingSuggestions` function.
 * - `TeachingSuggestionOutput` - The return type for the `getTeachingSuggestions` function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const TeachingSuggestionInputSchema = z.object({
  courseTopics: z
    .string()
    .describe('The topics covered in the course.'),
  studentDetails: z
    .string()
    .describe('Specific details about the student, including their learning style, interests, and any challenges they may be facing.'),
});

export type TeachingSuggestionInput = z.infer<typeof TeachingSuggestionInputSchema>;

const TeachingSuggestionOutputSchema = z.object({
  teachingStrategies: z.string().describe('Suggestions for effective teaching strategies based on the student and course topics.'),
  mentorshipApproaches: z.string().describe('Guidance on mentorship approaches tailored to the student.'),
  relevantCourseTopics: z.string().describe('Additional course topics that may be relevant or beneficial for the student.'),
});

export type TeachingSuggestionOutput = z.infer<typeof TeachingSuggestionOutputSchema>;

export async function getTeachingSuggestions(input: TeachingSuggestionInput): Promise<TeachingSuggestionOutput> {
  return teachingSuggestionFlow(input);
}

const teachingSuggestionPrompt = ai.definePrompt({
  name: 'teachingSuggestionPrompt',
  input: {schema: TeachingSuggestionInputSchema},
  output: {schema: TeachingSuggestionOutputSchema},
  prompt: `You are an AI assistant designed to help teachers tailor their teaching and mentorship approaches to individual students.

  Based on the provided course topics and student details, generate suggestions for teaching strategies, mentorship approaches, and relevant course topics.

  Course Topics: {{{courseTopics}}}
  Student Details: {{{studentDetails}}}

  Teaching Strategies:
  Mentorship Approaches:
  Relevant Course Topics: `,
});

const teachingSuggestionFlow = ai.defineFlow(
  {
    name: 'teachingSuggestionFlow',
    inputSchema: TeachingSuggestionInputSchema,
    outputSchema: TeachingSuggestionOutputSchema,
  },
  async input => {
    const {output} = await teachingSuggestionPrompt(input);
    return output!;
  }
);
