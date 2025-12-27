import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

/**
 * Get the current server session
 * Use this in Server Components, API Routes, and Server Actions
 */
export async function getSession() {
  try {
    return await getServerSession(authOptions);
  } catch (error) {
    console.error('Error getting session:', error);
    return null;
  }
}

/**
 * Get the current user from the session
 */
export async function getCurrentUser() {
  const session = await getSession();
  return session?.user;
}

