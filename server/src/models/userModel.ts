import db from '../config/db';

// Using crypto.randomUUID() which is available in Node.js
import { randomUUID } from 'crypto';

export interface User {
  id: string;
  name: string;
  email: string;
  password?: string;
  role: string;
  membership: string;
  points: number;
  createdAt: string;
}

export const userModel = {
  create: (user: Partial<User>): User => {
    const id = randomUUID();
    const { name, email, password, role = 'user', membership = 'Classic', points = 0 } = user;
    
    const stmt = db.prepare(`
      INSERT INTO users (id, name, email, password, role, membership, points)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `);
    
    stmt.run(id, name, email, password, role, membership, points);
    return { id, name, email, role, membership, points } as User;
  },

  findByEmail: (email: string): User | undefined => {
    const stmt = db.prepare('SELECT * FROM users WHERE email = ?');
    return stmt.get(email) as User | undefined;
  },

  findById: (id: string): User | undefined => {
    const stmt = db.prepare('SELECT * FROM users WHERE id = ?');
    return stmt.get(id) as User | undefined;
  },

  updatePoints: (id: string, points: number) => {
    const stmt = db.prepare('UPDATE users SET points = points + ? WHERE id = ?');
    stmt.run(points, id);
  }
};
