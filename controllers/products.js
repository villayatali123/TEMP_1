const Product = require("../models/Product");

const { StatusCodes } = require("http-status-codes");

const { BadRequestError, NotFoundError } = require("../errors");

const getAllProduct = async (req, res) => {
  //let the data is retrieved from database
  const data = { product: ["p1", "p2"] };
  res.status(StatusCodes.OK).json({ success: "true", data });
};

const getProduct = async (req, res) => {
  //let the data is retrieved from database
  const data = { product: ["p1", "p2"] };
  res.status(StatusCodes.OK).json({ success: "true", data });
};

const createProduct = async (req, res) => {
  //let the data is retrieved from database
  const data = { product: ["p1", "p2"] };
  res.status(StatusCodes.OK).json({ success: "true", data });
};

const updateProduct = async (req, res) => {
  //let the data is retrieved from database
  const data = { product: ["p1", "p2"] };
  res.status(StatusCodes.OK).json({ success: "true", data });
};

const deleteProduct = async (req, res) => {
  //let the data is retrieved from database
  const data = { product: ["p1", "p2"] };
  res.status(StatusCodes.OK).json({ success: "true", data });
};

module.exports = {
  getAllProduct,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};
