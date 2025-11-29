 
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

import authRoutes from './routes/auth.js';
import questionRoutes from './routes/questions.js';
import topicRoutes from './routes/topics.js';

dotenv.config();

const app = express();

/* ----------- ES MODULE __dirname FIX ----------- */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/* ----------- MIDDLEWARE ----------- */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const corsOptions = {
  origin:
    process.env.NODE_ENV === 'production'
      ? process.env.CLIENT_URL
      : 'http://localhost:5173',
  credentials: true
};

app.use(cors(corsOptions));

/* ----------- MONGODB ----------- */
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('MongoDB connection error:', error));

/* ----------- API ROUTES ----------- */
app.use('/api/auth', authRoutes);
app.use('/api/questions', questionRoutes);
app.use('/api/topics', topicRoutes);

/* ----------- SERVE FRONTEND (ONLY IF dist EXISTS) ----------- */
const clientDistPath = path.join(__dirname, '..', 'dist');

if (fs.existsSync(clientDistPath)) {
  app.use(express.static(clientDistPath));

  // ✅ SAFE SPA FALLBACK (NO app.get('*'))
  app.use((req, res) => {
    res.sendFile(path.join(clientDistPath, 'index.html'));
  });
}

/* ----------- START SERVER ----------- */
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

