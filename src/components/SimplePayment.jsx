import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { toast } from "sonner";

const SimplePayment = ({ car, onPaymentSuccess, onPaymentCancel }) => {
  const [formData, setFormData] = useState({
    customer_name: "",
    customer_email: "",
    customer_phone: "",
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentComplete, setPaymentComplete] = useState(false);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handlePayment = async () => {
    if (!formData.customer_name || !formData.customer_email || !formData.customer_phone) {
      toast.error("Please fill in all fields");
      return;
    }

    setIsProcessing(true);

    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Create a simple payment record
      const paymentRecord = {
        id: Date.now(),
        customer_name: formData.customer_name,
        customer_email: formData.customer_email,
        customer_phone: formData.customer_phone,
        car_name: `${car.brand} ${car.name}`,
        amount: Number(car.price), // Ensure it's a number
        payment_method: "Khalti",
        transaction_id: `KHALTI_${Date.now()}`,
        status: "completed",
        timestamp: new Date().toISOString()
      };

      // Store in localStorage for demo
      const existingPayments = JSON.parse(localStorage.getItem('payments') || '[]');
      
      // Check if this transaction already exists
      const transactionExists = existingPayments.some(payment => 
        payment.transaction_id === paymentRecord.transaction_id
      );
      
      if (transactionExists) {
        throw new Error('Payment already processed');
      }
      
      existingPayments.push(paymentRecord);
      localStorage.setItem('payments', JSON.stringify(existingPayments));

      // Store order
      const orderRecord = {
        id: Date.now(),
        customer_name: formData.customer_name,
        customer_email: formData.customer_email,
        customer_phone: formData.customer_phone,
        car_id: car.id,
        total_amount: Number(car.price), // Ensure it's a number
        status: "paid",
        timestamp: new Date().toISOString()
      };

      const existingOrders = JSON.parse(localStorage.getItem('orders') || '[]');
      
      // Check if this order already exists
      const orderExists = existingOrders.some(order => 
        order.customer_email === orderRecord.customer_email && 
        order.car_id === orderRecord.car_id &&
        Math.abs(new Date(order.timestamp) - new Date(orderRecord.timestamp)) < 5000 // Within 5 seconds
      );
      
      if (!orderExists) {
        existingOrders.push(orderRecord);
        localStorage.setItem('orders', JSON.stringify(existingOrders));
      }

      // Store admin log
      const logRecord = {
        id: Date.now(),
        action: "payment_processed",
        details: JSON.stringify({
          payment_id: paymentRecord.id,
          customer_name: formData.customer_name,
          car_name: paymentRecord.car_name,
          amount: car.price,
          payment_method: "Khalti",
          status: "completed"
        }),
        timestamp: new Date().toISOString()
      };

      const existingLogs = JSON.parse(localStorage.getItem('admin_logs') || '[]');
      
      // Check if this log already exists
      const logExists = existingLogs.some(log => 
        log.action === logRecord.action &&
        JSON.parse(log.details).payment_id === paymentRecord.id
      );
      
      if (!logExists) {
        existingLogs.push(logRecord);
        localStorage.setItem('admin_logs', JSON.stringify(existingLogs));
      }

      setPaymentComplete(true);
      toast.success("🎉 Payment completed successfully!");
      
      // Trigger a custom event to notify admin dashboard
      window.dispatchEvent(new CustomEvent('paymentCompleted', {
        detail: { paymentId: paymentRecord.id }
      }));
      
      setTimeout(() => {
        onPaymentSuccess(paymentRecord.id);
      }, 2000);

    } catch (error) {
      console.error("Payment error:", error);
      toast.error("Payment failed. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  if (paymentComplete) {
    return (
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-center text-green-600">
            Payment Successful! 🎉
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <p className="text-gray-600">Your payment has been processed successfully!</p>
            <p className="text-sm text-gray-500 mt-2">Transaction ID: KHALTI_{Date.now()}</p>
            <p className="text-sm text-gray-500">Amount: ${car.price.toLocaleString()}</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-center">
          Complete Purchase
        </CardTitle>
        <p className="text-center text-gray-600">
          {car.brand} {car.name} - ${car.price.toLocaleString()}
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Full Name
          </label>
          <Input
            type="text"
            name="customer_name"
            value={formData.customer_name}
            onChange={handleInputChange}
            placeholder="Enter your full name"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <Input
            type="email"
            name="customer_email"
            value={formData.customer_email}
            onChange={handleInputChange}
            placeholder="Enter your email"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Phone Number
          </label>
          <Input
            type="tel"
            name="customer_phone"
            value={formData.customer_phone}
            onChange={handleInputChange}
            placeholder="Enter your phone number"
            required
          />
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="font-semibold mb-2">Payment Summary</h4>
          <div className="space-y-1 text-sm">
            <div className="flex justify-between">
              <span>Vehicle:</span>
              <span>{car.brand} {car.name}</span>
            </div>
            <div className="flex justify-between">
              <span>Price:</span>
              <span>${car.price.toLocaleString()}</span>
            </div>
            <div className="flex justify-between font-semibold border-t pt-2">
              <span>Total:</span>
              <span>${car.price.toLocaleString()}</span>
            </div>
          </div>
        </div>

        <div className="flex space-x-3">
          <Button
            onClick={onPaymentCancel}
            variant="outline"
            className="flex-1"
            disabled={isProcessing}
          >
            Cancel
          </Button>
          <Button
            onClick={handlePayment}
            className="flex-1 bg-green-600 hover:bg-green-700"
            disabled={isProcessing}
          >
            {isProcessing ? (
              <div className="flex items-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Processing...
              </div>
            ) : (
              "Pay with Khalti"
            )}
          </Button>
        </div>

        <p className="text-xs text-gray-500 text-center">
          By completing this purchase, you agree to our terms and conditions.
        </p>
      </CardContent>
    </Card>
  );
};

export default SimplePayment; 