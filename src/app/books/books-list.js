'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function BooksList({ initialBooks }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = useMemo(() => {
    const unique = new Set(initialBooks.map((book) => book.category).filter(Boolean));
    return ['All', ...Array.from(unique)];
  }, [initialBooks]);

  // Filter books based on search query
  const filteredBooks = useMemo(() => {
    return initialBooks.filter((book) => {
      const matchesSearch = book.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory =
        selectedCategory === 'All' ? true : book.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [initialBooks, searchQuery, selectedCategory]);

  return (
    <div className="animate__animated animate__fadeInUp">
      {/* Search Bar */}
      <div className="mb-8 rounded-[1.75rem] border border-white/70 bg-white/85 p-5 shadow-sm backdrop-blur sm:p-6">
        <div className="relative">
          <input
            type="text"
            placeholder="Search books by title..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-6 py-4 text-lg text-slate-900 shadow-sm outline-none transition focus:border-orange-300 focus:bg-white"
          />
          <svg
            className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>

      {/* Results Count */}
      <div className="mb-6">
        <p className="text-slate-600">
          {filteredBooks.length} book{filteredBooks.length !== 1 ? 's' : ''} found
          {selectedCategory !== 'All' ? ` in ${selectedCategory}` : ''}
        </p>
      </div>

      {/* Books Grid */}
      {filteredBooks.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-8 items-start">
          <aside className="rounded-[1.75rem] border border-white/70 bg-white/90 p-5 shadow-sm backdrop-blur lg:sticky lg:top-24">
            <h2 className="mb-4 text-lg font-semibold text-slate-900">Categories</h2>
            <div className="space-y-2">
              {categories.map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => setSelectedCategory(category)}
                  className={`w-full text-left rounded-lg px-4 py-2.5 text-sm font-medium transition ${
                    selectedCategory === category
                      ? 'bg-gradient-to-r from-orange-500 via-amber-500 to-rose-500 text-white shadow'
                      : 'bg-slate-50 text-slate-700 hover:bg-orange-50 hover:text-orange-700'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </aside>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredBooks.map((book) => (
              <div
                key={book.id}
                className="overflow-hidden rounded-[1.75rem] border border-white/70 bg-white/90 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
              >
                {/* Book Image */}
                <div className="relative h-48 w-full bg-slate-100">
                  {book.image_url ? (
                    <Image
                      src={book.image_url}
                      alt={book.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, (max-width: 1400px) 50vw, 33vw"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-orange-100 via-amber-100 to-rose-100">
                      <span className="text-slate-400">No Image</span>
                    </div>
                  )}
                </div>

                {/* Book Info */}
                <div className="space-y-3 p-5">
                  <h3 className="line-clamp-2 text-lg font-semibold tracking-tight text-slate-950">
                    {book.title}
                  </h3>
                  <p className="text-sm font-medium text-slate-500">by {book.author}</p>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-orange-600">
                    {book.category || 'Uncategorized'}
                  </p>

                  {/* Details Button */}
                  <Link
                    href={`/books/${book.id}`}
                    className="inline-flex w-full items-center justify-center rounded-full bg-slate-950 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-slate-600 text-lg">
            No books found matching &quot;{searchQuery}&quot;
            {selectedCategory !== 'All' ? ` in ${selectedCategory}` : ''}
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('All');
            }}
            className="mt-4 rounded-full bg-slate-950 px-6 py-2 text-white transition hover:bg-slate-800"
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
}
