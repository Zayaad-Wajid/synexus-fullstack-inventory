import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import AuthCard from "../components/AuthCard";
import ErrorMessage from "../components/ErrorMessage";
import FormInput from "../components/FormInput";
import { useAuth } from "../context/AuthContext";

const initialFormData = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validateRegister(formData) {
  const errors = {};

  if (formData.name.trim().length < 2) {
    errors.name = "Name must be at least 2 characters";
  }

  if (!formData.email.trim()) {
    errors.email = "Email is required";
  } else if (!isValidEmail(formData.email)) {
    errors.email = "Enter a valid email address";
  }

  if (formData.password.length < 8) {
    errors.password = "Password must be at least 8 characters";
  } else if (!/[A-Z]/.test(formData.password)) {
    errors.password = "Password must include at least one uppercase letter";
  } else if (!/[a-z]/.test(formData.password)) {
    errors.password = "Password must include at least one lowercase letter";
  } else if (!/[0-9]/.test(formData.password)) {
    errors.password = "Password must include at least one number";
  }

  if (formData.confirmPassword !== formData.password) {
    errors.confirmPassword = "Passwords must match";
  }

  return errors;
}

function RegisterPage() {
  const navigate = useNavigate();
  const { authError, clearAuthError, isAuthenticated, register } = useAuth();
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/inventory", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    clearAuthError();
  }, [clearAuthError]);

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((currentData) => ({ ...currentData, [name]: value }));

    if (errors[name]) {
      setErrors((currentErrors) => ({ ...currentErrors, [name]: undefined }));
    }

    if (authError) {
      clearAuthError();
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const validationErrors = validateRegister(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    setIsSubmitting(true);
    clearAuthError();

    try {
      await register({
        name: formData.name.trim(),
        email: formData.email.trim().toLowerCase(),
        password: formData.password,
      });
      navigate("/inventory");
    } catch {
      // AuthContext stores a readable authError for display.
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <AuthCard
      title="Create account"
      subtitle="Register a staff account to start using the protected inventory workspace."
      footer={
        <p>
          Already have an account?{" "}
          <Link className="font-semibold text-emerald-700 hover:text-emerald-800" to="/login">
            Sign in
          </Link>
        </p>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <ErrorMessage message={authError} />

        <FormInput
          label="Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          error={errors.name}
          placeholder="Demo Staff"
          autoComplete="name"
        />

        <FormInput
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
          placeholder="staff@synexus.test"
          autoComplete="email"
        />

        <FormInput
          label="Password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          error={errors.password}
          placeholder="Create a password"
          autoComplete="new-password"
        />

        <FormInput
          label="Confirm Password"
          name="confirmPassword"
          type="password"
          value={formData.confirmPassword}
          onChange={handleChange}
          error={errors.confirmPassword}
          placeholder="Confirm your password"
          autoComplete="new-password"
        />

        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex min-h-10 w-full items-center justify-center rounded-md bg-emerald-700 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-800 disabled:cursor-not-allowed disabled:bg-slate-400"
        >
          {isSubmitting ? "Creating account..." : "Create account"}
        </button>
      </form>
    </AuthCard>
  );
}

export default RegisterPage;