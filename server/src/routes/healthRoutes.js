import { Router } from "express";

const router = Router();

router.get("/", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "Inventory API is running",
    timestamp: new Date().toISOString(),
  });
});

export default router;
