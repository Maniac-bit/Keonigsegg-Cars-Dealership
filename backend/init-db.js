require('dotenv').config();
const db = require('./database/connection');
const models = require('./database/models');
const seedScript = require('./database/seed');

async function initializeDatabase() {
  try {
    console.log('Initializing database...');
    
    // Connect to database
    await db.connect();
    
    // Initialize tables
    await models.initializeTables();
    
    // Seed cars data
    await seedScript();
    
    // Disconnect from database
    await db.disconnect();
    
    console.log('Database initialization completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Database initialization failed:', error);
    process.exit(1);
  }
}

initializeDatabase(); 