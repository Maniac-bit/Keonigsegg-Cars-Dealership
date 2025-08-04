import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { toast } from "sonner";

const SimpleAdminDashboard = () => {
  const [payments, setPayments] = useState([]);
  const [orders, setOrders] = useState([]);
  const [logs, setLogs] = useState([]);
  const [testDriveRequests, setTestDriveRequests] = useState([]);
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    loadData();
    // Clean up any existing duplicates
    cleanupDuplicateData();
    // Auto-refresh every 2 seconds to catch new payments
    const interval = setInterval(loadData, 2000);
    
    // Listen for payment completion events
    const handlePaymentCompleted = () => {
      console.log('Payment completed event received, refreshing data...');
      loadData();
    };
    
    window.addEventListener('paymentCompleted', handlePaymentCompleted);
    
    return () => {
      clearInterval(interval);
      window.removeEventListener('paymentCompleted', handlePaymentCompleted);
    };
  }, []);

  const cleanupDuplicateData = () => {
    try {
      // Clean up payments
      const paymentsData = JSON.parse(localStorage.getItem('payments') || '[]');
      const uniquePayments = paymentsData.filter((payment, index, self) => 
        index === self.findIndex(p => p.id === payment.id)
      );
      
      // Fix amount types (convert strings to numbers)
      const fixedPayments = uniquePayments.map(payment => ({
        ...payment,
        amount: typeof payment.amount === 'string' ? parseFloat(payment.amount) : payment.amount
      }));
      
      if (fixedPayments.length !== paymentsData.length || fixedPayments.some(p => typeof p.amount === 'string')) {
        localStorage.setItem('payments', JSON.stringify(fixedPayments));
        console.log(`Cleaned up ${paymentsData.length - fixedPayments.length} duplicate payments and fixed amount types`);
      }

      // Clean up orders
      const ordersData = JSON.parse(localStorage.getItem('orders') || '[]');
      const uniqueOrders = ordersData.filter((order, index, self) => 
        index === self.findIndex(o => o.id === order.id)
      );
      
      // Fix total_amount types (convert strings to numbers)
      const fixedOrders = uniqueOrders.map(order => ({
        ...order,
        total_amount: typeof order.total_amount === 'string' ? parseFloat(order.total_amount) : order.total_amount
      }));
      
      if (fixedOrders.length !== ordersData.length || fixedOrders.some(o => typeof o.total_amount === 'string')) {
        localStorage.setItem('orders', JSON.stringify(fixedOrders));
        console.log(`Cleaned up ${ordersData.length - fixedOrders.length} duplicate orders and fixed amount types`);
      }

      // Clean up logs
      const logsData = JSON.parse(localStorage.getItem('admin_logs') || '[]');
      const uniqueLogs = logsData.filter((log, index, self) => 
        index === self.findIndex(l => l.id === log.id)
      );
      if (uniqueLogs.length !== logsData.length) {
        localStorage.setItem('admin_logs', JSON.stringify(uniqueLogs));
        console.log(`Cleaned up ${logsData.length - uniqueLogs.length} duplicate logs`);
      }
    } catch (error) {
      console.error('Error cleaning up duplicate data:', error);
    }
  };

  const loadData = () => {
    try {
      const paymentsData = JSON.parse(localStorage.getItem('payments') || '[]');
      const ordersData = JSON.parse(localStorage.getItem('orders') || '[]');
      const logsData = JSON.parse(localStorage.getItem('admin_logs') || '[]');
      const testDriveData = JSON.parse(localStorage.getItem('test_drive_requests') || '[]');
      
      // Remove duplicates based on ID and fix amount types
      const uniquePayments = paymentsData.filter((payment, index, self) => 
        index === self.findIndex(p => p.id === payment.id)
      ).map(payment => ({
        ...payment,
        amount: typeof payment.amount === 'string' ? parseFloat(payment.amount) : payment.amount
      }));
      
      const uniqueOrders = ordersData.filter((order, index, self) => 
        index === self.findIndex(o => o.id === order.id)
      ).map(order => ({
        ...order,
        total_amount: typeof order.total_amount === 'string' ? parseFloat(order.total_amount) : order.total_amount
      }));
      
      const uniqueLogs = logsData.filter((log, index, self) => 
        index === self.findIndex(l => l.id === log.id)
      );

      const uniqueTestDrives = testDriveData.filter((request, index, self) => 
        index === self.findIndex(r => r.id === request.id)
      );
      
      // Only update state if data has actually changed
      setPayments(prevPayments => {
        if (JSON.stringify(prevPayments) !== JSON.stringify(uniquePayments)) {
          return uniquePayments;
        }
        return prevPayments;
      });
      
      setOrders(prevOrders => {
        if (JSON.stringify(prevOrders) !== JSON.stringify(uniqueOrders)) {
          return uniqueOrders;
        }
        return prevOrders;
      });
      
      setLogs(prevLogs => {
        if (JSON.stringify(prevLogs) !== JSON.stringify(uniqueLogs)) {
          return uniqueLogs;
        }
        return prevLogs;
      });

      setTestDriveRequests(prevTestDrives => {
        if (JSON.stringify(prevTestDrives) !== JSON.stringify(uniqueTestDrives)) {
          return uniqueTestDrives;
        }
        return prevTestDrives;
      });
      
    } catch (error) {
      console.error('Error loading data:', error);
    }
  };

  const totalRevenue = payments.reduce((sum, payment) => {
    // Ensure payment.amount is treated as a number
    const amount = typeof payment.amount === 'string' ? parseFloat(payment.amount) : payment.amount;
    return sum + (amount || 0);
  }, 0);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Payment Management</h1>
            <p className="text-gray-600 mt-2">View and manage all payment records</p>
          </div>
          <div className="flex space-x-3">
            <Button onClick={loadData} className="bg-blue-600 hover:bg-blue-700">
              🔄 Refresh Data
            </Button>
            <Button 
              onClick={() => {
                cleanupDuplicateData();
                loadData();
                toast.success('Data types fixed and duplicates removed');
              }}
              variant="outline"
              className="text-green-600 hover:text-green-700 hover:bg-green-50"
            >
              🔧 Fix Data Types
            </Button>
            <Button 
              onClick={() => {
                if (window.confirm('Are you sure you want to clear all payment data? This cannot be undone.')) {
                  localStorage.removeItem('payments');
                  localStorage.removeItem('orders');
                  localStorage.removeItem('admin_logs');
                  loadData();
                  toast.success('All data cleared successfully');
                }
              }}
              variant="outline"
              className="text-red-600 hover:text-red-700 hover:bg-red-50"
            >
              🗑️ Clear All Data
            </Button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex space-x-1 bg-white p-1 rounded-lg shadow-sm mb-8">
          {[
            { id: "overview", label: "Overview" },
            { id: "payments", label: "Payments" },
            { id: "orders", label: "Orders" },
            { id: "testdrives", label: "Test Drives" },
            { id: "logs", label: "Activity Logs" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? "bg-blue-600 text-white"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === "overview" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">${totalRevenue.toLocaleString()}</div>
                  <p className="text-xs text-gray-600">From all payments</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-sm font-medium">Total Payments</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{payments.length}</div>
                  <p className="text-xs text-gray-600">Completed transactions</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{orders.length}</div>
                  <p className="text-xs text-gray-600">All orders</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-sm font-medium">Test Drive Requests</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{testDriveRequests.length}</div>
                  <p className="text-xs text-gray-600">Pending requests</p>
                </CardContent>
              </Card>
            </div>

            {/* Debug Section */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium">Debug Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-xs space-y-2">
                  <p><strong>localStorage payments:</strong> {localStorage.getItem('payments') ? '✅ Found' : '❌ Not found'}</p>
                  <p><strong>localStorage orders:</strong> {localStorage.getItem('orders') ? '✅ Found' : '❌ Not found'}</p>
                  <p><strong>localStorage admin_logs:</strong> {localStorage.getItem('admin_logs') ? '✅ Found' : '❌ Not found'}</p>
                  <p><strong>localStorage test_drive_requests:</strong> {localStorage.getItem('test_drive_requests') ? '✅ Found' : '❌ Not found'}</p>
                  <p><strong>Payments count:</strong> {payments.length} records</p>
                  <p><strong>Orders count:</strong> {orders.length} records</p>
                  <p><strong>Logs count:</strong> {logs.length} records</p>
                  <p><strong>Test Drive Requests count:</strong> {testDriveRequests.length} records</p>
                  <p><strong>Last refresh:</strong> {new Date().toLocaleTimeString()}</p>
                  <p><strong>Total revenue:</strong> ${totalRevenue.toLocaleString()}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Payments Tab */}
        {activeTab === "payments" && (
          <Card>
            <CardHeader>
              <CardTitle>Payment Records ({payments.length})</CardTitle>
            </CardHeader>
            <CardContent>
              {payments.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <p>No payments found. Make a payment to see it here!</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-2">Customer</th>
                        <th className="text-left py-2">Vehicle</th>
                        <th className="text-left py-2">Amount</th>
                        <th className="text-left py-2">Method</th>
                        <th className="text-left py-2">Status</th>
                        <th className="text-left py-2">Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {payments.map((payment) => (
                        <tr key={payment.id} className="border-b hover:bg-gray-50">
                          <td className="py-2">
                            <div>
                              <div className="font-medium">{payment.customer_name}</div>
                              <div className="text-gray-500 text-xs">{payment.customer_email}</div>
                            </div>
                          </td>
                          <td className="py-2">{payment.car_name}</td>
                          <td className="py-2 font-medium">${payment.amount.toLocaleString()}</td>
                          <td className="py-2">{payment.payment_method}</td>
                          <td className="py-2">
                            <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
                              {payment.status}
                            </span>
                          </td>
                          <td className="py-2 text-gray-500">
                            {new Date(payment.timestamp).toLocaleDateString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Orders Tab */}
        {activeTab === "orders" && (
          <Card>
            <CardHeader>
              <CardTitle>Orders ({orders.length})</CardTitle>
            </CardHeader>
            <CardContent>
              {orders.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <p>No orders found. Make a payment to see orders here!</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-2">Customer</th>
                        <th className="text-left py-2">Amount</th>
                        <th className="text-left py-2">Status</th>
                        <th className="text-left py-2">Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.map((order) => (
                        <tr key={order.id} className="border-b hover:bg-gray-50">
                          <td className="py-2">
                            <div>
                              <div className="font-medium">{order.customer_name}</div>
                              <div className="text-gray-500 text-xs">{order.customer_email}</div>
                            </div>
                          </td>
                          <td className="py-2 font-medium">${order.total_amount.toLocaleString()}</td>
                          <td className="py-2">
                            <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
                              {order.status}
                            </span>
                          </td>
                          <td className="py-2 text-gray-500">
                            {new Date(order.timestamp).toLocaleDateString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Test Drive Requests Tab */}
        {activeTab === "testdrives" && (
          <Card>
            <CardHeader>
              <CardTitle>Test Drive Requests ({testDriveRequests.length})</CardTitle>
            </CardHeader>
            <CardContent>
              {testDriveRequests.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <p>No test drive requests found. Schedule a test drive to see requests here!</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-2">Customer</th>
                        <th className="text-left py-2">Vehicle</th>
                        <th className="text-left py-2">Preferred Date/Time</th>
                        <th className="text-left py-2">Status</th>
                        <th className="text-left py-2">Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {testDriveRequests.map((request) => (
                        <tr key={request.id} className="border-b hover:bg-gray-50">
                          <td className="py-2">
                            <div>
                              <div className="font-medium">{request.customer_name}</div>
                              <div className="text-gray-500 text-xs">{request.customer_email}</div>
                              <div className="text-gray-500 text-xs">{request.customer_phone}</div>
                            </div>
                          </td>
                          <td className="py-2">{request.car_name}</td>
                          <td className="py-2">
                            <div>
                              <div className="text-sm">{request.preferred_date || 'Not specified'}</div>
                              <div className="text-xs text-gray-500">{request.preferred_time || 'Not specified'}</div>
                            </div>
                          </td>
                          <td className="py-2">
                            <span className="px-2 py-1 rounded-full text-xs bg-yellow-100 text-yellow-800">
                              {request.status}
                            </span>
                          </td>
                          <td className="py-2 text-gray-500">
                            {new Date(request.timestamp).toLocaleDateString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Activity Logs Tab */}
        {activeTab === "logs" && (
          <Card>
            <CardHeader>
              <CardTitle>Activity Logs ({logs.length})</CardTitle>
            </CardHeader>
            <CardContent>
              {logs.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <p>No activity logs found. Make a payment to see logs here!</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {logs.map((log) => (
                    <div key={log.id} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className="font-medium text-sm">{log.action}</span>
                          <span className="text-xs text-gray-500">
                            {new Date(log.timestamp).toLocaleString()}
                          </span>
                        </div>
                        {log.details && (
                          <div className="text-sm text-gray-600 mt-1">
                            {log.details}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default SimpleAdminDashboard; 