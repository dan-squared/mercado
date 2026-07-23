'use client';

import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { HugeIcon } from './huge-icon';

interface PaymentModalProps {
  isOpen: boolean;
  amount: number;
  provider: 'telebirr' | 'cbebirr';
  phone: string;
  onSuccess: () => void;
  onClose: () => void;
}

export const PaymentModal: React.FC<PaymentModalProps> = ({
  isOpen,
  amount,
  provider,
  phone,
  onSuccess,
  onClose,
}) => {
  const [step, setStep] = useState<'confirm' | 'otp' | 'processing' | 'success'>('confirm');
  const [pin, setPin] = useState('');

  if (!isOpen) return null;

  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#2f5fe0', '#eaa6f0', '#a3f2b0'],
      });
    } catch {
      // fallback if confetti canvas fails
    }
  };

  const handleConfirmPay = () => {
    setStep('otp');
  };

  const handleVerifyOtp = () => {
    setStep('processing');
    setTimeout(() => {
      setStep('success');
      triggerConfetti();
      setTimeout(() => {
        onSuccess();
        onClose();
        setStep('confirm');
        setPin('');
      }, 1800);
    }, 1500);
  };

  const providerName = provider === 'telebirr' ? 'Telebirr' : 'CBE Birr';
  const providerBg =
    provider === 'telebirr'
      ? 'bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-500/20'
      : 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity animate-in fade-in duration-200"
        onClick={step === 'processing' ? undefined : onClose}
      />

      {/* Modal Box */}
      <div className="relative w-full max-w-md bg-(--surface) border border-(--border) rounded-2xl shadow-2xl p-6 z-10 animate-in zoom-in-95 duration-150 origin-center">
        {step === 'confirm' && (
          <div className="space-y-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className={`px-2.5 py-1 rounded-lg text-xs font-bold border ${providerBg}`}>
                  {providerName}
                </span>
                <span className="text-xs font-semibold text-(--text-muted)">
                  Escrow Deposit
                </span>
              </div>
              <button
                onClick={onClose}
                className="p-1 rounded-lg text-(--text-muted) hover:bg-(--bg-secondary)"
              >
                <HugeIcon name="close" size={16} />
              </button>
            </div>

            <div className="text-center py-2 space-y-1">
              <p className="text-xs text-(--text-muted) uppercase tracking-wider font-semibold">
                Amount to Deposit
              </p>
              <h2 className="text-3xl font-black text-(--blue)">
                ETB {amount.toLocaleString()}
              </h2>
              <p className="text-xs text-(--text-secondary)">
                From mobile money account: <span className="font-bold">{phone}</span>
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-(--bg-secondary) text-xs text-(--text-muted) space-y-1.5 border border-(--border)">
              <div className="flex justify-between">
                <span>Platform Commission (0% demo):</span>
                <span className="font-semibold text-(--text-primary)">ETB 0</span>
              </div>
              <div className="flex justify-between font-bold text-(--text-primary) pt-1 border-t border-(--border)">
                <span>Total Escrow Balance:</span>
                <span className="text-(--blue)">ETB {amount.toLocaleString()}</span>
              </div>
            </div>

            <div className="flex items-center gap-2 text-[11px] text-(--text-muted)">
              <HugeIcon name="shield" size={14} className="text-emerald-500" />
              Funds held securely in platform escrow until work is verified.
            </div>

            <button
              onClick={handleConfirmPay}
              className="w-full py-3 rounded-xl bg-(--blue) text-white font-bold text-sm shadow-md hover:bg-(--blue-dark) transition-colors duration-150 btn-interactive flex items-center justify-center gap-2"
            >
              <span>Pay & Deposit ETB {amount.toLocaleString()}</span>
              <HugeIcon name="arrow-right" size={16} />
            </button>
          </div>
        )}

        {step === 'otp' && (
          <div className="space-y-5">
            <div className="text-center space-y-1">
              <div className="w-12 h-12 rounded-full bg-blue-500/10 text-(--blue) mx-auto flex items-center justify-center">
                <HugeIcon name="lock" size={24} />
              </div>
              <h3 className="text-base font-bold text-(--text-primary)">
                Enter {providerName} PIN
              </h3>
              <p className="text-xs text-(--text-muted)">
                Authorization request sent to <span className="font-semibold">{phone}</span>
              </p>
            </div>

            <div className="space-y-2">
              <input
                type="password"
                maxLength={4}
                placeholder="• • • •"
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                className="w-full text-center tracking-[1em] text-xl font-bold py-3 rounded-xl bg-(--bg-secondary) border border-(--border) text-(--text-primary) focus:border-(--blue) outline-none"
              />
              <p className="text-[11px] text-center text-(--text-muted)">
                Demo mode: enter any 4 digits
              </p>
            </div>

            <button
              onClick={handleVerifyOtp}
              disabled={pin.length < 4}
              className="w-full py-3 rounded-xl bg-(--blue) disabled:opacity-50 text-white font-bold text-sm shadow-md hover:bg-(--blue-dark) transition-colors duration-150 btn-interactive"
            >
              Authorize Escrow Deposit
            </button>
          </div>
        )}

        {step === 'processing' && (
          <div className="py-10 text-center space-y-4">
            <div className="w-12 h-12 rounded-full border-4 border-(--blue) border-t-transparent animate-spin mx-auto" />
            <p className="text-sm font-bold text-(--text-primary)">
              Verifying {providerName} Transaction...
            </p>
            <p className="text-xs text-(--text-muted)">
              Locking ETB {amount.toLocaleString()} into Escrow
            </p>
          </div>
        )}

        {step === 'success' && (
          <div className="py-8 text-center space-y-3 animate-in zoom-in-90 duration-200">
            <div className="w-14 h-14 rounded-full bg-emerald-500/10 text-emerald-500 mx-auto flex items-center justify-center">
              <HugeIcon name="check-circle" size={32} />
            </div>
            <h3 className="text-lg font-bold text-(--text-primary)">
              Escrow Funded Successfully!
            </h3>
            <p className="text-xs text-(--text-muted)">
              ETB {amount.toLocaleString()} is now active. Your campaign is LIVE.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
