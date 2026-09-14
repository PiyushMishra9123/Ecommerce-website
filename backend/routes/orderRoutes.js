const express = require("express");
const Order = require("../models/Order");
const protect = require("../middleware/authMiddleware");
const isAdmin = require("../middleware/adminMiddleware");
const router = express.Router();
const Product = require("../models/Product");


router.post("/", protect, async (req, res) => {
  try {
    const {
      orderItems,
      totalPrice,
      paymentId,
      isPaid,
      address,
  paymentMethod,
    } = req.body;

    const order = await Order.create({
  user: req.user._id,
  orderItems,
  totalPrice,
  paymentId,
  isPaid,
  address,
  paymentMethod,
  status: "Order Placed",
});

for (const item of orderItems) {
  const product = await Product.findById(
    item.product
  );

  if (!product) continue;

  if (product.stock < item.qty) {
    return res.status(400).json({
      message: `${product.name} is out of stock`,
    });
  }

  product.stock -= item.qty;

  await product.save();
}

res.status(201).json(order);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

router.get("/myorders", protect, async (req, res) => {
  try {
    const orders = await Order.find({
      user: req.user._id,
    }).populate("orderItems.product")
    .sort({ createdAt: -1 });

    res.json(orders);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

router.get(
  "/seller",
  protect,
  async (req, res) => {
    try {
      console.log("SELLER ID:", req.user._id);

      const sellerProducts = await Product.find({
        seller: req.user._id,
      });

      const productIds = sellerProducts.map(
        (p) => p._id.toString()
      );

      console.log("PRODUCT IDS:", productIds);

      const orders = await Order.find()
      .sort({ createdAt: -1 })
        .populate("user", "name email");

      const sellerOrders = orders.filter(
        (order) =>
          order.orderItems.some((item) => {
            if (!item.product) {
              return false;
            }

            return productIds.includes(
              item.product.toString()
            );
          })
      );

      console.log(
        "SELLER ORDERS:",
        sellerOrders
      );

      res.json(sellerOrders);

    } catch (error) {
      console.log(
        "SELLER ROUTE ERROR:",
        error
      );

      res.status(500).json({
        message: error.message,
      });
    }
  }
);

router.put(
  "/:id/confirm",
  protect,
  async (req, res) => {
    try {
      const order =
        await Order.findById(
          req.params.id
        );

      if (!order) {
        return res.status(404).json({
          message:
            "Order not found",
        });
      }

      order.status =
        "Confirmed";

      await order.save();

      res.json(order);

    } catch (error) {
      res.status(500).json({
        message:
          error.message,
      });
    }
  }
);

router.put(
"/:id/status",
protect,
async (req, res) => {
try {
const order =
await Order.findById(
req.params.id
);

  if (!order) {
    return res.status(404).json({
      message:
        "Order not found",
    });
  }

  order.status =
    req.body.status;

  await order.save();

  res.json(order);

} catch (error) {
  res.status(500).json({
    message:
      error.message,
  });
}


}
);

router.get(
  "/seller/stats",
  protect,
  async (req, res) => {
    try {
      const sellerProducts =
        await Product.find({
          seller: req.user._id,
        });

      const productIds =
        sellerProducts.map((p) =>
          p._id.toString()
        );

      const orders =
        await Order.find()
        .sort({ createdAt: -1 });

      const sellerOrders =
        orders.filter((order) =>
          order.orderItems.some(
            (item) =>
              item.product &&
              productIds.includes(
                item.product.toString()
              )
          )
        );

      const totalIncome =
        sellerOrders
          .filter(
            (o) =>
              o.status ===
              "Delivered"
          )
          .reduce(
            (acc, order) =>
              acc +
              order.totalPrice,
            0
          );

      const cancelOrders =
        sellerOrders.filter(
          (o) =>
            o.status ===
            "Cancelled"
        ).length;

      const returnOrders =
        sellerOrders.filter(
          (o) =>
            o.status ===
            "Returned"
        ).length;

      res.json({
        totalIncome,
        cancelOrders,
        returnOrders,
      });

    } catch (error) {
      res.status(500).json({
        message:
          error.message,
      });
    }
  }
);

router.put(
  "/:id/cancel",
  protect,
  async (req, res) => {
    try {
      const order =
        await Order.findById(
          req.params.id
        );

      if (!order) {
        return res.status(404).json({
          message:
            "Order not found",
        });
      }

      order.status =
        "Cancelled";

      await order.save();

      res.json(order);

    } catch (error) {
      res.status(500).json({
        message:
          error.message,
      });
    }
  }
);

router.put(
  "/:id/return",
  protect,
  async (req, res) => {
    try {
      const order =
        await Order.findById(
          req.params.id
        );

      if (!order) {
        return res.status(404).json({
          message:
            "Order not found",
        });
      }

      const deliveredDate =
        new Date(
          order.updatedAt
        );

      const today =
        new Date();

      const diffDays =
        Math.floor(
          (today -
            deliveredDate) /
            (1000 *
              60 *
              60 *
              24)
        );

      if (diffDays > 4) {
        return res.status(400).json({
          message:
            "Return period expired",
        });
      }

      order.status =
        "Returned";

      await order.save();

      res.json(order);

    } catch (error) {
      res.status(500).json({
        message:
          error.message,
      });
    }
  }
);

router.get(
  "/seller/cancelled",
  protect,
  async (req, res) => {
    const orders =
      await Order.find({
        status: "Cancelled",
      }).sort({ createdAt: -1 })
      .populate(
        "user",
        "name email"
      );

    res.json(orders);
  }
);

router.get(
  "/seller/returned",
  protect,
  async (req, res) => {
    const orders =
      await Order.find({
        status: "Returned",
      }).sort({ createdAt: -1 })
      .populate(
        "user",
        "name email"
      );

    res.json(orders);
  }
);

router.get(
  "/seller/analytics",
  protect,
  async (req, res) => {

    const orders =
      await Order.find()
      .sort({ createdAt: -1 });

    const analytics =
      orders.map((order) => ({
        date:
          order.createdAt
            .toISOString()
            .split("T")[0],

        income:
          order.status ===
          "Delivered"
            ? order.totalPrice
            : 0,

        purchased: 1,

        cancelled:
          order.status ===
          "Cancelled"
            ? 1
            : 0,

        returned:
          order.status ===
          "Returned"
            ? 1
            : 0,
      }));

    res.json(analytics);
  }
);

router.get(
"/seller/:id",
protect,
async(req,res)=>{

const order=
await Order.findById(req.params.id)
.populate("user","name email")
.populate("orderItems.product");

res.json(order);

});

router.get("/", protect, isAdmin, async (req, res) => {
  try {
    const orders = await Order.find()
    .sort({ createdAt: -1 })
      .populate("user", "name email");

    res.json(orders);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});
module.exports = router;