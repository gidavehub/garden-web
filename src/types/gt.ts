
export interface GTQuestion {
  number: number;
  question: string;
  grade: number;
  options: string[];
  answer: string;
  explanation: string;
}

export interface GTSet {
  subject: string;
  Questions: GTQuestion[];
}
