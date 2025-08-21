import type { GTSet } from '@/types/gt';

export const easyGT: GTSet = {
  subject: "Physics",
  Questions: [
    {
      number: 1,
      question: "What is the unit of force in the International System of Units (SI)?",
      grade: 10,
      options: [
        "Joule",
        "Watt",
        "Newton",
        "Pascal"
      ],
      answer: "Newton",
      explanation: "The SI unit of force is the Newton (N), named after Sir Isaac Newton. It is defined as the force required to accelerate a mass of one kilogram by one meter per second squared."
    },
    {
      number: 2,
      question: "Which of Newton's laws of motion is also known as the law of inertia?",
      grade: 10,
      options: [
        "First Law",
        "Second Law",
        "Third Law",
        "Law of Gravitation"
      ],
      answer: "First Law",
      explanation: "Newton's First Law of Motion states that an object will remain at rest or in uniform motion in a straight line unless acted upon by an external force. This property of an object to resist changes in its state of motion is called inertia."
    }
  ]
};

export const hardGT: GTSet = {
  "subject": "Physics",
  "Questions": [
    {
      "number": 1,
      "grade": 10,
      "question": "A projectile is fired from the ground with an initial velocity of 50 m/s at an angle of 30 degrees above the horizontal. What is the maximum height reached by the projectile? (Assume g = 9.8 m/s^2)",
      "options": [
        "31.89 m",
        "63.78 m",
        "25.51 m",
        "127.55 m"
      ],
      "answer": "31.89 m",
      "explanation": "The vertical component of the initial velocity is v_y = 50 * sin(30) = 25 m/s. At the maximum height, the final vertical velocity is 0. Using the kinematic equation v_f^2 = v_i^2 + 2ad, we get 0^2 = 25^2 + 2(-9.8)d. This simplifies to 0 = 625 - 19.6d. Solving for d (height), d = 625 / 19.6 = 31.89 m."
    },
    {
      "number": 2,
      "grade": 10,
      "question": "What is the equivalent resistance of three resistors (10Ω, 20Ω, 30Ω) connected in parallel?",
      "options": [
        "60Ω",
        "5.45Ω",
        "11Ω",
        "6.67Ω"
      ],
      "answer": "5.45Ω",
      "explanation": "For resistors in parallel, the reciprocal of the equivalent resistance (1/R_eq) is the sum of the reciprocals of individual resistances. So, 1/R_eq = 1/10 + 1/20 + 1/30. To add these fractions, find a common denominator (60): 1/R_eq = 6/60 + 3/60 + 2/60 = 11/60. Therefore, R_eq = 60 / 11 ≈ 5.45Ω."
    }
  ]
};
