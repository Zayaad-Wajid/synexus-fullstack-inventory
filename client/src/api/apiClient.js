import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export function normalizeApiError(error) {
  const data = error.response?.data;

  if (Array.isArray(data?.errors) && data.errors.length > 0) {
    return data.errors
      .map((item) => `${item.field ? `${item.field}: ` : ""}${item.message}`)
      .join(" ");
  }

  if (data?.message === "Authentication required") {
    return "Please log in to view inventory.";
  }

  if (data?.message) {
    return data.message;
  }

  if (error.request) {
    return "Unable to reach the API. Make sure the backend server is running.";
  }

  return error.message || "Something went wrong. Please try again.";
}

export { API_BASE_URL };
export default apiClient;
