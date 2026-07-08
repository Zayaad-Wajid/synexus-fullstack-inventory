import { z } from "zod";

const productStatusSchema = z.enum(["IN_STOCK", "LOW_STOCK", "OUT_OF_STOCK"]);

const productFields = {
  name: z.string().trim().min(2, "Name must be at least 2 characters"),
  sku: z.string().trim().min(2, "SKU must be at least 2 characters"),
  category: z.string().trim().min(1, "Category is required"),
  quantity: z.coerce
    .number()
    .int("Quantity must be an integer")
    .nonnegative("Quantity cannot be negative"),
  unitPrice: z.coerce
    .number()
    .positive("Unit price must be greater than 0"),
  supplier: z.string().trim().optional(),
  status: productStatusSchema.optional(),
  description: z.string().trim().optional(),
};

export const createProductSchema = z.object({
  ...productFields,
  quantity: productFields.quantity.default(0),
});

export const updateProductSchema = z.object(productFields).partial().refine(
  (data) => Object.keys(data).length > 0,
  {
    message: "At least one field is required for update",
  }
);
