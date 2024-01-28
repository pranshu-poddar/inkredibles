
import Razorpay from 'razorpay';

export const razorpay = new Razorpay({
  key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY || '',
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export const createRazorpayOrder = async (amount: number, currency: any) => {
  const options = {
    amount: amount * 100, // Razorpay accepts amount in paise
    currency,
    receipt: 'order_receipt', // You can customize the receipt ID as needed
  };

  return new Promise((resolve, reject) => {
    razorpay.orders.create(options, (err, order) => {
      if (err) {
        reject(err);
      } else {
        resolve(order);
      }
    });
  });
};
