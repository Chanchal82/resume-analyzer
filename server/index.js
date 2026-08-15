import cors from 'cors';
import express from 'express';
import dotenv from 'dotenv';
import resumeRoutes from './routes/resumeRoutes.js';
import connectDB from './utils/db.js';

dotenv.config();

const app=express();


connectDB()
app.use(express.json());
app.use(cors())

app.use("/api/resume", resumeRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
})