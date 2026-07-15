import apiClient, { API_BASE_URL, normalizeApiError } from "./apiClient";

export function getApiErrorMessage(error) {
  return normalizeApiError(error);
}

export async function getProducts() {
  const response = await apiClient.get("/products");
  return response.data;
}

export async function getProductById(id) {
  const response = await apiClient.get(`/products/${id}`);
  return response.data;
}

export async function createProduct(payload) {
  const response = await apiClient.post("/products", payload);
  return response.data;
}

export async function updateProduct(id, payload) {
  const response = await apiClient.patch(`/products/${id}`, payload);
  return response.data;
}

export async function deleteProduct(id) {
  const response = await apiClient.delete(`/products/${id}`);
  return response.data;
}

export { API_BASE_URL };
