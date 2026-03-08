import express from "express";
import {
  createCategory,
  deleteCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
} from "../controllers/categoryControllers.js";
import authorize from "../middlewares/authorize.js";
import requireAuth from "../middlewares/requireAuth.js";
const categoryRoute = express.Router();

categoryRoute.post("/", requireAuth, authorize(["admin"]), createCategory);
categoryRoute.get("/", getAllCategories);
categoryRoute.get("/:id", getCategoryById);
categoryRoute.patch("/:id", requireAuth, authorize(["admin"]), updateCategory);
categoryRoute.delete("/:id", requireAuth, authorize(["admin"]), deleteCategory);

export default categoryRoute;
