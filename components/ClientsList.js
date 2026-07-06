'use client';

import Link from 'next/link';
import { addMaintenance } from '@/lib/utils';
import { useState } from 'react';

export default function ClientsList({ clients, onMaintenanceAdded }) {
  const [loadingClientId, setLoadingClientId] = useState(null);

  const handleAddMaintenance = async (docId) => {
    setLoadingClientId(docId);
    try {
      await addMaintenance(docId);
      if (onMaintenanceAdded) {
        onMaintenanceAdded();
      }
    } catch (error) {
      console.error('Error adding maintenance:', error);
      alert('Erro ao adicionar manutenção');
    } finally {
      setLoadingClientId(null);
    }
  };

  if (!clients || clients.length === 0) {
    return (
      <div className="card text-center">
        <p className="text-gray-500">Nenhum cliente cadastrado</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-marina-pink mb-6">Clientes</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {clients.map((client) => (
          <div key={client.id} className="card">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-bold text-marina-dark">{client.name}</h3>
                <p className="text-sm text-gray-600">{client.phone}</p>
                {client.email && <p className="text-sm text-gray-600">{client.email}</p>}
              </div>
              <span className="bg-marina-light text-white px-3 py-1 rounded-full text-sm font-bold">
                {client.maintenanceCount || 0}
              </span>
            </div>

            <div className="mb-4">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-600">Progresso no ciclo</span>
                <span className="font-bold">{(client.maintenanceCount || 0) % 5}/5</span>
              </div>
              <div className="w-full bg-marina-pale rounded-full h-2 overflow-hidden">
                <div
                  className="bg-marina-pink h-full transition-all duration-300"
                  style={{ width: `${((client.maintenanceCount || 0) % 5) * 20}%` }}
                ></div>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => handleAddMaintenance(client.id)}
                disabled={loadingClientId === client.id}
                className="flex-1 btn-primary disabled:opacity-50"
              >
                {loadingClientId === client.id ? 'Adicionando...' : '+Manutenção'}
              </button>
              <Link href={`/card/${client.clientId}`} className="flex-1 btn-secondary text-center">
                Ver Cartão
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
