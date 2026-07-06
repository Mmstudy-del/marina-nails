'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/lib/firebase';
import { getAllClients } from '@/lib/utils';
import Header from '@/components/Header';
import ClientForm from '@/components/ClientForm';
import ClientsList from '@/components/ClientsList';

export default function AdminDashboard() {
  const [user, loading] = useAuthState(auth);
  const [clients, setClients] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
      return;
    }

    if (user && user.email !== process.env.NEXT_PUBLIC_ADMIN_EMAIL) {
      router.push('/');
      return;
    }
  }, [user, loading, router]);

  useEffect(() => {
    if (user) {
      loadClients();
    }
  }, [user]);

  const loadClients = async () => {
    setIsLoading(true);
    try {
      const clientsData = await getAllClients();
      setClients(clientsData);
    } catch (error) {
      console.error('Error loading clients:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (loading || !user) {
    return (
      <>
        <Header user={null} />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="text-4xl mb-4">💅</div>
            <p className="text-gray-600">Carregando...</p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Header user={user} isAdmin={true} />
      <div className="min-h-screen bg-marina-pale p-4 md:p-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <h1 className="text-4xl font-bold text-marina-dark mb-2">Dashboard Admin</h1>
            <p className="text-gray-600">Gerencie seus clientes e seus cartões fidelidade</p>
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <p className="text-gray-600">Carregando clientes...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-1">
                <ClientForm onClientCreated={loadClients} />
              </div>
              <div className="lg:col-span-2">
                <ClientsList clients={clients} onMaintenanceAdded={loadClients} />
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
