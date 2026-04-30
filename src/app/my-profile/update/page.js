import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import UpdateProfileForm from './update-profile-form';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Update Information | Online Book Borrowing Platform',
  description: 'Update your profile name and image',
};

export default async function UpdateProfilePage() {
  let session = null;

  try {
    session = await auth.api.getSession({
      headers: await headers(),
    });
  } catch (error) {
    console.error('Error loading session for update page:', error);
  }

  if (!session?.user) {
    redirect('/login');
  }

  return <UpdateProfileForm user={session.user} />;
}
