import express from "express";
import upload from "../middleware/uploadMiddleware.js";
import { uploadResume } from "../controllers/resumeController.js";

const router = express.Router();

router.post("/upload", upload.single("file"), uploadResume);

export default router;