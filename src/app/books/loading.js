export default function Loading() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 py-12 px-4">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 space-y-3">
          <div className="h-10 w-64 rounded-full bg-white/80 shadow-sm animate-pulse" />
          <div className="h-5 w-96 rounded-full bg-white/70 shadow-sm animate-pulse" />
        </div>

        <div className="grid gap-8 lg:grid-cols-[260px_1fr] items-start">
          <aside className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="h-6 w-32 rounded-full bg-slate-200 animate-pulse" />
            <div className="mt-5 space-y-3">
              {Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="h-10 rounded-lg bg-slate-200 animate-pulse" />
              ))}
            </div>
          </aside>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="overflow-hidden rounded-lg bg-white shadow-md">
                <div className="h-48 bg-slate-200 animate-pulse" />
                <div className="space-y-3 p-4">
                  <div className="h-5 w-3/4 rounded-full bg-slate-200 animate-pulse" />
                  <div className="h-4 w-1/2 rounded-full bg-slate-200 animate-pulse" />
                  <div className="h-4 w-1/3 rounded-full bg-slate-200 animate-pulse" />
                  <div className="h-10 w-full rounded-lg bg-slate-200 animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}