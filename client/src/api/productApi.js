const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

export const productEndpoints = {
  list: `${API_BASE_URL}/products`,
  detail: (id) => `${API_BASE_URL}/products/${id}`,
};

export { API_BASE_URL };
