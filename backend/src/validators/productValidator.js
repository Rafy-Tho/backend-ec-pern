import { checkSchema } from "express-validator";

export const productValidation = checkSchema({
  title: {
    in: ["body"],
    trim: true,
    notEmpty: {
      errorMessage: "Title is required",
      bail: true,
    },
  },
  description: {
    in: ["body"],
    trim: true,
    notEmpty: {
      errorMessage: "Description is required",
      bail: true,
    },
  },
  price: {
    in: ["body"],
    trim: true,
    notEmpty: {
      errorMessage: "Price is required",
      bail: true,
    },
  },
  quantity: {
    in: ["body"],
    trim: true,
    notEmpty: {
      errorMessage: "Quantity is required",
      bail: true,
    },
  },
  categoryId: {
    in: ["body"],
    trim: true,
    notEmpty: {
      errorMessage: "Category ID is required",
      bail: true,
    },
  },
});
