import { checkSchema } from "express-validator";

export const validateAddress = checkSchema({
  address_1: {
    in: ["body"],
    trim: true,
    notEmpty: {
      errorMessage: "Address is required",
      bail: true,
    },
  },
  address_2: {
    in: ["body"],
    trim: true,
    notEmpty: {
      errorMessage: "Address is required",
      bail: true,
    },
  },
  city: {
    in: ["body"],
    trim: true,
    notEmpty: {
      errorMessage: "City is required",
      bail: true,
    },
  },
  state: {
    in: ["body"],
    trim: true,
    notEmpty: {
      errorMessage: "State is required",
      bail: true,
    },
  },
  country: {
    in: ["body"],
    trim: true,
    notEmpty: {
      errorMessage: "Country is required",
      bail: true,
    },
  },
  postal_code: {
    in: ["body"],
    trim: true,
    notEmpty: {
      errorMessage: "Postal code is required",
      bail: true,
    },
  },
});

export const validateDefaultAddress = checkSchema({
  value: {
    in: ["body"],
    trim: true,
    notEmpty: {
      errorMessage: "Value is required",
      bail: true,
    },
    isBoolean: {
      errorMessage: "Value must be a boolean",
      bail: true,
    },
  },
});
