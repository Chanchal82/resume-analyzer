import genAI from "../config/gemini.js";
import { getAnalyzedResumePrompt } from "../utils/prompt.js";

export const analyzeResume=async(resumeText)=>{
    const response=await genAI.models.generateContent({
        model:"gemini-3.6-flash",
        contents: resumeText,
        config:{
            systemInstruction:getAnalyzedResumePrompt(),
            temperature:0.7
        }
    })

    return JSON.parse(response.text);
}