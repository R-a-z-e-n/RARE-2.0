import db from '../config/db';

export interface Product {
  id: number;
  brand: string;
  name: string;
  image: string;
  price: number;
  category: string;
  rating: number;
  description: string;
  ingredients: string;
  usage: string;
  stock: number;
}

export const productModel = {
  list: (category?: string): Product[] => {
    let stmt;
    if (category) {
      stmt = db.prepare('SELECT * FROM products WHERE category = ?');
      return stmt.all(category) as Product[];
    }
    stmt = db.prepare('SELECT * FROM products');
    return stmt.all() as Product[];
  },

  findById: (id: number): Product | undefined => {
    const stmt = db.prepare('SELECT * FROM products WHERE id = ?');
    return stmt.get(id) as Product | undefined;
  },

  create: (product: Partial<Product>) => {
    const { brand, name, image, price, category, rating = 0, description, ingredients, usage, stock = 100 } = product;
    const stmt = db.prepare(`
      INSERT INTO products (brand, name, image, price, category, rating, description, ingredients, usage, stock)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);
    const info = stmt.run(brand, name, image, price, category, rating, description, ingredients, usage, stock);
    return { ...product, id: info.lastInsertRowid } as Product;
  },

  updateStock: (id: number, quantity: number) => {
    const stmt = db.prepare('UPDATE products SET stock = stock - ? WHERE id = ?');
    stmt.run(quantity, id);
  }
};
