function EmptyState({ message = "Create your first product to start tracking inventory." }) {
  return (
    <div className="flex min-h-48 flex-col items-center justify-center rounded-md border border-dashed border-slate-300 bg-white px-6 py-10 text-center">
      <div className="mb-3 grid h-10 w-10 place-items-center rounded-md bg-emerald-50 text-lg font-semibold text-emerald-700">
        +
      </div>
      <h3 className="text-base font-semibold text-slate-900">No products yet</h3>
      <p className="mt-1 max-w-md text-sm leading-6 text-slate-600">{message}</p>
    </div>
  );
}

export default EmptyState;
