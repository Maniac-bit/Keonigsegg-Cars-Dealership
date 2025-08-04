const db = require('./connection');

class DatabaseModels {
  async initializeTables() {
    try {
      await this.createCarsTable();
      await this.createContactsTable();
      await this.createOrdersTable();
      await this.createInquiriesTable();
      await this.createPaymentsTable();
      await this.createAdminLogsTable();
      console.log('Database tables initialized successfully');
    } catch (error) {
      console.error('Error initializing tables:', error);
      throw error;
    }
  }

  async createCarsTable() {
    const createCarsTableSQL = `
      CREATE TABLE IF NOT EXISTS cars (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        brand VARCHAR(255) NOT NULL,
        price DECIMAL(10,2) NOT NULL,
        image TEXT,
        images TEXT,
        category VARCHAR(100),
        year INT,
        mileage INT DEFAULT 0,
        fuelType VARCHAR(50),
        transmission VARCHAR(50),
        description TEXT,
        features TEXT,
        specifications TEXT,
        isFeatured BOOLEAN DEFAULT FALSE,
        available BOOLEAN DEFAULT TRUE,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      );
    `;
    await db.execute(createCarsTableSQL);
  }

  async createContactsTable() {
    const createContactsTableSQL = `
      CREATE TABLE IF NOT EXISTS contacts (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(50),
        message TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;
    await db.execute(createContactsTableSQL);
  }

  async createOrdersTable() {
    const createOrdersTableSQL = `
      CREATE TABLE IF NOT EXISTS orders (
        id INT AUTO_INCREMENT PRIMARY KEY,
        car_id INT,
        customer_name VARCHAR(255) NOT NULL,
        customer_email VARCHAR(255) NOT NULL,
        customer_phone VARCHAR(50),
        total_amount DECIMAL(10,2) NOT NULL,
        status VARCHAR(50) DEFAULT 'pending',
        khalti_transaction_id VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (car_id) REFERENCES cars(id)
      );
    `;
    await db.execute(createOrdersTableSQL);
  }

  async createInquiriesTable() {
    const createInquiriesTableSQL = `
      CREATE TABLE IF NOT EXISTS inquiries (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT,
        car_id INT,
        message TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (car_id) REFERENCES cars(id)
      );
    `;
    await db.execute(createInquiriesTableSQL);
  }

  async createPaymentsTable() {
    const createPaymentsTableSQL = `
      CREATE TABLE IF NOT EXISTS payments (
        id INT AUTO_INCREMENT PRIMARY KEY,
        order_id INT,
        customer_name VARCHAR(255) NOT NULL,
        customer_email VARCHAR(255) NOT NULL,
        customer_phone VARCHAR(50),
        car_id INT,
        car_name VARCHAR(255),
        car_brand VARCHAR(255),
        amount DECIMAL(10,2) NOT NULL,
        payment_method VARCHAR(100),
        transaction_id VARCHAR(255),
        payment_status VARCHAR(50) DEFAULT 'pending',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (order_id) REFERENCES orders(id),
        FOREIGN KEY (car_id) REFERENCES cars(id)
      );
    `;
    await db.execute(createPaymentsTableSQL);
  }

  async createAdminLogsTable() {
    const createAdminLogsTableSQL = `
      CREATE TABLE IF NOT EXISTS admin_logs (
        id INT AUTO_INCREMENT PRIMARY KEY,
        action VARCHAR(255) NOT NULL,
        details TEXT,
        user_type VARCHAR(50) DEFAULT 'system',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;
    await db.execute(createAdminLogsTableSQL);
  }

  // ... Your remaining methods are already correct (getAllCars, createCar, etc.)
  // Keep the rest of the code as-is.
}

module.exports = new DatabaseModels();
