export const getAnalyzedResumePrompt = () => {
  return `
Analyze the resume provided to you.

Return ONLY valid JSON with exactly this structure:

{
  "overallScore": 0,
  "categoryScores": {
    "skills": 0,
    "projects": 0,
    "experience": 0,
    "education": 0,
    "ats": 0,
    "formatting": 0
  },
  "strengths": [],
  "weaknesses": [],
  "missingSkills": [],
  "suggestions": []
}

Do not add any extra fields.
Do not return markdown.
Do not wrap the JSON in a code block.
`;
};