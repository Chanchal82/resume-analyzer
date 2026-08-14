import express from "express";
import upload from "../middleware/uploadMiddleware.js";
import { uploadResume } from "../controllers/resumeController.js";

const router = express.Router();

router.post("/analyze", upload.single("file"), uploadResume);


export default router;