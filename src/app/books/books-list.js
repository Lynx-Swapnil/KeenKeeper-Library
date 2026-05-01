'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function BooksList({ initialBooks }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);

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
      <div className="mb-6 sm:mb-8 rounded-xl sm:rounded-2xl lg:rounded-[1.75rem] border border-white/70 bg-white/85 p-4 sm:p-5 lg:p-6 shadow-sm backdrop-blur">
        <div className="relative">
          <input
            type="text"
            placeholder="Search books by title..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-lg sm:rounded-xl lg:rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2.5 sm:px-4 sm:py-3 lg:px-6 lg:py-4 text-sm sm:text-base lg:text-lg text-slate-900 shadow-sm outline-none transition focus:border-orange-300 focus:bg-white"
          />
          <svg
            className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-slate-400"
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
      <div className="mb-4 sm:mb-6">
        <p className="text-xs sm:text-sm text-slate-600">
          {filteredBooks.length} book{filteredBooks.length !== 1 ? 's' : ''} found
          {selectedCategory !== 'All' ? ` in ${selectedCategory}` : ''}
        </p>
      </div>

      {/* Books Grid */}
      {filteredBooks.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-6 lg:gap-8 items-start">
          {/* Mobile Category Toggle */}
          <div className="lg:hidden">
            <button
              type="button"
              onClick={() => setIsCategoryOpen(!isCategoryOpen)}
              className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-orange-200 hover:bg-orange-50"
            >
              {isCategoryOpen ? 'Hide Categories' : 'Show Categories'}
            </button>
            {isCategoryOpen && (
              <div className="mt-3 rounded-xl border border-white/70 bg-white/90 p-4 shadow-sm">
                <div className="space-y-2">
                  {categories.map((category) => (
                    <button
                      key={category}
                      type="button"
                      onClick={() => {
                        setSelectedCategory(category);
                        setIsCategoryOpen(false);
                      }}
                      className={`w-full text-left rounded-lg px-3 py-2 text-sm font-medium transition ${
                        selectedCategory === category
                          ? 'bg-linear-to-r from-orange-500 via-amber-500 to-rose-500 text-white shadow'
                          : 'bg-slate-50 text-slate-700 hover:bg-orange-50 hover:text-orange-700'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Desktop Category Sidebar */}
          <aside className="hidden lg:block rounded-xl lg:rounded-[1.75rem] border border-white/70 bg-white/90 p-4 lg:p-5 shadow-sm backdrop-blur lg:sticky lg:top-24">
            <h2 className="mb-4 text-sm lg:text-base font-semibold text-slate-900">Categories</h2>
            <div className="space-y-2">
              {categories.map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => setSelectedCategory(category)}
                  className={`w-full text-left rounded-lg px-3 py-2 lg:px-4 lg:py-2.5 text-xs lg:text-sm font-medium transition ${
                    selectedCategory === category
                      ? 'bg-linear-to-r from-orange-500 via-amber-500 to-rose-500 text-white shadow'
                      : 'bg-slate-50 text-slate-700 hover:bg-orange-50 hover:text-orange-700'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </aside>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
            {filteredBooks.map((book) => (
              <div
                key={book.id}
                className="overflow-hidden rounded-lg sm:rounded-xl lg:rounded-[1.75rem] border border-white/70 bg-white/90 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
              >
                {/* Book Image */}
                <div className="relative h-40 sm:h-44 lg:h-48 w-full bg-slate-100">
                  {book.image_url ? (
                    <Image
                      src={book.image_url}
                      alt={book.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-linear-to-br from-orange-100 via-amber-100 to-rose-100">
                      <span className="text-xs sm:text-sm text-slate-400">No Image</span>
                    </div>
                  )}
                </div>

                {/* Book Info */}
                <div className="space-y-2 sm:space-y-3 p-4 sm:p-5">
                  <h3 className="line-clamp-2 text-sm sm:text-base lg:text-lg font-semibold tracking-tight text-slate-950">
                    {book.title}
                  </h3>
                  <p className="text-xs sm:text-sm font-medium text-slate-500">by {book.author}</p>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-orange-600">
                    {book.category || 'Uncategorized'}
                  </p>

                  {/* Details Button */}
                  <Link
                    href={`/books/${book.id}`}
                    className="inline-flex w-full items-center justify-center rounded-full bg-slate-950 px-3 py-2 sm:px-4 sm:py-3 text-xs sm:text-sm font-semibold text-white transition hover:bg-slate-800"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center py-8 sm:py-12">
          <p className="text-xs sm:text-base text-slate-600">
            No books found matching &quot;{searchQuery}&quot;
            {selectedCategory !== 'All' ? ` in ${selectedCategory}` : ''}
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('All');
            }}
            className="mt-3 sm:mt-4 rounded-full bg-slate-950 px-4 sm:px-6 py-2 text-xs sm:text-sm text-white transition hover:bg-slate-800"
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
}
