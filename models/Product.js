const mongoose = require("mongoose");
const ProductSchema = new mongoose.Schema(
  {
    ProductName: {
      type: String,
      required: [true, "Please Provide a Product Name"],
      maxlength: 100,
    },
    company: {
      type: String,
      required: [true, "Please Provide a company name"],
      maxlength: 100,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);
