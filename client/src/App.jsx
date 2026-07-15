import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { useAuth } from "./context/AuthContext";
import InventoryPage from "./pages/InventoryPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

function AuthLoadingScreen() {
  return (
    <main className="grid min-h-screen place-items-center bg-slate-100 px-4 text-slate-950">
      <div className="rounded-md border border-slate-200 bg-white px-6 py-5 text-center shadow-sm">
        <p className="text-sm font-semibold uppercase text-emerald-700">Synexus Inventory</p>
        <p className="mt-2 text-base font-medium text-slate-800">Checking session...</p>
      </div>
    </main>
  );
}

function AppRoutes() {
  const { isAuthLoading } = useAuth();

  if (isAuthLoading) {
    return <AuthLoadingScreen />;
  }

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/inventory" replace />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/inventory" element={<InventoryPage />} />
    </Routes>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;