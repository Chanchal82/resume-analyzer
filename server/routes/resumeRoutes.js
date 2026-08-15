import express from "express";
import upload from "../middleware/uploadMiddleware.js";
import { uploadResume } from "../controllers/resumeController.js";
import { getAllAnalyses } from "../controllers/resumeController.js";
import { getAnalysisById } from "../controllers/resumeController.js";
import { deleteAnalysis } from "../controllers/resumeController.js";

const router = express.Router();

router.post("/analyze", upload.single("file"), uploadResume);
router.get('/analyses', getAllAnalyses);
router.get('/analyses/:id', getAnalysisById);
router.delete('/analyses/:id', deleteAnalysis);


export default router;