const API_BASE_URL = 'http://localhost:3001';

class ApiService {
  constructor() {
    this.baseURL = API_BASE_URL;
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Car-related API calls
  async getCars() {
    return this.request('/cars');
  }

  async getCarById(id) {
    return this.request(`/cars/${id}`);
  }

  async getFeaturedCars() {
    const cars = await this.getCars();
    return cars.filter(car => car.isFeatured);
  }

  // Contact form submission
  async submitContact(contactData) {
    return this.request('/contact', {
      method: 'POST',
      body: JSON.stringify(contactData),
    });
  }

  // Order-related API calls
  async createOrder(orderData) {
    return this.request('/orders', {
      method: 'POST',
      body: JSON.stringify(orderData),
    });
  }

  async getOrderById(id) {
    return this.request(`/orders/${id}`);
  }

  // Payment-related API calls
  async processPayment(paymentData) {
    return this.request('/payments', {
      method: 'POST',
      body: JSON.stringify(paymentData),
    });
  }

  async getPayments() {
    return this.request('/payments');
  }

  async getAdminLogs() {
    return this.request('/admin/logs');
  }

  // Admin API (for future use)
  async getAllOrders() {
    return this.request('/orders');
  }

  async getAllContacts() {
    return this.request('/contacts');
  }

  async adminLogin(credentials) {
    return this.request('/admin/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  }

  // Health check
  async healthCheck() {
    return this.request('/health');
  }

  // Test connection method
  async testConnection() {
    try {
      const health = await this.healthCheck();
      console.log('✅ Backend connection successful:', health);
      return true;
    } catch (error) {
      console.error('❌ Backend connection failed:', error);
      return false;
    }
  }

  // Test payment system
  async testPaymentSystem() {
    try {
      console.log('Testing payment system connection...');
      
      // Test health check
      await this.healthCheck();
      console.log('✅ Health check passed');
      
      // Test order creation
      const testOrder = await this.createOrder({
        customer_name: "Test User",
        customer_email: "test@test.com",
        customer_phone: "1234567890",
        car_id: 1,
        total_amount: 1000
      });
      console.log('✅ Order creation test passed:', testOrder);
      
      // Test payment processing
      const testPayment = await this.processPayment({
        order_id: testOrder.order_id,
        customer_name: "Test User",
        customer_email: "test@test.com",
        customer_phone: "1234567890",
        car_id: 1,
        car_name: "Test Car",
        car_brand: "Test Brand",
        amount: 1000,
        payment_method: "Test",
        transaction_id: "TEST_" + Date.now(),
        payment_status: "completed"
      });
      console.log('✅ Payment processing test passed:', testPayment);
      
      return true;
    } catch (error) {
      console.error('❌ Payment system test failed:', error);
      return false;
    }
  }
}

export default new ApiService(); 