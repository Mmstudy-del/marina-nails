'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import Header from '@/components/Header';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [user] = useAuthState(auth);
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push('/admin');
    }
  }, [user, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      if (!email || !password) {
        throw new Error('Por favor, preencha todos os campos');
      }

      if (email !== process.env.NEXT_PUBLIC_ADMIN_EMAIL) {
        throw new Error('Email de administradora inválido');
      }

      await signInWithEmailAndPassword(auth, email, password);
      router.push('/admin');
    } catch (err) {
      setError(err.message || 'Erro ao fazer login');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Header user={null} showLogout={false} />
      <div className="min-h-screen bg-gradient-to-br from-marina-pale to-marina-light flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          <form onSubmit={handleSubmit} className="card animate-fadeIn">
            <h2 className="text-3xl font-bold text-marina-dark mb-2 text-center">Login Admin</h2>
            <p className="text-center text-gray-600 mb-8">Acesse o dashboard da administradora</p>

            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-4">
                {error}
              </div>
            )}

            <div className="mb-4">
              <label className="block text-sm font-semibold mb-2 text-marina-dark">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu@email.com"
                disabled={isLoading}
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-semibold mb-2 text-marina-dark">Senha</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                disabled={isLoading}
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="btn-primary w-full mb-4 disabled:opacity-50"
            >
              {isLoading ? 'Entrando...' : 'Entrar'}
            </button>

            <div className="text-center">
              <Link href="/" className="text-marina-pink hover:underline">
                Voltar à Home
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
