import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import apiService from "../services/api";
import { toast } from "sonner";

const QuickPaymentTest = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState(null);

  const quickPayment = async () => {
    setIsProcessing(true);
    setResult(null);
    
    try {
      console.log("⚡ Quick payment test starting...");
      
      // Create test order
      const orderData = {
        customer_name: "Quick Test User",
        customer_email: "quick@test.com",
        customer_phone: "1234567890",
        car_id: 1,
        total_amount: 75000,
      };

      const orderResult = await apiService.createOrder(orderData);
      console.log("✅ Order created:", orderResult);

      // Process payment
      const paymentData = {
        order_id: orderResult.order_id,
        customer_name: "Quick Test User",
        customer_email: "quick@test.com",
        customer_phone: "1234567890",
        car_id: 1,
        car_name: "Supra Mk4",
        car_brand: "Toyota",
        amount: 75000,
        payment_method: "Khalti",
        transaction_id: `QUICK_${Date.now()}`,
        payment_status: "completed",
      };

      const paymentResult = await apiService.processPayment(paymentData);
      console.log("✅ Payment processed:", paymentResult);

      setResult({
        success: true,
        orderId: orderResult.order_id,
        paymentId: paymentResult.payment_id,
        message: "Payment accepted and logged successfully!"
      });

      toast.success("🎉 Payment accepted! Check admin logs.");
      
    } catch (error) {
      console.error("❌ Quick payment failed:", error);
      setResult({
        success: false,
        error: error.message
      });
      toast.error(`Payment failed: ${error.message}`);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-center text-xl">⚡ Quick Payment Test</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-gray-600 text-center">
          Test the payment acceptance system instantly
        </p>
        
        <Button 
          onClick={quickPayment}
          disabled={isProcessing}
          className="w-full bg-green-600 hover:bg-green-700 text-lg py-3"
        >
          {isProcessing ? "⚡ Processing..." : "⚡ Accept Payment Now"}
        </Button>

        {result && (
          <div className={`p-4 rounded-lg ${result.success ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
            <h4 className={`font-semibold ${result.success ? 'text-green-800' : 'text-red-800'}`}>
              {result.success ? '✅ Success!' : '❌ Failed'}
            </h4>
            <p className={`text-sm ${result.success ? 'text-green-700' : 'text-red-700'}`}>
              {result.message || result.error}
            </p>
            {result.success && (
              <div className="mt-2 text-xs text-green-600">
                Order ID: {result.orderId}<br/>
                Payment ID: {result.paymentId}
              </div>
            )}
          </div>
        )}

        <p className="text-xs text-gray-500 text-center">
          This creates a real payment record in your database
        </p>
      </CardContent>
    </Card>
  );
};

export default QuickPaymentTest; 