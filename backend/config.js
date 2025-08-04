require('dotenv').config();

module.exports = {
  port: process.env.PORT || 3001,
  nodeEnv: process.env.NODE_ENV || 'development',
  
  // Database Configuration
  database: {
    type: process.env.DB_TYPE || 'mysql',
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 3306,
    name: process.env.DB_NAME || 'car_dealership',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    // For SQLite
    filename: process.env.DB_FILENAME || './database.sqlite'
  },
  
  khalti: {
    secretKey: process.env.KHALTI_SECRET_KEY || 'test_secret_key',
    publicKey: process.env.KHALTI_PUBLIC_KEY || 'test_public_key',
    baseUrl: process.env.KHALTI_BASE_URL || 'https://khalti.com/api/v2'
  }
}; 