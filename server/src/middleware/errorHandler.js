import { env } from "../config/env.js";

function getStatusCode(error, res) {
  if (error.statusCode) {
    return error.statusCode;
  }

  if (error.message === "Product not found") {
    return 404;
  }

  return res.statusCode === 200 ? 500 : res.statusCode;
}

export function errorHandler(err, _req, res, _next) {
  const statusCode = getStatusCode(err, res);

  const response = {
    success: false,
    message: err.message || "Internal server error",
  };

  if (env.NODE_ENV === "development") {
    response.stack = err.stack;
  }

  res.status(statusCode).json(response);
}
