import cors from 'cors';
import express from 'express';
import dotenv from 'dotenv';
import resumeRoutes from './routes/resumeRoutes.js';

dotenv.config();

const app=express();

app.use(express.json());
app.use(cors())

app.use("/api/resume", resumeRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
})