import type { GTSet } from '@/types/gt';

export const easyGT: GTSet = {
  subject: "Mathematics",
  Questions: [
    {
      number: 1,
      question: "What is the value of x in the equation 2x + 5 = 15?",
      grade: 10,
      options: [
        "5",
        "10",
        "7.5",
        "2.5"
      ],
      answer: "5",
      explanation: "To solve for x, subtract 5 from both sides to get 2x = 10, then divide by 2 to get x = 5."
    },
    {
      number: 2,
      question: "What is the area of a rectangle with a length of 8 units and a width of 4 units?",
      grade: 10,
      options: [
        "12 square units",
        "24 square units",
        "32 square units",
        "16 square units"
      ],
      answer: "32 square units",
      explanation: "The area of a rectangle is calculated by multiplying its length by its width (Area = length x width). So, 8 units * 4 units = 32 square units."
    }
  ]
};

export const hardGT: GTSet = {
  "subject": "Mathematics",
  "Questions": [
    {
      "number": 1,
      "grade": 10,
      "question": "If log_2(x) + log_2(x - 2) = 3, what is the value of x?",
      "options": [
        "4",
        "-2",
        "4 and -2",
        "8"
      ],
      "answer": "4",
      "explanation": "Using logarithm properties, log_2(x) + log_2(x - 2) = log_2(x(x - 2)). So, log_2(x^2 - 2x) = 3. This can be rewritten in exponential form as 2^3 = x^2 - 2x, which is 8 = x^2 - 2x. Rearranging gives the quadratic equation x^2 - 2x - 8 = 0. Factoring gives (x - 4)(x + 2) = 0. The possible solutions are x = 4 or x = -2. However, the logarithm of a negative number is undefined, so x = -2 is an extraneous solution. The only valid solution is x = 4."
    },
    {
      "number": 2,
      "grade": 10,
      "question": "In a right-angled triangle, the side opposite the right angle is called the hypotenuse. If the lengths of the other two sides are 5 cm and 12 cm, what is the length of the hypotenuse?",
      "options": [
        "17 cm",
        "15 cm",
        "13 cm",
        "10 cm"
      ],
      "answer": "13 cm",
      "explanation": "According to the Pythagorean theorem, for a right-angled triangle, a^2 + b^2 = c^2, where c is the hypotenuse. So, 5^2 + 12^2 = c^2, which is 25 + 144 = c^2. This gives c^2 = 169. Taking the square root of both sides gives c = 13."
    }
  ]
};
