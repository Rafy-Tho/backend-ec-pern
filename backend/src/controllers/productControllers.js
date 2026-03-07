import productModel from "../models/Product.js";
import ApiError from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";

// @desc    Add new product
// @route   POST /api/products
// @access  Private (Admin)
export const addProduct = asyncHandler(async (req, res, next) => {
  const { title, description, price, quantity, categoryId, image } = req.body;
  const imageFile = req.file;

  if (!imageFile && !image)
    return next(new ApiError(400, "Image file is required"));

  const imageUrl = image || `${process.env.URL}/${imageFile.filename}`;

  const productData = {
    title,
    description,
    price,
    imageUrl,
    quantity,
  };

  const newProduct = await productModel.addProduct(productData);

  await productModel.addProductCategory(newProduct.product_id, categoryId);

  res.status(201).json({
    message: "Product added successfully",
    product: newProduct,
  });
});

// @desc    Update product
// @route   PATCH /api/products/:id
// @access  Private (Admin)
export const updateProduct = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { title, description, price, quantity, categoryId, image } = req.body;
  const imageFile = req.file;

  if (!imageFile && !image)
    return next(new ApiError(400, "Image file is required"));

  const imageUrl = image || `${process.env.URL}/${imageFile.filename}`;

  const productData = {
    title,
    description,
    price,
    quantity,
    imageUrl,
  };

  const updatedProduct = await productModel.updateProduct(id, productData);

  if (!updatedProduct) return next(new ApiError(404, "Product not found"));

  const category = await productModel.getProductCategory(id, categoryId);

  if (!category) await productModel.addProductCategory(id, categoryId);

  res.json({
    message: "Product updated successfully",
    product: updatedProduct,
  });
});
// @desc    Get all products
// @route   GET /api/products
// @access  Public
export const getAllProducts = asyncHandler(async (req, res) => {
  const products = await productModel.getAllProducts();
  res.json({
    message: "Products retrieved successfully",
    products,
  });
});
// @desc    Get product by ID
// @route   GET /api/products/:id
// @access  Public
export const getProductById = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const product = await productModel.getProductById(id);
  if (!product) return next(new ApiError(404, "Product not found"));
  res.json({
    message: "Product retrieved successfully",
    product,
  });
});
// @desc    Delete product
// @route   DELETE /api/products/:id
// @access  Private (Admin)
export const deleteProduct = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const deleted = await productModel.deleteProduct(id);
  if (!deleted) return next(new ApiError(404, "Product not found"));
  res.json({
    message: "Product deleted successfully",
  });
});
