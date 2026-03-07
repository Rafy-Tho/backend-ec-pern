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

const userRouter = express.Router();

// user register and login
userRouter.post("/register", validateRegister, validate, register);
userRouter.post("/login", validateLogin, validate, login);
// user password reset
userRouter.post(
  "/send-password-reset-code",
  validateEmailResetCode,
  validate,
  sendPasswordResetCode,
);
userRouter.post(
  "/reset-password",
  validateResetPassword,
  validate,
  resetPassword,
);
// user logout

userRouter.delete("/logout", requireAuth, logout);
// user profile
userRouter.get("/profile", requireAuth, getProfile);
// user update password
userRouter.patch(
  "/update-password",
  requireAuth,
  validateUpdatePassword,
  validate,
  updatePassword,
);
export default userRouter;
