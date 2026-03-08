import { checkSchema } from "express-validator";

export const cartValidation = checkSchema({
  productId: {
    in: ["body"],
    trim: true,
    notEmpty: {
      errorMessage: "Product ID is required",
      bail: true,
    },
    isUUID: {
      errorMessage: "Product ID must be a valid UUID",
    },
  },
  quantity: {
    in: ["body"],
    trim: true,
    notEmpty: {
      errorMessage: "Quantity is required",
      bail: true,
    },
    isInt: {
      options: { min: 1 },
      errorMessage: "Quantity must be an integer",
    },
  },
});

export const validateQuantity = checkSchema({
  quantity: {
    in: ["body"],
    trim: true,
    notEmpty: {
      errorMessage: "Quantity is required",
      bail: true,
    },
    isInt: {
      options: { min: 1 },
      errorMessage: "Quantity must be an integer",
    },
  },
});
