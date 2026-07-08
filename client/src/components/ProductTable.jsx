import EmptyState from "./EmptyState";
import LoadingSpinner from "./LoadingSpinner";
import { formatCurrency } from "../utils/formatCurrency";

const statusStyles = {
  IN_STOCK: "border-emerald-200 bg-emerald-50 text-emerald-700",
  LOW_STOCK: "border-amber-200 bg-amber-50 text-amber-700",
  OUT_OF_STOCK: "border-red-200 bg-red-50 text-red-700",
};

function formatStatus(status) {
  return status.replaceAll("_", " ");
}

function ProductTable({ products, onEdit, onDelete, isLoading }) {
  if (isLoading) {
    return (
      <div className="rounded-md border border-slate-200 bg-white p-8 text-center shadow-sm">
        <LoadingSpinner label="Loading products" />
      </div>
    );
  }

  if (!products.length) {
    return <EmptyState />;
  }

  return (
    <div className="overflow-hidden rounded-md border border-slate-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200 text-sm">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-4 py-3 text-left font-semibold text-slate-600">Product</th>
              <th className="px-4 py-3 text-left font-semibold text-slate-600">SKU</th>
              <th className="px-4 py-3 text-left font-semibold text-slate-600">Category</th>
              <th className="px-4 py-3 text-right font-semibold text-slate-600">Quantity</th>
              <th className="px-4 py-3 text-right font-semibold text-slate-600">Unit Price</th>
              <th className="px-4 py-3 text-left font-semibold text-slate-600">Supplier</th>
              <th className="px-4 py-3 text-left font-semibold text-slate-600">Status</th>
              <th className="px-4 py-3 text-right font-semibold text-slate-600">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 bg-white">
            {products.map((product) => (
              <tr key={product.id} className="hover:bg-slate-50">
                <td className="px-4 py-4 align-top">
                  <div className="font-medium text-slate-950">{product.name}</div>
                  {product.description ? (
                    <div className="mt-1 max-w-xs truncate text-xs text-slate-500">
                      {product.description}
                    </div>
                  ) : null}
                </td>
                <td className="px-4 py-4 align-top font-mono text-xs text-slate-700">{product.sku}</td>
                <td className="px-4 py-4 align-top text-slate-700">{product.category}</td>
                <td className="px-4 py-4 text-right align-top font-medium text-slate-900">{product.quantity}</td>
                <td className="px-4 py-4 text-right align-top text-slate-700">{formatCurrency(product.unitPrice)}</td>
                <td className="px-4 py-4 align-top text-slate-700">{product.supplier || "-"}</td>
                <td className="px-4 py-4 align-top">
                  <span className={`inline-flex rounded-md border px-2 py-1 text-xs font-semibold ${statusStyles[product.status]}`}>
                    {formatStatus(product.status)}
                  </span>
                </td>
                <td className="px-4 py-4 align-top">
                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => onEdit(product)}
                      className="rounded-md border border-slate-300 px-3 py-1.5 text-xs font-semibold text-slate-700 transition hover:bg-slate-100"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => onDelete(product.id)}
                      className="rounded-md border border-red-200 px-3 py-1.5 text-xs font-semibold text-red-700 transition hover:bg-red-50"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ProductTable;
