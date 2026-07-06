'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { getClientByUniqueId } from '@/lib/utils';
import Header from '@/components/Header';
import LoyaltyCard from '@/components/LoyaltyCard';

export default function ClientCardPage() {
  const params = useParams();
  const clientId = params?.clientId;
  const [client, setClient] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (clientId) {
      loadClient();
    }
  }, [clientId]);

  const loadClient = async () => {
    setIsLoading(true);
    setError('');
    try {
      const clientData = await getClientByUniqueId(clientId);
      if (!clientData) {
        setError('Cliente não encontrado');
      } else {
        setClient(clientData);
      }
    } catch (err) {
      setError('Erro ao carregar o cartão');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Header user={null} showLogout={false} />
      <div className="min-h-screen bg-gradient-to-br from-marina-pale to-marina-light p-4 md:p-8">
        <div className="max-w-2xl mx-auto">
          {isLoading && (
            <div className="text-center py-12">
              <div className="text-4xl mb-4">💅</div>
              <p className="text-gray-600">Carregando seu cartão...</p>
            </div>
          )}

          {error && (
            <div className="card text-center">
              <p className="text-red-600 text-lg mb-4">{error}</p>
              <Link href="/" className="btn-primary">
                Voltar à Home
              </Link>
            </div>
          )}

          {!isLoading && client && (
            <>
              <LoyaltyCard client={client} />

              <div className="mt-8 text-center">
                <p className="text-sm text-gray-600 mb-4">
                  Este é seu cartão fidelidade exclusivo. Compartilhe este link com Marina Nails
                  para que ela possa registrar suas manutenções!
                </p>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(window.location.href);
                    alert('Link copiado!');
                  }}
                  className="btn-light mb-4"
                >
                  Copiar Link
                </button>
              </div>

              <div className="card mt-8 bg-marina-pale">
                <h3 className="text-xl font-bold text-marina-dark mb-4">Como Funciona?</h3>
                <ul className="space-y-3 text-left text-gray-700">
                  <li className="flex items-start gap-3">
                    <span className="text-marina-pink font-bold">1.</span>
                    <span>Cada vez que você faz uma manutenção, Marina registra em seu cartão</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-marina-pink font-bold">2.</span>
                    <span>Ao completar 5 manutenções, você ganha 50% de desconto na 6ª!</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-marina-pink font-bold">3.</span>
                    <span>O ciclo recomeça e você pode ganhar mais descontos</span>
                  </li>
                </ul>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
