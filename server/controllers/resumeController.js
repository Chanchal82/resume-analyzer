import { extractTextFromPDF } from "../services/resumeService.js";
import { analyzeResume } from "../services/geminiService.js";
import Resume from "../models/ResumeAnalysis.js";

export const uploadResume = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }
  try {
    const text = await extractTextFromPDF(req.file.buffer);
    const analysis = await analyzeResume(text);

    const resume = await Resume.create({
      fileName: req.file.originalname,
      overallScore: analysis.overallScore,
      categoryScores: analysis.categoryScores,
      strengths: analysis.strengths,
      weaknesses: analysis.weaknesses,
      missingSkills: analysis.missingSkills,
      suggestions: analysis.suggestions,
      user: req.user._id,
    });

    res.status(200).json({
      message: "Resume uploaded successfully",
      fileName: req.file.originalname,
      analysis: resume,
    });
  } catch (error) {
    console.error("PDF parsing failed:", error);

    res.status(500).json({
      error: "Failed to extract text from PDF",
    });
  }
};


export const getAllAnalyses=async(req,res)=>{
  try{
    const userId = req.user._id;
    const analyses = await Resume.find({ user: userId }).sort({ createdAt: -1 });
    res.status(200).json({ analyses });
  } catch (error) {
    console.error("Failed to fetch analysis:", error);
    res.status(500).json({ error: "Failed to fetch analysis" });
  }
}

export const getAnalysisById=async(req,res)=>{
  try{
    const userId = req.user._id;
    const analysis = await Resume.findOne({ _id: req.params.id, user: userId });
    if(!analysis) {
      return res.status(404).json({ error: "Analysis not found" });
    }
    res.status(200).json({ analysis });
  }catch (error) {
    console.error("Failed to fetch analysis:", error);
    res.status(500).json({ error: "Failed to fetch analysis" });
  }
}

export const deleteAnalysis=async(req,res)=>{
  try{
    const userId = req.user._id;
    const analysis = await Resume.findOneAndDelete({ _id: req.params.id, user: userId });
    if(!analysis) {
      return res.status(404).json({ error: "Analysis not found" });
    }
    res.status(200).json({ message: "Analysis deleted successfully" });
  }catch (error) {
    console.error("Failed to delete analysis:", error);
    res.status(500).json({ error: "Failed to delete analysis" });
  }
}
