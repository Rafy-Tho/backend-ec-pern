import passwordHelper from "../helper/passwordHelper.js";
import sessionManager from "../helper/sessionManager.js";
import codeModel from "../models/Code.js";
import userModel from "../models/User.js";
import { sendEmail } from "../services/sendEmail.js";
import ApiError from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";
// @desc    Register user
// @route   POST /api/users/register
// @access  Public
export const register = asyncHandler(async (req, res, next) => {
  const { firstName, lastName, email, password } = req.body;
  const username = `${firstName} ${lastName}`;

  // check if user already exists
  const existsUser = await userModel.findByEmail(email);
  if (existsUser) return next(new ApiError(409, "Email already exists"));

  // hash password
  const passwordHash = await passwordHelper.hashPassword(password);

  // register user
  const user = await userModel.register({
    firstName,
    lastName,
    email,
    password: passwordHash,
    username,
  });
  await sessionManager.createSession(req, user);
  // send response
  res.status(201).json({
    message: "User registered successfully",
    user,
  });
});
// @desc    Login user
// @route   POST /api/users/login
// @access  Public
export const login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  // check if user exists
  const user = await userModel.findByEmail(email);
  if (!user) return next(new ApiError(404, "Invalid credentials"));

  // check if password is correct
  const isMatch = await passwordHelper.comparePassword(
    password,
    user.user_password,
  );

  if (!isMatch) return next(new ApiError(400, "Invalid credentials"));
  // create session
  await sessionManager.createSession(req, user);

  // send response
  res.status(200).json({
    message: "User logged in successfully",
    user,
  });
});
// @desc    Logout user
// @route   POST /api/users/logout
// @access  private
// eslint-disable-next-line no-unused-vars
export const logout = asyncHandler(async (req, res, next) => {
  await sessionManager.destroySession(req);
  res.clearCookie("sessionId");
  res.status(200).json({
    message: "User logged out successfully",
  });
});
// @desc    Send password reset code
// @route   POST /api/users/send-password-reset-code
// @access  Public
export const sendPasswordResetCode = asyncHandler(async (req, res, next) => {
  const { email } = req.body;

  // check if user exists
  const user = await userModel.findByEmail(email);
  if (!user) return next(new ApiError(404, "User not found"));

  // 2. Generate 6-digit numeric code
  const code = Math.floor(100000 + Math.random() * 900000).toString();

  const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

  // save password reset code to user
  await codeModel.addCode(code, user.user_id, expiresAt);

  // send password reset code to user
  await sendEmail(email, "Password Reset Code", code);

  // send response
  res.status(200).json({
    message: "Password reset code sent successfully",
  });
});
// @desc    Reset password
// @route   POST /api/users/reset-password
// @access  Public
export const resetPassword = asyncHandler(async (req, res, next) => {
  const { email, code, password } = req.body;

  const user = await userModel.findByEmail(email);
  if (!user) return next(new ApiError(404, "User not found"));
  // check if code exists
  const codeRecord = await codeModel.verifyCode(code, user.user_id);

  if (!codeRecord) return next(new ApiError(404, "Code not found"));

  if (codeRecord.expires_at < new Date())
    return next(new ApiError(400, "Code expired"));

  // hash password
  const passwordHash = await passwordHelper.hashPassword(password);

  // update user password
  await userModel.updatePassword(user.user_id, passwordHash);

  // delete code
  await codeModel.deleteCode(code, user.user_id);

  // send response
  res.status(200).json({
    message: "Password reset successfully",
  });
});

export const getProfile = asyncHandler(async (req, res, next) => {
  const userId = req.session.user.user_id;
  const profile = await userModel.getProfile(userId);
  if (!profile) return next(new ApiError(404, "Profile not found"));
  res.status(200).json({
    message: "Profile retrieved successfully",
    profile,
  });
});

export const updatePassword = asyncHandler(async (req, res, next) => {
  const userId = req.session.user.user_id;
  const { oldPassword, newPassword } = req.body;
  // check if user exists
  const user = await userModel.findById(userId);
  if (!user) return next(new ApiError(404, "User not found"));
  // check if old password is correct
  const isMatch = await passwordHelper.comparePassword(
    oldPassword,
    user.user_password,
  );
  if (!isMatch) return next(new ApiError(400, "Invalid credentials"));
  // hash new password
  const passwordHash = await passwordHelper.hashPassword(newPassword);
  // update user password
  await userModel.updatePassword(userId, passwordHash);
  // send response
  res.status(200).json({
    message: "Password updated successfully",
  });
});
