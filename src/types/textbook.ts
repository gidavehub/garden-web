
export interface MCQ {
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
}

export interface Section {
  title: string;
  image: string;
  video: string | string[];
  content: string;
  mcq: MCQ | MCQ[];
}

export interface Chapter {
  name: string;
  image: string;
  video: string[];
  sections: Section[];
}

export interface Textbook {
  id: string;
  name: string;
  author: string;
  coverImage: string;
  chapters: Chapter[];
}
