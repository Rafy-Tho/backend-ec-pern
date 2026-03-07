import { checkSchema } from "express-validator";

export const validateRegister = checkSchema({
  firstName: {
    in: ["body"],
    trim: true,
    notEmpty: {
      errorMessage: "First name is required",
      bail: true,
    },
    isLength: {
      options: { min: 3 },
      errorMessage: "First name must be at least 3 characters long",
    },
  },
  lastName: {
    in: ["body"],
    trim: true,
    notEmpty: {
      errorMessage: "Last name is required",
      bail: true,
    },
    isLength: {
      options: { min: 3 },
      errorMessage: "Last name must be at least 3 characters long",
    },
  },
  email: {
    in: ["body"],
    trim: true,
    notEmpty: {
      errorMessage: "Email is required",
      bail: true,
    },
    isEmail: {
      errorMessage: "Email must be a valid email address",
    },
  },
  password: {
    in: ["body"],
    notEmpty: {
      errorMessage: "Password is required",
      bail: true,
    },
    isLength: {
      options: { min: 8 },
      errorMessage: "Password must be at least 8 characters long",
      bail: true,
    },
    isStrongPassword: {
      errorMessage: "Password must be strong",
    },
  },
});

export const validateLogin = checkSchema({
  email: {
    in: ["body"],
    trim: true,
    notEmpty: {
      errorMessage: "Email is required",
      bail: true,
    },
    isEmail: {
      errorMessage: "Email must be a valid email address",
    },
  },
  password: {
    in: ["body"],
    notEmpty: {
      errorMessage: "Password is required",
      bail: true,
    },
    isLength: {
      options: { min: 8 },
      errorMessage: "Password must be at least 8 characters long",
      bail: true,
    },
    isStrongPassword: {
      errorMessage: "Password must be strong",
    },
  },
});

export const validateUpdatePassword = checkSchema({
  oldPassword: {
    in: ["body"],
    notEmpty: {
      errorMessage: "Old password is required",
      bail: true,
    },
    isLength: {
      options: { min: 8 },
      errorMessage: "Old password must be at least 8 characters long",
      bail: true,
    },
    isStrongPassword: {
      errorMessage: "Old password must be strong",
    },
  },
  newPassword: {
    in: ["body"],
    notEmpty: {
      errorMessage: "New password is required",
      bail: true,
    },
    isLength: {
      options: { min: 8 },
      errorMessage: "New password must be at least 8 characters long",
      bail: true,
    },
    isStrongPassword: {
      errorMessage: "New password must be strong",
    },
  },
});

export const validateResetPassword = checkSchema({
  code: {
    in: ["body"],
    notEmpty: {
      errorMessage: "Reset code is required",
      bail: true,
    },
    isLength: {
      options: { min: 6, max: 6 },
      errorMessage: "Reset code must be 6 characters long",
    },
  },
  email: {
    in: ["body"],
    trim: true,
    notEmpty: {
      errorMessage: "Email is required",
      bail: true,
    },
    isEmail: {
      errorMessage: "Email must be a valid email address",
    },
  },
  password: {
    in: ["body"],
    notEmpty: {
      errorMessage: "New password is required",
      bail: true,
    },
    isLength: {
      options: { min: 8 },
      errorMessage: "New password must be at least 8 characters long",
      bail: true,
    },
    isStrongPassword: {
      errorMessage: "New password must be strong",
    },
  },
});

export const validateEmailResetCode = checkSchema({
  email: {
    in: ["body"],
    trim: true,
    notEmpty: {
      errorMessage: "Email is required",
      bail: true,
    },
    isEmail: {
      errorMessage: "Email must be a valid email address",
    },
  },
});
