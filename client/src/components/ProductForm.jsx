import { useEffect, useState } from "react";

const initialFormData = {
  name: "",
  category: "",
  quantity: "",
  unitPrice: "",
  supplier: "",
  status: "IN_STOCK",
  description: "",
};

const statusOptions = ["IN_STOCK", "LOW_STOCK", "OUT_OF_STOCK"];

function getFormDataFromProduct(product) {
  if (!product) {
    return initialFormData;
  }

  return {
    name: product.name || "",
    category: product.category || "",
    quantity: product.quantity?.toString() ?? "",
    unitPrice: product.unitPrice?.toString() ?? "",
    supplier: product.supplier || "",
    status: product.status || "IN_STOCK",
    description: product.description || "",
  };
}

function validateForm(formData) {
  const errors = {};

  if (!formData.name.trim()) {
    errors.name = "Name is required";
  }

  if (!formData.category.trim()) {
    errors.category = "Category is required";
  }

  const quantity = Number(formData.quantity);
  if (formData.quantity === "" || !Number.isInteger(quantity) || quantity < 0) {
    errors.quantity = "Quantity must be 0 or greater";
  }

  const unitPrice = Number(formData.unitPrice);
  if (formData.unitPrice === "" || !Number.isFinite(unitPrice) || unitPrice <= 0) {
    errors.unitPrice = "Unit price must be greater than 0";
  }

  return errors;
}

function FieldError({ message }) {
  if (!message) {
    return null;
  }

  return <p className="mt-1 text-xs font-medium text-red-600">{message}</p>;
}

function ProductForm({ onSubmit, isSubmitting, editingProduct, onCancelEdit }) {
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});

  const isEditing = Boolean(editingProduct);

  useEffect(() => {
    setFormData(getFormDataFromProduct(editingProduct));
    setErrors({});
  }, [editingProduct]);

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((currentErrors) => ({
        ...currentErrors,
        [name]: undefined,
      }));
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const validationErrors = validateForm(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    const payload = {
      name: formData.name.trim(),
      category: formData.category.trim(),
      quantity: Number(formData.quantity),
      unitPrice: Number(formData.unitPrice),
      supplier: formData.supplier.trim() || undefined,
      status: formData.status,
      description: formData.description.trim() || undefined,
    };

    const result = await onSubmit(payload);

    if (result?.success !== false) {
      setFormData(initialFormData);
      setErrors({});
    }
  }

  function handleCancelEdit() {
    setFormData(initialFormData);
    setErrors({});
    onCancelEdit?.();
  }

  const inputClass =
    "mt-1 block w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100 disabled:cursor-not-allowed disabled:bg-slate-100";
  const labelClass = "text-sm font-medium text-slate-700";

  return (
    <form onSubmit={handleSubmit} className="rounded-md border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-5 flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h2 className="text-lg font-semibold text-slate-950">
            {isEditing ? "Edit Product" : "Add Product"}
          </h2>
          <p className="text-sm text-slate-600">
            {isEditing
              ? "Update product details and keep the inventory list accurate."
              : "Create a product record for the inventory list."}
          </p>
        </div>
        {isEditing ? (
          <button
            type="button"
            onClick={handleCancelEdit}
            disabled={isSubmitting}
            className="mt-2 inline-flex min-h-9 items-center justify-center rounded-md border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:bg-slate-100 sm:mt-0"
          >
            Cancel Edit
          </button>
        ) : null}
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <label className={labelClass}>
          Product Name
          <input
            className={inputClass}
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Wireless Mouse"
            disabled={isSubmitting}
          />
          <FieldError message={errors.name} />
        </label>

        <label className={labelClass}>
          Category
          <input
            className={inputClass}
            name="category"
            value={formData.category}
            onChange={handleChange}
            placeholder="Electronics"
            disabled={isSubmitting}
          />
          <FieldError message={errors.category} />
        </label>

        <label className={labelClass}>
          Quantity
          <input
            className={inputClass}
            name="quantity"
            type="number"
            min="0"
            step="1"
            value={formData.quantity}
            onChange={handleChange}
            placeholder="25"
            disabled={isSubmitting}
          />
          <FieldError message={errors.quantity} />
        </label>

        <label className={labelClass}>
          Unit Price (PKR)
          <input
            className={inputClass}
            name="unitPrice"
            type="number"
            min="0.01"
            step="0.01"
            value={formData.unitPrice}
            onChange={handleChange}
            placeholder="2500"
            disabled={isSubmitting}
          />
          <FieldError message={errors.unitPrice} />
        </label>

        <label className={labelClass}>
          Supplier
          <input
            className={inputClass}
            name="supplier"
            value={formData.supplier}
            onChange={handleChange}
            placeholder="Logitech"
            disabled={isSubmitting}
          />
        </label>

        <label className={labelClass}>
          Status
          <select
            className={inputClass}
            name="status"
            value={formData.status}
            onChange={handleChange}
            disabled={isSubmitting}
          >
            {statusOptions.map((status) => (
              <option key={status} value={status}>
                {status.replaceAll("_", " ")}
              </option>
            ))}
          </select>
        </label>

        <label className={`${labelClass} md:col-span-2`}>
          Description
          <textarea
            className={`${inputClass} min-h-24 resize-y`}
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Ergonomic wireless mouse"
            disabled={isSubmitting}
          />
        </label>
      </div>

      <div className="mt-5 flex justify-end">
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex min-h-10 items-center justify-center rounded-md bg-emerald-700 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-800 disabled:cursor-not-allowed disabled:bg-slate-400"
        >
          {isSubmitting
            ? isEditing
              ? "Updating Product..."
              : "Adding Product..."
            : isEditing
              ? "Update Product"
              : "Add Product"}
        </button>
      </div>
    </form>
  );
}

export default ProductForm;
