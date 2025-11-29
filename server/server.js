 
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

import authRoutes from './routes/auth.js';
import questionRoutes from './routes/questions.js';
import topicRoutes from './routes/topics.js';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const app = express();

 
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
 
app.use(express.json());
app.use(express.urlencoded({extended:true}));
 
const corsOptions = {
  origin:
    process.env.NODE_ENV === 'production'
      ? process.env.CLIENT_URL
      : 'http://localhost:5173',
  credentials: true
};

app.use(cors(corsOptions));
 
mongoose.connect(process.env.MONGODB_URI, {
  
})
.then(() => console.log('Connected to MongoDB'))
.catch((error) => console.error('MongoDB connection error:', error));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/questions', questionRoutes);
app.use('/api/topics', topicRoutes);

 
const clientDistPath = path.join(__dirname, '..', 'dist');
if (fs.existsSync(clientDistPath)) {
  app.use(express.static(clientDistPath));
  app.get('*', (req, res) => {
    res.sendFile(path.join(clientDistPath, 'index.html'));
  });
}
 
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

 {
  console.log(`Server running on port ${PORT}`);
});
