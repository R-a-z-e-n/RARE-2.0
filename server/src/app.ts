import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import apiRoutes from './routes/api';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Main API Routes
app.use('/api', apiRoutes);

// Root route for healthy check
app.get('/', (req, res) => {
  res.send('RARE Wellness API is running...');
});

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error' });
});

export default app;
