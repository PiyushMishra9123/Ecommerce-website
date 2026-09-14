const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    orderItems: [
      {
        name: String,
        qty: Number,
        price: Number,
        image: String,
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },
      },
    ],

    totalPrice: {
      type: Number,
      required: true,
    },

    address: {
      type: String,
      required: true,
    },

    paymentMethod: {
      type: String,
      default: "COD",
    },

    paymentId: {
      type: String,
    },

    isPaid: {
      type: Boolean,
      default: false,
    },

    status: {
      type: String,
      enum: [
        "Order Placed",
        "Confirmed",
        "Shipped",
        "Delivered",
        "Cancelled",
        "Returned",
      ],
      default: "Order Placed",
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Order", orderSchema);
