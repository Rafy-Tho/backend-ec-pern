import e from "express";
import categoryModel from "../models/Category.js";
import asyncHandler from "../utils/asyncHandler.js";

// @desc Create a new category
// @route POST /api/v1/categories
// @access Private/Admin
export const createCategory = asyncHandler(async (req, res) => {
  const { categoryName } = req.body;
  const category = await categoryModel.addCategory(categoryName);
  res.status(201).json({ message: "Category created successfully", category });
});
// @desc Get all categories
// @route GET /api/v1/categories
// @access Public
export const getAllCategories = asyncHandler(async (req, res) => {
  const categories = await categoryModel.getAllCategories();
  res.json({ message: "Categories found", categories });
});

// @desc Get category by ID
// @route GET /api/v1/categories/:id
// @access Public
export const getCategoryById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const category = await categoryModel.getCategoryById(id);
  if (!category) {
    return res.status(404).json({ message: "Category not found" });
  }
  res.json({ message: "Category found", category });
});
// @desc Update category by ID
// @route PATCH /api/v1/categories/:id
// @access Private/Admin
export const updateCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { categoryName } = req.body;
  const category = await categoryModel.updateCategory(id, categoryName);
  if (!category) {
    return res.status(404).json({ message: "Category not found" });
  }
  res.json({ message: "Category updated successfully", category });
});
// @desc Delete category by ID
// @route DELETE /api/v1/categories/:id
// @access Private/Admin
export const deleteCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const category = await categoryModel.deleteCategory(id);
  if (!category) {
    return res.status(404).json({ message: "Category not found" });
  }
  res.json({ message: "Category deleted successfully", category });
});
