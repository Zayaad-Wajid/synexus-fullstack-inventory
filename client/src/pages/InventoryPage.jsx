import { useEffect, useMemo, useState } from "react";

import {
  createProduct,
  deleteProduct,
  getApiErrorMessage,
  getProducts,
  updateProduct,
} from "../api/productApi";
import ErrorMessage from "../components/ErrorMessage";
import ProductForm from "../components/ProductForm";
import ProductTable from "../components/ProductTable";
import StatCard from "../components/StatCard";

function SuccessMessage({ message }) {
  if (!message) {
    return null;
  }

  return (
    <div className="rounded-md border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-800">
      {message}
    </div>
  );
}

function InventoryPage() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [editingProduct, setEditingProduct] = useState(null);

  const stats = useMemo(
    () => ({
      total: products.length,
      inStock: products.filter((product) => product.status === "IN_STOCK").length,
      lowStock: products.filter((product) => product.status === "LOW_STOCK").length,
      outOfStock: products.filter((product) => product.status === "OUT_OF_STOCK").length,
    }),
    [products]
  );

  async function fetchProducts({ showLoading = false } = {}) {
    if (showLoading) {
      setIsLoading(true);
    }

    try {
      const response = await getProducts();
      setProducts(response.data || []);
      setError("");
    } catch (apiError) {
      setError(getApiErrorMessage(apiError));
    } finally {
      if (showLoading) {
        setIsLoading(false);
      }
    }
  }

  useEffect(() => {
    fetchProducts({ showLoading: true });
  }, []);

  useEffect(() => {
    if (!successMessage) {
      return undefined;
    }

    const timeoutId = window.setTimeout(() => {
      setSuccessMessage("");
    }, 3500);

    return () => window.clearTimeout(timeoutId);
  }, [successMessage]);

  async function handleSubmitProduct(productData) {
    setIsSubmitting(true);
    setError("");
    setSuccessMessage("");

    try {
      if (editingProduct) {
        await updateProduct(editingProduct.id, productData);
        await fetchProducts();
        setEditingProduct(null);
        setSuccessMessage("Product updated successfully.");
      } else {
        await createProduct(productData);
        await fetchProducts();
        setSuccessMessage("Product created successfully.");
      }

      return { success: true };
    } catch (apiError) {
      setError(getApiErrorMessage(apiError));
      return { success: false };
    } finally {
      setIsSubmitting(false);
    }
  }

  function handleEditProduct(product) {
    setEditingProduct(product);
    setError("");
    setSuccessMessage("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handleCancelEdit() {
    setEditingProduct(null);
    setError("");
  }

  async function handleDeleteProduct(productId) {
    const confirmed = window.confirm("Delete this product from inventory?");

    if (!confirmed) {
      return;
    }

    setError("");
    setSuccessMessage("");

    try {
      await deleteProduct(productId);
      await fetchProducts();
      if (editingProduct?.id === productId) {
        setEditingProduct(null);
      }
      setSuccessMessage("Product deleted successfully.");
    } catch (apiError) {
      setError(getApiErrorMessage(apiError));
    }
  }

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-6 text-slate-950 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-6">
        <header className="flex flex-col gap-2 border-b border-slate-200 pb-5">
          <p className="text-sm font-semibold uppercase text-emerald-700">Synexus Inventory</p>
          <div>
            <h1 className="text-3xl font-bold text-slate-950 sm:text-4xl">Inventory Management</h1>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600 sm:text-base">
              Create, update, and manage product records backed by the PostgreSQL inventory database.
            </p>
          </div>
        </header>

        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard label="Total Products" value={stats.total} />
          <StatCard label="In Stock" value={stats.inStock} />
          <StatCard label="Low Stock" value={stats.lowStock} />
          <StatCard label="Out of Stock" value={stats.outOfStock} />
        </section>

        <ErrorMessage message={error} />
        <SuccessMessage message={successMessage} />

        <ProductForm
          onSubmit={handleSubmitProduct}
          isSubmitting={isSubmitting}
          editingProduct={editingProduct}
          onCancelEdit={handleCancelEdit}
        />

        <section className="flex flex-col gap-4">
          <div>
            <h2 className="text-lg font-semibold text-slate-950">Products</h2>
            <p className="text-sm text-slate-600">Review current stock levels and supplier details.</p>
          </div>

          <ProductTable
            products={products}
            onEdit={handleEditProduct}
            onDelete={handleDeleteProduct}
            isLoading={isLoading}
          />
        </section>
      </div>
    </main>
  );
}

export default InventoryPage;
