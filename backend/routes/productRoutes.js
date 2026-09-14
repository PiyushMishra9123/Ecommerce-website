const express = require("express")
const Product = require("../models/Product")
const protect = require("../middleware/authMiddleware")
const isAdmin = require("../middleware/adminMiddleware");
const upload = require(
  "../middleware/uploadMiddleware"
);
const router = express.Router()

router.post(
  "/",
  protect,
  
  async (req, res) => {
    try {
      const {
        name,
        description,
        price,
        category,
        stock,
      } = req.body;

      const product =
        await Product.create({
          name,
          description,
          price,
          category,
          stock,

          image: req.body.image,

          seller: req.user._id,
        });

      res.status(201).json(product);

    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  }
);

router.get(
  "/myproducts",
  protect,
  async (req, res) => {
    try {
      const products =
        await Product.find({
          seller: req.user._id,
        });

      res.json(products);
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  }
);

router.get("/", async (req, res) => {
  try {
    const keyword = req.query.keyword
      ? {
          name: {
            $regex: req.query.keyword,
            $options: "i",
          },
        }
      : {};

    const categoryFilter = req.query.category
      ? {
          category: req.query.category,
        }
      : {};

    let sortOption = {};

    if (req.query.sort === "lowToHigh") {
      sortOption = { price: 1 };
    }

    if (req.query.sort === "highToLow") {
      sortOption = { price: -1 };
    }

    const filter = {
      ...keyword,
      ...categoryFilter,
    };

    const products = await Product.find(filter)
      .sort(sortOption);

    res.json({
      products,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});


router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(
      req.params.id
    );

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.json(product)
  } catch (error) {
    res.status(500).json({
      message: error.message,
    })
  }
})

router.put("/:id", protect,isAdmin, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      })
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );

    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    })
  }
})

router.delete(
  "/myproducts/:id",
  protect,
  async (req, res) => {
    try {
      const product =
        await Product.findById(
          req.params.id
        );

      if (!product) {
        return res.status(404).json({
          message:
            "Product not found",
        });
      }

      if (
        product.seller.toString() !==
        req.user._id.toString()
      ) {
        return res.status(401).json({
          message:
            "Not authorized",
        });
      }

      await Product.findByIdAndDelete(
        req.params.id
      );

      res.json({
        message:
          "Product deleted",
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
  "/myproducts/:id/stock",
  protect,
  async (req, res) => {
    try {
      const product = await Product.findById(
        req.params.id
      );

      if (!product) {
        return res.status(404).json({
          message: "Product not found",
        });
      }

      product.stock = req.body.stock;

      await product.save();

      res.json(product);

    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  }
);

router.delete("/:id", protect,isAdmin, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      })
    }

    await Product.findByIdAndDelete(req.params.id);

    res.json({
      message: "Product deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    })
  }
})

module.exports = router;