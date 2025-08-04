const express = require('express');
const cors = require('cors');
const db = require('./database/connection');
const app = express();

app.use(cors());
app.use(express.json());

(async () => {
  try {
    await db.connect();

    app.get('/cars', async (req, res) => {
      try {
        const results = await db.query('SELECT * FROM cars WHERE available = TRUE');
        res.json(results);
      } catch (err) {
        res.status(500).send(err);
      }
    });

    app.get('/cars/:id', async (req, res) => {
      try {
        const id = req.params.id;
        const results = await db.query('SELECT * FROM cars WHERE id = ? AND available = TRUE', [id]);
        if (results.length === 0) {
          return res.status(404).json({ error: 'Car not found' });
        }
        // Parse JSON fields for frontend compatibility
        const car = results[0];
        car.images = JSON.parse(car.images || '[]');
        car.features = JSON.parse(car.features || '[]');
        car.specifications = JSON.parse(car.specifications || '{}');
        res.json(car);
      } catch (err) {
        res.status(500).send(err);
      }
    });

    app.post('/inquiries', async (req, res) => {
      const { user_id, car_id, message } = req.body;
      try {
        const result = await db.execute(
          'INSERT INTO inquiries (user_id, car_id, message) VALUES (?, ?, ?)',
          [user_id, car_id, message]
        );
        res.json({ success: true, inquiry_id: result.insertId });
      } catch (err) {
        res.status(500).send(err);
      }
    });

    // Contact form endpoint
    app.post('/contact', async (req, res) => {
      const { name, email, phone, message } = req.body;
      try {
        const result = await db.execute(
          'INSERT INTO contacts (name, email, phone, message, created_at) VALUES (?, ?, ?, ?, NOW())',
          [name, email, phone, message]
        );
        res.json({ success: true, contact_id: result.insertId });
      } catch (err) {
        console.error('Contact form error:', err);
        res.status(500).json({ error: 'Failed to submit contact form' });
      }
    });

    // Orders endpoints
    app.post('/orders', async (req, res) => {
      console.log('Order creation request received:', req.body);
      const { customer_name, customer_email, customer_phone, car_id, total_amount } = req.body;
      try {
        console.log('Creating order in database...');
        const result = await db.execute(
          'INSERT INTO orders (customer_name, customer_email, customer_phone, car_id, total_amount, status, created_at) VALUES (?, ?, ?, ?, ?, "pending", NOW())',
          [customer_name, customer_email, customer_phone, car_id, total_amount]
        );
        console.log('Order created successfully:', result);
        res.json({ success: true, order_id: result.insertId });
      } catch (err) {
        console.error('Order creation error:', err);
        res.status(500).json({ error: 'Failed to create order' });
      }
    });

    // Payment processing endpoint
    app.post('/payments', async (req, res) => {
      console.log('Payment request received:', req.body);
      
      const { 
        order_id, 
        customer_name, 
        customer_email, 
        customer_phone, 
        car_id, 
        car_name, 
        car_brand,
        amount, 
        payment_method, 
        transaction_id, 
        payment_status 
      } = req.body;
      
      try {
        console.log('Inserting payment record...');
        // Insert payment record
        const paymentResult = await db.execute(
          'INSERT INTO payments (order_id, customer_name, customer_email, customer_phone, car_id, car_name, car_brand, amount, payment_method, transaction_id, payment_status, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())',
          [order_id, customer_name, customer_email, customer_phone, car_id, car_name, car_brand, amount, payment_method, transaction_id, payment_status]
        );

        console.log('Payment record inserted:', paymentResult);

        // Update order status
        await db.execute(
          'UPDATE orders SET status = ? WHERE id = ?',
          [payment_status === 'completed' ? 'paid' : 'pending', order_id]
        );

        console.log('Order status updated');

        // Log to admin activity
        const logDetails = JSON.stringify({
          payment_id: paymentResult.insertId,
          order_id,
          customer_name,
          car_name: `${car_brand} ${car_name}`,
          amount,
          payment_method,
          status: payment_status
        });
        
        console.log('Creating admin log entry:', logDetails);
        await db.execute(
          'INSERT INTO admin_logs (action, details, user_type, created_at) VALUES (?, ?, ?, NOW())',
          ['payment_processed', logDetails, 'system']
        );

        console.log('Admin log entry created');

        res.json({ 
          success: true, 
          payment_id: paymentResult.insertId,
          message: 'Payment processed successfully'
        });
      } catch (err) {
        console.error('Payment processing error:', err);
        res.status(500).json({ error: 'Failed to process payment' });
      }
    });

    // Get all payments for admin
    app.get('/payments', async (req, res) => {
      try {
        const results = await db.query('SELECT * FROM payments ORDER BY created_at DESC');
        res.json(results);
      } catch (err) {
        res.status(500).json({ error: 'Failed to fetch payments' });
      }
    });

    // Get admin logs
    app.get('/admin/logs', async (req, res) => {
      try {
        const results = await db.query('SELECT * FROM admin_logs ORDER BY created_at DESC LIMIT 100');
        res.json(results);
      } catch (err) {
        res.status(500).json({ error: 'Failed to fetch admin logs' });
      }
    });

    app.get('/orders/:id', async (req, res) => {
      try {
        const id = req.params.id;
        const results = await db.query('SELECT * FROM orders WHERE id = ?', [id]);
        if (results.length === 0) {
          return res.status(404).json({ error: 'Order not found' });
        }
        res.json(results[0]);
      } catch (err) {
        res.status(500).json({ error: 'Failed to fetch order' });
      }
    });

    app.get('/orders', async (req, res) => {
      try {
        const results = await db.query('SELECT * FROM orders ORDER BY created_at DESC');
        res.json(results);
      } catch (err) {
        res.status(500).json({ error: 'Failed to fetch orders' });
      }
    });

    app.get('/contacts', async (req, res) => {
      try {
        const results = await db.query('SELECT * FROM contacts ORDER BY created_at DESC');
        res.json(results);
      } catch (err) {
        res.status(500).json({ error: 'Failed to fetch contacts' });
      }
    });

    // Admin authentication endpoint
    app.post('/admin/login', async (req, res) => {
      console.log('Admin login request received:', req.body);
      const { username, password } = req.body;
      try {
        // Simple admin authentication - username and password both "admin"
        if (username === "admin" && password === "admin") {
          console.log('Admin login successful');
          res.json({ 
            success: true, 
            message: 'Admin login successful',
            admin: { username: 'admin' }
          });
        } else {
          console.log('Admin login failed - invalid credentials');
          res.status(401).json({ 
            success: false, 
            message: 'Invalid admin credentials' 
          });
        }
      } catch (err) {
        console.error('Admin login error:', err);
        res.status(500).json({ error: 'Failed to authenticate admin' });
      }
    });

    // Health check endpoint
    app.get('/health', (req, res) => {
      res.json({ status: 'OK', timestamp: new Date().toISOString() });
    });

    const PORT = process.env.PORT || 3001;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (err) {
    console.error('Failed to connect to the database:', err);
    process.exit(1);
  }
})();
