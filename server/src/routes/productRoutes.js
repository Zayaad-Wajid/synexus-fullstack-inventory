import { Router } from "express";

import {
  createProduct,
  deleteProduct,
  getProduct,
  getProducts,
  updateProduct,
} from "../controllers/productController.js";
import { requireAuth, requireRole } from "../middleware/authMiddleware.js";
import { validateRequest } from "../middleware/validateRequest.js";
import {
  createProductSchema,
  updateProductSchema,
} from "../validators/productValidator.js";

const router = Router();

router.use(requireAuth);

router.get("/", getProducts);
router.get("/:id", getProduct);
router.post("/", validateRequest(createProductSchema), createProduct);
router.patch("/:id", validateRequest(updateProductSchema), updateProduct);
router.delete("/:id", requireRole("ADMIN"), deleteProduct);

export default router;
