import {
  getSafeUserById,
  loginUser,
  registerUser,
} from "../services/authService.js";
import {
  clearAuthCookie,
  setAuthCookie,
  signAuthToken,
} from "../utils/authUtils.js";

export async function register(req, res, next) {
  try {
    const user = await registerUser(req.body);
    const token = signAuthToken(user);
    setAuthCookie(res, token);

    res.status(201).json({
      success: true,
      message: "Registration successful",
      data: { user },
    });
  } catch (error) {
    next(error);
  }
}

export async function login(req, res, next) {
  try {
    const user = await loginUser(req.body);
    const token = signAuthToken(user);
    setAuthCookie(res, token);

    res.status(200).json({
      success: true,
      message: "Login successful",
      data: { user },
    });
  } catch (error) {
    next(error);
  }
}

export async function getMe(req, res, next) {
  try {
    const user = await getSafeUserById(req.user.id);

    res.status(200).json({
      success: true,
      message: "Authenticated user fetched successfully",
      data: { user },
    });
  } catch (error) {
    next(error);
  }
}

export function logout(_req, res) {
  clearAuthCookie(res);

  res.status(200).json({
    success: true,
    message: "Logout successful",
  });
}
