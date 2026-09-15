const express = require("express");
const router = express.Router();

const upload = require("../middleware/uploadMiddleware");

router.post(
  "/",
  upload.single("image"),
  (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({
          message: "Image is required",
        });
      }

      res.json({
        image: req.file.path,
      });
    } catch (error) {
      console.error(error);

      res.status(500).json({
        message: "Image upload failed",
        error: error.message,
      });
    }
  }
);

module.exports = router;