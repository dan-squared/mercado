'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { HugeIcon } from '@/components/ui/huge-icon';
import { UploadZone } from '@/components/ui/upload-zone';

export default function BusinessOnboardingPage() {
  const [companyName, setCompanyName] = useState('Sheba Agro Processing');
  const [industry, setIndustry] = useState('Food & Beverage');
  const router = useRouter();

  const handleFinish = (e: React.FormEvent) => {
    e.preventDefault();
    router.push('/business/dashboard');
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-(--bg) text-(--text-primary)">
      <div className="w-full max-w-lg space-y-6">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-blue-500/10 text-(--blue) flex items-center justify-center mx-auto">
            <HugeIcon name="building" size={24} />
          </div>
          <h1 className="text-2xl font-black tracking-tight">Setup Business Profile</h1>
          <p className="text-xs text-(--text-muted)">
            Tell creators who you are before launching campaigns
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-(--surface) border border-(--border) shadow-xl space-y-6">
          <form onSubmit={handleFinish} className="space-y-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-(--text-secondary)">
                Company / Brand Name *
              </label>
              <input
                type="text"
                required
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                placeholder="e.g. Sheba Foods"
                className="w-full px-3.5 py-2.5 text-sm rounded-xl bg-(--bg-secondary) border border-(--border) text-(--text-primary) focus:border-(--blue) outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-(--text-secondary)">
                Industry
              </label>
              <select
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
                className="w-full px-3.5 py-2.5 text-sm rounded-xl bg-(--bg-secondary) border border-(--border) text-(--text-primary) focus:border-(--blue) outline-none"
              >
                <option value="Food & Beverage">Food & Beverage</option>
                <option value="Retail & E-commerce">Retail & E-commerce</option>
                <option value="Financial & Fintech">Financial & Fintech</option>
                <option value="Technology & Apps">Technology & Apps</option>
                <option value="Fashion & Lifestyle">Fashion & Lifestyle</option>
                <option value="Logistics & Transport">Logistics & Transport</option>
              </select>
            </div>

            <UploadZone label="Company Logo (Optional)" />

            <div className="pt-2 flex items-center justify-between gap-4">
              <button
                type="button"
                onClick={() => router.push('/business/dashboard')}
                className="text-xs font-semibold text-(--text-muted) hover:text-(--text-primary)"
              >
                Skip for now
              </button>

              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-(--blue) text-white font-bold text-xs shadow-md hover:bg-(--blue-dark) transition-colors duration-150 btn-interactive flex items-center gap-2"
              >
                <span>Save & Continue to Dashboard</span>
                <HugeIcon name="arrow-right" size={16} />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
