import requireAuth from "../middlewares/requireAuth.js";

import express from "express";
import {
  validateAddress,
  validateDefaultAddress,
} from "../validators/addressValidator.js";
import { validate } from "../middlewares/validate.js";
import {
  addAddress,
  changeDefaultAddress,
  deleteAddress,
  getAddresses,
  updateAddress,
} from "../controllers/addressControllers.js";

const addressRouter = express.Router();
// Create a new address
addressRouter.post("/", requireAuth, validateAddress, validate, addAddress);
// Get all addresses for the authenticated user
addressRouter.get("/", requireAuth, getAddresses);
// Update an address
addressRouter.patch(
  "/:addressId",
  requireAuth,
  validateAddress,
  validate,
  updateAddress,
);
// Delete an address
addressRouter.delete("/:addressId", requireAuth, deleteAddress);
// Set a default address
addressRouter.patch(
  "/:addressId/default",
  requireAuth,
  validateDefaultAddress,
  validate,
  changeDefaultAddress,
);

export default addressRouter;
