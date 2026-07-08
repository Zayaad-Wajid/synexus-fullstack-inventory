import { Router } from "express";

import {
  createProduct,
  deleteProduct,
  getProduct,
  getProducts,
  updateProduct,
} from "../controllers/productController.js";
import { validateRequest } from "../middleware/validateRequest.js";
import {
  createProductSchema,
  updateProductSchema,
} from "../validators/productValidator.js";

const router = Router();

router.get("/", getProducts);
router.get("/:id", getProduct);
router.post("/", validateRequest(createProductSchema), createProduct);
router.patch("/:id", validateRequest(updateProductSchema), updateProduct);
router.delete("/:id", deleteProduct);

export default router;
