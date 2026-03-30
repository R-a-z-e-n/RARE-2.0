import app from './app';
import { initDb } from './config/db';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 5000;

// Initialize Database
initDb();

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
