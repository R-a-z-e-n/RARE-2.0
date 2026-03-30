import db from '../config/db';
import { randomUUID } from 'crypto';

export interface WishlistItem {
  id: string;
  userId: string;
  productId: number;
  createdAt: string;
}

export const wishlistModel = {
  add: (userId: string, productId: number) => {
    const id = randomUUID();
    const stmt = db.prepare(`
      INSERT OR IGNORE INTO wishlist (id, userId, productId)
      VALUES (?, ?, ?)
    `);
    const info = stmt.run(id, userId, productId);
    if (info.changes === 0) {
      // Item already in wishlist, return existing or notification
      return { id, userId, productId, existing: true };
    }
    return { id, userId, productId, existing: false };
  },

  remove: (userId: string, productId: number) => {
    const stmt = db.prepare('DELETE FROM wishlist WHERE userId = ? AND productId = ?');
    stmt.run(userId, productId);
  },

  listByUserId: (userId: string) => {
    const stmt = db.prepare(`
      SELECT w.*, p.name as productName, p.brand as productBrand, p.price as productPrice, p.image as productImage
      FROM wishlist w
      JOIN products p ON w.productId = p.id
      WHERE w.userId = ?
      ORDER BY w.createdAt DESC
    `);
    return stmt.all(userId) as any[];
  }
};
