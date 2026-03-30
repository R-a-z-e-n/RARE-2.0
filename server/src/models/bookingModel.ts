import db from '../config/db';
import { randomUUID } from 'crypto';

export interface Booking {
  id: string;
  userId: string;
  serviceId: number;
  date: string;
  status: string;
  createdAt: string;
}

export const bookingModel = {
  create: (booking: Partial<Booking>) => {
    const id = randomUUID();
    const { userId, serviceId, date, status = 'pending' } = booking;
    const stmt = db.prepare(`
      INSERT INTO bookings (id, userId, serviceId, date, status)
      VALUES (?, ?, ?, ?, ?)
    `);
    stmt.run(id, userId, serviceId, date, status);
    return { id, userId, serviceId, date, status } as Booking;
  },

  listByUserId: (userId: string) => {
    const stmt = db.prepare(`
      SELECT b.*, s.name as serviceName, s.image as serviceImage, s.location as serviceLocation
      FROM bookings b
      JOIN services s ON b.serviceId = s.id
      WHERE b.userId = ?
      ORDER BY b.createdAt DESC
    `);
    const rows = stmt.all(userId) as any[];
    return rows;
  },

  updateStatus: (id: string, status: string) => {
    const stmt = db.prepare('UPDATE bookings SET status = ? WHERE id = ?');
    stmt.run(status, id);
  }
};
