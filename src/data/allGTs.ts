import type { GTSet } from '@/types/gt';
import { easyGT as accountingEasy, hardGT as accountingHard } from './gt/financial-accounting';
import { easyGT as biologyEasy, hardGT as biologyHard } from './gt/biology';
import { easyGT as chemistryEasy, hardGT as chemistryHard } from './gt/chemistry';
import { easyGT as mathsEasy, hardGT as mathsHard } from './gt/maths';
import { easyGT as physicsEasy, hardGT as physicsHard } from './gt/physics';


export type FullGTSet = {
    id: string;
    name: string;
    easy: GTSet;
    hard: GTSet;
}

export const ALL_GTS: FullGTSet[] = [
    { id: 'maths', name: 'Mathematics', easy: mathsEasy, hard: mathsHard },
    { id: 'biology', name: 'Biology', easy: biologyEasy, hard: biologyHard },
    { id: 'chemistry', name: 'Chemistry', easy: chemistryEasy, hard: chemistryHard },
    { id: 'physics', name: 'Physics', easy: physicsEasy, hard: physicsHard },
    { id: 'financial-accounting', name: 'Financial Accounting', easy: accountingEasy, hard: accountingHard },
];

export const getGTById = (id: string): FullGTSet | undefined => {
    return ALL_GTS.find(gt => gt.id === id);
}
