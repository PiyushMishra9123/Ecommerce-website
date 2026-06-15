const express = require("express")
const Product = require("../models/Product")
const protect = require("../middleware/authMiddleware")
const isAdmin = require("../middleware/adminMiddleware");
const router = express.Router()

router.post("/", protect,isAdmin, async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      category,
      stock,
      image,
    } = req.body;

    const product = await Product.create({
      name,
      description,
      price,
      category,
      stock,
      image,
    });

    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    })
  }
})

router.get("/", async (req, res) => {
  try {
    const pageSize = 5
    const page = Number(req.query.page) || 1

    const keyword = req.query.keyword ? {
          name: {
            $regex: req.query.keyword,
            $options: "i",
          },
        } : {};
    const categoryFilter = req.query.category
      ? {
          category: req.query.category,
        } : {}
    let sortOption = {}

    if (req.query.sort === "lowToHigh") {
      sortOption = { price: 1 };
    }

    if (req.query.sort === "highToLow") {
      sortOption = { price: -1 };
    }

    const filter = {
      ...keyword,
      ...categoryFilter,
    }

    const count = await Product.countDocuments(filter)

    const products = await Product.find(filter)
      .sort(sortOption)
      .limit(pageSize)
      .skip(pageSize * (page - 1));

    res.json({
      products,
      page,
      pages: Math.ceil(count / pageSize),
      totalProducts: count,
    })
  } catch (error) {
    res.status(500).json({
      message: error.message,
    })
  }
})


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