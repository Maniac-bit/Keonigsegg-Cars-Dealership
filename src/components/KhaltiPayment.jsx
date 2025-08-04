import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import apiService from "../services/api";
import { toast } from "sonner";

const KhaltiPayment = ({ car, onPaymentSuccess, onPaymentCancel }) => {
  const [formData, setFormData] = useState({
    customer_name: "",
    customer_email: "",
    customer_phone: "",
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentStep, setPaymentStep] = useState("form"); // form, processing, success

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const simulatePaymentGateway = async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          transaction_id: `KHALTI_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          amount: car.price,
          status: "completed"
        });
      }, 2000); // 2 second simulation
    });
  };

  const handlePayment = async () => {
    if (!formData.customer_name || !formData.customer_email || !formData.customer_phone) {
      toast.error("Please fill in all fields");
      return;
    }

    setIsProcessing(true);
    setPaymentStep("processing");

    try {
      console.log("🚀 Starting payment process...");
      
      // Step 1: Create order
      const orderData = {
        customer_name: formData.customer_name,
        customer_email: formData.customer_email,
        customer_phone: formData.customer_phone,
        car_id: car.id,
        total_amount: car.price,
      };

      console.log("📝 Creating order...");
      const orderResult = await apiService.createOrder(orderData);
      console.log("✅ Order created:", orderResult);

      // Step 2: Simulate Khalti payment gateway
      console.log("💳 Processing payment through Khalti...");
      const khaltiResult = await simulatePaymentGateway();
      console.log("✅ Khalti payment completed:", khaltiResult);

      // Step 3: Process payment in our system
      const paymentData = {
        order_id: orderResult.order_id,
        customer_name: formData.customer_name,
        customer_email: formData.customer_email,
        customer_phone: formData.customer_phone,
        car_id: car.id,
        car_name: car.name,
        car_brand: car.brand,
        amount: car.price,
        payment_method: "Khalti",
        transaction_id: khaltiResult.transaction_id,
        payment_status: "completed",
      };

      console.log("💾 Saving payment record...");
      const paymentResult = await apiService.processPayment(paymentData);
      console.log("✅ Payment saved:", paymentResult);

      // Step 4: Success
      setPaymentStep("success");
      toast.success("🎉 Payment completed successfully!");
      
      setTimeout(() => {
        onPaymentSuccess(paymentResult.payment_id);
      }, 2000);

    } catch (error) {
      console.error("❌ Payment error:", error);
      toast.error(`Payment failed: ${error.message || 'Please try again.'}`);
      setPaymentStep("form");
    } finally {
      setIsProcessing(false);
    }
  };

  if (paymentStep === "processing") {
    return (
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-center">
            Processing Payment
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-green-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Processing your payment through Khalti...</p>
            <p className="text-sm text-gray-500 mt-2">Please wait, this may take a few seconds.</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (paymentStep === "success") {
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
            <p className="text-sm text-gray-500 mt-2">You will receive a confirmation email shortly.</p>
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
            {isProcessing ? "Processing..." : "Pay with Khalti"}
          </Button>
        </div>

        <p className="text-xs text-gray-500 text-center">
          By completing this purchase, you agree to our terms and conditions.
        </p>
      </CardContent>
    </Card>
  );
};

export default KhaltiPayment; 