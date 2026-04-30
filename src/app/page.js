
import Image from "next/image";
import Link from "next/link";
import { getFeaturedBooks } from "../lib/books";

export const dynamic = "force-dynamic";

const marqueeText = [
  "New Arrivals: The Last Lighthouse",
  "Special Discount on Memberships",
  "Fresh picks added every week",
  "Browse faster with curated categories",
];

export default async function Home() {
  const featuredBooks = await getFeaturedBooks(4);

  return (
    <section className="mx-auto flex w-full max-w-7xl flex-col gap-12 px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      <div className="overflow-hidden rounded-[2rem] border border-orange-200 bg-gradient-to-br from-orange-500 via-amber-500 to-rose-500 px-6 py-12 text-white shadow-[0_24px_80px_rgba(249,115,22,0.28)] sm:px-10 lg:px-14">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div className="space-y-6">
            <span className="inline-flex rounded-full border border-white/25 bg-white/15 px-4 py-2 text-sm font-semibold uppercase tracking-[0.24em] text-white/90">
              KeenKeeper Library
            </span>
            <div className="space-y-4">
              <h1 className="max-w-3xl text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
                Find Your Next Read
              </h1>
              <p className="max-w-2xl text-base leading-7 text-white/85 sm:text-lg">
                Explore a seamless digital library built for browsing, borrowing, and
                discovering books with speed, security, and style.
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <Link
                href="/books"
                className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-orange-50"
              >
                Browse Now
              </Link>
              <Link
                href="/my-profile"
                className="rounded-full border border-white/25 bg-white/10 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/20"
              >
                My Profile
              </Link>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-[1.75rem] border border-white/20 bg-white/10 p-4 shadow-2xl shadow-orange-950/10 backdrop-blur-xl">
            <div className="relative aspect-[4/3] overflow-hidden rounded-[1.5rem] bg-orange-100/20">
              <Image
                src="https://images.unsplash.com/photo-1495446815901-a7297e633e8d?auto=format&fit=crop&w=1200&q=80"
                alt="Stack of books in a warm library theme"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-orange-950/35 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 rounded-2xl border border-white/20 bg-black/20 px-4 py-3 text-left text-white backdrop-blur-md">
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-orange-200">
                  Curated Reads
                </p>
                <p className="mt-1 text-sm text-white/85">
                  Discover handpicked stories, tech picks, and science titles.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="rounded-[1.75rem] border border-slate-200 bg-white/80 px-5 py-4 shadow-sm backdrop-blur sm:px-6">
        <div className="marquee-mask overflow-hidden">
          <div className="marquee-track flex w-max items-center gap-8 text-sm font-medium text-slate-700">
            {[...marqueeText, ...marqueeText].map((item, index) => (
              <span key={`${item}-${index}`} className="inline-flex items-center gap-3">
                <span className="h-2 w-2 rounded-full bg-orange-500" />
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-orange-600">
              Featured Books
            </p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-950 sm:text-3xl">
              Top picks from our local catalog
            </h2>
          </div>
          <Link
            href="/books"
            className="hidden rounded-full border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-orange-200 hover:text-orange-600 sm:inline-flex"
          >
            View All
          </Link>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {featuredBooks.map((book) => (
            <article
              key={book.id}
              className="group overflow-hidden rounded-[1.75rem] border border-white/70 bg-white/90 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
                <Image
                  src={book.image_url}
                  alt={book.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 25vw"
                  className="object-cover transition duration-500 group-hover:scale-105"
                />
              </div>
              <div className="space-y-4 p-5">
                <div className="flex items-center justify-between gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-orange-600">
                  <span>{book.category}</span>
                  <span>{book.available_quantity} available</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold tracking-tight text-slate-950">
                    {book.title}
                  </h3>
                  <p className="mt-1 text-sm font-medium text-slate-500">by {book.author}</p>
                </div>
                <p className="line-clamp-3 text-sm leading-6 text-slate-600">
                  {book.description}
                </p>
                <Link
                  href={`/books/${book.id}`}
                  className="inline-flex w-full items-center justify-center rounded-full bg-slate-950 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
                >
                  View Details
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="grid gap-5 lg:grid-cols-3">
        {[
          {
            title: "Why Readers Trust KeenKeeper",
            description:
              "A smooth reading journey with quick navigation, a focused layout, and a catalog built for easy discovery.",
          },
          {
            title: "Membership Perks",
            description:
              "Unlock borrowing flexibility, special discounts, and a better experience for repeat readers.",
          },
          {
            title: "Smart Category Exploration",
            description:
              "Jump between Story, Tech, and Science titles without losing context or performance.",
          },
        ].map((item) => (
          <article
            key={item.title}
            className="rounded-[1.75rem] border border-slate-200 bg-white/80 p-6 shadow-sm backdrop-blur"
          >
            
            <h2 className="text-xl font-semibold tracking-tight text-slate-950">
              {item.title}
            </h2>
            <p className="mt-3 leading-7 text-slate-600">{item.description}</p>
          </article>
        ))}
      </section>

      <section className="grid gap-5 rounded-[2rem] border border-slate-200 bg-slate-950 p-6 text-white lg:grid-cols-[0.95fr_1.05fr] lg:p-8">
        <div className="space-y-4">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-orange-300">
            Reading Flow
          </p>
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            Designed to keep readers moving from discovery to borrowing.
          </h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          {[
            ["01", "Browse the catalog"],
            ["02", "Filter by category"],
            ["03", "Borrow digitally"],
          ].map(([step, label]) => (
            <article key={label} className="rounded-3xl border border-white/10 bg-white/5 p-5">
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-orange-300">
                {step}
              </p>
              <p className="mt-3 text-sm leading-6 text-white/80">{label}</p>
            </article>
          ))}
        </div>
      </section>
    </section>
  );
}
