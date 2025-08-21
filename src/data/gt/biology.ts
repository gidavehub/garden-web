import type { GTSet } from '@/types/gt';

export const easyGT: GTSet = {
  subject: "Biology",
  Questions: [
    {
      number: 1,
      question: "What is the primary function of mitochondria in a cell?",
      grade: 10,
      options: [
        "Store genetic information",
        "Produce energy (ATP)",
        "Synthesize proteins",
        "Control cell division"
      ],
      answer: "Produce energy (ATP)",
      explanation: "Mitochondria are known as the 'powerhouses' of the cell because they generate most of the cell's supply of adenosine triphosphate (ATP), used as a source of chemical energy."
    },
    {
      number: 2,
      question: "Which of the following is a product of photosynthesis?",
      grade: 10,
      options: [
        "Carbon dioxide",
        "Water",
        "Oxygen",
        "Nitrogen"
      ],
      answer: "Oxygen",
      explanation: "Photosynthesis uses carbon dioxide, water, and sunlight to produce glucose (sugar for energy) and releases oxygen as a byproduct."
    }
  ]
};

export const hardGT: GTSet = {
  "subject": "Biology",
  "Questions": [
    {
      "number": 1,
      "grade": 10,
      "question": "In the process of DNA replication, what is the role of the enzyme DNA ligase?",
      "options": [
        "To unwind the DNA double helix",
        "To synthesize new DNA strands",
        "To join Okazaki fragments on the lagging strand",
        "To add a primer to the DNA template"
      ],
      "answer": "To join Okazaki fragments on the lagging strand",
      "explanation": "DNA polymerase synthesizes the lagging strand in small pieces called Okazaki fragments. DNA ligase is the enzyme that joins these fragments together to form a continuous strand."
    },
    {
      "number": 2,
      "grade": 10,
      "question": "A person with blood type AB can receive blood from which of the following blood types without a transfusion reaction?",
      "options": [
        "A and B only",
        "AB and O only",
        "Only AB",
        "A, B, AB, and O"
      ],
      "answer": "A, B, AB, and O",
      "explanation": "Individuals with blood type AB are known as 'universal recipients' because their red blood cells have both A and B antigens, and their plasma does not contain antibodies against A or B antigens. Therefore, they can receive blood from any ABO blood type."
    }
  ]
};
