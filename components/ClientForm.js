'use client';

import { useState } from 'react';
import { createClient } from '@/lib/utils';

export default function ClientForm({ onClientCreated }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');

    try {
      if (!formData.name.trim()) {
        throw new Error('Nome é obrigatório');
      }
      if (!formData.phone.trim()) {
        throw new Error('Telefone é obrigatório');
      }

      const newClient = await createClient(formData);
      setSuccess('Cliente cadastrado com sucesso!');
      setFormData({ name: '', phone: '', email: '' });

      setTimeout(() => {
        if (onClientCreated) {
          onClientCreated(newClient);
        }
      }, 1500);
    } catch (err) {
      setError(err.message || 'Erro ao cadastrar cliente');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="card space-y-4">
      <h2 className="text-2xl font-bold text-marina-pink mb-6">Novo Cliente</h2>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      {success && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg">
          {success}
        </div>
      )}

      <div>
        <label className="block text-sm font-semibold mb-2 text-marina-dark">
          Nome Completo *
        </label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Ex: Maria Silva"
          disabled={isLoading}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-semibold mb-2 text-marina-dark">
          Telefone *
        </label>
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Ex: (11) 99999-9999"
          disabled={isLoading}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-semibold mb-2 text-marina-dark">
          Email (Opcional)
        </label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Ex: maria@email.com"
          disabled={isLoading}
        />
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="btn-primary w-full disabled:opacity-50"
      >
        {isLoading ? 'Cadastrando...' : 'Cadastrar Cliente'}
      </button>
    </form>
  );
}
