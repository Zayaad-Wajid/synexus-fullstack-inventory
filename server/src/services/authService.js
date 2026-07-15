import prisma from "../config/prisma.js";
import { comparePassword, hashPassword } from "../utils/authUtils.js";

function createAppError(message, statusCode) {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
}

function toSafeUser(user) {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
}

export async function registerUser(data) {
  const existingUser = await prisma.user.findUnique({
    where: { email: data.email },
  });

  if (existingUser) {
    throw createAppError("Email is already registered", 409);
  }

  const hashedPassword = await hashPassword(data.password);

  const user = await prisma.user.create({
    data: {
      name: data.name,
      email: data.email,
      password: hashedPassword,
      role: "STAFF",
    },
  });

  return toSafeUser(user);
}

export async function loginUser(data) {
  const invalidCredentialsError = createAppError("Invalid email or password", 401);

  const user = await prisma.user.findUnique({
    where: { email: data.email },
  });

  if (!user) {
    throw invalidCredentialsError;
  }

  const passwordMatches = await comparePassword(data.password, user.password);

  if (!passwordMatches) {
    throw invalidCredentialsError;
  }

  return toSafeUser(user);
}

export async function getSafeUserById(id) {
  const user = await prisma.user.findUnique({
    where: { id },
  });

  if (!user) {
    throw createAppError("Authentication required", 401);
  }

  return toSafeUser(user);
}
