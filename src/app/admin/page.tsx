'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { HugeIcon } from '@/components/ui/huge-icon';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('admin@mercado.et');
  const [password, setPassword] = useState('••••••••••••');
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    router.push('/admin/dashboard');
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-[#0d0d0f] text-white">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center mx-auto shadow-lg shadow-blue-500/20">
            <HugeIcon name="shield" size={28} />
          </div>
          <h1 className="text-2xl font-black tracking-tight">Mercado Command Center</h1>
          <p className="text-xs text-zinc-400">
            Platform Owner & Fraud Verification Operations
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800 shadow-2xl space-y-5">
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-zinc-300">Admin Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-zinc-950 border border-zinc-800 text-white outline-none focus:border-blue-500 font-semibold"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-zinc-300">Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-zinc-950 border border-zinc-800 text-white outline-none focus:border-blue-500 font-semibold"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-blue-600 text-white font-bold text-xs uppercase tracking-wider shadow-md hover:bg-blue-500 transition-all btn-interactive flex items-center justify-center gap-2"
            >
              <span>Access Command Center</span>
              <HugeIcon name="arrow-right" size={16} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
