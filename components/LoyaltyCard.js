'use client';

import { getProgressToNextFree, calculateDiscount } from '@/lib/utils';

export default function LoyaltyCard({ client }) {
  const maintenanceCount = client?.maintenanceCount || 0;
  const { progress, nextFreeAt } = getProgressToNextFree(maintenanceCount);
  const discount = calculateDiscount(maintenanceCount);
  const cyclePosition = maintenanceCount % 5;

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="card bg-gradient-to-br from-marina-light to-marina-pink text-white rounded-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-marina-dark p-6 text-center">
          <h2 className="text-3xl font-bold mb-2">💅 Cartão Fidelidade</h2>
          <p className="text-marina-pale">Marina Nails</p>
        </div>

        {/* Main Content */}
        <div className="p-8">
          {/* Client Info */}
          <div className="mb-8 text-center">
            <h3 className="text-2xl font-bold mb-2">{client?.name || 'Cliente'}</h3>
            <p className="text-sm opacity-90">ID: {client?.clientId}</p>
          </div>

          {/* Maintenance Stamps */}
          <div className="mb-8">
            <h4 className="text-center font-semibold mb-4">Manutenções</h4>
            <div className="grid grid-cols-5 gap-3">
              {[1, 2, 3, 4, 5].map((index) => (
                <div
                  key={index}
                  className={`w-14 h-14 rounded-full flex items-center justify-center text-lg font-bold transition-all duration-300 ${
                    cyclePosition >= index
                      ? 'bg-marina-dark text-marina-pink scale-110'
                      : 'bg-white/30 text-white'
                  }`}
                >
                  {index}
                </div>
              ))}
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between mb-2">
              <span className="text-sm font-semibold">Progresso</span>
              <span className="text-sm font-semibold">{Math.round(progress)}%</span>
            </div>
            <div className="w-full bg-white/30 rounded-full h-4 overflow-hidden">
              <div
                className="bg-marina-dark h-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>

          {/* Status */}
          <div className="bg-white/20 rounded-lg p-4 text-center">
            {discount > 0 ? (
              <>
                <p className="text-sm opacity-90 mb-2">🎉 Parabéns!</p>
                <p className="text-2xl font-bold mb-2">{discount}% DESCONTO</p>
                <p className="text-xs opacity-90">Use na sua próxima manutenção!</p>
              </>
            ) : (
              <>
                <p className="text-sm opacity-90 mb-2">Faltam</p>
                <p className="text-2xl font-bold mb-2">{nextFreeAt}</p>
                <p className="text-xs opacity-90">manutenções para ganhar 50% de desconto!</p>
              </>
            )}
          </div>

          {/* Stats */}
          <div className="mt-8 grid grid-cols-2 gap-4">
            <div className="bg-white/20 rounded-lg p-3 text-center">
              <p className="text-xs opacity-90">Total de</p>
              <p className="text-2xl font-bold">{maintenanceCount}</p>
              <p className="text-xs opacity-90">Manutenções</p>
            </div>
            <div className="bg-white/20 rounded-lg p-3 text-center">
              <p className="text-xs opacity-90">Ciclo</p>
              <p className="text-2xl font-bold">{cyclePosition}/5</p>
              <p className="text-xs opacity-90">Concluído</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-marina-dark px-8 py-4 text-center text-xs opacity-75">
          Obrigada por escolher Marina Nails! 💋
        </div>
      </div>
    </div>
  );
}
