import fs from "fs";
import path from "path";
import crypto from "crypto";

// Use native SQLite from Node.js 22
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { DatabaseSync } = require("node:sqlite");

const DB_DIR = path.join(process.cwd(), "prisma");
if (!fs.existsSync(DB_DIR)) {
  fs.mkdirSync(DB_DIR, { recursive: true });
}
const DB_PATH = path.join(DB_DIR, "directorio.db");

// Singleton connection
declare global {
  // eslint-disable-next-line no-var
  var _sqliteDb: any;
}

function getDatabase() {
  if (!global._sqliteDb) {
    const db = new DatabaseSync(DB_PATH);
    // Initialize schema
    db.exec(`
      PRAGMA foreign_keys = ON;

      CREATE TABLE IF NOT EXISTS users (
        id TEXT PRIMARY KEY,
        email TEXT UNIQUE NOT NULL,
        name TEXT NOT NULL,
        passwordHash TEXT,
        image TEXT,
        provider TEXT DEFAULT 'credentials',
        role TEXT DEFAULT 'USER',
        createdAt TEXT DEFAULT CURRENT_TIMESTAMP,
        updatedAt TEXT DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS categories (
        id TEXT PRIMARY KEY,
        slug TEXT UNIQUE NOT NULL,
        name TEXT NOT NULL,
        icon TEXT NOT NULL,
        description TEXT,
        color TEXT
      );

      CREATE TABLE IF NOT EXISTS businesses (
        id TEXT PRIMARY KEY,
        slug TEXT UNIQUE NOT NULL,
        name TEXT NOT NULL,
        description TEXT NOT NULL,
        shortDescription TEXT,
        categoryId TEXT NOT NULL,
        country TEXT NOT NULL,
        countryCode TEXT NOT NULL,
        city TEXT NOT NULL,
        address TEXT NOT NULL,
        latitude REAL NOT NULL,
        longitude REAL NOT NULL,
        logoUrl TEXT,
        bannerUrl TEXT,
        whatsapp TEXT NOT NULL,
        phone TEXT,
        email TEXT,
        website TEXT,
        instagram TEXT,
        facebook TEXT,
        linkedin TEXT,
        schedule TEXT,
        featured INTEGER DEFAULT 0,
        verified INTEGER DEFAULT 1,
        rating REAL DEFAULT 5.0,
        userId TEXT NOT NULL,
        createdAt TEXT DEFAULT CURRENT_TIMESTAMP,
        updatedAt TEXT DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (categoryId) REFERENCES categories(id) ON DELETE RESTRICT,
        FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
      );

      CREATE INDEX IF NOT EXISTS idx_businesses_city ON businesses(city);
      CREATE INDEX IF NOT EXISTS idx_businesses_country ON businesses(country);
      CREATE INDEX IF NOT EXISTS idx_businesses_category ON businesses(categoryId);
      CREATE INDEX IF NOT EXISTS idx_businesses_featured ON businesses(featured);
    `);
    global._sqliteDb = db;
  }
  return global._sqliteDb;
}

export const sqliteDb = getDatabase();

export function generateId(): string {
  return crypto.randomUUID();
}
