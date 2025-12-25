const Inventory = require("../models/inventory");
exports.getInventory = async (req, res) => {
  try {
    console.log("Get inventory request received");

    // Fetch inventory with product details
    const inventory = await Inventory.find().populate("product");

    console.log("Fetched inventory:", inventory);

    // Send consistent response
    res.status(200).json({
      success: true,
      count: inventory.length,
      inventory,   // this will be an array of objects with product populated
      message: "Inventory fetched successfully"
    });
  } catch (err) {
    console.error("Error fetching inventory:", err.message);
    res.status(500).json({
      success: false,
      message: "Failed to fetch inventory",
      error: err.message
    });
  }
};

exports.stockIn = async (req, res) => {
  const { productId, quantity } = req.body;

  if (quantity <= 0) {
    return res.status(400).json({ message: "Quantity must be positive" });
  }

  const inventory = await Inventory.findOne({ product: productId });
  inventory.currentStock += quantity;
  await inventory.save();

  res.json(inventory);
};

exports.stockOut = async (req, res) => {
  const { productId, quantity } = req.body;
  console.log("Stock out request:", req.body);

  const inventory = await Inventory.findOne({ product: productId });
  if (inventory.currentStock < quantity) {
    return res.status(400).json({ message: "Insufficient stock" });
  }

  inventory.currentStock -= quantity;
  await inventory.save();

  res.json(inventory);
};
