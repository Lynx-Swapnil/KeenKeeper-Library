export default function Loading() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 py-12 px-4">
      <div className="mx-auto max-w-4xl space-y-6">
        <div className="h-5 w-40 rounded-full bg-white/80 shadow-sm animate-pulse" />

        <div className="overflow-hidden rounded-lg bg-white shadow-lg">
          <div className="grid gap-8 p-8 md:grid-cols-3">
            <div className="md:col-span-1">
              <div className="aspect-square rounded-lg bg-slate-200 animate-pulse" />
            </div>
            <div className="space-y-5 md:col-span-2">
              <div className="h-10 w-3/4 rounded-full bg-slate-200 animate-pulse" />
              <div className="h-6 w-1/2 rounded-full bg-slate-200 animate-pulse" />
              <div className="h-8 w-24 rounded-full bg-slate-200 animate-pulse" />
              <div className="space-y-3">
                <div className="h-5 w-full rounded-full bg-slate-200 animate-pulse" />
                <div className="h-5 w-11/12 rounded-full bg-slate-200 animate-pulse" />
                <div className="h-5 w-5/6 rounded-full bg-slate-200 animate-pulse" />
              </div>
              <div className="h-16 rounded-lg bg-slate-200 animate-pulse" />
              <div className="flex gap-4">
                <div className="h-12 w-40 rounded-lg bg-slate-200 animate-pulse" />
                <div className="h-12 w-40 rounded-lg bg-slate-200 animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );

}