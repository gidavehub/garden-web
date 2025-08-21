
import type { GTSet } from '@/types/gt';

// This is a placeholder. Please provide the full GT question data.
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
  ]
};
