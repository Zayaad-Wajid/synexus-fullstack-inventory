import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

function AppHeader() {
  const navigate = useNavigate();
  const { authError, clearAuthError, isAuthenticated, logout, user } = useAuth();

  async function handleLogout() {
    await logout();
    navigate("/login");
  }

  return (
    <header className="border-b border-slate-200 bg-white px-4 py-4 shadow-sm sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <Link to="/inventory" className="group">
          <p className="text-xs font-semibold uppercase text-emerald-700">Synexus Inventory</p>
          <p className="text-lg font-bold text-slate-950 group-hover:text-emerald-800">Inventory Management</p>
        </Link>

        {isAuthenticated ? (
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="text-sm text-slate-600 sm:text-right">
              <p className="font-semibold text-slate-950">{user?.name || user?.email}</p>
              <p>
                {user?.email} {user?.role ? <span className="text-slate-400">/</span> : null} {user?.role}
              </p>
            </div>
            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex min-h-10 items-center justify-center rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-emerald-300 hover:text-emerald-800"
            >
              Logout
            </button>
          </div>
        ) : (
          <nav className="flex items-center gap-2">
            <Link
              to="/login"
              onClick={clearAuthError}
              className="inline-flex min-h-10 items-center justify-center rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-emerald-300 hover:text-emerald-800"
            >
              Login
            </Link>
            <Link
              to="/register"
              onClick={clearAuthError}
              className="inline-flex min-h-10 items-center justify-center rounded-md bg-emerald-700 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-800"
            >
              Register
            </Link>
          </nav>
        )}
      </div>

      {authError ? (
        <div className="mx-auto mt-3 max-w-7xl rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
          {authError}
        </div>
      ) : null}
    </header>
  );
}

export default AppHeader;