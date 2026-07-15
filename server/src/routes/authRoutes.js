import { Router } from "express";

import { getMe, login, logout, register } from "../controllers/authController.js";
import { requireAuth } from "../middleware/authMiddleware.js";
import { validateRequest } from "../middleware/validateRequest.js";
import { loginSchema, registerSchema } from "../validators/authValidator.js";

const router = Router();

router.post("/register", validateRequest(registerSchema), register);
router.post("/login", validateRequest(loginSchema), login);
router.get("/me", requireAuth, getMe);
router.post("/logout", requireAuth, logout);

export default router;
