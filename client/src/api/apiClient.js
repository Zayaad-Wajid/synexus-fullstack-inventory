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
  if (error?.normalizedMessage) {
    return error.normalizedMessage;
  }

  const status = error.response?.status;
  const data = error.response?.data;

  if (Array.isArray(data?.errors) && data.errors.length > 0) {
    return data.errors
      .map((item) => `${item.field ? `${item.field}: ` : ""}${item.message}`)
      .join(" ");
  }

  if (status === 401) {
    if (data?.message && !["Authentication required", "Invalid or expired session"].includes(data.message)) {
      return data.message;
    }

    return "Your session has expired. Please log in again.";
  }

  if (status === 403) {
    return data?.message || "You do not have permission to perform this action.";
  }

  if (data?.message) {
    return data.message;
  }

  if (error.request) {
    return "Unable to reach the API. Make sure the backend server is running.";
  }

  return error.message || "Something went wrong. Please try again.";
}

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    error.normalizedMessage = normalizeApiError(error);
    return Promise.reject(error);
  }
);

export { API_BASE_URL };
export default apiClient;