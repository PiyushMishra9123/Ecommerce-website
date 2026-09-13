const express = require("express");
const Razorpay = require("razorpay");
const crypto = require("crypto");
const router = express.Router();


const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET,
});

router.post("/create-order", async (req, res) => {
  try {
    const { amount } = req.body;

    const options = {
      amount: amount * 100,
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };

    const order =
      await razorpay.orders.create(
        options
      );

    res.json(order);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});



router.post(
  "/verify",
  async (req, res) => {
    try {
      const {
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
      } = req.body;

      const generatedSignature =
        crypto
          .createHmac(
            "sha256",
            process.env.RAZORPAY_SECRET
          )
          .update(
            razorpay_order_id +
              "|" +
              razorpay_payment_id
          )
          .digest("hex");

      if (
        generatedSignature ===
        razorpay_signature
      ) {
        return res.json({
          success: true,
        });
      }

      res.status(400).json({
        success: false,
      });

    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  }
);

module.exports = router;