require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const productRoutes = require("./routes/productRoutes");
const inventoryRoutes = require("./routes/inventoryRoutes");  

const connectDB = require("./config/db");

const app=express();
const cors = require("cors");

app.use(cors({
  origin: "https://inventory-managemen.netlify.app" 
}));

app.use(express.json());
app.use("/api/auth", require("./routes/authRoutes"));


app.use("/api/products", productRoutes);
app.use("/api/inventory", inventoryRoutes);

connectDB();
app.listen(process.env.PORT, () =>
  console.log(`Server running on port ${process.env.PORT}`)
);