import { useMemo, useState } from "react";

import ErrorMessage from "../components/ErrorMessage";
import ProductForm from "../components/ProductForm";
import ProductTable from "../components/ProductTable";
import StatCard from "../components/StatCard";

function createLocalId() {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }

  return `local-${Date.now()}`;
}

function InventoryPage() {
  // Temporary UI state for Step 5. Replaced with API-backed state in Step 6.
  const [products, setProducts] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const stats = useMemo(
    () => ({
      total: products.length,
      inStock: products.filter((product) => product.status === "IN_STOCK").length,
      lowStock: products.filter((product) => product.status === "LOW_STOCK").length,
      outOfStock: products.filter((product) => product.status === "OUT_OF_STOCK").length,
    }),
    [products]
  );

  async function handleCreateProduct(productData) {
    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const newProduct = {
        id: createLocalId(),
        ...productData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      setProducts((currentProducts) => [newProduct, ...currentProducts]);
      return { success: true };
    } catch (error) {
      setErrorMessage(error.message || "Unable to add product");
      return { success: false };
    } finally {
      setIsSubmitting(false);
    }
  }

  function handleEditProduct() {}

  function handleDeleteProduct(productId) {
    setProducts((currentProducts) =>
      currentProducts.filter((product) => product.id !== productId)
    );
  }

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-6 text-slate-950 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-6">
        <header className="flex flex-col gap-2 border-b border-slate-200 pb-5">
          <p className="text-sm font-semibold uppercase text-emerald-700">Synexus Inventory</p>
          <div>
            <h1 className="text-3xl font-bold text-slate-950 sm:text-4xl">Inventory Management</h1>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600 sm:text-base">
              Week 1 CRUD module layout for creating products, reviewing inventory status, and preparing product records for operational workflows.
            </p>
          </div>
        </header>

        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard label="Total Products" value={stats.total} />
          <StatCard label="In Stock" value={stats.inStock} />
          <StatCard label="Low Stock" value={stats.lowStock} />
          <StatCard label="Out of Stock" value={stats.outOfStock} />
        </section>

        <ErrorMessage message={errorMessage} />

        <ProductForm onSubmit={handleCreateProduct} isSubmitting={isSubmitting} />

        <section className="flex flex-col gap-4">
          <div>
            <h2 className="text-lg font-semibold text-slate-950">Products</h2>
            <p className="text-sm text-slate-600">Review current stock levels and supplier details.</p>
          </div>

          <ProductTable
            products={products}
            onEdit={handleEditProduct}
            onDelete={handleDeleteProduct}
            isLoading={false}
          />
        </section>
      </div>
    </main>
  );
}

export default InventoryPage;
