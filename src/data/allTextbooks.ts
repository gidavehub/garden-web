
import type { Textbook } from '@/types/textbook';
import { textbook as financialAccounting } from './textbooks/financial-accounting';
import { textbook as biology } from './textbooks/biology';
import { textbook as chemistry } from './textbooks/chemistry';
import { textbook as maths } from './textbooks/maths';
import { textbook as physics } from './textbooks/physics';

export const ALL_TEXTBOOKS: Textbook[] = [
  { ...financialAccounting, id: 'financial-accounting' },
  { ...maths, id: 'maths' },
  { ...biology, id: 'biology' },
  { ...chemistry, id: 'chemistry' },
  { ...physics, id: 'physics' },
];

export const getTextbookById = (id: string): Textbook | undefined => {
  return ALL_TEXTBOOKS.find(tb => tb.id === id);
}
