export default function Loading() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 py-12 px-4">
      <div className="mx-auto max-w-2xl space-y-6">
        <div className="h-5 w-44 rounded-full bg-white/80 shadow-sm animate-pulse" />
        <div className="rounded-2xl border border-purple-100 bg-white p-8 shadow-lg">
          <div className="h-8 w-60 rounded-full bg-slate-200 animate-pulse" />
          <div className="mt-3 h-5 w-4/5 rounded-full bg-slate-200 animate-pulse" />
          <div className="mt-8 space-y-5">
            <div className="h-12 rounded-lg bg-slate-200 animate-pulse" />
            <div className="h-12 rounded-lg bg-slate-200 animate-pulse" />
            <div className="h-12 rounded-lg bg-slate-200 animate-pulse" />
          </div>
        </div>
      </div>
    </main>
  );
}
