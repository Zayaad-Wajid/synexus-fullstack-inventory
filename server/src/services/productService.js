import { Prisma } from "@prisma/client";

import prisma from "../config/prisma.js";

function createAppError(message, statusCode) {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
}

function normalizeProductData(data) {
  const normalizedData = { ...data };

  if (Object.hasOwn(normalizedData, "unitPrice")) {
    normalizedData.unitPrice = new Prisma.Decimal(normalizedData.unitPrice);
  }

  return normalizedData;
}

async function ensureProductExists(id) {
  const product = await prisma.product.findUnique({ where: { id } });

  if (!product) {
    throw createAppError("Product not found", 404);
  }

  return product;
}

export async function getAllProducts() {
  return prisma.product.findMany({
    orderBy: { createdAt: "desc" },
  });
}

export async function getProductById(id) {
  return ensureProductExists(id);
}

export async function createProduct(data) {
  return prisma.product.create({
    data: normalizeProductData(data),
  });
}

export async function updateProduct(id, data) {
  await ensureProductExists(id);

  return prisma.product.update({
    where: { id },
    data: normalizeProductData(data),
  });
}

export async function deleteProduct(id) {
  await ensureProductExists(id);

  return prisma.product.delete({ where: { id } });
}
