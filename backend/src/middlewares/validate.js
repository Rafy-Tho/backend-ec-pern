import { validationResult } from "express-validator";
import ApiError from "../utils/ApiError.js";

export const validate = (req, res, next) => {
  const errors = validationResult(req);
  console.log(errors.errors);

  if (!errors.isEmpty()) {
    const messages = errors.array()[0].msg;
    return next(new ApiError(400, messages));
  }

  next();
};
