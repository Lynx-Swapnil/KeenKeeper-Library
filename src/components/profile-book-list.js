"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaArrowLeft, FaBookOpen, FaTrashCan, FaHeart, FaArrowDownWideShort } from "react-icons/fa6";

import { ensureBookSessionStore, getAvailableCount } from "@/lib/book-session";

function ensureSessionStore() {
  if (typeof window === "undefined") return null;
  if (!window.__keenkeeper_session) {
    window.__keenkeeper_session = { borrowed: {}, wishlist: {} };
  }
  return window.__keenkeeper_session;
}

function readItemIds(storeKey, userEmail) {
  const session = ensureSessionStore();
  const list = session?.[storeKey]?.[userEmail];
  return Array.isArray(list) ? list : [];
}

function removeItemFromSession(storeKey, userEmail, bookId) {
  const session = ensureSessionStore();
  if (!session?.[storeKey]?.[userEmail]) return;
  session[storeKey][userEmail] = session[storeKey][userEmail].filter((item) => String(item) !== String(bookId));
}

export default function ProfileBookList({ userEmail, storeKey, title, description, emptyLabel, emptyCta, books = [] }) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    if (!userEmail) return;

    const syncItems = () => {
      ensureBookSessionStore();
      const ids = readItemIds(storeKey, userEmail);
      setItems(
        ids
          .map((id) => books.find((book) => String(book.id) === String(id)) ?? null)
          .filter(Boolean),
      );
    };

    syncItems();

    const onStorage = () => syncItems();
    window.addEventListener("storage", onStorage);

    const interval = setInterval(syncItems, 800);

    return () => {
      window.removeEventListener("storage", onStorage);
      clearInterval(interval);
    };
  }, [books, storeKey, userEmail]);

  const handleRemove = (bookId) => {
    removeItemFromSession(storeKey, userEmail, bookId);
    setItems((current) => current.filter((item) => String(item.id) !== String(bookId)));
  };

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,rgba(249,115,22,0.08),transparent_34%),linear-gradient(180deg,#fffaf5_0%,#fffdfb_42%,#fff7ed_100%)] py-12 px-4">
      <div className="mx-auto max-w-7xl">
        <Link href="/my-profile" className="mb-8 inline-flex items-center gap-2 font-medium text-orange-600 hover:text-orange-700">
          <FaArrowLeft aria-hidden="true" />
          Back to Profile
        </Link>

        <section className="overflow-hidden rounded-4xl border border-orange-200 bg-white/90 shadow-[0_24px_80px_rgba(249,115,22,0.12)] backdrop-blur-sm">
          <div className="bg-linear-to-r from-orange-500 via-amber-500 to-rose-500 px-8 py-8 text-white sm:px-10">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="mb-2 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-white/90">
                  <FaBookOpen aria-hidden="true" />
                  Library Shelf
                </p>
                <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{title}</h1>
                <p className="mt-3 max-w-2xl text-sm text-white/85 sm:text-base">{description}</p>
              </div>

              <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-white/90">
                <FaArrowDownWideShort aria-hidden="true" />
                {items.length} items
              </div>
            </div>
          </div>

          <div className="px-5 py-6 sm:px-8 sm:py-8">
            {items.length > 0 ? (
              <div className="grid gap-5">
                {items.map((book) => (
                  <article key={book.id} className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
                    <div className="grid gap-0 md:grid-cols-[240px_1fr]">
                      <div className="relative min-h-64 overflow-hidden bg-slate-100 md:min-h-full">
                        <Image
                          src={book.image_url}
                          alt={book.title}
                          fill
                          sizes="(max-width: 768px) 100vw, 240px"
                          className="object-cover transition duration-500 group-hover:scale-105"
                        />
                      </div>

                      <div className="space-y-4 p-5 sm:p-6">
                      <div className="flex items-center justify-between gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-orange-600">
                        <span>{book.category}</span>
                        <span>{getAvailableCount(book.id, book.available_quantity)} available</span>
                      </div>

                      <div>
                        <h2 className="text-xl font-semibold tracking-tight text-slate-950">{book.title}</h2>
                        <p className="mt-1 text-sm font-medium text-slate-500">by {book.author}</p>
                      </div>

                      <p className="line-clamp-3 text-sm leading-6 text-slate-600">{book.description}</p>

                      <div className="flex gap-3">
                        <Link
                          href={`/books/${book.id}`}
                          className="inline-flex flex-1 items-center justify-center rounded-full bg-slate-950 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
                        >
                          View Book
                        </Link>

                        <button
                          type="button"
                          onClick={() => handleRemove(book.id)}
                          className="inline-flex items-center justify-center gap-2 rounded-full border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-semibold text-rose-600 transition hover:bg-rose-100"
                        >
                          <FaTrashCan aria-hidden="true" />
                          Delete
                        </button>
                      </div>
                    </div>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="flex min-h-72 flex-col items-center justify-center rounded-[1.75rem] border border-dashed border-slate-200 bg-slate-50 px-6 text-center">
                <div className="mb-4 rounded-full bg-white p-4 text-orange-500 shadow-sm">
                  <FaHeart aria-hidden="true" className="text-2xl" />
                </div>
                <h2 className="text-2xl font-semibold tracking-tight text-slate-950">{emptyLabel}</h2>
                <p className="mt-2 max-w-md text-sm leading-6 text-slate-600">{emptyCta}</p>
                <Link
                  href="/books"
                  className="mt-6 inline-flex items-center rounded-full bg-orange-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-orange-600"
                >
                  Browse books
                </Link>
              </div>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}
