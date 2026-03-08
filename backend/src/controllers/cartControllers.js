import cartModel from "../models/Cart.js";
import ApiError from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";

// @desc    Add product to cart
// @route   POST /api/v1/carts
// @access  Private
export const addProductToCart = asyncHandler(async (req, res) => {
  const userId = req.session.user.user_id;

  const { productId, quantity } = req.body;

  const cart = await cartModel.getCartByUserId(userId);

  const cartProduct = await cartModel.addToCart(
    cart.cart_id,
    productId,
    quantity,
  );

  res.status(201).json({
    message: "Product added to cart successfully",
    carts: cartProduct,
  });
});
// @desc    Get cart products
// @route   GET /api/v1/carts
// @access  Private
export const getCartProducts = asyncHandler(async (req, res) => {
  const userId = req.session.user.user_id;

  const cart = await cartModel.getCartByUserId(userId);

  const cartProducts = await cartModel.getCartProducts(cart.cart_id);

  res.status(200).json({
    message: "Cart products retrieved successfully",
    carts: cartProducts,
  });
});
// @desc    Remove product from cart
// @route   DELETE /api/v1/carts/:productId
// @access  Private
export const removeProductFromCart = asyncHandler(async (req, res, next) => {
  const userId = req.session.user.user_id;
  const { productId } = req.params;

  const cart = await cartModel.getCartByUserId(userId);

  const removedProduct = await cartModel.removeFromCart(
    cart.cart_id,
    productId,
  );

  if (!removedProduct)
    return next(new ApiError(404, "Product not found in cart"));

  res.status(200).json({
    message: "Product removed from cart successfully",
    carts: removedProduct,
  });
});
// @desc    Update product quantity in cart
// @route   PATCH /api/v1/cart/:productId
// @access  Private
export const updateCartProductQuantity = asyncHandler(
  async (req, res, next) => {
    const userId = req.session.user.user_id;
    const { productId } = req.params;
    const { quantity } = req.body;

    const cart = await cartModel.getCartByUserId(userId);

    const updatedProduct = await cartModel.updateCartProductQuantity(
      cart.cart_id,
      productId,
      quantity,
    );

    if (!updatedProduct)
      return next(new ApiError(404, "Product not found in cart"));

    res.status(200).json({
      message: "Cart product quantity updated successfully",
      carts: updatedProduct,
    });
  },
);

export const clearCart = asyncHandler(async (req, res) => {
  const userId = req.session.user.user_id;

  const cart = await cartModel.getCartByUserId(userId);

  const clearedCart = await cartModel.clearCart(cart.cart_id);

  res.status(200).json({
    message: "Cart cleared successfully",
    carts: clearedCart,
  });
});
