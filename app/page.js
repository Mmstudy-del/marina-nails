'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { auth } from '@/lib/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import Header from '@/components/Header';

export default function Home() {
  const [user] = useAuthState(auth);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  if (user) {
    return (
      <>
        <Header user={user} isAdmin={user.email === process.env.NEXT_PUBLIC_ADMIN_EMAIL} />
        <div className="min-h-screen bg-marina-pale">
          {user.email === process.env.NEXT_PUBLIC_ADMIN_EMAIL ? (
            <div className="max-w-6xl mx-auto px-4 py-12 text-center">
              <h1 className="text-4xl font-bold text-marina-dark mb-4">
                Bem-vinda, Administradora! 👋
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Gerencie seus clientes e seus cartões fidelidade
              </p>
              <Link href="/admin" className="btn-primary text-lg px-8 py-4">
                Ir para Dashboard
              </Link>
            </div>
          ) : (
            <div className="max-w-6xl mx-auto px-4 py-12 text-center">
              <h1 className="text-4xl font-bold text-marina-dark mb-4">
                Acesso ao Cartão Fidelidade 💅
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Use seu link exclusivo para ver seu cartão fidelidade
              </p>
            </div>
          )}
        </div>
      </>
    );
  }

  return (
    <>
      <Header user={null} showLogout={false} />
      <div className="min-h-screen bg-gradient-to-br from-marina-pale to-marina-light flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          <div className="card text-center">
            <h1 className="text-4xl mb-2">💅</h1>
            <h2 className="text-3xl font-bold text-marina-dark mb-4">Marina Nails</h2>
            <p className="text-gray-600 mb-8">
              Bem-vinda ao nosso programa de cartão fidelidade! Ganhe 50% de desconto a cada 5
              manutenções.
            </p>

            <div className="space-y-3">
              <Link href="/login" className="btn-primary block">
                Login Administradora
              </Link>
              <p className="text-sm text-gray-500 my-4">OU</p>
              <p className="text-sm text-gray-600 mb-4">
                Se você é cliente, use seu link exclusivo para acessar seu cartão
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
