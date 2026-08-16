import express from "express";
import upload from "../middleware/uploadMiddleware.js";
import { uploadResume } from "../controllers/resumeController.js";
import { getAllAnalyses } from "../controllers/resumeController.js";
import { getAnalysisById } from "../controllers/resumeController.js";
import { deleteAnalysis } from "../controllers/resumeController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/analyze",protect, upload.single("file"), uploadResume);
router.get('/analyses', protect, getAllAnalyses);
router.get('/analyses/:id', protect, getAnalysisById);
router.delete('/analyses/:id', protect, deleteAnalysis);


export default router;