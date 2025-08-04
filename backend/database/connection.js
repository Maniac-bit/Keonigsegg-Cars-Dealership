require('dotenv').config();
const config = require('../config');
const mysql = require('mysql2/promise');
const { Pool } = require('pg');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

class DatabaseConnection {
  constructor() {
    this.connection = null;
    this.dbType = config.database.type;
  }

  async connect() {
    try {
      switch (this.dbType) {
        case 'mysql':
          await this.connectMySQL();
          break;
        case 'postgresql':
          await this.connectPostgreSQL();
          break;
        case 'sqlite':
          await this.connectSQLite();
          break;
        default:
          throw new Error(`Unsupported database type: ${this.dbType}`);
      }
      console.log(`Connected to ${this.dbType} database successfully`);
    } catch (error) {
      console.error('Database connection error:', error);
      throw error;
    }
  }

  async connectMySQL() {
    this.connection = await mysql.createConnection({
      host: config.database.host,
      port: config.database.port,
      user: config.database.user,
      password: config.database.password,
      database: config.database.name,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0
    });
  }

  async connectPostgreSQL() {
    this.connection = new Pool({
      host: config.database.host,
      port: config.database.port,
      user: config.database.user,
      password: config.database.password,
      database: config.database.name,
      max: 20,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 2000,
    });
  }

  async connectSQLite() {
    return new Promise((resolve, reject) => {
      const dbPath = path.resolve(config.database.filename);
      this.connection = new sqlite3.Database(dbPath, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }

  async disconnect() {
    if (this.connection) {
      if (this.dbType === 'sqlite') {
        this.connection.close();
      } else {
        await this.connection.end();
      }
      this.connection = null;
      console.log('Database connection closed');
    }
  }

  async query(sql, params = []) {
    if (!this.connection) {
      throw new Error('Database not connected');
    }

    try {
      if (this.dbType === 'sqlite') {
        return new Promise((resolve, reject) => {
          this.connection.all(sql, params, (err, rows) => {
            if (err) reject(err);
            else resolve(rows);
          });
        });
      } else {
        const [rows] = await this.connection.execute(sql, params);
        return rows;
      }
    } catch (error) {
      console.error('Query error:', error);
      throw error;
    }
  }

  async execute(sql, params = []) {
    if (!this.connection) {
      throw new Error('Database not connected');
    }

    try {
      if (this.dbType === 'sqlite') {
        return new Promise((resolve, reject) => {
          this.connection.run(sql, params, function(err) {
            if (err) reject(err);
            else resolve({ insertId: this.lastID, affectedRows: this.changes });
          });
        });
      } else {
        const [result] = await this.connection.execute(sql, params);
        return result;
      }
    } catch (error) {
      console.error('Execute error:', error);
      throw error;
    }
  }
}

module.exports = new DatabaseConnection(); 