export default function Loading() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(249,115,22,0.1),_transparent_34%),linear-gradient(180deg,_#fffaf5_0%,_#fffdfb_42%,_#fff7ed_100%)] py-12 px-4">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8 h-5 w-40 rounded-full bg-white/80 shadow-sm animate-pulse" />

        <section className="mb-8 overflow-hidden rounded-[2rem] border border-orange-200 bg-white/85 shadow-[0_24px_80px_rgba(249,115,22,0.12)] backdrop-blur-sm">
          <div className=" px-8 py-8">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                <div className="h-28 w-28 flex-shrink-0 rounded-full border-4 border-white/90 bg-white/20 shadow-lg animate-pulse" />
                <div className="space-y-3">
                  <div className="h-8 w-52 rounded-full bg-white/25 animate-pulse" />
                  <div className="h-10 w-72 rounded-full bg-white/20 animate-pulse" />
                </div>
              </div>

              <div className="h-12 w-44 rounded-full bg-white/90 animate-pulse" />
            </div>
          </div>
        </section>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <div className="rounded-[1.75rem] border border-white/70 bg-white/90 p-8 shadow-sm backdrop-blur">
            <div className="h-7 w-56 rounded-full bg-slate-200 animate-pulse" />
            <div className="mt-6 space-y-6">
              <div className="space-y-2">
                <div className="h-4 w-32 rounded-full bg-slate-200 animate-pulse" />
                <div className="h-12 w-full rounded-2xl bg-slate-200 animate-pulse" />
              </div>
              <div className="space-y-2">
                <div className="h-4 w-28 rounded-full bg-slate-200 animate-pulse" />
                <div className="h-12 w-full rounded-2xl bg-slate-200 animate-pulse" />
              </div>
              <div className="space-y-2">
                <div className="h-4 w-36 rounded-full bg-slate-200 animate-pulse" />
                <div className="h-12 w-full rounded-2xl bg-slate-200 animate-pulse" />
              </div>
              <div className="space-y-2">
                <div className="h-4 w-32 rounded-full bg-slate-200 animate-pulse" />
                <div className="h-12 w-full rounded-2xl bg-slate-200 animate-pulse" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-8">
            {Array.from({ length: 2 }).map((_, index) => (
              <div key={index} className="rounded-[1.75rem] border border-white/70 bg-white/90 p-8 text-center shadow-sm backdrop-blur">
                <div className="mx-auto h-12 w-12 rounded-full bg-slate-200 animate-pulse" />
                <div className="mx-auto mt-4 h-12 w-20 rounded-full bg-slate-200 animate-pulse" />
                <div className="mx-auto mt-4 h-6 w-36 rounded-full bg-slate-200 animate-pulse" />
                <div className="mx-auto mt-3 h-4 w-48 rounded-full bg-slate-200 animate-pulse" />
                <div className="mx-auto mt-5 h-4 w-32 rounded-full bg-slate-200 animate-pulse" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
