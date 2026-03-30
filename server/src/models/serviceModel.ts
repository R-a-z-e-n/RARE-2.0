import db from '../config/db';

export interface Service {
  id: number;
  name: string;
  location: string;
  address: string;
  image: string;
  tags: string[]; // Decoded JSON
  price: string;
  rating: number;
  category: string;
}

export const serviceModel = {
  list: (category?: string): Service[] => {
    let stmt;
    if (category) {
      stmt = db.prepare('SELECT * FROM services WHERE category = ?');
    } else {
      stmt = db.prepare('SELECT * FROM services');
    }
    const rows = stmt.all() as any[];
    return rows.map(row => ({
      ...row,
      tags: JSON.parse(row.tags || '[]')
    })) as Service[];
  },

  findById: (id: number): Service | undefined => {
    const stmt = db.prepare('SELECT * FROM services WHERE id = ?');
    const row = stmt.get(id) as any;
    if (!row) return undefined;
    return {
      ...row,
      tags: JSON.parse(row.tags || '[]')
    } as Service;
  },

  create: (service: Partial<Service>) => {
    const { name, location, address, image, tags = [], price, rating = 0, category } = service;
    const stmt = db.prepare(`
      INSERT INTO services (name, location, address, image, tags, price, rating, category)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `);
    const info = stmt.run(name, location, address, image, JSON.stringify(tags), price, rating, category);
    return { ...service, id: info.lastInsertRowid } as Service;
  }
};
