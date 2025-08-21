import type { GTSet } from '@/types/gt';

export const easyGT: GTSet = {
  subject: "Financial Accounting",
  Questions: [
    {
      number: 1,
      question: "Which of the following best defines accounting?",
      grade: 10,
      options: [
        "The process of only recording financial transactions.",
        "The systematic process of identifying, measuring, recording, classifying, summarizing, interpreting, and communicating financial information.",
        "The process of preparing tax returns for a business.",
        "The management of a company's financial resources."
      ],
      answer: "The systematic process of identifying, measuring, recording, classifying, summarizing, interpreting, and communicating financial information.",
      explanation: "Accounting is a comprehensive process that involves much more than just recording; it includes identification, measurement, classification, summarization, interpretation, and communication."
    },
    {
      number: 2,
      question: "The primary purpose of accounting is to:",
      grade: 10,
      options: [
        "Guarantee business profitability.",
        "Provide information for decision-making.",
        "Prevent business losses.",
        "Ensure all employees are paid correctly."
      ],
      answer: "Provide information for decision-making.",
      explanation: "While accounting information can help with other aspects, its main goal is to provide relevant and reliable financial information useful for making informed decisions."
    }
  ]
};

export const hardGT: GTSet = {
  "subject": "Financial Accounting",
  "Questions": [
    {
      "number": 1,
      "grade": 10,
      "question": "A business using the straight-line depreciation method purchased a machine for $60,000 with an estimated useful life of 5 years and a residual value of $5,000. After 2 full years, management revised the total useful life to 8 years and the residual value to $2,000 due to exceptional maintenance. What is the depreciation expense for Year 3?",
      "options": [
        "$11,000",
        "$6,000",
        "$7,000",
        "$5,750"
      ],
      "answer": "$6,000",
      "explanation": "First, calculate the Net Book Value (NBV) after 2 years based on the original estimates. Annual depreciation (original) = ($60,000 - $5,000) / 5 years = $11,000. Accumulated depreciation for 2 years = $11,000 * 2 = $22,000. NBV at the end of Year 2 = $60,000 - $22,000 = $38,000. Now, apply the new estimates from this point forward. The remaining useful life is 8 years (new total life) - 2 years (already passed) = 6 years. The new residual value is $2,000. The new annual depreciation expense for Year 3 and onwards is ($38,000 - $2,000) / 6 years = $6,000."
    },
     {
      "number": 2,
      "grade": 10,
      "question": "A suspense account was opened with a debit balance of $900. An investigation revealed that a cash sale of $4,500 was correctly debited to the bank but was credited to the Purchases account instead of the Sales account. What is the journal entry to correct this error and what is the new balance on the suspense account?",
      "options": [
        "Dr Purchases $4,500, Cr Sales $4,500; Suspense balance is $900 Debit.",
        "Dr Bank $4,500, Cr Sales $4,500; Suspense balance is Nil.",
        "Dr Suspense $9,000, Cr Purchases $4,500, Cr Sales $4,500; Suspense balance is $9,900 Debit.",
        "Dr Purchases $4,500, Dr Suspense $900, Cr Sales $5,400; Suspense balance is Nil."
      ],
      "answer": "Dr Purchases $4,500, Cr Sales $4,500; Suspense balance is $900 Debit.",
      "explanation": "This error of principle does not affect trial balance totals. The original incorrect entry was Dr Bank $4,500, Cr Purchases $4,500. The correction requires debiting Purchases to reverse the wrong credit and crediting Sales as it should have been. The suspense account is for a different error and is unaffected by this correction."
    }
  ]
};
