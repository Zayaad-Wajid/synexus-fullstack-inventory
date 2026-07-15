import { env } from "../config/env.js";
import { verifyAuthToken } from "../utils/authUtils.js";

export function requireAuth(req, res, next) {
  const token = req.cookies?.[env.COOKIE_NAME];

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Authentication required",
    });
  }

  try {
    req.user = verifyAuthToken(token);
    next();
  } catch (_error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired session",
    });
  }
}

export function requireRole(...roles) {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: "You do not have permission to perform this action",
      });
    }

    next();
  };
}
