import { extractTextFromPDF } from "../services/resumeService.js";
import { analyzeResume } from "../services/geminiService.js";

export const uploadResume = async(req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }
  try {
    const text = await extractTextFromPDF(req.file.buffer);
    const analysis = await analyzeResume(text);

    res.status(200).json({
      message: "Resume uploaded successfully",
      fileName: req.file.originalname,
      analysis:analysis,
    });
  } catch (error) {
    console.error("PDF parsing failed:", error);

    res.status(500).json({
      error: "Failed to extract text from PDF",
    });
  }
};
