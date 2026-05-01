import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { getFeaturedBooks } from '@/lib/books';
import ProfileBookList from '@/components/profile-book-list';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Wishlist | Online Book Borrowing Platform',
  description: 'Browse books saved to your wishlist',
};

export default async function WishlistPage() {
  let session = null;
  let allBooks = [];

  try {
    session = await auth.api.getSession({
      headers: await headers(),
    });

    allBooks = await getFeaturedBooks(1000);
  } catch (error) {
    console.error('Error checking auth:', error);
  }

  if (!session?.user) {
    redirect('/login');
  }

  return (
    <ProfileBookList
      userEmail={session.user.email}
      storeKey="wishlist"
      books={allBooks}
      title="Wishlist Items"
      description="These are the books you saved for later. Each card lets you open the book or remove it from your wishlist."
      emptyLabel="Your wishlist is empty"
      emptyCta="Add books from the detail pages and they will show up here as cards with a delete action."
    />
  );
}
