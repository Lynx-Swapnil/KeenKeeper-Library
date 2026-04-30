export default function Loading() {
  return (
    <section className="mx-auto flex w-full max-w-7xl flex-col gap-12 px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      <div className="overflow-hidden rounded-[2rem] border border-orange-200 bg-white/80 px-6 py-12 shadow-sm sm:px-10 lg:px-14">
        <div className="space-y-6 animate-pulse">
          <div className="h-8 w-48 rounded-full bg-slate-200" />
          <div className="h-14 w-3/5 rounded-2xl bg-slate-200" />
          <div className="h-6 w-4/5 rounded-full bg-slate-200" />
          <div className="flex gap-4">
            <div className="h-12 w-36 rounded-full bg-slate-200" />
            <div className="h-12 w-36 rounded-full bg-slate-200" />
          </div>
        </div>
      </div>

      <div className="rounded-[1.75rem] border border-slate-200 bg-white/80 px-5 py-4 shadow-sm sm:px-6">
        <div className="h-5 w-3/4 rounded-full bg-slate-200 animate-pulse" />
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="rounded-[1.75rem] border border-white/70 bg-white/90 p-4 shadow-sm">
            <div className="aspect-[4/5] rounded-2xl bg-slate-200 animate-pulse" />
            <div className="mt-4 space-y-3">
              <div className="h-4 w-20 rounded-full bg-slate-200 animate-pulse" />
              <div className="h-6 w-4/5 rounded-full bg-slate-200 animate-pulse" />
              <div className="h-4 w-2/3 rounded-full bg-slate-200 animate-pulse" />
              <div className="h-12 w-full rounded-full bg-slate-200 animate-pulse" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );

}