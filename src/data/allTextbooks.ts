
import type { Textbook } from '@/types/textbook';

// This is a placeholder. Please provide the full textbook data.
export const ALL_TEXTBOOKS: Textbook[] = [
  {
    id: 'financial-accounting',
    name: 'Financial Accounting',
    author: 'Godswill Iyke Dave',
    coverImage: 'https://placehold.co/200x280.png',
    chapters: [],
  },
  {
    id: 'calculus-1',
    name: 'Calculus I',
    author: 'EduGrow Publishing',
    coverImage: 'https://placehold.co/200x280.png',
    chapters: [],
  },
    {
    id: 'intro-to-physics',
    name: 'Intro to Physics',
    author: 'EduGrow Publishing',
    coverImage: 'https://placehold.co/200x280.png',
    chapters: [],
  },
    {
    id: 'world-history',
    name: 'World History',
    author: 'EduGrow Publishing',
    coverImage: 'https://placehold.co/200x280.png',
    chapters: [],
  },
];

export const getTextbookById = (id: string): Textbook | undefined => {
  return ALL_TEXTBOOKS.find(tb => tb.id === id);
}
