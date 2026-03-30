import Database from 'better-sqlite3';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

const dbPath = path.resolve(__dirname, '../../', process.env.DATABASE_PATH || 'database.sqlite');
const db = new Database(dbPath);

db.pragma('journal_mode = WAL');

export const initDb = () => {
  // Users Table
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      role TEXT DEFAULT 'user',
      membership TEXT DEFAULT 'Classic',
      points INTEGER DEFAULT 0,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Products Table
  db.exec(`
    CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      brand TEXT NOT NULL,
      name TEXT NOT NULL,
      image TEXT,
      price REAL NOT NULL,
      category TEXT,
      rating REAL DEFAULT 0,
      description TEXT,
      ingredients TEXT,
      usage TEXT,
      stock INTEGER DEFAULT 100
    )
  `);

  // Services Table
  db.exec(`
    CREATE TABLE IF NOT EXISTS services (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      location TEXT,
      address TEXT,
      image TEXT,
      tags TEXT, -- JSON string
      price TEXT, -- Stored as string to match mock (e.g., "₹180")
      rating REAL DEFAULT 0,
      category TEXT
    )
  `);

  // Bookings Table
  db.exec(`
    CREATE TABLE IF NOT EXISTS bookings (
      id TEXT PRIMARY KEY,
      userId TEXT NOT NULL,
      serviceId INTEGER NOT NULL,
      date TEXT NOT NULL,
      status TEXT DEFAULT 'pending',
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (userId) REFERENCES users(id),
      FOREIGN KEY (serviceId) REFERENCES services(id)
    )
  `);

  // Wishlist Table
  db.exec(`
    CREATE TABLE IF NOT EXISTS wishlist (
      id TEXT PRIMARY KEY,
      userId TEXT NOT NULL,
      productId INTEGER NOT NULL,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (userId) REFERENCES users(id),
      FOREIGN KEY (productId) REFERENCES products(id),
      UNIQUE(userId, productId)
    )
  `);

  console.log('Database initialized successfully');
};

export default db;
