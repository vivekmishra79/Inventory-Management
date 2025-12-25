const Product = require("../models/Product");
const inventory = require("../models/inventory");

exports.createProduct = async (req, res) => {
  try {
    const { name, casNumber, unit } = req.body;

    if (!name || !casNumber || !unit) {
      return res.status(400).json({
        success: false,
        message: "All fields are required"
      });
    }

    const exists = await Product.findOne({ casNumber });
    if (exists) {
      return res.status(400).json({
        success: false,
        message: "CAS number must be unique"
      });
    }

    const product = await Product.create({ name, casNumber, unit });
    await inventory.create({ product: product._id });

    res.status(201).json({
      success: true,
      message: "Product created successfully",
      product
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: err.message
    });
  }
};
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: products.length,
      products
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch products",
      error: err.message
    });
  }
};

exports.getSingleProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product)
    return res.status(404).json({ message: "Product not found" });

  res.json({ success: true, product });
};

exports.updateProduct = async (req, res) => {
  const product = await Product.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  if (!product)
    return res.status(404).json({ message: "Product not found" });

  res.json({ success: true, product });
};

exports.deleteProduct = async (req, res) => {
  const product = await Product.findByIdAndDelete(req.params.id);
  if (!product)
    return res.status(404).json({ message: "Product not found" });

  res.json({ success: true, message: "Product deleted" });
};
