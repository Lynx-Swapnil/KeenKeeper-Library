import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { getFeaturedBooks } from '@/lib/books';
import ProfileBookList from '@/components/profile-book-list';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Books Borrowed | Online Book Borrowing Platform',
  description: 'Browse books you have borrowed',
};

export default async function BorrowingHistoryPage() {
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
      storeKey="borrowed"
      books={allBooks}
      title="Books Borrowed"
      description="These are the books you have borrowed from your shelf history. You can revisit a title or remove it from this list at any time."
      emptyLabel="No borrowed books yet"
      emptyCta="Once you borrow a book, it will appear here as a card with quick actions and a delete option."
    />
  );
}
