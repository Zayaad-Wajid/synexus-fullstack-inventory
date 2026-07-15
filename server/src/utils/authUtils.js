import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { env } from "../config/env.js";

const SEVEN_DAYS_MS = 7 * 24 * 60 * 60 * 1000;

function getJwtMaxAgeMs(expiresIn) {
  const match = /^([0-9]+)([dhms])$/.exec(expiresIn || "");

  if (!match) {
    return SEVEN_DAYS_MS;
  }

  const value = Number(match[1]);
  const unit = match[2];

  const multipliers = {
    d: 24 * 60 * 60 * 1000,
    h: 60 * 60 * 1000,
    m: 60 * 1000,
    s: 1000,
  };

  return value * multipliers[unit];
}

export function hashPassword(password) {
  return bcrypt.hash(password, 12);
}

export function comparePassword(password, hashedPassword) {
  return bcrypt.compare(password, hashedPassword);
}

export function signAuthToken(user) {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: user.role,
    },
    env.JWT_SECRET,
    { expiresIn: env.JWT_EXPIRES_IN }
  );
}

export function verifyAuthToken(token) {
  return jwt.verify(token, env.JWT_SECRET);
}

export function getCookieOptions() {
  const isProduction = env.NODE_ENV === "production";

  return {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? "none" : "lax",
    path: "/",
    maxAge: getJwtMaxAgeMs(env.JWT_EXPIRES_IN),
  };
}

export function setAuthCookie(res, token) {
  res.cookie(env.COOKIE_NAME, token, getCookieOptions());
}

export function clearAuthCookie(res) {
  const { maxAge, ...options } = getCookieOptions();
  res.clearCookie(env.COOKIE_NAME, options);
}
