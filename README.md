Resume Analyzer

A full-stack AI Resume Analyzer built with MERN Stack and Gemini API.

Features
Resume PDF upload & validation
AI-powered resume analysis
Overall & category-wise scoring
Strengths, weaknesses & missing skills
Improvement suggestions
User authentication with JWT
User-specific analysis history
View and delete analyses
Tech Stack
Frontend: React, Tailwind CSS, Axios, React Router
Backend: Node.js, Express.js
Database: MongoDB, Mongoose
AI: Gemini API
Authentication: JWT, bcrypt
File Upload: Multer
Flow
Resume PDF
    ↓
Text Extraction
    ↓
Gemini API
    ↓
Structured Analysis
    ↓
MongoDB
    ↓
React UI
Setup
# Backend
cd backend
npm install
npm run dev


# Frontend
cd frontend
npm install
npm run dev

Create .env in the backend:

MONGO_URI
GEMINI_API_KEY
JWT_SECRET

Purpose: Built to learn how to integrate an LLM API into a real MERN application.