import cors from 'cors';
import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app=express();

app.use(express.json());
app.use(cors())

app.get("/api/test", (req, res) => {
  res.json({ message: "Backend is working!" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
})