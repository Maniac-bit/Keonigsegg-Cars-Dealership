import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import apiService from "../services/api";
import { toast } from "sonner";

const PaymentTest = () => {
  const [isProcessing, setIsProcessing] = useState(false);

  const testPayment = async () => {
    setIsProcessing(true);
    
    try {
      console.log("Testing payment system...");
      
      // Use the comprehensive test method
      const result = await apiService.testPaymentSystem();
      
      if (result) {
        toast.success("Payment system test completed successfully! Check admin logs.");
      } else {
        toast.error("Payment system test failed. Check console for details.");
      }
      
    } catch (error) {
      console.error("Test payment error:", error);
      toast.error(`Test payment failed: ${error.message}`);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-center">Payment System Test</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-gray-600 text-center">
          Click the button below to test the payment system and create a test payment record.
        </p>
        <Button 
          onClick={testPayment}
          disabled={isProcessing}
          className="w-full bg-green-600 hover:bg-green-700"
        >
          {isProcessing ? "Testing..." : "Test Payment System"}
        </Button>
        <p className="text-xs text-gray-500 text-center">
          This will create a test order and payment record in the database.
        </p>
      </CardContent>
    </Card>
  );
};

export default PaymentTest; 