import express from "express";
import {
  getProfile,
  login,
  logout,
  register,
  resetPassword,
  sendPasswordResetCode,
  updatePassword,
} from "../controllers/userControllers.js";
import requireAuth from "../middlewares/requireAuth.js";
import {
  validateEmailResetCode,
  validateLogin,
  validateRegister,
  validateResetPassword,
  validateUpdatePassword,
} from "../validators/userValidator.js";
import { validate } from "../middlewares/validate.js";

const userRoute = express.Router();

// user register and login
userRoute.post("/register", validateRegister, validate, register);
userRoute.post("/login", validateLogin, validate, login);
// user password reset
userRoute.post(
  "/send-password-reset-code",
  validateEmailResetCode,
  validate,
  sendPasswordResetCode,
);
userRoute.post(
  "/reset-password",
  validateResetPassword,
  validate,
  resetPassword,
);
// user logout

userRoute.delete("/logout", requireAuth, logout);
// user profile
userRoute.get("/profile", requireAuth, getProfile);
// user update password
userRoute.patch(
  "/update-password",
  requireAuth,
  validateUpdatePassword,
  validate,
  updatePassword,
);
export default userRoute;
