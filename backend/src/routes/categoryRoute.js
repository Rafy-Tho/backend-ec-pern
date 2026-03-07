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
const categoryRouter = express.Router();

categoryRouter.post("/", requireAuth, authorize(["admin"]), createCategory);
categoryRouter.get("/", getAllCategories);
categoryRouter.get("/:id", getCategoryById);
categoryRouter.patch("/:id", requireAuth, authorize(["admin"]), updateCategory);
categoryRouter.delete(
  "/:id",
  requireAuth,
  authorize(["admin"]),
  deleteCategory,
);

export default categoryRouter;
