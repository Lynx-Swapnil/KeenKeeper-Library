import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import ProfileClient from './profile-client';
export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'My Profile | Online Book Borrowing Platform',
  description: 'View and manage your profile',
};

export default async function MyProfilePage() {
  // Check authentication
  let session = null;
  let error = null;

  try {
    session = await auth.api.getSession({
      headers: await headers(),
    });
  } catch (err) {
    console.error('Error checking auth:', err);
  }

  // Redirect if not authenticated
  if (!session?.user) {
    redirect('/login');
  }

  return <ProfileClient user={session.user} />;
}
