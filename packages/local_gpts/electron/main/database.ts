// electron/main/database.ts

import path from 'path';
import { open } from 'sqlite';
import sqlite3 from 'sqlite3';
import { directory_name } from '.';

// Type for our Folder schema

// Opening the SQLite database
const openDb = async () => {
    return open({
        filename: path.join(directory_name, 'folderManagement.db'),
        driver: sqlite3.Database,
    });
};

// Initialize the database and create the table
export const initDb = async () => {
    const db = await openDb();

    // Creating the folders table
    await db.exec(`CREATE TABLE IF NOT EXISTS folders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    fullPath TEXT NOT NULL,
    directoryTree TEXT,
    gitDetails TEXT
  )`);

    return db;
};

export default openDb;
