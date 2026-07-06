'use client';

import Link from 'next/link';
import { useState } from 'react';
import { auth } from '@/lib/firebase';
import { signOut } from 'firebase/auth';
import { useRouter } from 'next/navigation';

export default function Header({ user, isAdmin, showLogout = true }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      await signOut(auth);
      router.push('/');
    } catch (error) {
      console.error('Error logging out:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <header className="bg-marina-dark text-white shadow-lg">
      <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link href={isAdmin ? '/admin' : '/'} className="flex items-center gap-2">
          <span className="text-2xl">💅</span>
          <h1 className="text-2xl font-bold">Marina Nails</h1>
        </Link>

        <nav className="flex items-center gap-6">
          {user && isAdmin && (
            <Link href="/admin" className="hover:text-marina-pink transition-colors">
              Dashboard
            </Link>
          )}
          {showLogout && user && (
            <button
              onClick={handleLogout}
              disabled={isLoading}
              className="btn-primary disabled:opacity-50"
            >
              {isLoading ? 'Saindo...' : 'Sair'}
            </button>
          )}
        </nav>
      </div>
    </header>
  );
}
