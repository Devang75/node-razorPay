import express from 'express'
import Razorpay from 'razorpay';
import dotenv from 'dotenv'
dotenv.config()

export const router = express.Router();
const razorPayInstance = new Razorpay({
  key_id: process.env.RAZORPAY_ID_KEY,
  key_secret: process.env.RAZORPAY_SECRET_KEY,
})

// Endpoint to create a Razorpay order
router.post('/create-order', async (req, res) => {
  const { amount, currency = 'INR', receipt } = req.body;

  const options = {
    amount: amount * 100, // Razorpay accepts amount in paise, so multiply by 100
    currency,
    receipt,
  };

  try {
    const response = await razorPayInstance.orders.create(options);
    res.json(response);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

