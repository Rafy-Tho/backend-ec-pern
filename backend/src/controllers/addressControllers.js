import addressModel from "../models/Address.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
// @desc Add a new address for the logged-in user
// @route POST /api/v1/addresses
// @access Private
// eslint-disable-next-line no-unused-vars
export const addAddress = asyncHandler(async (req, res, next) => {
  const { address_1, address_2, city, state, country, postal_code } = req.body;
  const userId = req.session.user.user_id;
  const addressData = {
    address_1,
    address_2,
    city,
    state,
    country,
    postal_code,
  };
  const address = await addressModel.addAddress(addressData, userId);
  res.status(201).json({
    message: "Address added successfully",
    address,
  });
});
// @desc Change the default address for the logged-in user
// @route PATCH /api/v1/addresses/:addressId/default
// @access Private
export const changeDefaultAddress = asyncHandler(async (req, res, next) => {
  const addressId = req.params.addressId;
  const userId = req.session.user.user_id;
  const value = req.body.value;
  const address = await addressModel.changeDefaultAddress(
    addressId,
    userId,
    value,
  );
  if (!address) {
    return next(new ApiError(404, "Address not found"));
  }
  res.status(200).json({
    message: "Default address changed successfully",
    address,
  });
});
// @desc Get all addresses for the logged-in user
// @route GET /api/v1/addresses
// @access Private
export const getAddresses = asyncHandler(async (req, res, next) => {
  const userId = req.session.user.user_id;
  const addresses = await addressModel.getAddresses(userId);
  if (!addresses) {
    return next(new ApiError(404, "Addresses not found"));
  }
  res.status(200).json({
    message: "Addresses retrieved successfully",
    addresses,
  });
});
// @desc Delete an address for the logged-in user
// @route DELETE /api/v1/addresses/:addressId
// @access Private
export const deleteAddress = asyncHandler(async (req, res, next) => {
  const addressId = req.params.addressId;
  const userId = req.session.user.user_id;
  const address = await addressModel.deleteAddress(addressId, userId);
  if (!address) {
    return next(new ApiError(404, "Address not found"));
  }
  res.status(200).json({
    message: "Address deleted successfully",
    address,
  });
});
// @desc Update an address for the logged-in user
// @route PATCH /api/v1/addresses/:addressId
// @access Private
export const updateAddress = asyncHandler(async (req, res, next) => {
  const addressId = req.params.addressId;
  const userId = req.session.user.user_id;
  const { address_1, address_2, city, state, country, postal_code } = req.body;
  const addressData = {
    address_1,
    address_2,
    city,
    state,
    country,
    postal_code,
  };
  const address = await addressModel.updateAddress(
    addressId,
    userId,
    addressData,
  );
  if (!address) {
    return next(new ApiError(404, "Address not found"));
  }
  res.status(200).json({
    message: "Address updated successfully",
    address,
  });
});
