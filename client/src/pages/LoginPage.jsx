import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { loginUser } from "../api/authApi";
import { normalizeApiError } from "../api/apiClient";
import AuthCard from "../components/AuthCard";
import ErrorMessage from "../components/ErrorMessage";
import FormInput from "../components/FormInput";

const initialFormData = {
  email: "",
  password: "",
};

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validateLogin(formData) {
  const errors = {};

  if (!formData.email.trim()) {
    errors.email = "Email is required";
  } else if (!isValidEmail(formData.email)) {
    errors.email = "Enter a valid email address";
  }

  if (!formData.password) {
    errors.password = "Password is required";
  }

  return errors;
}

function LoginPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((currentData) => ({ ...currentData, [name]: value }));

    if (errors[name]) {
      setErrors((currentErrors) => ({ ...currentErrors, [name]: undefined }));
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const validationErrors = validateLogin(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    setIsSubmitting(true);
    setApiError("");

    try {
      await loginUser({
        email: formData.email.trim().toLowerCase(),
        password: formData.password,
      });
      navigate("/inventory");
    } catch (error) {
      setApiError(normalizeApiError(error));
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <AuthCard
      title="Sign in"
      subtitle="Use your Synexus account to access the protected inventory workspace."
      footer={
        <p>
          Need an account?{" "}
          <Link className="font-semibold text-emerald-700 hover:text-emerald-800" to="/register">
            Create one
          </Link>
        </p>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <ErrorMessage message={apiError} />

        <FormInput
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
          placeholder="admin@synexus.test"
          autoComplete="email"
        />

        <FormInput
          label="Password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          error={errors.password}
          placeholder="Enter your password"
          autoComplete="current-password"
        />

        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex min-h-10 w-full items-center justify-center rounded-md bg-emerald-700 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-800 disabled:cursor-not-allowed disabled:bg-slate-400"
        >
          {isSubmitting ? "Signing in..." : "Sign in"}
        </button>
      </form>

      <div className="mt-5 rounded-md border border-slate-200 bg-slate-50 p-3 text-sm text-slate-700">
        <p className="font-semibold text-slate-900">Demo account</p>
        <p className="mt-1">Email: admin@synexus.test</p>
        <p>Password: Admin@12345</p>
      </div>
    </AuthCard>
  );
}

export default LoginPage;
