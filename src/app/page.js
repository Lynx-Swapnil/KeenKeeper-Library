
import Image from "next/image";
import Link from "next/link";
import { FaCheck, FaGift, FaCompass, FaArrowRight } from "react-icons/fa6";
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
    <section className="mx-auto flex w-full max-w-7xl flex-col gap-8 sm:gap-12 px-4 py-8 sm:py-12 lg:px-8 lg:py-16">
      <div className="overflow-hidden rounded-2xl sm:rounded-3xl lg:rounded-[2rem] border border-orange-200 bg-gradient-to-br from-orange-500 via-amber-500 to-rose-500 px-5 py-10 sm:px-8 sm:py-12 lg:px-14 lg:py-12 text-white shadow-[0_24px_80px_rgba(249,115,22,0.28)]">
        <div className="grid gap-6 sm:gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div className="space-y-4 sm:space-y-6">
            <span className="inline-flex rounded-full border border-white/25 bg-white/15 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.24em] text-white/90 sm:px-4 sm:py-2 sm:text-sm">
              KeenKeeper Library
            </span>
            <div className="space-y-3 sm:space-y-4">
              <h1 className="max-w-3xl text-3xl sm:text-4xl lg:text-6xl font-semibold tracking-tight">
                Find Your Next Read
              </h1>
              <p className="max-w-2xl text-sm leading-6 text-white/85 sm:text-base sm:leading-7 lg:text-lg">
                Explore a seamless digital library built for browsing, borrowing, and
                discovering books with speed, security, and style.
              </p>
            </div>

            <div className="flex flex-wrap gap-3 sm:gap-4">
              <Link
                href="/books"
                className="rounded-full bg-white px-4 py-2.5 sm:px-6 sm:py-3 text-xs sm:text-sm font-semibold text-slate-950 transition hover:bg-orange-50"
              >
                Browse Now
              </Link>
              <Link
                href="/my-profile"
                className="rounded-full border border-white/25 bg-white/10 px-4 py-2.5 sm:px-6 sm:py-3 text-xs sm:text-sm font-semibold text-white transition hover:bg-white/20"
              >
                My Profile
              </Link>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-lg sm:rounded-xl lg:rounded-[1.75rem] border border-white/20 bg-white/10 p-3 sm:p-4 shadow-2xl shadow-orange-950/10 backdrop-blur-xl">
            <div className="relative aspect-[4/3] overflow-hidden rounded-lg sm:rounded-lg lg:rounded-[1.5rem] bg-orange-100/20">
              <Image
                src="https://images.unsplash.com/photo-1495446815901-a7297e633e8d?auto=format&fit=crop&w=1200&q=80"
                alt="Stack of books in a warm library theme"
                fill
                priority
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 40vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-orange-950/35 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 rounded-lg sm:rounded-2xl border border-white/20 bg-black/20 px-3 py-2 sm:px-4 sm:py-3 text-left text-white backdrop-blur-md">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-orange-200 sm:text-sm">
                  Curated Reads
                </p>
                <p className="mt-1 text-xs text-white/85 sm:text-sm">
                  Discover handpicked stories, tech picks, and science titles.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="rounded-lg sm:rounded-2xl lg:rounded-[1.75rem] border border-slate-200 bg-white/80 px-4 py-3 sm:px-6 sm:py-4 shadow-sm backdrop-blur">
        <div className="marquee-mask overflow-hidden">
          <div className="marquee-track flex w-max items-center gap-6 sm:gap-8 text-xs sm:text-sm font-medium text-slate-700">
            {[...marqueeText, ...marqueeText].map((item, index) => (
              <span key={`${item}-${index}`} className="inline-flex items-center gap-2 sm:gap-3">
                <span className="h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-orange-500" />
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      <div className="border-t border-slate-200/50" />

      <section className="space-y-4 sm:space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 sm:gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-orange-600">
              Featured Books
            </p>
            <h2 className="mt-2 text-2xl sm:text-3xl lg:text-3xl font-semibold tracking-tight text-slate-950">
              Top picks from our local catalog
            </h2>
          </div>
          <Link
            href="/books"
            className="hidden rounded-full border border-slate-300 bg-white px-4 py-2 sm:px-5 sm:py-2.5 text-xs sm:text-sm font-semibold text-slate-700 transition hover:border-orange-200 hover:text-orange-600 sm:inline-flex"
          >
            View All
          </Link>
        </div>

        <div className="grid gap-4 sm:gap-5 md:grid-cols-2 xl:grid-cols-4">
          {featuredBooks.map((book) => (
            <article
              key={book.id}
              className="group overflow-hidden rounded-lg sm:rounded-xl lg:rounded-[1.75rem] border border-white/70 bg-white/90 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
                <Image
                  src={book.image_url}
                  alt={book.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1280px) 50vw, 25vw"
                  className="object-cover transition duration-500 group-hover:scale-105"
                />
              </div>
              <div className="space-y-3 sm:space-y-4 p-4 sm:p-5">
                <div className="flex items-center justify-between gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-orange-600">
                  <span>{book.category}</span>
                  <span>{book.available_quantity} available</span>
                </div>
                <div>
                  <h3 className="text-base sm:text-lg lg:text-xl font-semibold tracking-tight text-slate-950">
                    {book.title}
                  </h3>
                  <p className="mt-1 text-xs sm:text-sm font-medium text-slate-500">by {book.author}</p>
                </div>
                <p className="line-clamp-3 text-xs sm:text-sm leading-5 sm:leading-6 text-slate-600">
                  {book.description}
                </p>
                <Link
                  href={`/books/${book.id}`}
                  className="inline-flex w-full items-center justify-center rounded-full bg-slate-950 px-3 py-2 sm:px-4 sm:py-3 text-xs sm:text-sm font-semibold text-white transition hover:bg-slate-800"
                >
                  View Details
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <div className="border-t border-slate-200/50" />

      <section className="grid gap-5 lg:grid-cols-3">
        {[
          {
            icon: FaCheck,
            title: "Why Readers Trust KeenKeeper",
            description:
              "A smooth reading journey with quick navigation, a focused layout, and a catalog built for easy discovery.",
            color: "text-emerald-500",
            bg: "bg-emerald-50",
          },
          {
            icon: FaGift,
            title: "Membership Perks",
            description:
              "Unlock borrowing flexibility, special discounts, and a better experience for repeat readers.",
            color: "text-amber-500",
            bg: "bg-amber-50",
          },
          {
            icon: FaCompass,
            title: "Smart Category Exploration",
            description:
              "Jump between Story, Tech, and Science titles without losing context or performance.",
            color: "text-blue-500",
            bg: "bg-blue-50",
          },
        ].map((item) => {
          const IconComponent = item.icon;
          return (
            <article
              key={item.title}
              className="group rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className={`inline-flex rounded-2xl ${item.bg} p-3 ${item.color}`}>
                <IconComponent className="text-2xl" aria-hidden="true" />
              </div>
              <h2 className="mt-4 text-lg font-semibold tracking-tight text-slate-950">
                {item.title}
              </h2>
              <p className="mt-2 leading-6 text-slate-600">{item.description}</p>
            </article>
          );
        })}
      </section>

      <div className="border-t border-slate-200/50" />

      <section className="rounded-4xl border border-slate-200 bg-linear-to-br from-slate-950 via-slate-900 to-slate-800 p-6 text-white shadow-lg lg:p-8">
        <div className="mb-8 space-y-3">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-orange-400">
            Your Reading Journey
          </p>
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            Three simple steps to your next great read.
          </h2>
        </div>
        <div className="grid gap-6 sm:grid-cols-3">
          {[
            {
              step: "01",
              label: "Browse the catalog",
              detail: "Explore thousands of titles across multiple categories with powerful search and filtering tools.",
            },
            {
              step: "02",
              label: "Filter by category",
              detail: "Narrow down by genre, author, or trending picks to find exactly what you're looking for.",
            },
            {
              step: "03",
              label: "Borrow digitally",
              detail: "Add books to your shelf instantly and start reading with seamless access to your library.",
            },
          ].map((item, index) => (
            <div key={item.label} className="relative">
              <article className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition hover:bg-white/10">
                <div className="mb-4 flex items-baseline gap-3">
                  <span className="text-3xl font-bold text-orange-400">{item.step}</span>
                  <span className="text-xs font-semibold uppercase tracking-[0.2em] text-white/50">Step</span>
                </div>
                <h3 className="text-lg font-semibold tracking-tight text-white">
                  {item.label}
                </h3>
                <p className="mt-3 text-sm leading-6 text-white/70">{item.detail}</p>
              </article>
              {index < 2 && (
                <div className="absolute right-0 top-1/2 hidden translate-x-1/2 -translate-y-1/2 sm:block">
                  <FaArrowRight className="text-2xl text-orange-400/50" aria-hidden="true" />
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </section>
  );
}
