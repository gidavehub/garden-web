import type { GTSet } from '@/types/gt';

export const easyGT: GTSet = {
  subject: "Chemistry",
  Questions: [
    {
      number: 1,
      question: "What is the chemical symbol for gold?",
      grade: 10,
      options: [
        "Ag",
        "Au",
        "Go",
        "Gd"
      ],
      answer: "Au",
      explanation: "The chemical symbol for gold is Au, which comes from its Latin name, 'aurum'."
    },
    {
      number: 2,
      question: "Which of the following is a noble gas?",
      grade: 10,
      options: [
        "Oxygen",
        "Hydrogen",
        "Neon",
        "Chlorine"
      ],
      answer: "Neon",
      explanation: "Neon (Ne) is in Group 18 of the periodic table, known as the noble gases, which are characterized by their low reactivity."
    }
  ]
};

export const hardGT: GTSet = {
  "subject": "Chemistry",
  "Questions": [
    {
      "number": 1,
      "grade": 10,
      "question": "What is the molarity of a solution prepared by dissolving 58.44 g of NaCl in enough water to make 500 mL of solution? (Molar mass of NaCl = 58.44 g/mol)",
      "options": [
        "0.5 M",
        "1.0 M",
        "2.0 M",
        "0.25 M"
      ],
      "answer": "2.0 M",
      "explanation": "First, calculate the moles of NaCl: 58.44 g / 58.44 g/mol = 1.0 mole. Then, convert the volume to liters: 500 mL = 0.5 L. Molarity (M) = moles of solute / liters of solution. So, M = 1.0 mole / 0.5 L = 2.0 M."
    },
    {
      "number": 2,
      "grade": 10,
      "question": "According to Le Chatelier's principle, what will happen to the equilibrium of the reaction N2(g) + 3H2(g) <=> 2NH3(g) if the pressure is increased?",
      "options": [
        "Equilibrium will shift to the left",
        "Equilibrium will shift to the right",
        "Equilibrium will not change",
        "The reaction will stop"
      ],
      "answer": "Equilibrium will shift to the right",
      "explanation": "Le Chatelier's principle states that if a change of condition is applied to a system in equilibrium, the system will shift in a direction that relieves the stress. Increasing the pressure favors the side with fewer moles of gas. The reactants (N2 + 3H2) have 4 moles of gas, while the product (2NH3) has 2 moles. Therefore, the equilibrium will shift to the right."
    }
  ]
};
