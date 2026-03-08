import express from "express";
import requireAuth from "../middlewares/requireAuth.js";
import {
  addProductToCart,
  clearCart,
  getCartProducts,
  removeProductFromCart,
  updateCartProductQuantity,
} from "../controllers/cartControllers.js";
import {
  cartValidation,
  validateQuantity,
} from "../validators/cartValidator.js";
import { validate } from "../middlewares/validate.js";

const cartRoute = express.Router();

cartRoute.post("/", requireAuth, cartValidation, validate, addProductToCart);
cartRoute.get("/", requireAuth, getCartProducts);
cartRoute.delete("/:productId", requireAuth, removeProductFromCart);
cartRoute.patch(
  "/:productId",
  requireAuth,
  validateQuantity,
  validate,
  updateCartProductQuantity,
);
cartRoute.delete("/", requireAuth, clearCart);

export default cartRoute;
