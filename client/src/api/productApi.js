import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export function getApiErrorMessage(error) {
  const data = error.response?.data;

  if (Array.isArray(data?.errors) && data.errors.length > 0) {
    return data.errors
      .map((item) => `${item.field ? `${item.field}: ` : ""}${item.message}`)
      .join(" ");
  }

  if (data?.message) {
    return data.message;
  }

  if (error.request) {
    return "Unable to reach the API. Make sure the backend server is running.";
  }

  return error.message || "Something went wrong. Please try again.";
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

export { API_BASE_URL, apiClient };
