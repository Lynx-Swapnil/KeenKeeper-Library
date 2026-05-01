export default function Loading() {
  return (
    <section className="mx-auto flex w-full max-w-7xl flex-col gap-12 px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      <div className="flex items-center justify-center rounded-4xl border border-orange-200 bg-white/80 px-6 py-20 shadow-sm sm:px-10 lg:px-14">
        <div className="flex flex-col items-center gap-4">
          <div className="h-12 w-12 rounded-full border-4 border-t-orange-500 border-slate-200 animate-spin" />
          <p className="text-sm text-slate-700">Preparing the library — loading content…</p>
        </div>
      </div>
    </section>
  );
}