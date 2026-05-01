import BooksList from './books-list';
import { getFeaturedBooks } from '@/lib/books';

export const metadata = {
  title: 'All Books | Online Book Borrowing Platform',
  description: 'Browse and search all available books',
};

export default async function BooksPage() {
  // Fetch all books (or a large limit)
  let allBooks = [];
  try {
    allBooks = await getFeaturedBooks(1000); // Fetch up to 1000 books
  } catch (error) {
    console.error('Error fetching books:', error);
  }

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,rgba(249,115,22,0.1),transparent_34%),linear-gradient(180deg,#fffaf5_0%,#fffdfb_42%,#fff7ed_100%)] py-8 sm:py-12 px-4 sm:px-0">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 sm:mb-12 overflow-hidden rounded-2xl sm:rounded-3xl lg:rounded-4xl border border-orange-200 bg-linear-to-br from-orange-500 via-amber-500 to-rose-500 px-5 py-8 sm:px-8 sm:py-10 lg:px-12 lg:py-10 text-white shadow-[0_24px_80px_rgba(249,115,22,0.18)]">
          <div className="max-w-3xl space-y-3 sm:space-y-4">
            <span className="inline-flex rounded-full border border-white/25 bg-white/15 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.24em] text-white/90 sm:px-4 sm:py-2 sm:text-xs lg:text-xs">
              All Books
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight">
              Discover your next favorite read
            </h1>
            <p className="max-w-2xl text-sm leading-6 text-white/85 sm:text-base sm:leading-7 lg:text-lg">
              Browse the full catalog with a theme that matches the KeenKeeper home
              experience.
            </p>
          </div>
        </div>

        {/* Books List with Search */}
        <BooksList initialBooks={allBooks} />
      </div>
    </main>
  );
}
