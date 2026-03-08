import express from "express";
import requireAuth from "../middlewares/requireAuth.js";
import authorize from "../middlewares/authorize.js";
import { upload } from "../middlewares/multer.js";
import { productValidation } from "../validators/productValidator.js";
import { validate } from "../middlewares/validate.js";
import {
  addProduct,
  deleteProduct,
  getAllProducts,
  getProductById,
  updateProduct,
} from "../controllers/productControllers.js";

const productRoute = express.Router();

productRoute.get("/", getAllProducts);
productRoute.get("/:id", getProductById);

productRoute.post(
  "/",
  requireAuth,
  authorize(["admin"]),
  upload.single("image"),
  productValidation,
  validate,
  addProduct,
);

productRoute.patch(
  "/:id",
  requireAuth,
  authorize(["admin"]),
  upload.single("image"),
  productValidation,
  validate,
  updateProduct,
);

productRoute.delete("/:id", requireAuth, authorize(["admin"]), deleteProduct);

export default productRoute;
