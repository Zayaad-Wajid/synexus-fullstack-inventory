import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

import { getCurrentUser, loginUser, logoutUser, registerUser } from "../api/authApi";
import { normalizeApiError } from "../api/apiClient";

const AuthContext = createContext(null);

function getUserFromResponse(response) {
  return response?.data?.user || null;
}

function isUnauthorized(error) {
  return error.response?.status === 401;
}

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAuthLoading, setIsAuthLoading] = useState(true);
  const [authError, setAuthError] = useState("");

  const clearAuthError = useCallback(() => {
    setAuthError("");
  }, []);

  const checkAuth = useCallback(async () => {
    setIsAuthLoading(true);

    try {
      const response = await getCurrentUser();
      const currentUser = getUserFromResponse(response);
      setUser(currentUser);
      setAuthError("");
      return currentUser;
    } catch (error) {
      setUser(null);

      if (!isUnauthorized(error)) {
        setAuthError(normalizeApiError(error));
      }

      return null;
    } finally {
      setIsAuthLoading(false);
    }
  }, []);

  const login = useCallback(async (credentials) => {
    setAuthError("");

    try {
      const response = await loginUser(credentials);
      const authenticatedUser = getUserFromResponse(response);
      setUser(authenticatedUser);
      return authenticatedUser;
    } catch (error) {
      const message = normalizeApiError(error);
      setAuthError(message);
      throw error;
    }
  }, []);

  const register = useCallback(async (payload) => {
    setAuthError("");

    try {
      const response = await registerUser(payload);
      const registeredUser = getUserFromResponse(response);
      setUser(registeredUser);
      return registeredUser;
    } catch (error) {
      const message = normalizeApiError(error);
      setAuthError(message);
      throw error;
    }
  }, []);

  const logout = useCallback(async () => {
    setAuthError("");

    try {
      await logoutUser();
      setUser(null);
      return true;
    } catch (error) {
      const message = normalizeApiError(error);
      setAuthError(message);
      setUser(null);
      return false;
    }
  }, []);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      isAuthLoading,
      authError,
      checkAuth,
      login,
      register,
      logout,
      clearAuthError,
    }),
    [authError, checkAuth, clearAuthError, isAuthLoading, login, logout, register, user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}

export { AuthProvider, useAuth };