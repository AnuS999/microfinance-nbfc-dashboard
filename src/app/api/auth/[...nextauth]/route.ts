import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

// Get and validate the secret - ensure it's a non-empty string
const getSecret = (): string => {
  const secret = process.env.NEXTAUTH_SECRET || process.env.JWT_SECRET;
  
  // Validate secret exists and is a valid non-empty string
  if (!secret) {
    const errorMsg = 'NEXTAUTH_SECRET or JWT_SECRET environment variable is missing. Please set it in your Vercel environment variables. Generate one using: openssl rand -base64 32';
    console.error('❌', errorMsg);
    throw new Error(errorMsg);
  }
  
  if (typeof secret !== 'string') {
    const errorMsg = 'NEXTAUTH_SECRET or JWT_SECRET must be a string. Please check your environment variables.';
    console.error('❌', errorMsg);
    throw new Error(errorMsg);
  }
  
  const trimmedSecret = secret.trim();
  if (trimmedSecret.length === 0) {
    const errorMsg = 'NEXTAUTH_SECRET or JWT_SECRET is set but is empty. Please set a valid secret in your Vercel environment variables.';
    console.error('❌', errorMsg);
    throw new Error(errorMsg);
  }
  
  return trimmedSecret;
};

let authSecret: string;
try {
  authSecret = getSecret();
} catch (error) {
  // Log the error but still throw to prevent the app from running with invalid config
  console.error('❌ Fatal error: Cannot initialize NextAuth without a valid secret:', error);
  throw error;
}

// Note: NEXTAUTH_URL should be set in production (NextAuth will use VERCEL_URL or default if not set)
if (process.env.NODE_ENV === 'production' && !process.env.NEXTAUTH_URL) {
  console.warn('⚠️ NEXTAUTH_URL is not set. NextAuth will try to infer it, but it\'s recommended to set it explicitly.');
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'admin@demo.com' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        try {
          if (!credentials?.email || !credentials?.password) {
            console.error('Authorization failed: Missing email or password');
            return null;
          }

          // Demo credentials - Replace with actual database lookup
          if (
            credentials.email === 'admin@demo.com' &&
            credentials.password === '123456'
          ) {
            return {
              id: '1',
              email: 'admin@demo.com',
              name: 'Admin User',
              role: 'admin',
            };
          }

          // Invalid credentials - return null instead of throwing
          console.error('Authorization failed: Invalid credentials for', credentials.email);
          return null;
        } catch (error) {
          console.error('Authorization error:', error);
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: 'jwt',
    maxAge: 7 * 24 * 60 * 60, // 7 days
  },
  jwt: {
    secret: authSecret,
    maxAge: 7 * 24 * 60 * 60, // 7 days
  },
  pages: {
    signIn: '/login',
    error: '/login',
  },
  callbacks: {
    async jwt({ token, user }) {
      try {
        // Initial sign in
        if (user) {
          token.id = user.id;
          token.role = (user as any).role;
        }
        return token;
      } catch (error) {
        console.error('JWT callback error:', error);
        return token;
      }
    },
    async session({ session, token }) {
      try {
        // Send properties to the client
        if (session.user) {
          (session.user as any).id = token.id;
          (session.user as any).role = token.role;
        }
        return session;
      } catch (error) {
        console.error('Session callback error:', error);
        return session;
      }
    },
  },
  secret: authSecret,
  debug: process.env.NODE_ENV === 'development',
  events: {
    async signIn({ user, account, profile }) {
      if (process.env.NODE_ENV === 'development') {
        console.log('Sign in successful:', user.email);
      }
    },
    async signInError({ error }) {
      console.error('Sign in error:', error);
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

