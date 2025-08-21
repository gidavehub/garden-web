'use server';
/**
 * @fileOverview Garden AI Chatbot Flow
 *
 * - `askGardenAI` - A function that handles a user's chat message, potentially with an image, and returns a text response.
 * - `ChatMessage` - The type for a single chat message object.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ChatMessageSchema = z.object({
  id: z.string(),
  role: z.enum(['user', 'model']),
  content: z.string(),
  image: z.string().optional().describe(
      "An optional image sent by the user, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
  ),
});
export type ChatMessage = z.infer<typeof ChatMessageSchema>;

export async function askGardenAI(message: ChatMessage): Promise<string> {
  const {output} = await gardenChatPrompt(message);
  return output || "I'm sorry, I couldn't come up with a response.";
}

const gardenChatPrompt = ai.definePrompt({
  name: 'gardenChatPrompt',
  input: {schema: ChatMessageSchema},
  output: {schema: z.string()},
  prompt: `You are Garden AI, an expert and friendly AI assistant for students. Your goal is to help them with their educational questions.

  A user has sent the following message. If they included an image, it will be below.
  
  {{{content}}}
  {{#if image}}{{media url=image}}{{/if}}
  
  Provide a helpful and encouraging response to the user.`,
});
