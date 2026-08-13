import { extractTextFromPDF } from "../services/resumeService.js";

export const uploadResume = async(req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }
  try {
    const text = await extractTextFromPDF(req.file.buffer);

    res.status(200).json({
      message: "Resume uploaded successfully",
      fileName: req.file.originalname,
      text: text,
    });
  } catch (error) {
    console.error("PDF parsing failed:", error);

    res.status(500).json({
      error: "Failed to extract text from PDF",
    });
  }
};
