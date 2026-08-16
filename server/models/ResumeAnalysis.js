import mongoose from "mongoose";
import User from "./User.js";

const ResumeAnalysis =new  mongoose.Schema(
  {
    fileName: {
      type: String,
      required: true,
    },

    overallScore: {
      type: Number,
      required: true,
    },

    categoryScores: {
      skills: { type: Number, required: true },
      projects: { type: Number, required: true },
      experience: { type: Number, required: true },
      education: { type: Number, required: true },
      ats: { type: Number, required: true },
      formatting: { type: Number, required: true },
    },

    strengths: {
      type: [String],
      required: true,
    },

    weaknesses: {
      type: [String],
      required: true,
    },

    missingSkills: {
      type: [String],
      required: true,
    },

    suggestions: {
      type: [String],
      required: true,
    },

    user:{
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    }
  },
  { timestamps: true }
);

const Resume = mongoose.model("resume", ResumeAnalysis);

export default Resume;