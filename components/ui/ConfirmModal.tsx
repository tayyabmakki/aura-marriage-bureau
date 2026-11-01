'use client';

import React, { useEffect, useRef } from 'react';
import { Trash2, AlertTriangle, ShieldAlert, X } from 'lucide-react';

export interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  variant?: 'danger' | 'warning' | 'gold';
  icon?: 'trash' | 'alert' | 'shield';
  isUrdu?: boolean;
}

export const ConfirmModal: React.FC<ConfirmModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText,
  cancelText,
  variant = 'danger',
  icon = 'trash',
  isUrdu = false,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const cancelBtnRef = useRef<HTMLButtonElement>(null);

  // Close on Escape & trap scroll
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    cancelBtnRef.current?.focus();

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const defaultConfirmText = isUrdu ? 'ہاں، صاف کریں' : 'Yes, Clear Data';
  const defaultCancelText = isUrdu ? 'منسوخ کریں' : 'Cancel';

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="confirm-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md transition-all duration-300 animate-modal-backdrop"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={modalRef}
        className="relative w-full max-w-sm sm:max-w-md overflow-hidden rounded-2xl border border-[rgba(201,162,75,0.32)] bg-gradient-to-b from-[#191510] via-[#13100c] to-[#0a0908] p-6 sm:p-7 shadow-[0_24px_60px_rgba(0,0,0,0.85),0_0_35px_rgba(212,175,97,0.15)] animate-modal-card"
      >
        {/* Ambient Top Glow */}
        <div
          className="pointer-events-none absolute -top-20 left-1/2 -translate-x-1/2 h-44 w-44 rounded-full bg-[radial-gradient(circle,rgba(212,175,97,0.2)_0%,transparent_70%)]"
          aria-hidden="true"
        />

        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          aria-label={isUrdu ? 'بند کریں' : 'Close'}
          className="absolute top-4 end-4 flex h-8 w-8 items-center justify-center rounded-full text-[#a79c82] hover:text-[#f4ecda] hover:bg-white/5 transition-colors"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Icon Badge */}
        <div className="flex justify-center mb-4">
          {variant === 'danger' ? (
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-rose-500/35 bg-rose-500/10 text-rose-400 shadow-[0_0_24px_rgba(244,63,94,0.22)]">
              {icon === 'trash' ? (
                <Trash2 className="h-6 w-6 stroke-[1.8]" />
              ) : (
                <AlertTriangle className="h-6 w-6 stroke-[1.8]" />
              )}
            </div>
          ) : (
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-[#d4af61]/40 bg-[#d4af61]/10 text-[#ecd290] shadow-[0_0_24px_rgba(212,175,97,0.22)]">
              <ShieldAlert className="h-6 w-6 stroke-[1.8]" />
            </div>
          )}
        </div>

        {/* Text Content */}
        <div className="text-center space-y-2 mb-6">
          <h3
            id="confirm-modal-title"
            className="font-display text-lg sm:text-xl font-bold tracking-wide text-[#f4ecda]"
          >
            {title}
          </h3>
          <p className="text-xs sm:text-sm text-[#c4b99f] leading-relaxed max-w-xs sm:max-w-sm mx-auto">
            {message}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-3 pt-3 border-t border-[rgba(201,162,75,0.14)]">
          {/* Cancel Button */}
          <button
            ref={cancelBtnRef}
            type="button"
            onClick={onClose}
            className="flex min-h-[44px] items-center justify-center rounded-full border border-[rgba(201,162,75,0.28)] bg-black/40 px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#c4b99f] transition-all hover:border-[#d4af61] hover:text-[#f4ecda] hover:bg-white/5 active:scale-95"
          >
            {cancelText || defaultCancelText}
          </button>

          {/* Confirm Button */}
          {variant === 'danger' ? (
            <button
              type="button"
              onClick={() => {
                onConfirm();
                onClose();
              }}
              className="flex min-h-[44px] items-center justify-center gap-1.5 rounded-full bg-gradient-to-r from-rose-700 via-rose-600 to-rose-700 px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-white shadow-[0_4px_16px_rgba(225,29,72,0.35)] transition-all hover:from-rose-600 hover:to-rose-600 hover:shadow-[0_4px_22px_rgba(225,29,72,0.5)] active:scale-95"
            >
              <Trash2 className="h-3.5 w-3.5 shrink-0" />
              <span>{confirmText || defaultConfirmText}</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={() => {
                onConfirm();
                onClose();
              }}
              className="btn-gold flex min-h-[44px] items-center justify-center gap-1.5 text-xs font-bold uppercase tracking-wider shadow-lg active:scale-95"
            >
              <span>{confirmText || defaultConfirmText}</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
