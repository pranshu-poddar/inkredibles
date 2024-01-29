'use server'
import Razorpay from 'razorpay';

const razorpayClient = new Razorpay({
  key_id: process.env.RAZORPAY_API_KEY || "",
  key_secret: process.env.RAZORPAY_API_SECRET,
});

export const createRazorpayOrder = async (amount: number, currency: any) => {
  const options = {
    amount: amount * 100, // Razorpay accepts amount in paise
    currency,
    receipt: 'order_receipt', // You can customize the receipt ID as needed
  };

  try {
    const order = await razorpayClient.orders.create(options);
    return order;
  } catch (error) {
    throw error; // Re-throw the error for proper handling
  }
};
