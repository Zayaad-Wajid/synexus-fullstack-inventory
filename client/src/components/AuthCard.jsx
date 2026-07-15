function AuthCard({ title, subtitle, children, footer }) {
  return (
    <main className="grid min-h-screen place-items-center bg-slate-100 px-4 py-8 text-slate-950">
      <section className="w-full max-w-md rounded-md border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-6">
          <p className="text-sm font-semibold uppercase text-emerald-700">Synexus Inventory</p>
          <h1 className="mt-2 text-2xl font-bold text-slate-950">{title}</h1>
          <p className="mt-2 text-sm leading-6 text-slate-600">{subtitle}</p>
        </div>

        {children}

        {footer ? <div className="mt-6 border-t border-slate-200 pt-4 text-sm text-slate-600">{footer}</div> : null}
      </section>
    </main>
  );
}

export default AuthCard;
